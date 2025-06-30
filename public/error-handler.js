// Global error handler to prevent [object Event] console errors
window.addEventListener("error", function (event) {
  // Prevent logging [object Event] to console
  if (
    event &&
    typeof event === "object" &&
    event.toString() === "[object Event]"
  ) {
    return;
  }

  // Log actual errors properly
  if (event.error) {
    console.error("Global Error:", event.error.message, event.error.stack);
  } else {
    console.error("Global Error:", event.message || event);
  }
});

// Handle unhandled promise rejections
window.addEventListener("unhandledrejection", function (event) {
  console.error("Unhandled Promise Rejection:", event.reason);
  event.preventDefault(); // Prevent default browser behavior
});

// Override console methods to handle objects properly
const originalConsoleError = console.error;
console.error = function (...args) {
  const processedArgs = args.map((arg) => {
    if (arg && typeof arg === "object" && arg.toString() === "[object Event]") {
      return "Event object (details hidden)";
    }
    return arg;
  });
  originalConsoleError.apply(console, processedArgs);
};
