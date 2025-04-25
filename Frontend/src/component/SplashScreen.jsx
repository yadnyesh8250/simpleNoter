import React, { useEffect, useState } from "react";
 // adjust path if needed

const SplashScreen = () => {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 3000); // 3 seconds

    return () => clearTimeout(timer);
  }, []);

  return showSplash ? (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <h1 className="text-6xl font-extrabold text-fuchsia-400 tracking-in-expand">
        CyberNotes Terminal
      </h1>
    </div>
  ) :null;
    

};

export default SplashScreen;
