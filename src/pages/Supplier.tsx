import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Search, Plus } from "lucide-react";
import DashboardLayout from "@/components/Layout/DashboardLayout";
import { useToast } from "@/hooks/use-toast";

import { Supplier } from "@/types/Supplier/Supplier";
import {
  getSuppliers,
  createSupplier,
  updateSupplier,
  deleteSupplier,
} from "@/services/SupplierService";

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
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const loadSuppliers = async () => {
    setLoading(true);
    try {
      const data = await getSuppliers();
      setSuppliers(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Erro ao carregar fornecedores", error);
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
      (s.CompanyName || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (s.DocumentNumber || "")
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      (s.Email || "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredSuppliers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentSuppliers = filteredSuppliers.slice(
    startIndex,
    startIndex + itemsPerPage
  );
  const handleEditSupplier = (supplier: Supplier) => {
    setEditingSupplier(supplier);
    setDialogOpen(true);
  };

  const handleSubmit = async (
    data: Omit<Supplier, "Id" | "CreatedAt" | "UpdatedAt">
  ) => {
    try {
      if (editingSupplier) {
        await updateSupplier({ ...editingSupplier, ...data });
        toast({ title: "Fornecedor atualizado com sucesso" });
      } else {
        await createSupplier(data as Omit<Supplier, "Id">);
        toast({ title: "Fornecedor criado com sucesso" });
      }
      await loadSuppliers();
      setDialogOpen(false);
      setEditingSupplier(null);
    } catch (error) {
      console.error("Erro ao salvar fornecedor", error);
      throw error;
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteSupplier(id);
      toast({ title: "Fornecedor excluído com sucesso" });
      await loadSuppliers();
    } catch (error) {
      console.error("Erro ao excluir fornecedor", error);
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
                placeholder="Buscar fornecedores..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
            <Button
              onClick={() => {
                setEditingSupplier(null);
                setDialogOpen(true);
              }}
            >
              <Plus className="w-4 h-4 mr-2" />
              Adicionar
            </Button>
          </div>
        </CardHeader>

        <CardContent>
          {loading ? (
            <div className="text-center py-8 text-muted-foreground">
              Carregando...
            </div>
          ) : !isMobile ? (
            <>
              <SupplierTable
                suppliers={currentSuppliers}
                onEdit={handleEditSupplier}
                onDelete={handleDelete}
              />

              {filteredSuppliers.length > 0 && (
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
                    <SupplierCard
                      key={supplier.Id}
                      supplier={supplier}
                      onEdit={handleEditSupplier}
                      onDelete={handleDelete}
                    />
                  ))
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    Nenhum fornecedor encontrado
                  </div>
                )}
              </div>
              {filteredSuppliers.length > 0 && (
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
        onClose={() => {
          setDialogOpen(false);
          setEditingSupplier(null);
        }}
        onSubmit={handleSubmit}
        initialData={editingSupplier}
      />
    </DashboardLayout>
  );
};

export default SupplierPage;
