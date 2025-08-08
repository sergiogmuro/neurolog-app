import {Card} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {Settings, Bell, Heart, Target, Award} from "lucide-react";

export const Profile = () => {
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

        {/* Stats Cards */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <Card className="glass-card rounded-xl p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <Target className="text-accent" size={20}/>
            </div>
            <div className="text-2xl font-bold text-foreground">15</div>
            <div className="text-xs text-muted-foreground">Días seguidos</div>
          </Card>

          <Card className="glass-card rounded-xl p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <Award className="text-yellow-400" size={20}/>
            </div>
            <div className="text-2xl font-bold text-foreground">4.3</div>
            <div className="text-xs text-muted-foreground">Promedio semanal</div>
          </Card>
        </div>

        {/* Momento de desahogo */}
        <Card className="glass-card rounded-2xl p-6 mb-6">
          <h2 className="text-xl font-semibold text-foreground mb-4">
            Momento de desahogo
          </h2>
          <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
            Tómate un momento para reflexionar sobre tus emociones. Escribir sobre tus sentimientos puede ayudarte a
            procesarlos mejor.
          </p>
          <Button className="w-full rounded-full bg-accent hover:bg-accent/90 text-accent-foreground">
            Escribir reflexión
          </Button>
        </Card>

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
