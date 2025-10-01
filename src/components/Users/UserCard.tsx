import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Edit, Trash2, User, Mail, Phone, Activity } from "lucide-react";
import { Users } from "@/types/Users/User";

interface UserCardProps {
  user: Users;
  onEdit: (user: Users) => void;
  onDelete: (id: number) => void;
}

const UserCard = ({ user, onEdit, onDelete }: UserCardProps) => (
  <Card className="card-shadow hover:card-shadow-hover transition-shadow mb-4">
    <CardHeader className="pb-3">
      <div className="flex items-center justify-between">
        <CardTitle className="text-lg flex items-center gap-2">
          <User className="w-4 h-4" />
          {user.name}
        </CardTitle>
        <Badge variant={user.role === 0 ? "default" : "secondary"}>
          {user.role === 0 ? "Administrador" : "Usuário"}
        </Badge>
      </div>
    </CardHeader>
    <CardContent className="space-y-3">
      {/* Email */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Mail className="w-4 h-4" />
        {user.email}
      </div>

      {/* Telefone */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Phone className="w-4 h-4" />
        {user.phone}
      </div>

      {/* Status + Botões */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4" />
          <Badge
            variant={user.isActive ? "default" : "destructive"}
            className={user.isActive ? "bg-success text-success-foreground" : ""}
          >
            {user.isActive ? "Ativo" : "Inativo"}
          </Badge>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => onEdit(user)}>
            <Edit className="w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onDelete(user.id)}
            className="text-destructive hover:text-destructive"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </CardContent>
  </Card>
);

export default UserCard;
