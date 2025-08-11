import {useEffect, useState} from "react";
import {Card} from "@/components/ui/card.tsx";

const LoadingPage = () => {
  const [serverSlow, setServerSlow] = useState(false)
  useEffect(() => {
    setTimeout(() => {
      setServerSlow(true)
    }, 5000);
  }, []);

  return (
      <div className="cosmic-bg min-h-screen py-6 px-6 content-center" style={{height: '100vh'}}>
        <div className="text-center">
          <Card className="bg-transparent border-0 w-full text-center">
            <h2 className="text-5xl font-semibold text-foreground mb-8 text-left">
              Conectando al <span className={`text-orange-200`}>servidor...</span>
            </h2>
            {!serverSlow === false && (
                <p className="text-red-500 font-semibold mt-4">
                  El servidor está tardando o inactivo. Intentando reconectar...
                </p>
            )}
          </Card>
        </div>
      </div>
  );
};

export default LoadingPage;
