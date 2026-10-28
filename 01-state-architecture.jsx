/*
 * STATE ARCHITECTURE
 *
 * Separate server data, URL state, form state, and local UI state. A reducer
 * gives a feature one explicit transition point instead of scattered updates.
 */
export function projectReducer(state, action) {
  switch (action.type) {
    case "renamed":
      // Spread preserves other state fields while replacing name.
      return { ...state, name: action.name };
    case "task-added":
      // Spread creates a new array so React can detect the update.
      return { ...state, tasks: [...state.tasks, action.task] };
    default:
      // Unknown actions fail safely without inventing state.
      return state;
  }
}

/*
 * Reducers should be pure and synchronous. Keep cache/server ownership
 * separate from transient modal or form state. Challenge: identify where each
 * value belongs in a dashboard and add a task-removed action.
 */
