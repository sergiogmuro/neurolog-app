import {Home, History, User, Calendar, Unlink, Smile} from "lucide-react";

interface NavigationProps {
  currentView: string;
  onViewChange: (view: string) => void;
}

export const Navigation = ({ currentView, onViewChange }: NavigationProps) => {
  const navItems = [
    { id: "mood", icon: Smile, label: "Estado" },
    { id: "history", icon: History, label: "Historial" },
    { id: "relief", icon: Unlink, label: "Desahogo" },
    { id: "calendar", icon: Calendar, label: "Calendario" },
    { id: "profile", icon: User, label: "Perfil" },
  ];

  return (
      <nav className="fixed bottom-0 left-0 right-0 z-50">
        <div className={
            `glass-card-navigation ` +
            `border-0 ` +
            // `rounded-t-3xl ` +
            // `border-t ` +
            // `border-border/50 ` +
            `p-2 `
        }>
          <div className="flex justify-around items-center max-w-md mx-auto">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentView === item.id;

              return (
                  <button
                      key={item.id}
                      onClick={() => onViewChange(item.id)}
                      className={`flex flex-col items-center space-y-1 p-2 rounded-xl transition-all duration-300 ${
                          isActive
                              ? 'bg-primary/20 text-yellow-300'
                              : 'text-muted-foreground hover:text-foreground'
                      }`}
                  >
                    <Icon size={24} />
                    <span className="text-xs font-medium">{item.label}</span>
                  </button>
              );
            })}
          </div>
        </div>
      </nav>
  );
};
