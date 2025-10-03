import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Edit, Trash2, User, Mail, Phone } from "lucide-react";
import { Users } from "@/types/Users/User";

interface UserCardProps {
  user: Users;
  onEdit: (user: Users) => void;
  onDelete: (id: number) => void;
}

const UserCard = ({ user, onEdit, onDelete }: UserCardProps) => (
  <Card className="hover:shadow-md transition-shadow">
    <CardHeader className="pb-3">
      <div className="flex items-center justify-between">
        <CardTitle className="text-lg flex items-center gap-2">
          <User className="w-4 h-4" />
          {user.name}
        </CardTitle>
        <Badge variant={user.role === 0 ? "default" : "secondary"}>
          {user.role === 0 ? "Admin" : "Usuário"}
        </Badge>
      </div>
    </CardHeader>
    <CardContent className="space-y-3">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Mail className="w-4 h-4" />
        <span className="truncate">{user.email}</span>
      </div>

      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Phone className="w-4 h-4" />
        {user.phone}
      </div>

      <div className="flex items-center justify-between pt-2 border-t">
        <Badge className={user.isActive ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}>
          {user.isActive ? "Ativo" : "Inativo"}
        </Badge>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => onEdit(user)}>
            <Edit className="w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onDelete(user.id)}
            className="text-destructive"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </CardContent>
  </Card>
);

export default UserCard;