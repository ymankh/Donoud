import { useUIState } from "./useUIState";
import { useCallback } from "react";

/**
 * Custom hook to manage the global filter string used for searching tasks and notes.
 *
 * The filter value is persisted in the global UI state so it remains consistent
 * across different views or reloads if needed (depending on DB configuration).
 *
 * @returns {object} An object containing:
 * - `filter`: The current filter string.
 * - `setFilter`: Function to update the filter string.
 */
export const useFilter = () => {
    const { uiState, updateUIState } = useUIState();
    const filter = uiState.filter;
    
    const setFilter = useCallback((value: string | ((prev: string) => string)) => {
        updateUIState((d) => {
            d.filter = typeof value === 'function' ? value(d.filter) : value;
        });
    }, [updateUIState]);
    
    return { filter, setFilter };
};
