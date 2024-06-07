import { useState, useEffect } from "react";

const getOrientationMessage = () =>
  window.screen.height > window.screen.width
    ? "For a better experience, rotate your device."
    : "";

const useScreenOrientationMessage = () => {
  const [orientationMessage, setOrientationMessage] = useState(
    getOrientationMessage()
  );

  const updateOrientation = (_: any) => {
    setOrientationMessage(getOrientationMessage());
  };

  useEffect(() => {
    window.addEventListener("resize", updateOrientation);
    return () => {
      window.removeEventListener("resize", updateOrientation);
    };
  }, []);

  return orientationMessage;
};

export default useScreenOrientationMessage;
