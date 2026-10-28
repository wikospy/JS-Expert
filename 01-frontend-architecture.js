/*
 * PROFESSIONAL FRONTEND ARCHITECTURE
 *
 * Senior frontend code separates pure decisions from effects such as DOM
 * updates, storage, and network requests. This makes behavior testable,
 * replaceable, and easier to reason about as the application grows.
 */

// Real-life use:
// A task board can filter visible work without touching the DOM or making a network request.
// A pure selector receives data and a query. It does not read the DOM or call
// a network API, so the same inputs always produce the same output.
function selectVisibleTasks(tasks, query) {
  // Normalize once so matching is case-insensitive and ignores outer spaces.
  const normalized = query.trim().toLowerCase();

  // filter returns a new array and leaves the source task collection intact.
  return tasks.filter((task) =>
    task.title.toLowerCase().includes(normalized),
  );
}

// This sample input is deliberately local; a real UI could supply state data.
const tasks = [{ title: "Review UI" }, { title: "Deploy app" }];

// Calling the selector produces data that a renderer can display.
console.log(selectVisibleTasks(tasks, "ui"));

/*
 * A useful state model makes impossible combinations harder to represent:
 *
 *   { status: "loading" }
 *   { status: "success", data: [...] }
 *   { status: "error", message: "..." }
 *
 * Avoid unrelated flags such as isLoading=true, isError=true, and data=null
 * when those flags can contradict each other.
 *
 * Common mistakes:
 * - Putting API calls, state mutation, filtering, and DOM rendering in one
 *   giant function.
 * - Mutating shared arrays so another screen sees an unexpected change.
 * - Creating abstractions before the behavior is understood.
 *
 * Use pure functions for selectors, validation, formatting, and calculations.
 * Keep effects at clear boundaries. Do not split every two-line expression
 * into a module just to appear architectural.
 *
 * Challenge:
 * Design a state object for a task screen with loading, success, and failure.
 * Then write a pure `selectCompletedTasks(tasks)` function and list its edge
 * cases before asking AI to review your design.
 */

export { selectVisibleTasks };
