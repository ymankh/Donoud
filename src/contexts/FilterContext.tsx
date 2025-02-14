import {
  createContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";

interface FilterContextType {
  filter: string;
  setFilter: Dispatch<SetStateAction<string>>;
}

const FilterContext = createContext<FilterContextType | undefined>(undefined);

interface FilterContextProviderProps {
  children: ReactNode;
}

export function FilterContextProvider({
  children,
}: FilterContextProviderProps) {
  const [filter, setFilter] = useState<string>("");

  return (
    <FilterContext.Provider value={{ filter, setFilter }}>
      {children}
    </FilterContext.Provider>
  );
}

export default FilterContext;
