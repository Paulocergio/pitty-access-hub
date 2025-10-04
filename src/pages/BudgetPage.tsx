import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Search, Plus } from "lucide-react";
import DashboardLayout from "@/components/Layout/DashboardLayout";
import { useToast } from "@/hooks/use-toast";

import { Budget } from "@/types/Budget/Budget";


import BudgetTable from "@/components/budget/BudgetTable";
import BudgetPagination from "@/components/budget/BudgetPagination";
import BudgetCard from "@/components/budget/BudgetCard";
import BudgetModal from "@/components/budget/BudgetModal";
import { getBudgets, createBudget, updateBudget, deleteBudget } from "@/services/BudgetService";


const BudgetPage = () => {
  const { toast } = useToast();
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingBudget, setEditingBudget] = useState<Budget | null>(null);
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

  const loadBudgets = async () => {
    setLoading(true);
    try {
      const data = await getBudgets();
      setBudgets(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Erro ao carregar orçamentos", error);
      setBudgets([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBudgets();
  }, []);

  const filteredBudgets = budgets.filter(
    (b) =>
      (b.CustomerName || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (b.Email || "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredBudgets.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentBudgets = filteredBudgets.slice(startIndex, startIndex + itemsPerPage);

  const handleEditBudget = (budget: Budget) => {
    setEditingBudget(budget);
    setDialogOpen(true);
  };

  const handleSubmit = async (data: Omit<Budget, "Id">) => {
    try {
      if (editingBudget) {
        await updateBudget({ ...editingBudget, ...data });
        toast({ title: "Orçamento atualizado com sucesso" });
      } else {
        await createBudget(data);
        toast({ title: "Orçamento criado com sucesso" });
      }
      await loadBudgets();
      setDialogOpen(false);
      setEditingBudget(null);
    } catch (error) {
      console.error("Erro ao salvar orçamento", error);
      throw error;
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteBudget(id);
      toast({ title: "Orçamento excluído com sucesso" });
      await loadBudgets();
    } catch (error) {
      console.error("Erro ao excluir orçamento", error);
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
                placeholder="Buscar orçamentos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
            <Button onClick={() => { setEditingBudget(null); setDialogOpen(true); }}>
              <Plus className="w-4 h-4 mr-2" /> Adicionar Orçamento
            </Button>
          </div>
        </CardHeader>

        <CardContent>
          {loading ? (
            <div className="text-center py-8 text-muted-foreground">Carregando...</div>
          ) : !isMobile ? (
            <>
              <BudgetTable budgets={currentBudgets} onEdit={handleEditBudget} onDelete={handleDelete} />
              {filteredBudgets.length > 0 && (
                <BudgetPagination
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
             {currentBudgets.map((budget, index) => (
  <BudgetCard
    key={budget.Id ?? `budget-${index}`}
    budget={budget}
    onEdit={handleEditBudget}
    onDelete={handleDelete}
  />
))}

              </div>
              {filteredBudgets.length > 0 && (
                <BudgetPagination
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

      <BudgetModal
        open={dialogOpen}
        onClose={() => { setDialogOpen(false); setEditingBudget(null); }}
        onSubmit={handleSubmit}
        initialData={editingBudget}
      />
    </DashboardLayout>
  );
};

export default BudgetPage;
