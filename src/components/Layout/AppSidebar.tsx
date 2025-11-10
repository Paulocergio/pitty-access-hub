import React from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import {
  Users,
  Building2,
  Package,
  DollarSign,
  Truck,
  Settings,
  LogOut,
  CreditCard,
  Receipt,
  LayoutDashboard,
  UserCircle,
  Building,
  ShoppingBag,
  FileText,
  TrendingUp,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const mainItems = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard, color: "text-blue-500" },
  { title: "Usuários", url: "/usuarios", icon: UserCircle, color: "text-purple-500" },
  { title: "Clientes", url: "/clientes", icon: Building, color: "text-green-500" },
  { title: "Fornecedores", url: "/fornecedores", icon: Truck, color: "text-orange-500" },
  { title: "Orçamento", url: "/orcamento", icon: FileText, color: "text-cyan-500" },
  { title: "Produtos", url: "/produto", icon: ShoppingBag, color: "text-pink-500" },
  { title: "Contas a Pagar", url: "/contas-a-pagar", icon: CreditCard, color: "text-red-500" },
  { title: "Contas a Receber", url: "/contas-a-receber", icon: TrendingUp, color: "text-emerald-500" },
];

const systemItems = [
  { title: "Configurações", url: "/configuracoes", icon: Settings, color: "text-gray-500" },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();

  const isCollapsed = state === "collapsed";

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("userEmail");
    toast({
      title: "Logout realizado com sucesso",
      description: "Até logo!",
    });
    navigate("/login");
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <Sidebar
      className="border-r bg-gradient-to-b from-sidebar to-sidebar/95 transition-all duration-300"
      collapsible="icon"
    >
      <SidebarContent className="p-4">
        {/* Logo Section */}
        <div className={`flex items-center mb-8 transition-all duration-300 ${isCollapsed ? 'justify-center' : 'gap-3'}`}>
          <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary/80 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
            <Building2 className="w-6 h-6 text-primary-foreground" />
          </div>
          {!isCollapsed && (
            <div className="min-w-0">
              <h2 className="font-bold text-lg text-sidebar-foreground truncate">
                Pitty
              </h2>
              <p className="text-xs text-muted-foreground truncate">Sistema de Gestão</p>
            </div>
          )}
        </div>

        {/* Main Menu */}
        <SidebarGroup>
          {!isCollapsed && (
            <SidebarGroupLabel className="text-xs font-semibold text-muted-foreground mb-2">
              PRINCIPAL
            </SidebarGroupLabel>
          )}
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {mainItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={isActive(item.url)}
                    className={`group relative overflow-hidden transition-all duration-200 ${
                      isActive(item.url)
                        ? 'bg-primary/10 text-primary font-medium shadow-sm'
                        : 'hover:bg-sidebar-accent/50'
                    } ${isCollapsed ? 'justify-center' : ''}`}
                    tooltip={isCollapsed ? item.title : undefined}
                  >
                    <NavLink
                      to={item.url}
                      className={`flex items-center gap-3 ${isCollapsed ? 'justify-center' : ''}`}
                    >
                      <item.icon className={`w-5 h-5 flex-shrink-0 transition-colors ${
                        isActive(item.url) ? 'text-primary' : item.color
                      }`} />
                      {!isCollapsed && (
                        <span className="truncate">{item.title}</span>
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* System Menu */}
        <SidebarGroup className="mt-6">
          {!isCollapsed && (
            <SidebarGroupLabel className="text-xs font-semibold text-muted-foreground mb-2">
              SISTEMA
            </SidebarGroupLabel>
          )}
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {systemItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    className={`group hover:bg-sidebar-accent/50 transition-all duration-200 ${isCollapsed ? 'justify-center' : ''}`}
                    tooltip={isCollapsed ? item.title : undefined}
                  >
                    <NavLink to={item.url} className={`flex items-center gap-3 ${isCollapsed ? 'justify-center' : ''}`}>
                      <item.icon className={`w-5 h-5 flex-shrink-0 ${item.color}`} />
                      {!isCollapsed && (
                        <span className="truncate">{item.title}</span>
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Logout Button */}
        <div className="mt-auto pt-4 border-t border-sidebar-border">
          <Button
            variant="ghost"
            onClick={handleLogout}
            className={`w-full transition-all duration-200 text-destructive hover:text-destructive hover:bg-destructive/10 group ${
              isCollapsed ? 'justify-center px-2' : 'justify-start'
            }`}
            title={isCollapsed ? "Sair" : undefined}
          >
            <LogOut className="w-5 h-5 flex-shrink-0" />
            {!isCollapsed && <span className="truncate ml-3">Sair</span>}
          </Button>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}