import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Users, 
  Building2, 
  Package, 
  DollarSign, 
  TrendingUp, 
  Activity,
  AlertCircle,
  CheckCircle
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/Layout/DashboardLayout";

const Dashboard = () => {
  const navigate = useNavigate();

  const stats = [
    {
      title: "Total de Usuários",
      value: "3",
      description: "Usuários cadastrados",
      icon: Users,
      color: "bg-blue-500",
    },
    {
      title: "Clientes",
      value: "Em breve",
      description: "Funcionalidade em desenvolvimento",
      icon: Building2,
      color: "bg-green-500",
    },
    {
      title: "Produtos",
      value: "Em breve",
      description: "Funcionalidade em desenvolvimento", 
      icon: Package,
      color: "bg-purple-500",
    },
    {
      title: "Financeiro",
      value: "Em breve",
      description: "Funcionalidade em desenvolvimento",
      icon: DollarSign,
      color: "bg-yellow-500",
    },
  ];

  const quickActions = [
    {
      title: "Gerenciar Usuários",
      description: "Visualizar, adicionar e editar usuários",
      action: () => navigate("/usuarios"),
      icon: Users,
      available: true,
    },
    {
      title: "Cadastrar Cliente",
      description: "Adicionar novo cliente ao sistema",
      action: () => {},
      icon: Building2,
      available: false,
    },
    {
      title: "Gerenciar Produtos",
      description: "Controlar estoque e produtos",
      action: () => {},
      icon: Package,
      available: false,
    },
    {
      title: "Relatórios Financeiros",
      description: "Visualizar relatórios de vendas",
      action: () => {},
      icon: TrendingUp,
      available: false,
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">
            Visão geral do sistema - Depósito do Pitty
          </p>
        </div>

        {/* Cards de Estatísticas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={index} className="card-shadow hover:card-shadow-hover transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <div className={`w-10 h-10 ${stat.color} rounded-lg flex items-center justify-center`}>
                  <stat.icon className="w-5 h-5 text-white" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                <p className="text-xs text-muted-foreground">{stat.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Ações Rápidas */}
          <Card className="card-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="w-5 h-5" />
                Ações Rápidas
              </CardTitle>
              <CardDescription>
                Acesse rapidamente as funcionalidades principais
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {quickActions.map((action, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:bg-secondary/50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 ${action.available ? 'bg-primary' : 'bg-muted'} rounded-lg flex items-center justify-center`}>
                      <action.icon className={`w-5 h-5 ${action.available ? 'text-primary-foreground' : 'text-muted-foreground'}`} />
                    </div>
                    <div>
                      <h3 className="font-medium text-foreground">{action.title}</h3>
                      <p className="text-sm text-muted-foreground">{action.description}</p>
                    </div>
                  </div>
                  <Button 
                    variant={action.available ? "default" : "outline"} 
                    size="sm"
                    onClick={action.action}
                    disabled={!action.available}
                    className={action.available ? "btn-gradient" : ""}
                  >
                    {action.available ? "Acessar" : "Em breve"}
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Status do Sistema */}
          <Card className="card-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-success" />
                Status do Sistema
              </CardTitle>
              <CardDescription>
                Informações sobre o funcionamento do sistema
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg bg-success-light">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-6 h-6 text-success" />
                  <div>
                    <h3 className="font-medium text-foreground">Sistema Operacional</h3>
                    <p className="text-sm text-muted-foreground">Todos os serviços funcionando</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <AlertCircle className="w-6 h-6 text-warning" />
                  <div>
                    <h3 className="font-medium text-foreground">Funcionalidades</h3>
                    <p className="text-sm text-muted-foreground">Algumas em desenvolvimento</p>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-primary-light rounded-lg">
                <h4 className="font-medium text-foreground mb-2">Próximas Atualizações</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Módulo de Clientes</li>
                  <li>• Gestão de Fornecedores</li>
                  <li>• Controle de Estoque</li>
                  <li>• Relatórios Financeiros</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;