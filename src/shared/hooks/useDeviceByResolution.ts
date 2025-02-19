import { useEffect, useState } from "react";

const useDeviceByResolution = () => {
  const [device, setDevice] = useState<"desktop" | "mobile">("desktop");

  useEffect(() => {
    if (window.screen.width < 851) {
      setDevice("mobile");
    } else {
      setDevice("desktop");
    }
  }, []);

  return device;
};

export default useDeviceByResolution;
