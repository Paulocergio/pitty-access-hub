import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Search, Plus } from "lucide-react";
import DashboardLayout from "@/components/Layout/DashboardLayout";
import { useToast } from "@/hooks/use-toast";

import { Supplier } from "../types/Users/Supplier/Supplier";
import { getSuppliers, createSupplier, updateSupplier, deleteSupplier } from "@/services/SupplierService";

import SupplierTable from "@/components/Suppliers/SupplierTable";
import SupplierPagination from "@/components/Suppliers/SupplierPagination";
import SupplierCard from "@/components/Suppliers/SupplierCard";
import SupplierModal from "@/components/Suppliers/SupplierModal";

const SupplierPage = () => {
  const { toast } = useToast();

  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingSupplier, setEditingSupplier] = useState<Supplier | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const loadSuppliers = async () => {
    setLoading(true);
    try {
      const data = await getSuppliers();
      setSuppliers(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Erro ao carregar fornecedores", error);
      toast({
        variant: "destructive",
        title: "Erro",
        description: "Não foi possível carregar os fornecedores",
      });
      setSuppliers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSuppliers();
  }, []);

  const filteredSuppliers = suppliers.filter(
    (s) =>
      s.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalItems = filteredSuppliers.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentSuppliers = filteredSuppliers.slice(startIndex, startIndex + itemsPerPage);

  const handleAddSupplier = () => {
    setEditingSupplier(null);
    setDialogOpen(true);
  };

  const handleEditSupplier = (supplier: Supplier) => {
    setEditingSupplier(supplier);
    setDialogOpen(true);
  };

  const handleDeleteSupplier = async (id: number) => {
    try {
      await deleteSupplier(id);
      toast({ title: "Fornecedor excluído", description: "O fornecedor foi removido com sucesso." });
      await loadSuppliers();
    } catch (error) {
      console.error("Erro ao excluir fornecedor", error);
      toast({ variant: "destructive", title: "Erro", description: "Não foi possível excluir o fornecedor" });
    }
  };

  const handleSubmit = async (data: Omit<Supplier, "id">) => {
    try {
      if (editingSupplier) {
        await updateSupplier({ ...editingSupplier, ...data });
        toast({ title: "Fornecedor atualizado", description: "Dados atualizados com sucesso." });
      } else {
        await createSupplier({ id: 0, ...data } as Supplier);
        toast({ title: "Fornecedor criado", description: "Novo fornecedor cadastrado com sucesso." });
      }
      await loadSuppliers();
      setDialogOpen(false);
      setEditingSupplier(null);
    } catch (error: any) {
      console.error("Erro ao salvar fornecedor", error);
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
                placeholder="Buscar fornecedores..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full sm:max-w-sm"
              />
            </div>
            <Button onClick={handleAddSupplier} className="btn-gradient w-full sm:w-auto">
              <Plus className="w-4 h-4 mr-2" />
              Adicionar Fornecedor
            </Button>
          </div>
        </CardHeader>

        <CardContent>
          {loading ? (
            <div className="text-center py-8 text-muted-foreground">Carregando fornecedores...</div>
          ) : !isMobile ? (
            <>
              <SupplierTable suppliers={currentSuppliers} onEdit={handleEditSupplier} onDelete={handleDeleteSupplier} />
              {totalItems > 0 && (
                <SupplierPagination
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
                {currentSuppliers.length > 0 ? (
                  currentSuppliers.map((supplier) => (
                    <SupplierCard key={supplier.id} supplier={supplier} onEdit={handleEditSupplier} onDelete={handleDeleteSupplier} />
                  ))
                ) : (
                  <div className="text-center py-8 text-muted-foreground">Nenhum fornecedor encontrado.</div>
                )}
              </div>
              {totalItems > 0 && (
                <SupplierPagination
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

      <SupplierModal
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onSubmit={handleSubmit}
        initialData={editingSupplier}
      />
    </DashboardLayout>
  );
};

export default SupplierPage;
