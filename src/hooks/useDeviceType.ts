import { DeviceSizes } from "@/constants/deviceSizesConstants";
import { useState, useEffect } from "react";

const {
  MOBILE_MAX_WIDTH,
  TABLET_MIN_WIDTH,
  TABLET_MAX_WIDTH,
  DESKTOP_MIN_WIDTH,
} = DeviceSizes;
// 767, 768, 1199, 1200

const useDeviceType = () => {
  const [deviceType, setDeviceType] = useState({
    isMobile:
      typeof window !== "undefined" && window.innerWidth <= MOBILE_MAX_WIDTH,
    isTablet:
      typeof window !== "undefined" &&
      window.innerWidth >= TABLET_MIN_WIDTH &&
      window.innerWidth <= TABLET_MAX_WIDTH,
    isDesktop:
      typeof window !== "undefined" && window.innerWidth >= DESKTOP_MIN_WIDTH,
  });

  useEffect(() => {
    const handleResize = () => {
      setDeviceType({
        isMobile: window.innerWidth <= MOBILE_MAX_WIDTH,
        isTablet:
          window.innerWidth >= TABLET_MIN_WIDTH &&
          window.innerWidth <= TABLET_MAX_WIDTH,
        isDesktop: window.innerWidth >= DESKTOP_MIN_WIDTH,
      });
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return deviceType;
};

export default useDeviceType;
