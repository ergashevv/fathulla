import React, { createContext, useEffect, useState } from "react";

export const HashContext = createContext();

const HashProvider = ({ children }) => {
  const [hash, setHash] = useState(window.location.hash);

  useEffect(() => {
    const handleChange = () => {
      setHash(window.location.hash);
    };

    window.addEventListener("hashchange", handleChange);

    return () => {
      window.removeEventListener("hashchange", handleChange);
    };
  }, []);

  const value = {
    hash,
    updateHash: (hash) => {
      setHash(hash);
    },
  };

  return <HashContext.Provider value={value}>{children}</HashContext.Provider>;
};

export default HashProvider;
