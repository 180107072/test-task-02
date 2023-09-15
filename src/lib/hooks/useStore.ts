"use client";

import { useContext } from "react";
import { StoreContext } from "../store/context";

export const useStore = () => {
  const context = useContext(StoreContext);

  if (!context) throw Error("No store context provider");

  return context;
};
