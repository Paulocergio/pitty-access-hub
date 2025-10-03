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

  // busca
  const [searchTerm, setSearchTerm] = useState("");

  // responsividade
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // paginação
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const loadUsers = async () => {
    setLoading(true);
    try {
      const data = await getUsers();
      setUsuarios(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Erro ao carregar usuários", error);
      toast({
        variant: "destructive",
        title: "Erro",
        description: "Não foi possível carregar os usuários",
      });
      setUsuarios([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  // filtrar usuários pela busca
  const filteredUsers = usuarios.filter(
    (u) =>
      u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalItems = filteredUsers.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentUsers = filteredUsers.slice(startIndex, startIndex + itemsPerPage);

  // handlers
  const handleAddUser = () => {
    setEditingUser(null);
    setDialogOpen(true);
  };

  const handleEditUser = (user: Users) => {
    setEditingUser(user);
    setDialogOpen(true);
  };

  const handleDeleteUser = async (id: number) => {
    try {
      await deleteUser(id);
      toast({ title: "Usuário excluído", description: "O usuário foi removido com sucesso." });
      await loadUsers();
    } catch (error) {
      console.error("Erro ao excluir usuário", error);
      toast({ variant: "destructive", title: "Erro", description: "Não foi possível excluir o usuário" });
    }
  };

const handleSubmit = async (data: Omit<Users, "id">) => {
  try {
    if (editingUser) {
      await updateUser({ ...editingUser, ...data });
      toast({ title: "Usuário atualizado", description: "Dados atualizados com sucesso." });
    } else {
      await createUser({ id: 0, ...data });
      toast({ title: "Usuário criado", description: "Novo usuário cadastrado com sucesso." });
    }

    await loadUsers();

    // só fecha se deu certo
    setDialogOpen(false);
    setEditingUser(null);

  } catch (error: any) {
    console.error("Erro ao salvar usuário", error);

    if (error.response?.status !== 409) {
      toast({
        variant: "destructive",
        title: "Erro",
        description: "Não foi possível salvar o usuário",
      });
    }


    throw error;
  }
};


  return (
    <DashboardLayout>
      <Card className="card-shadow">
        <CardHeader className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center space-x-2 w-full sm:w-auto">
              <Search className="w-4 h-4 text-muted-foreground flex-shrink-0" />
              <Input
                placeholder="Buscar usuários..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full sm:max-w-sm"
              />
            </div>


            <Button onClick={handleAddUser} className="btn-gradient w-full sm:w-auto">
              <Plus className="w-4 h-4 mr-2" />
              Adicionar Usuário
            </Button>
          </div>
        </CardHeader>

        <CardContent>
          {loading ? (
            <div className="text-center py-8 text-muted-foreground">Carregando usuários...</div>
          ) : !isMobile ? (
            <>
              <UserTable users={currentUsers} onEdit={handleEditUser} onDelete={handleDeleteUser} />
              {totalItems > 0 && (
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
                    <UserCard key={user.id} user={user} onEdit={handleEditUser} onDelete={handleDeleteUser} />
                  ))
                ) : (
                  <div className="text-center py-8 text-muted-foreground">Nenhum usuário encontrado.</div>
                )}
              </div>
              {totalItems > 0 && (
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

      {/* Modal */}
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
