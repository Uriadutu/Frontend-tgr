export const formatDate = (timestamp) => {
  const date = new Date(timestamp);
  const formattedDate = date.toLocaleString("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
    year: "2-digit",
    month: "2-digit",
    day: "2-digit",
  });
  return formattedDate;
};
