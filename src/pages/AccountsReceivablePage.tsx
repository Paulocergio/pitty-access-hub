import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Search, Plus } from "lucide-react";
import DashboardLayout from "@/components/Layout/DashboardLayout";
import { useToast } from "@/hooks/use-toast";

import { AccountsReceivable } from "@/types/AccountsReceivable/AccountsReceivable";
import {
  getAccountsReceivables,
  createAccountsReceivable,
  updateAccountsReceivable,
  deleteAccountsReceivable,
} from "@/services/AccountsReceivableService";

import AccountsReceivableTable from "@/components/accountsReceivable/AccountsReceivableTable";
import AccountsReceivablePagination from "@/components/accountsReceivable/AccountsReceivablePagination";
import AccountsReceivableCard from "@/components/accountsReceivable/AccountsReceivableCard";
import AccountsReceivableModal from "@/components/accountsReceivable/AccountsReceivableModal";

const AccountsReceivablePage = () => {
  const { toast } = useToast();
  const [accounts, setAccounts] = useState<AccountsReceivable[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingAccount, setEditingAccount] = useState<AccountsReceivable | null>(null);
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

  const loadAccounts = async () => {
    setLoading(true);
    try {
      const data = await getAccountsReceivables();
      setAccounts(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Erro ao carregar contas a receber", error);
      setAccounts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAccounts();
  }, []);

  const filteredAccounts = accounts.filter(
    (a) =>
      (a.Description || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (a.CustomerName || "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredAccounts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentAccounts = filteredAccounts.slice(startIndex, startIndex + itemsPerPage);

  const handleEditAccount = (account: AccountsReceivable) => {
    setEditingAccount(account);
    setDialogOpen(true);
  };

  const handleSubmit = async (
    data: Omit<AccountsReceivable, "Id" | "CreatedAt" | "UpdatedAt">
  ) => {
    try {
      if (editingAccount) {
        await updateAccountsReceivable({ ...editingAccount, ...data });
        toast({ title: "Conta atualizada com sucesso" });
      } else {
        await createAccountsReceivable(data as Omit<AccountsReceivable, "Id">);
        toast({ title: "Conta criada com sucesso" });
      }
      await loadAccounts();
      setDialogOpen(false);
      setEditingAccount(null);
    } catch (error) {
      console.error("Erro ao salvar conta", error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteAccountsReceivable(id);
      toast({ title: "Conta excluída com sucesso" });
      await loadAccounts();
    } catch (error) {
      console.error("Erro ao excluir conta", error);
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
                placeholder="Buscar contas..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
            <Button
              onClick={() => {
                setEditingAccount(null);
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
            <div className="text-center py-8 text-muted-foreground">Carregando...</div>
          ) : !isMobile ? (
            <>
              <AccountsReceivableTable
                accounts={currentAccounts}
                onEdit={handleEditAccount}
                onDelete={handleDelete}
              />
              {filteredAccounts.length > 0 && (
                <AccountsReceivablePagination
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
                {currentAccounts.length > 0 ? (
                  currentAccounts.map((account) => (
                    <AccountsReceivableCard
                      key={account.Id}
                      account={account}
                      onEdit={handleEditAccount}
                      onDelete={handleDelete}
                    />
                  ))
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    Nenhuma conta encontrada
                  </div>
                )}
              </div>
              {filteredAccounts.length > 0 && (
                <AccountsReceivablePagination
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

      <AccountsReceivableModal
        open={dialogOpen}
        onClose={() => {
          setDialogOpen(false);
          setEditingAccount(null);
        }}
        onSubmit={handleSubmit}
        initialData={editingAccount}
      />
    </DashboardLayout>
  );
};

export default AccountsReceivablePage;
