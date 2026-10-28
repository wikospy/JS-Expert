/*
 * TESTING AND ERROR DESIGN
 *
 * Pure functions are inexpensive to unit test. Browser integration tests
 * verify events, rendering, focus, and loading/error behavior. Good tests
 * describe user-visible contracts rather than private implementation details.
 */

// Real-life use:
// A project board can summarize how many tasks are complete vs total before rendering the UI.
export function summarize(tasks) {
  // length counts every task, including incomplete tasks.
  const total = tasks.length;

  // filter creates the completed subset; length counts those items.
  const completed = tasks.filter((task) => task.completed).length;

  // Return one predictable value that a UI or test can inspect.
  return { total, completed };
}

// This example makes the expected contract visible during manual inspection.
console.log(summarize([
  { completed: true },
  { completed: false },
  { completed: true },
]));

/*
 * Important test cases include an empty array, all-complete data, no-complete
 * data, malformed task objects, loading state, failed requests, retry, and
 * keyboard access. Decide the contract for malformed data instead of allowing
 * accidental behavior to become a requirement.
 *
 * Error design:
 * - Low-level code should preserve useful failure information.
 * - A UI boundary should translate it into an actionable message.
 * - Logging should help developers without exposing secrets or personal data.
 *
 * Common mistakes:
 * - Testing implementation details such as exact component state variables.
 * - Testing only the happy path.
 * - Catching an error and returning fake success-shaped data.
 * - Making tests depend on timing without controlling the clock.
 *
 * Use unit tests for pure logic, integration tests for connected UI behavior,
 * and end-to-end tests for critical browser journeys. Do not use one test type
 * for every problem.
 *
 * Challenge:
 * Write test cases for summarize(), including empty, all-complete, and mixed
 * inputs. Then design the loading, error, empty, and success assertions for a
 * task list without writing implementation code first.
 */
