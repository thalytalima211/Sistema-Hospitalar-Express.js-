export default function formatDateTime(date) {
  const zoned = new Date(date).toLocaleString("pt-BR", {
    timeZone: "America/Fortaleza",
  });

  const [datePart, timePart] = zoned.split(", ");

  return {
    date: datePart, 
    time: timePart.slice(0, 5), 
  };
}