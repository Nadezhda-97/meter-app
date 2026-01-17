// провайдер

import { createContext } from "react";
import type { RootStoreType } from "./RootStore";

export const RootStoreContext = createContext<RootStoreType | null>(null);