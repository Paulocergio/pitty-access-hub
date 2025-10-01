import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Edit, Trash2, Mail, Phone, User } from "lucide-react";
import { Users, UserRole } from "@/types/Users/User";
import formatPhone from "@/utils/formatPhone";


interface UserTableProps {
  users: Users[];
  onEdit: (user: Users) => void;
  onDelete: (id: number) => void;
}

const UserTable = ({ users, onEdit, onDelete }: UserTableProps) => {
  const getRoleName = (role: UserRole) => {
    switch (role) {
      case UserRole.Admin:
        return "Administrador";
      case UserRole.User:
        return "Usuário";
      default:
        return "Desconhecido";
    }
  };

  return (
    <div>
      {/* --- TABELA (DESKTOP) --- */}
      <div className="hidden md:block overflow-x-auto">
        <div className="rounded-lg border shadow-sm bg-white min-w-[700px]">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50 hover:bg-muted/50">
                <TableHead className="font-semibold text-foreground">Nome</TableHead>
                <TableHead className="font-semibold text-foreground">E-mail</TableHead>
                <TableHead className="font-semibold text-foreground">Telefone</TableHead>
                <TableHead className="font-semibold text-foreground">Tipo de Acesso</TableHead>
                <TableHead className="font-semibold text-foreground">Status</TableHead>
                <TableHead className="text-right font-semibold text-foreground">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.length > 0 ? (
                users.map((user) => (
                  <TableRow key={user.id} className="hover:bg-muted/30 transition-colors">
                    <TableCell className="font-medium">{user.name}</TableCell>
                    <TableCell className="text-muted-foreground">{user.email}</TableCell>
                   <TableCell className="text-muted-foreground">
  {formatPhone(user.phone)}
</TableCell>

                    <TableCell>
                      <Badge
                        variant={user.role === UserRole.Admin ? "default" : "secondary"}
                        className="font-medium"
                      >
                        {getRoleName(user.role)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={user.isActive ? "default" : "destructive"}
                        className={
                          user.isActive
                            ? "bg-green-100 text-green-800 hover:bg-green-200 font-medium"
                            : "bg-red-100 text-red-800 hover:bg-red-200 font-medium"
                        }
                      >
                        {user.isActive ? "Ativo" : "Inativo"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => onEdit(user)}
                          className="hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 transition-colors"
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => onDelete(user.id)}
                          className="text-destructive hover:bg-red-50 hover:text-red-700 hover:border-red-200 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="h-32 text-center text-muted-foreground">
                    Nenhum usuário encontrado.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* --- CARDS (MOBILE) --- */}
      <div className="md:hidden space-y-4">
        {users.length > 0 ? (
          users.map((user) => (
            <div
              key={user.id}
              className="border rounded-lg p-4 shadow-sm bg-white hover:shadow-md transition-shadow"
            >
              {/* Header do Card */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <User className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{user.name}</h3>
                    <Badge
                      variant={user.role === UserRole.Admin ? "default" : "secondary"}
                      className="font-medium text-xs mt-1"
                    >
                      {getRoleName(user.role)}
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Informações de Contato */}
              <div className="space-y-2 mb-4 pl-1">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Mail className="w-4 h-4 text-blue-500 flex-shrink-0" />
                  <span className="truncate">{user.email}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
  <Phone className="w-4 h-4 text-green-500 flex-shrink-0" />
  <span>{formatPhone(user.phone)}</span>
</div>

              </div>

              {/* Footer com Status e Ações */}
              <div className="flex items-center justify-between pt-4 border-t">
                <Badge
                  className={`font-medium ${
                    user.isActive
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {user.isActive ? "Ativo" : "Inativo"}
                </Badge>

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => onEdit(user)}
                    className="h-9 w-9 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 transition-colors"
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => onDelete(user.id)}
                    className="h-9 w-9 text-destructive hover:bg-red-50 hover:text-red-700 hover:border-red-200 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-16 border rounded-lg bg-white">
            <div className="flex flex-col items-center gap-2">
              <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-2">
                <User className="w-8 h-8 text-muted-foreground" />
              </div>
              <p className="text-muted-foreground font-medium">
                Nenhum usuário encontrado
              </p>
              <p className="text-sm text-muted-foreground">
                Adicione um novo usuário para começar
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserTable;
