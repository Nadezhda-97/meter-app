// хук для доступа к стору
import { useContext } from "react";
import { RootStoreContext } from "../models/RootStoreContext";

export const useRootStore = () => {
  const context = useContext(RootStoreContext);
  if (!context) {
    throw new Error("useRootStore must be used within RootStoreProvider");
  }
  return context;
};
