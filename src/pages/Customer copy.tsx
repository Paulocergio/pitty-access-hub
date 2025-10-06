import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Search, Plus } from "lucide-react";
import DashboardLayout from "@/components/Layout/DashboardLayout";
import { useToast } from "@/hooks/use-toast";

import { Customer } from "@/types/Customer/Customer";
import { getCustomers, createCustomer, updateCustomer, deleteCustomer } from "@/services/CustomerService";

import CustomerTable from "@/components/customer/CustomerTable";
import CustomerPagination from "@/components/customer/CustomerPagination";
import CustomerCard from "@/components/customer/CustomerCard";
import CustomerModal from "@/components/customer/CustomerModal";

const CustomerPage = () => {
  const { toast } = useToast();
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);
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

  const loadCustomers = async () => {
    setLoading(true);
    try {
      const data = await getCustomers();
      setCustomers(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Erro ao carregar clientes", error);
      setCustomers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCustomers();
  }, []);

  const filteredCustomers = customers.filter(
    (c) =>
      (c.CompanyName || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (c.DocumentNumber || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (c.Email || "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredCustomers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentCustomers = filteredCustomers.slice(startIndex, startIndex + itemsPerPage);

  const handleEditCustomer = (customer: Customer) => {
    setEditingCustomer(customer);
    setDialogOpen(true);
  };

  const handleSubmit = async (data: Omit<Customer, "Id" | "CreatedAt" | "UpdatedAt">) => {
    try {
      if (editingCustomer) {
        await updateCustomer({ ...editingCustomer, ...data });
        toast({ title: "Cliente atualizado com sucesso" });
      } else {
        await createCustomer(data as Omit<Customer, "Id">);
        toast({ title: "Cliente criado com sucesso" });
      }
      await loadCustomers();
      setDialogOpen(false);
      setEditingCustomer(null);
    } catch (error) {
      console.error("Erro ao salvar cliente", error);
      throw error;
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteCustomer(id);
      toast({ title: "Cliente excluído com sucesso" });
      await loadCustomers();
    } catch (error) {
      console.error("Erro ao excluir cliente", error);
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
                placeholder="Buscar clientes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
            <Button onClick={() => { setEditingCustomer(null); setDialogOpen(true); }}>
              <Plus className="w-4 h-4 mr-2" /> Adicionar
            </Button>
          </div>
        </CardHeader>

        <CardContent>
          {loading ? (
            <div className="text-center py-8 text-muted-foreground">Carregando...</div>
          ) : !isMobile ? (
            <>
              <CustomerTable customers={currentCustomers} onEdit={handleEditCustomer} onDelete={handleDelete} />
              {filteredCustomers.length > 0 && (
                <CustomerPagination
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
                {currentCustomers.length > 0 ? (
                  currentCustomers.map((customer) => (
                    <CustomerCard key={customer.Id} customer={customer} onEdit={handleEditCustomer} onDelete={handleDelete} />
                  ))
                ) : (
                  <div className="text-center py-8 text-muted-foreground">Nenhum cliente encontrado</div>
                )}
              </div>
              {filteredCustomers.length > 0 && (
                <CustomerPagination
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

      <CustomerModal
        open={dialogOpen}
        onClose={() => { setDialogOpen(false); setEditingCustomer(null); }}
        onSubmit={handleSubmit}
        initialData={editingCustomer}
      />
    </DashboardLayout>
  );
};

export default CustomerPage;
