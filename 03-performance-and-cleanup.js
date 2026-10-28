/*
 * PERFORMANCE AND CLEANUP
 *
 * Debouncing delays work until input becomes quiet. Throttling limits work to
 * at most one call per time window. Cleanup releases timers and listeners when
 * a view is removed.
 */

// Real-life use:
// A search field should wait a moment after typing before making a server request.
export function debounce(callback, delay) {
  // This timer ID is private to this debounced callback.
  let timer;

  // Return a wrapper that can be used as an input event handler.
  return (...args) => {
    // Cancel the previous scheduled call when another input arrives.
    clearTimeout(timer);

    // Schedule only the newest arguments after the quiet period.
    timer = setTimeout(() => callback(...args), delay);
  };
}

/*
 * For typing search, debounce prevents a request for every keystroke. For
 * scroll or resize reporting, throttle may be more appropriate because
 * periodic updates are useful while the user is moving.
 *
 * Common mistakes:
 * - Debouncing a click that should respond immediately.
 * - Forgetting clearTimeout during component/view cleanup.
 * - Measuring only JavaScript time while ignoring layout and paint.
 * - Optimizing before identifying the actual bottleneck.
 *
 * Use browser Performance tools, realistic data, and user-visible metrics.
 * Do not add memoization or scheduling merely because it sounds faster.
 *
 * Challenge:
 * Extend debounce so the returned function has a cancel() method. Call cancel
 * when a search screen is destroyed and explain what work it prevents.
 */
