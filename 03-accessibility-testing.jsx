export function getDialogLabel(title) {
  // These attributes describe the dialog to assistive technology.
  return {
    role: "dialog",
    "aria-modal": "true",
    "aria-label": title,
  };
}

/*
 * Accessible components need semantic names, keyboard operation, visible focus,
 * correct focus movement, and escape/close behavior. Test user-visible
 * behavior: opening, keyboard navigation, loading, failure, and recovery.
 *
 * Do not test private state names when a user interaction is the contract.
 * Challenge: write keyboard test cases for a modal and menu, including focus
 * return when each closes.
 */
