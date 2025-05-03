// TableCard.tsx
import { Card, CardContent } from "@/components/ui/card";
import { type Table } from "../data/tables";

interface TableCardProps {
  table: Table;
  isSelected: boolean;
  onClick: () => void;
}

export function TableCard({ table, isSelected, onClick }: TableCardProps) {
  const getStatusStyle = (status: string) => {
    switch (status) {
      case "available":
        return "bg-blue-50";
      case "reserved":
        return "bg-gray-100";
      case "occupied":
        return "bg-gray-200";
      case "blocked":
        return "bg-gray-300";
      default:
        return "bg-gray-100";
    }
  };

  const shapeClass = table.type === "round" 
    ? "aspect-square rounded-full m-2" 
    : table.type === "rect" && table.seats > 4 
      ? "aspect-[2/1]" 
      : "aspect-[3/2]";

  return (
    <Card 
      onClick={onClick}
      className={`cursor-pointer hover:shadow-md transition-shadow ${
        isSelected ? "ring-2 ring-blue-600" : ""
      }`}
    >
      <CardContent className={`p-0 ${shapeClass}`}>
        <div className={`h-full flex flex-col items-center justify-center ${getStatusStyle(table.status)}`}>
          <span className="font-bold text-gray-700">{table.name}</span>
          <span className="text-xs text-gray-600 mt-1">{table.seats} seats</span>
        </div>
      </CardContent>
    </Card>
  );
}