// utils.js
export function formatMessageTime(date) {
  if (!date) return "";

  // Firestore Timestamp
  if (date.seconds) {
    date = date.seconds * 1000;
  }

  // Number in seconds
  if (typeof date === "number" && date < 1000000000000) {
    date = date * 1000;
  }

  return new Date(date).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}
