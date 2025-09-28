import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Edit, Trash2, Search, Eye, EyeOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import DashboardLayout from "@/components/Layout/DashboardLayout";

interface Usuario {
  id: number;
  nome: string;
  sobrenome: string;
  email: string;
  senha: string;
  tipoAcesso: "Administrador" | "Usuario";
  isActive: boolean;
}

const usuariosIniciais: Usuario[] = [
  {
    id: 1,
    nome: "Junior",
    sobrenome: "Cergio",
    email: "juniorcergio@gmail.com",
    senha: "123456",
    tipoAcesso: "Administrador",
    isActive: true,
  },
  {
    id: 2,
    nome: "Maria",
    sobrenome: "Silva",
    email: "maria.silva@empresa.com",
    senha: "senha123",
    tipoAcesso: "Usuario",
    isActive: true,
  },
  {
    id: 3,
    nome: "João",
    sobrenome: "Santos",
    email: "joao.santos@empresa.com",
    senha: "minhasenha",
    tipoAcesso: "Usuario",
    isActive: false,
  },
];

const Usuarios = () => {
  const [usuarios, setUsuarios] = useState<Usuario[]>(usuariosIniciais);
  const [searchTerm, setSearchTerm] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<Usuario | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    nome: "",
    sobrenome: "",
    email: "",
    senha: "",
    confirmarSenha: "",
    tipoAcesso: "Usuario" as "Administrador" | "Usuario",
    isActive: true,
  });
  const { toast } = useToast();

  const resetForm = () => {
    setFormData({
      nome: "",
      sobrenome: "",
      email: "",
      senha: "",
      confirmarSenha: "",
      tipoAcesso: "Usuario",
      isActive: true,
    });
    setEditingUser(null);
    setShowPassword(false);
  };

  const handleAddUser = () => {
    resetForm();
    setDialogOpen(true);
  };

  const handleEditUser = (user: Usuario) => {
    setEditingUser(user);
    setFormData({
      nome: user.nome,
      sobrenome: user.sobrenome,
      email: user.email,
      senha: user.senha,
      confirmarSenha: user.senha,
      tipoAcesso: user.tipoAcesso,
      isActive: user.isActive,
    });
    setDialogOpen(true);
  };

  const handleDeleteUser = (id: number) => {
    setUsuarios(usuarios.filter(u => u.id !== id));
    toast({
      title: "Usuário excluído",
      description: "O usuário foi removido com sucesso.",
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validações
    if (!formData.nome || !formData.sobrenome || !formData.email || !formData.senha) {
      toast({
        variant: "destructive",
        title: "Campos obrigatórios",
        description: "Por favor, preencha todos os campos obrigatórios.",
      });
      return;
    }

    if (formData.senha !== formData.confirmarSenha) {
      toast({
        variant: "destructive",
        title: "Senhas não coincidem",
        description: "A senha e confirmação devem ser iguais.",
      });
      return;
    }

    if (editingUser) {
      // Editar usuário existente
      setUsuarios(usuarios.map(u => 
        u.id === editingUser.id 
          ? {
              ...u,
              nome: formData.nome,
              sobrenome: formData.sobrenome,
              email: formData.email,
              senha: formData.senha,
              tipoAcesso: formData.tipoAcesso,
              isActive: formData.isActive,
            }
          : u
      ));
      toast({
        title: "Usuário atualizado",
        description: "Os dados do usuário foram atualizados com sucesso.",
      });
    } else {
      // Adicionar novo usuário
      const newUser: Usuario = {
        id: Math.max(...usuarios.map(u => u.id)) + 1,
        nome: formData.nome,
        sobrenome: formData.sobrenome,
        email: formData.email,
        senha: formData.senha,
        tipoAcesso: formData.tipoAcesso,
        isActive: formData.isActive,
      };
      setUsuarios([...usuarios, newUser]);
      toast({
        title: "Usuário criado",
        description: "O novo usuário foi cadastrado com sucesso.",
      });
    }

    setDialogOpen(false);
    resetForm();
  };

  const filteredUsers = usuarios.filter(user =>
    user.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.sobrenome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Gestão de Usuários</h1>
            <p className="text-muted-foreground">
              Gerencie os usuários do sistema e suas permissões
            </p>
          </div>
          <Button onClick={handleAddUser} className="btn-gradient">
            <Plus className="w-4 h-4 mr-2" />
            Adicionar Usuário
          </Button>
        </div>

        <Card className="card-shadow">
          <CardHeader className="space-y-4">
            <CardTitle className="text-xl">Lista de Usuários</CardTitle>
            <CardDescription>
              {usuarios.length} usuário{usuarios.length !== 1 ? "s" : ""} cadastrado{usuarios.length !== 1 ? "s" : ""}
            </CardDescription>
            
            <div className="flex items-center space-x-2">
              <Search className="w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Buscar usuários..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="max-w-sm"
              />
            </div>
          </CardHeader>
          
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome</TableHead>
                    <TableHead>E-mail</TableHead>
                    <TableHead>Tipo de Acesso</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.length > 0 ? (
                    filteredUsers.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell className="font-medium">
                          {user.nome} {user.sobrenome}
                        </TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>
                          <Badge variant={user.tipoAcesso === "Administrador" ? "default" : "secondary"}>
                            {user.tipoAcesso}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge 
                            variant={user.isActive ? "default" : "destructive"}
                            className={user.isActive ? "bg-success text-success-foreground" : ""}
                          >
                            {user.isActive ? "Ativo" : "Inativo"}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleEditUser(user)}
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleDeleteUser(user.id)}
                              className="text-destructive hover:text-destructive"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={5} className="h-24 text-center">
                        Nenhum usuário encontrado.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Modal de Cadastro/Edição */}
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>
                {editingUser ? "Editar Usuário" : "Novo Usuário"}
              </DialogTitle>
              <DialogDescription>
                {editingUser 
                  ? "Faça as alterações nos dados do usuário." 
                  : "Preencha os dados para cadastrar um novo usuário."
                }
              </DialogDescription>
            </DialogHeader>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="nome">Nome *</Label>
                  <Input
                    id="nome"
                    value={formData.nome}
                    onChange={(e) => setFormData({...formData, nome: e.target.value})}
                    placeholder="Digite o nome"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sobrenome">Sobrenome *</Label>
                  <Input
                    id="sobrenome"
                    value={formData.sobrenome}
                    onChange={(e) => setFormData({...formData, sobrenome: e.target.value})}
                    placeholder="Digite o sobrenome"
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">E-mail *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  placeholder="Digite o e-mail"
                  required
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="senha">Senha *</Label>
                  <div className="relative">
                    <Input
                      id="senha"
                      type={showPassword ? "text" : "password"}
                      value={formData.senha}
                      onChange={(e) => setFormData({...formData, senha: e.target.value})}
                      placeholder="Digite a senha"
                      className="pr-10"
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-2 top-1.5 h-7 w-7 p-0"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmarSenha">Confirmar Senha *</Label>
                  <Input
                    id="confirmarSenha"
                    type={showPassword ? "text" : "password"}
                    value={formData.confirmarSenha}
                    onChange={(e) => setFormData({...formData, confirmarSenha: e.target.value})}
                    placeholder="Confirme a senha"
                    required
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="tipoAcesso">Tipo de Acesso</Label>
                  <Select 
                    value={formData.tipoAcesso} 
                    onValueChange={(value: "Administrador" | "Usuario") => 
                      setFormData({...formData, tipoAcesso: value})
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Usuario">Usuário</SelectItem>
                      <SelectItem value="Administrador">Administrador</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select 
                    value={formData.isActive ? "ativo" : "inativo"} 
                    onValueChange={(value) => 
                      setFormData({...formData, isActive: value === "ativo"})
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ativo">Ativo</SelectItem>
                      <SelectItem value="inativo">Inativo</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <DialogFooter className="gap-2">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setDialogOpen(false)}
                >
                  Cancelar
                </Button>
                <Button type="submit" className="btn-gradient">
                  {editingUser ? "Salvar Alterações" : "Cadastrar"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
};

export default Usuarios;