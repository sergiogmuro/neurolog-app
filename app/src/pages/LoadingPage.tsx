import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card.tsx";
import axiosClient from "@/path/to/axiosClient";

const LoadingPage = () => {
  const [serverHealthy, setServerHealthy] = useState<boolean | null>(null);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const source = axiosClient.CancelToken.source();

    const timeoutId = setTimeout(() => {
      source.cancel("Timeout de health check");
    }, 5000);

    axiosClient
        .get("/healthz", { cancelToken: source.token })
        .then(response => {
          if (response.status === 200) setServerHealthy(true);
          else setServerHealthy(false);
        })
        .catch(error => {
          if (axiosClient.isCancel(error)) {
            console.warn("Health check cancelado por timeout");
          }
          setServerHealthy(false);
        })
        .finally(() => {
          setChecking(false);
          clearTimeout(timeoutId);
        });

    return () => {
      clearTimeout(timeoutId);
      source.cancel("Cleanup health check");
    };
  }, []);

  return (
      <div className="cosmic-bg min-h-screen py-6 px-6 content-center" style={{ height: '100vh' }}>
        <div className="text-center">
          <Card className="bg-transparent border-0 w-full text-center">
            <h2 className="text-5xl font-semibold text-foreground mb-8 text-left">
              Cargando<span className={`text-orange-200`}>...</span>
            </h2>
            {!checking && serverHealthy === false && (
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
