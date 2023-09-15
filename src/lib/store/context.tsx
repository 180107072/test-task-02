"use client";

import { createContext } from "react";
import { RootStoreModel } from "./types";

export const StoreContext = createContext<RootStoreModel>({} as RootStoreModel);

export const Provider = StoreContext.Provider;
