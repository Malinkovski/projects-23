import { useEffect } from "react";

export const handleResize = (event: any) => {
  event.preventDefault();

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
};
