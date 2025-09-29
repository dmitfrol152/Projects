import type { AuthContextProps, SearchContextProps } from "@/context/types";
import { createContext, useContext } from "react";

export const AuthContext = createContext<AuthContextProps | undefined>(
  undefined
);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("Error in Context");
  return context;
};

export const SearchContext = createContext<SearchContextProps | undefined>(
  undefined
);

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (!context) throw new Error("Error in Context");
  return context;
};
