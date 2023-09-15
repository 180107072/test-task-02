import { RootStoreModel } from "../store/types";
import { useStore } from "./useStore";

export type MapStore<T> = (store: RootStoreModel) => T;

export const useInject = <T>(mapStore: MapStore<T>) => {
  const store = useStore();
  return mapStore(store);
};
