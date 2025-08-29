import { useState, useCallback } from "react";
import { Geolocation } from "@capacitor/geolocation";

interface LocationState {
  latitude: number | null;
  longitude: number | null;
}

export const useLocation = () => {
  const [coords, setCoords] = useState<LocationState>({ latitude: null, longitude: null });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getLocation = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const perm = await Geolocation.checkPermissions();

      if (perm.location === "denied") {
        const req = await Geolocation.requestPermissions();
        if (req.location === "denied") {
          setError("Permiso de ubicación denegado");
          return;
        }
      }

      const position = await Geolocation.getCurrentPosition({
        enableHighAccuracy: true,
      });

      setCoords({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
    } catch (err: any) {
      console.error("❌ Error obteniendo ubicación:", err);
      setError(err.message || "No se pudo obtener la ubicación");
    } finally {
      setLoading(false);
    }
  }, []);

  return { coords, loading, error, getLocation };
};
