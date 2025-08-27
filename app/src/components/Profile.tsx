import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Settings, Bell, Heart, Target, Award, User, Mail, MapPin, LogOut, Calendar } from "lucide-react";

interface ProfileProps {
  onReliefClick: () => void;
  userData?: {
    id: string;
    name: string;
    email: string;
    avatar: string;
    joinDate: string;
    streak: number;
    weeklyAverage: number;
    totalSessions: number;
    favoriteEmojis: string[];
  };
  onLogout?: () => void;
}

export const Profile = ({ onReliefClick, userData, onLogout }: ProfileProps) => {
  const defaultUserData = {
    id: "1",
    name: "María García",
    email: "maria@ejemplo.com",
    avatar: "/placeholder.svg",
    joinDate: "2024-01-15",
    streak: 15,
    weeklyAverage: 4.3,
    totalSessions: 45,
    favoriteEmojis: ["😊", "😌", "😄"]
  };

  const user = userData || defaultUserData;

  return (
      <div className="max-w-md mx-auto">
        {/* Profile Header */}
        <div className="text-center mb-8">
          <div
              className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center shadow-xl">
            <Heart className="text-white" size={32}/>
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-1">Tu Bienestar</h1>
          <p className="text-muted-foreground text-sm">
            Cuidando tu salud emocional cada día
          </p>
        </div>

        <Card className="glass-card rounded-2xl p-6 mb-6">
          <div className="flex items-center space-x-4 mb-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback className="bg-gradient-to-br from-purple-400 to-pink-400 text-white">
                {user.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h1 className="text-xl font-bold text-foreground">{user.name}</h1>
              <div className="flex items-center text-sm text-muted-foreground mb-1">
                <Mail className="h-3 w-3 mr-1" />
                {user.email}
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <Calendar className="h-3 w-3 mr-1" />
                Miembro desde {new Date(user.joinDate).toLocaleDateString()}
              </div>
            </div>
            {onLogout && (
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={onLogout}
                    className="text-muted-foreground hover:text-foreground"
                >
                  <LogOut className="h-4 w-4" />
                </Button>
            )}
          </div>

          {/* Favorite Emojis */}
          <div className="flex items-center space-x-2 mb-4">
            <span className="text-sm text-muted-foreground">Estados favoritos:</span>
            {user.favoriteEmojis.map((emoji, index) => (
                <Badge key={index} variant="secondary" className="text-base">
                  {emoji}
                </Badge>
            ))}
          </div>
        </Card>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <Card className="glass-card rounded-xl p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <Target className="text-accent" size={20}/>
            </div>
            <div className="text-2xl font-bold text-foreground">{user.streak}</div>
            <div className="text-xs text-muted-foreground">Días seguidos</div>
          </Card>

          <Card className="glass-card rounded-xl p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <Award className="text-yellow-400" size={20}/>
            </div>
            <div className="text-2xl font-bold text-foreground">{user.weeklyAverage}</div>
            <div className="text-xs text-muted-foreground">Promedio semanal</div>
          </Card>
        </div>

        {/* Momento de desahogo */}
        {/*<Card className="glass-card rounded-2xl p-6 mb-6">
          <h2 className="text-xl font-semibold text-foreground mb-4">
            Momento de desahogo
          </h2>
          <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
            Tómate un momento para reflexionar sobre tus emociones. Escribir sobre tus sentimientos puede ayudarte a
            procesarlos mejor.
          </p>
          <Button
              onClick={onReliefClick}
              className="register-button w-full text-primary-foreground button-primary"
          >
            Momento de desahogo
          </Button>
        </Card>
*/}
        {/* Settings & Options */}
        <div className="space-y-3">
          <Card className="glass-card rounded-xl p-4">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-purple-500/20 rounded-full flex items-center justify-center">
                <Bell className="text-purple-400" size={20}/>
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-medium text-foreground">Recordatorios</h3>
                <p className="text-xs text-muted-foreground">Configura notificaciones diarias</p>
              </div>
            </div>
          </Card>

          <Card className="glass-card rounded-xl p-4">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-blue-500/20 rounded-full flex items-center justify-center">
                <Settings className="text-blue-400" size={20}/>
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-medium text-foreground">Configuración</h3>
                <p className="text-xs text-muted-foreground">Personaliza tu experiencia</p>
              </div>
            </div>
          </Card>

          <Card className="glass-card rounded-xl p-4">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-green-500/20 rounded-full flex items-center justify-center">
                <Heart className="text-green-400" size={20}/>
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-medium text-foreground">Consejos de bienestar</h3>
                <p className="text-xs text-muted-foreground">Tips para mejorar tu estado de ánimo</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
  );
};
