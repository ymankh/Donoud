import { UIStateRecord, uiStateCollection } from "@/db/collections";
import { useLiveQuery } from "@tanstack/react-db";
import { useCallback, useEffect, useMemo } from "react";

const UI_STATE_ID = "global";

const defaultUIState: UIStateRecord = {
  id: UI_STATE_ID,
  modalOpen: false,
  filter: "",
  editingTask: null,
  selectedFolder: "",
  sortValue: "Date created",
  orderReversed: false,
};

/**
 * Custom hook to manage the global UI state of the application using TanStack DB.
 * 
 * This hook provides a reactive way to read and update UI-related state that needs to be persisted or shared
 * across components, such as modal visibility, filter strings, and sorting preferences.
 * 
 * @returns {object} An object containing:
 * - `uiState`: The current UI state record (or default if not yet initialized).
 * - `updateUIState`: A function to update the UI state using a draft mutator.
 */
export const useUIState = () => {
  const { data: uiStateRecords } = useLiveQuery((q) =>
    q.from({ ui_state: uiStateCollection })
  );

  const uiState = useMemo(
    () =>
      (uiStateRecords &&
        uiStateRecords.find((r) => r.id === UI_STATE_ID)) ||
      defaultUIState,
    [uiStateRecords]
  );

  const updateUIState = useCallback(
    (fn: (draft: UIStateRecord) => void) => {
      // Check if ID exists, if not, insert first.
      // But insert happens in useEffect below.
      // If we call update immediately on mount, state might not be there yet.
      // So ensuring existence:
      if (!uiStateCollection.state.has(UI_STATE_ID)) {
        uiStateCollection.insert(defaultUIState);
      }
      uiStateCollection.update(UI_STATE_ID, fn);
    },
    []
  );

  useEffect(() => {
    // Ensure the global state record exists
    const checkAndInit = async () => {
      const records = Array.from(uiStateCollection.state.values()).filter(
        (r) => r.id === UI_STATE_ID
      );
      if (records.length === 0) {
        uiStateCollection.insert(defaultUIState);
      }
    };
    checkAndInit();
  }, []);

  return { uiState, updateUIState };
};
