import { useUIState } from "./useUIState";
import { useCallback } from "react";

/**
 * Custom hook to control the global modal state.
 *
 * Provides a simple interface to check if the modal is open, and to open/close it.
 * Modifications are persisted to the global UI state in TanStack DB.
 *
 * @returns {object} An object containing:
 * - `modalOpen`: Boolean indicating if the modal is currently open.
 * - `open`: Function to open the modal.
 * - `close`: Function to close the modal.
 */
export const useModal = () => {
  const { uiState, updateUIState } = useUIState();
  const modalOpen = uiState.modalOpen;

  const open = useCallback(() => updateUIState((d) => { d.modalOpen = true; }), [updateUIState]);
  const close = useCallback(() => updateUIState((d) => { d.modalOpen = false; }), [updateUIState]);

  return { modalOpen, open, close };
};
