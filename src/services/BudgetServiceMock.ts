import { Budget } from "@/types/Budget/Budget";

// Dados mockados (simulação da API)
let mockBudgets: Budget[] = [
  {
    Id: 1,
    CustomerName: "Empresa XPTO Ltda",
    Email: "contato@xpto.com",
    Phone: "(11) 98888-7777",
    Address: "Rua das Flores, 123 - São Paulo/SP",
    IssueDate: "2025-10-01",
    DueDate: "2025-10-10",
    Items: [
      { Description: "Consultoria", Quantity: 2, UnitPrice: 500 },
      { Description: "Treinamento", Quantity: 1, UnitPrice: 1500 },
    ],
    Discount: 10,
    Tax: 12,
    Total: 0, // será calculado no load
  },
  {
    Id: 2,
    CustomerName: "Cliente Teste",
    Email: "teste@cliente.com",
    Phone: "(31) 97777-5555",
    Address: "Av. Brasil, 500 - BH/MG",
    IssueDate: "2025-09-20",
    DueDate: "2025-09-30",
    Items: [{ Description: "Serviço de TI", Quantity: 5, UnitPrice: 300 }],
    Discount: 5,
    Tax: 8,
    Total: 0,
  },
];

// Calcula total automaticamente
const recalcTotal = (budget: Budget) => {
  const subtotal = budget.Items.reduce((s, i) => s + i.Quantity * i.UnitPrice, 0);
  const discountValue = subtotal * (budget.Discount / 100);
  const taxValue = subtotal * (budget.Tax / 100);
  return subtotal - discountValue + taxValue;
};

export const getBudgets = async (): Promise<Budget[]> => {
  return mockBudgets.map((b) => ({ ...b, Total: recalcTotal(b) }));
};

export const createBudget = async (budget: Omit<Budget, "Id">) => {
  const newBudget: Budget = {
    ...budget,
    Id: mockBudgets.length ? Math.max(...mockBudgets.map((b) => b.Id)) + 1 : 1,
  };
  newBudget.Total = recalcTotal(newBudget);
  mockBudgets.push(newBudget);
  return newBudget;
};

export const updateBudget = async (budget: Budget) => {
  const index = mockBudgets.findIndex((b) => b.Id === budget.Id);
  if (index !== -1) {
    budget.Total = recalcTotal(budget);
    mockBudgets[index] = budget;
  }
  return budget;
};

export const deleteBudget = async (id: number) => {
  mockBudgets = mockBudgets.filter((b) => b.Id !== id);
};
