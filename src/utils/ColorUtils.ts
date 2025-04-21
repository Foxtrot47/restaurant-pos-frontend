export const getTableBgColorByStatus = (status: string) => {
  switch (status) {
    case "available":
      return "bg-green-500";
    case "occupied":
      return "bg-red-500";
    case "reserved":
      return "bg-blue-500";
    case "blocked":
      return "bg-yellow-500";
    default:
      return "bg-green-500";
  }
};