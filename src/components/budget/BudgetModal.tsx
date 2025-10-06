import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Trash2,
  Plus,
  Calendar,
  User,
  Mail,
  Phone,
  MapPin,
  DollarSign,
  Package,
} from "lucide-react";

interface BudgetItem {
  Description: string;
  Quantity: number;
  UnitPrice: number;
}

interface Budget {
  Id?: string;
  BudgetNumber?: string;
  CustomerName: string;
  Email: string;
  Phone: string;
  Address: string;
  IssueDate: string;
  DueDate: string;
  Items: BudgetItem[];
  Discount: number;
  Tax: number;
  Total: number;
}

interface BudgetModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: Omit<Budget, "Id">) => Promise<void>;
  initialData?: Budget | null;
}

const generateBudgetNumber = () => {
  return `ORC-${Math.floor(100000 + Math.random() * 900000)}`;
};

const BudgetModal = ({
  open,
  onClose,
  onSubmit,
  initialData,
}: BudgetModalProps) => {
  const [budgetNumber, setBudgetNumber] = useState("");
  const [formData, setFormData] = useState<Omit<Budget, "Id">>({
    CustomerName: "",
    Email: "",
    Phone: "",
    Address: "",
    IssueDate: "",
    DueDate: "",
    Items: [],
    Discount: 0,
    Tax: 0,
    Total: 0,
  });

  useEffect(() => {
    if (open) {
      if (initialData) {
        setBudgetNumber(initialData.BudgetNumber || generateBudgetNumber());
        setFormData({
          CustomerName: initialData.CustomerName || "",
          Email: initialData.Email || "",
          Phone: initialData.Phone || "",
          Address: initialData.Address || "",
          IssueDate: initialData.IssueDate?.split("T")[0] || "",
          DueDate: initialData.DueDate?.split("T")[0] || "",
          Items: initialData.Items || [],
          Discount: initialData.Discount || 0,
          Tax: initialData.Tax || 0,
          Total: initialData.Total || 0,
        });
      } else {
        setBudgetNumber(generateBudgetNumber());
        setFormData({
          CustomerName: "",
          Email: "",
          Phone: "",
          Address: "",
          IssueDate: "",
          DueDate: "",
          Items: [],
          Discount: 0,
          Tax: 0,
          Total: 0,
        });
      }
    }
  }, [open, initialData]);

  const handleAddItem = () => {
    setFormData((prev) => ({
      ...prev,
      Items: [...prev.Items, { Description: "", Quantity: 1, UnitPrice: 0 }],
    }));
  };

  const handleRemoveItem = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      Items: prev.Items.filter((_, i) => i !== index),
    }));
  };

  const handleItemChange = <K extends keyof BudgetItem>(
    index: number,
    field: K,
    value: BudgetItem[K]
  ) => {
    const newItems = [...formData.Items];
    newItems[index] = { ...newItems[index], [field]: value };
    setFormData({ ...formData, Items: newItems });
  };

  const calculateSubtotal = () =>
    formData.Items.reduce(
      (sum, item) => sum + item.Quantity * item.UnitPrice,
      0
    );

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    const taxValue = subtotal * (formData.Tax / 100);
    return subtotal - formData.Discount + taxValue;
  };
  const handleSubmit = async () => {
    const total = calculateTotal();
    await onSubmit({ ...formData, BudgetNumber: budgetNumber, Total: total });
    onClose();
  };
  const subtotal = calculateSubtotal();
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-6xl max-h-[95vh] overflow-hidden flex flex-col p-0 gap-0">
        <DialogHeader className="px-8 pt-8 pb-6 bg-white border-b border-gray-200">
          <DialogTitle className="text-2xl font-bold text-gray-900 flex items-center gap-3">
            {initialData ? (
              <>
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shadow-lg shadow-purple-500/20">
                  <svg
                    className="w-5 h-5 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </div>
                Editar Orçamento
              </>
            ) : (
              <>
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shadow-lg shadow-purple-500/20">
                  <svg
                    className="w-5 h-5 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </div>
                Novo Orçamento
              </>
            )}
          </DialogTitle>
          <p className="text-gray-500 mt-2 text-sm ml-[52px]">
            {initialData
              ? "Atualize os dados do orçamento selecionado"
              : "Preencha os dados abaixo para criar um novo orçamento"}
          </p>
        </DialogHeader>

        {/* Conteúdo scrollável */}
        <div className="flex-1 overflow-y-auto bg-gray-50">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
            {/* Coluna Principal */}
            <div className="lg:col-span-2 space-y-6">
              {/* Card - Dados do Cliente */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shadow-lg shadow-purple-500/30">
                    <User className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">
                      Dados do Cliente
                    </h3>
                    <p className="text-sm text-gray-500">
                      Informações de contato
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                      <User className="w-4 h-4 text-gray-400" />
                      Nome Completo
                    </Label>
                    <Input
                      placeholder="Ex: João Silva"
                      value={formData.CustomerName}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          CustomerName: e.target.value,
                        })
                      }
                      className="border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                      <Mail className="w-4 h-4 text-gray-400" />
                      E-mail
                    </Label>
                    <Input
                      type="email"
                      placeholder="exemplo@email.com"
                      value={formData.Email}
                      onChange={(e) =>
                        setFormData({ ...formData, Email: e.target.value })
                      }
                      className="border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                      <Phone className="w-4 h-4 text-gray-400" />
                      Telefone
                    </Label>
                    <Input
                      placeholder="(00) 00000-0000"
                      value={formData.Phone}
                      onChange={(e) =>
                        setFormData({ ...formData, Phone: e.target.value })
                      }
                      className="border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-gray-400" />
                      Endereço
                    </Label>
                    <Input
                      placeholder="Rua, número, bairro..."
                      value={formData.Address}
                      onChange={(e) =>
                        setFormData({ ...formData, Address: e.target.value })
                      }
                      className="border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      Data de Emissão
                    </Label>
                    <Input
                      type="date"
                      value={formData.IssueDate}
                      onChange={(e) =>
                        setFormData({ ...formData, IssueDate: e.target.value })
                      }
                      className="border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      Data de Vencimento
                    </Label>
                    <Input
                      type="date"
                      value={formData.DueDate}
                      onChange={(e) =>
                        setFormData({ ...formData, DueDate: e.target.value })
                      }
                      className="border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                    />
                  </div>
                </div>
              </div>

              {/* Card - Itens do Orçamento */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-blue-600 flex items-center justify-center shadow-lg shadow-indigo-500/30">
                    <Package className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">
                      Itens do Orçamento
                    </h3>
                    <p className="text-sm text-gray-500">
                      {formData.Items.length}{" "}
                      {formData.Items.length === 1 ? "item" : "itens"}
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  {formData.Items.length > 0 && (
                    <div className="grid grid-cols-12 gap-3 px-3 pb-2 text-xs font-semibold text-gray-600 uppercase tracking-wide">
                      <div className="col-span-5">Descrição</div>
                      <div className="col-span-2">Qtd.</div>
                      <div className="col-span-3">Preço Unit.</div>
                      <div className="col-span-2 text-right">Total</div>
                    </div>
                  )}

                  {formData.Items.map((item, index) => (
                    <div
                      key={index}
                      className="p-4 bg-gradient-to-br from-gray-50 to-white border-2 border-gray-200 rounded-xl hover:border-purple-300 hover:shadow-md transition-all group"
                    >
                      <div className="grid grid-cols-12 gap-3 items-center">
                        <div className="col-span-5">
                          <Input
                            placeholder="Descrição do item..."
                            value={item.Description}
                            onChange={(e) =>
                              handleItemChange(
                                index,
                                "Description",
                                e.target.value
                              )
                            }
                            className="border-gray-300 focus:border-purple-500 bg-white"
                          />
                        </div>
                        <div className="col-span-2">
                          <Input
                            type="number"
                            min="1"
                            value={item.Quantity}
                            onChange={(e) =>
                              handleItemChange(
                                index,
                                "Quantity",
                                Number(e.target.value)
                              )
                            }
                            className="border-gray-300 focus:border-purple-500 bg-white"
                          />
                        </div>
                        <div className="col-span-3">
                          <Input
                            type="number"
                            step="0.01"
                            placeholder="0.00"
                            value={item.UnitPrice}
                            onChange={(e) =>
                              handleItemChange(
                                index,
                                "UnitPrice",
                                Number(e.target.value)
                              )
                            }
                            className="border-gray-300 focus:border-purple-500 bg-white"
                          />
                        </div>
                        <div className="col-span-2 flex items-center justify-end gap-2">
                          <span className="font-bold text-gray-900">
                            R$ {(item.Quantity * item.UnitPrice).toFixed(2)}
                          </span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleRemoveItem(index)}
                            className="text-red-500 hover:bg-red-50 hover:text-red-700 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Botão + no final */}
                  <button
                    onClick={handleAddItem}
                    className="w-full p-4 border-2 border-dashed border-gray-300 rounded-xl hover:border-purple-400 hover:bg-purple-50 transition-all group flex items-center justify-center gap-2"
                  >
                    <div className="w-8 h-8 rounded-full bg-gray-100 group-hover:bg-purple-100 flex items-center justify-center transition-colors">
                      <Plus className="w-5 h-5 text-gray-400 group-hover:text-purple-600 transition-colors" />
                    </div>
                    <span className="text-gray-500 group-hover:text-purple-600 font-medium transition-colors">
                      Adicionar novo item
                    </span>
                  </button>
                </div>
              </div>
            </div>

            {/* Sidebar - Resumo */}
            <div className="lg:col-span-1">
              <div className="sticky top-6 space-y-4">
                {/* Card do Número do Orçamento */}
                <div className="bg-gradient-to-br from-violet-600 to-indigo-700 rounded-2xl p-6 shadow-xl text-white relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16" />
                  <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-12 -mb-12" />
                  <div className="relative">
                    <p className="text-violet-200 text-sm font-medium mb-2 uppercase tracking-wide">
                      Nº do Orçamento
                    </p>
                    <p className="text-3xl font-bold mb-4 tracking-tight">
                      {budgetNumber}
                    </p>
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => setBudgetNumber(generateBudgetNumber())}
                      className="w-full bg-white/20 hover:bg-white/30 text-white border-white/30 backdrop-blur-sm"
                    >
                      <span className="mr-2">🔄</span> Gerar Novo Número
                    </Button>
                  </div>
                </div>

                {/* Card do Resumo Financeiro */}
                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
                  <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4 border-b border-gray-200">
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-5 h-5 text-gray-600" />
                      <h4 className="font-bold text-gray-900">
                        Resumo Financeiro
                      </h4>
                    </div>
                  </div>

                  <div className="p-6 space-y-4">
                    <div className="flex justify-between items-center py-2">
                      <span className="text-gray-600 font-medium">
                        Subtotal
                      </span>
                      <span className="text-lg font-semibold text-gray-900">
                        R$ {subtotal.toFixed(2)}
                      </span>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-gray-700">
                        Desconto (R$)
                      </Label>
                      <Input
                        type="number"
                        step="0.01"
                        value={formData.Discount}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            Discount: Number(e.target.value),
                          })
                        }
                        className="border-gray-300 focus:border-purple-500"
                        placeholder="0.00"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-gray-700">
                        Impostos (%)
                      </Label>
                      <Input
                        type="number"
                        step="0.01"
                        value={formData.Tax}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            Tax: Number(e.target.value),
                          })
                        }
                        className="border-gray-300 focus:border-purple-500"
                        placeholder="0.00"
                      />
                    </div>

                    <div className="pt-4 border-t-2 border-gray-200">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-700 font-bold text-lg">
                          Total
                        </span>
                        <span className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                          R$ {calculateTotal().toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer com botões */}
        <DialogFooter className="px-8 py-5 bg-white border-t border-gray-200 flex flex-row gap-3 justify-end shadow-lg">
          <Button
            variant="outline"
            onClick={onClose}
            className="px-6 hover:bg-gray-100"
          >
            Cancelar
          </Button>
          <Button
            onClick={handleSubmit}
            className="px-8 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 shadow-lg shadow-purple-500/30 transition-all hover:scale-105"
          >
            <span className="mr-2"></span> Salvar Orçamento
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default BudgetModal;
