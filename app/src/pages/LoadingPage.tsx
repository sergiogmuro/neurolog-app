import {useLocation} from "react-router-dom";
import {useEffect} from "react";
import {Card} from "@/components/ui/card.tsx";

const LoadingPage = () => {
  return (
      <div className="cosmic-bg min-h-screen py-6 px-6 content-center" style={{height: '100vh'}}>
        <div className="text-center">
          <Card className="bg-transparent border-0 w-full text-center">
            <h2 className="text-5xl font-semibold text-foreground mb-8 text-left">
              Cargando<span className={`text-orange-200`}>...</span>
            </h2>
          </Card>
        </div>
      </div>
  );
};

export default LoadingPage;
