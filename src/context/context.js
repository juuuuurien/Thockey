import React, { createContext } from "react";

export const context = createContext();

export const Provider = ({ children, value }) => {
  return <context.Provider value={value}>{children}</context.Provider>;
};
