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
import { Trash2, Plus, Calendar, User, Mail, Phone, MapPin } from "lucide-react";

// Mock types for demonstration
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
  Discount: number; // Valor fixo do desconto
  Tax: number;
  Total: number;
}

interface BudgetModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: Omit<Budget, "Id">) => Promise<void>;
  initialData?: Budget | null;
}

// Função para gerar número de orçamento aleatório
const generateBudgetNumber = () => {
  return `${Math.floor(100000 + Math.random() * 900000)}`;
};

const BudgetModal = ({ open, onClose, onSubmit, initialData }: BudgetModalProps) => {
  const [budgetNumber, setBudgetNumber] = useState("");
  const [formData, setFormData] = useState<Omit<Budget, "Id">>(
    initialData || {
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
    }
  );

  // Gera novo número quando o modal abre
  useEffect(() => {
    if (open) {
      if (!initialData) {
        setBudgetNumber(generateBudgetNumber());
      } else {
        setBudgetNumber(initialData.BudgetNumber || generateBudgetNumber());
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

  const calculateSubtotal = () => {
    return formData.Items.reduce(
      (sum, item) => sum + item.Quantity * item.UnitPrice,
      0
    );
  };

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
      <DialogContent className="sm:max-w-5xl max-h-[95vh] overflow-hidden flex flex-col p-0">
        <DialogHeader className="px-6 pt-6 pb-4 border-b bg-gradient-to-r from-purple-50 to-indigo-50">
          <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
            {initialData ? "✏️ Editar Orçamento" : "✨ Novo Orçamento"}
          </DialogTitle>
          <p className="text-sm text-gray-500 mt-1">Preencha os dados abaixo para criar seu orçamento</p>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 px-6 py-4">
            {/* Coluna Esquerda - Formulário */}
            <div className="lg:col-span-2 space-y-6">
              {/* Informações do Cliente */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                    <User className="w-5 h-5 text-purple-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800">Dados do Cliente</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                      <User className="w-4 h-4" />
                      Nome do Cliente *
                    </Label>
                    <Input
                      className="border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                      placeholder="Digite o nome completo"
                      value={formData.CustomerName}
                      onChange={(e) =>
                        setFormData({ ...formData, CustomerName: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      Email *
                    </Label>
                    <Input
                      type="email"
                      className="border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                      placeholder="email@exemplo.com"
                      value={formData.Email}
                      onChange={(e) => setFormData({ ...formData, Email: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      Telefone
                    </Label>
                    <Input
                      className="border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                      placeholder="(00) 00000-0000"
                      value={formData.Phone}
                      onChange={(e) => setFormData({ ...formData, Phone: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      Endereço
                    </Label>
                    <Input
                      className="border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                      placeholder="Rua, número, bairro, cidade"
                      value={formData.Address}
                      onChange={(e) =>
                        setFormData({ ...formData, Address: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      Data de Emissão *
                    </Label>
                    <Input
                      type="date"
                      className="border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                      value={formData.IssueDate}
                      onChange={(e) =>
                        setFormData({ ...formData, IssueDate: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      Data de Vencimento
                    </Label>
                    <Input
                      type="date"
                      className="border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                      value={formData.DueDate}
                      onChange={(e) =>
                        setFormData({ ...formData, DueDate: e.target.value })
                      }
                    />
                  </div>
                </div>
              </div>

              {/* Itens do Orçamento */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center">
                      <span className="text-xl">📋</span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800">Itens do Orçamento</h3>
                  </div>
                  <Button
                    onClick={handleAddItem}
                    className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 shadow-md"
                    size="sm"
                  >
                    <Plus className="w-4 h-4 mr-1" />
                    Adicionar Item
                  </Button>
                </div>

                {formData.Items.length === 0 ? (
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                    <p className="text-gray-500 mb-3">Nenhum item adicionado ainda</p>
                    <Button
                      onClick={handleAddItem}
                      variant="outline"
                      className="border-purple-600 text-purple-600 hover:bg-purple-50"
                    >
                      <Plus className="w-4 h-4 mr-1" />
                      Adicionar Primeiro Item
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {formData.Items.map((item, index) => (
                      <div
                        key={index}
                        className="p-3 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
                      >
                        <div className="grid grid-cols-12 gap-3 items-start">
                          <div className="col-span-12 mb-2">
                            <Label className="text-xs text-gray-600 mb-1 block">Descrição</Label>
                            <Input
                              placeholder="Ex: Desenvolvimento de site"
                              className="border-gray-300 focus:border-purple-500"
                              value={item.Description}
                              onChange={(e) =>
                                handleItemChange(index, "Description", e.target.value)
                              }
                            />
                          </div>
                          <div className="col-span-3">
                            <Label className="text-xs text-gray-600 mb-1 block">Quantidade</Label>
                            <Input
                              type="number"
                              min="1"
                              className="border-gray-300 focus:border-purple-500"
                              value={item.Quantity}
                              onChange={(e) =>
                                handleItemChange(index, "Quantity", Number(e.target.value))
                              }
                            />
                          </div>
                          <div className="col-span-3">
                            <Label className="text-xs text-gray-600 mb-1 block">Valor Unitário</Label>
                            <Input
                              type="number"
                              min="0"
                              step="0.01"
                              className="border-gray-300 focus:border-purple-500"
                              value={item.UnitPrice}
                              onChange={(e) =>
                                handleItemChange(index, "UnitPrice", Number(e.target.value))
                              }
                            />
                          </div>
                          <div className="col-span-3 flex flex-col justify-end">
                            <Label className="text-xs text-gray-600 mb-1 block">Total</Label>
                            <div className="h-10 flex items-center">
                              <span className="text-base font-semibold text-purple-600">
                                R$ {(item.Quantity * item.UnitPrice).toFixed(2)}
                              </span>
                            </div>
                          </div>
                          <div className="col-span-3 flex justify-end items-end">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleRemoveItem(index)}
                              className="text-red-500 hover:text-red-700 hover:bg-red-50"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Coluna Direita - Resumo */}
            <div className="lg:col-span-1">
              <div className="sticky top-4 space-y-4">
                {/* Número do Orçamento */}
                <div className="bg-white border-2 border-purple-200 rounded-xl p-4 text-center">
                  <p className="text-sm text-gray-600 mb-1">Número do Orçamento</p>
                  <p className="text-2xl font-bold text-purple-600">{budgetNumber}</p>
                  <p className="text-xs text-gray-500 mt-1">(Clique para gerar novo número)</p>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setBudgetNumber(generateBudgetNumber())}
                    className="mt-2 text-purple-600 hover:bg-purple-50"
                  >
                    🔄 Gerar Novo
                  </Button>
                </div>

                {/* Resumo do Orçamento */}
                <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl p-5 border border-purple-200">
                  <h4 className="font-semibold text-gray-800 mb-4">Resumo do Orçamento</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Subtotal:</span>
                      <span className="font-medium">R$ {subtotal.toFixed(2)}</span>
                    </div>

                    {/* Campo de Desconto Manual */}
                    <div className="space-y-2 py-2 border-t border-purple-200">
                      <Label className="text-sm font-medium text-gray-700">Desconto (R$)</Label>
                      <Input
                        type="number"
                        min="0"
                        step="0.01"
                        className="border-gray-300 focus:border-purple-500"
                        placeholder="0,00"
                        value={formData.Discount}
                        onChange={(e) =>
                          setFormData({ ...formData, Discount: Number(e.target.value) })
                        }
                      />
                    </div>

                    <div className="flex justify-between items-center text-red-600">
                      <span>Desconto:</span>
                      <span className="font-medium">
                        -R$ {formData.Discount.toFixed(2)}
                      </span>
                    </div>

                    {/* Campo de Taxa/Imposto */}


                    <div className="border-t border-purple-300 pt-3 mt-3">
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-bold text-gray-800">Total:</span>
                        <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
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

        <DialogFooter className="px-6 py-4 border-t bg-gray-50 flex-row gap-3 justify-end">
          <Button variant="outline" onClick={onClose} className="border-gray-300">
            Cancelar
          </Button>
          <Button
            onClick={handleSubmit}
            className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 shadow-md"
          >
            💾 Salvar
          </Button>
          <Button className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 shadow-md">
            📧 Enviar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default BudgetModal