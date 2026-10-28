/*
 * ASYNC RELIABILITY
 *
 * User actions can start overlapping requests. If an older request finishes
 * after a newer one, rendering it can overwrite the user's latest choice.
 * Cancellation and request identity prevent this stale-response race.
 */

// Real-life use:
// A search-as-you-type app should ignore stale results from an earlier query.
export function createRequestController() {
  // The variable stores the controller for the currently active request.
  let controller;

  // Return a function so one caller owns one piece of request coordination.
  return async function request(url) {
    // Optional chaining avoids calling abort before the first request exists.
    // Aborting asks fetch to stop caring about the previous response.
    controller?.abort();

    // Each request receives a fresh signal; an aborted controller cannot reset.
    controller = new AbortController();

    // fetch observes the signal and may reject with an AbortError.
    const response = await fetch(url, { signal: controller.signal });

    // HTTP failure statuses still produce a response, so check ok explicitly.
    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    // Parsing the body is asynchronous and returns the final data value.
    return response.json();
  };
}

/*
 * The browser does not undo a server-side operation merely because the client
 * aborts. Cancellation prevents stale client rendering and saves client work;
 * server APIs still need idempotency and safe retry design.
 *
 * Common mistakes:
 * - Treating every rejection as a user-visible server failure.
 * - Updating UI after a request was superseded.
 * - Reusing one AbortController after it was already aborted.
 * - Retrying non-idempotent writes blindly.
 *
 * Use cancellation for search-as-you-type and route changes. Use retries only
 * for transient failures with a bounded policy and clear user feedback.
 *
 * Challenge:
 * Call this request function from a search UI. Distinguish AbortError from a
 * real failure so cancellation does not show an alarming error message.
 */
