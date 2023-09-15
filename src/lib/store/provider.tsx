"use client";

import { Provider } from "./context";

import { FC, PropsWithChildren } from "react";
import { createStore } from "./create-store";

const rootStore = createStore();

export const StoreProvider: FC<PropsWithChildren> = ({ children }) => (
  <Provider value={rootStore}>{children}</Provider>
);
