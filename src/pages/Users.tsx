import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Search, Plus } from "lucide-react";
import DashboardLayout from "@/components/Layout/DashboardLayout";
import { useToast } from "@/hooks/use-toast";

import { Users } from "@/types/Users/User";
import { getUsers, createUser, updateUser, deleteUser } from "@/services/userService";

import UserTable from "@/components/Users/UserTable";
import UserPagination from "@/components/Users/UserPagination";
import UserCard from "@/components/Users/UserCard";
import UserModal from "@/components/Users/UserModal";

const UsersPage = () => {
  const { toast } = useToast();
  const [usuarios, setUsuarios] = useState<Users[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingUser, setEditingUser] = useState<Users | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const loadUsers = async () => {
    setLoading(true);
    try {
      const data = await getUsers();
      setUsuarios(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Erro ao carregar usuários", error);
      setUsuarios([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const filteredUsers = usuarios.filter(
    (u) =>
      u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentUsers = filteredUsers.slice(startIndex, startIndex + itemsPerPage);

  const handleSubmit = async (data: Omit<Users, "id">) => {
    try {
      if (editingUser) {
        await updateUser({ ...editingUser, ...data });
      } else {
        await createUser({ id: 0, ...data });
      }
      await loadUsers();
      setDialogOpen(false);
      setEditingUser(null);
    } catch (error: any) {
      if (error.response?.status !== 409) {
        console.error("Erro ao salvar usuário", error);
      }
      throw error;
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteUser(id);
      toast({ title: "Usuário excluído com sucesso" });
      await loadUsers();
    } catch (error) {
      console.error("Erro ao excluir usuário", error);
    }
  };

  return (
    <DashboardLayout>
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Buscar usuários..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
            <Button onClick={() => { setEditingUser(null); setDialogOpen(true); }}>
              <Plus className="w-4 h-4 mr-2" />
              Adicionar
            </Button>
          </div>
        </CardHeader>

        <CardContent>
          {loading ? (
            <div className="text-center py-8 text-muted-foreground">Carregando...</div>
          ) : !isMobile ? (
            <>
              <UserTable users={currentUsers} onEdit={setEditingUser} onDelete={handleDelete} />
              {filteredUsers.length > 0 && (
                <UserPagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  itemsPerPage={itemsPerPage}
                  onItemsPerPageChange={setItemsPerPage}
                  onPageChange={setCurrentPage}
                />
              )}
            </>
          ) : (
            <>
              <div className="space-y-4">
                {currentUsers.length > 0 ? (
                  currentUsers.map((user) => (
                    <UserCard key={user.id} user={user} onEdit={setEditingUser} onDelete={handleDelete} />
                  ))
                ) : (
                  <div className="text-center py-8 text-muted-foreground">Nenhum usuário encontrado</div>
                )}
              </div>
              {filteredUsers.length > 0 && (
                <UserPagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  itemsPerPage={itemsPerPage}
                  onItemsPerPageChange={setItemsPerPage}
                  onPageChange={setCurrentPage}
                />
              )}
            </>
          )}
        </CardContent>
      </Card>

      <UserModal
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onSubmit={handleSubmit}
        initialData={editingUser}
      />
    </DashboardLayout>
  );
};

export default UsersPage;