import { createContext, useState } from "react";

const FilterContext = createContext();

// eslint-disable-next-line react/prop-types
export function FilterContextProvider({ children }) {
  const [filter, setFilter] = useState("");
  return (
    <FilterContext.Provider value={{ filter, setFilter }}>
      {children}
    </FilterContext.Provider>
  );
}

export default FilterContext
