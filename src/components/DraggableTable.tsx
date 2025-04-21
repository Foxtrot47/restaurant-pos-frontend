import { useEffect, useRef } from "react";
import { useDrag } from "react-dnd";
import { getTableBgColorByStatus } from "../utils/ColorUtils";
import { TableShape } from "../data/tables";

interface DraggableTableProps {
  id: number
  name: string;
  type: TableShape;
  seats: number;
  status: string;
  left: number;
  top: number;
  onMove: (id: string, left: number, top: number) => void;
}

const DraggableTable = ({
  id,
  name,
  type,
  seats,
  status,
  left,
  top,
  onMove,
}: DraggableTableProps) => {
  const dragRef = useRef(null);

  const [{ isDragging }, drag] = useDrag({
    type: "TABLE",
    item: { id, left, top },
    collect: (monitor) => ({
      isDragging: !monitor.isDragging(),
    }),
  });

  // Effect to connect the drag ref
  useEffect(() => {
    drag(dragRef);
  }, [drag]);

  return (
    <div
      ref={dragRef}
      className={`absolute cursor-move ${isDragging ? "" : "opacity-50"}`}
      style={{
        left: `${left}px`,
        top: `${top}px`,
      }}
    >
      <div
        className={`${getTableBgColorByStatus(status)} ${
          type === "round" ? "rounded-full" : "rounded-md"
        } flex items-center justify-center text-white font-bold shadow-md hover:opacity-90`}
        style={{
          width:
            type === "round"
              ? seats <= 4
                ? "80px"
                : "100px"
              : seats <= 2
              ? "112px"
              : "160px",
          height:
            type === "round"
              ? seats <= 4
                ? "80px"
                : "100px"
              : seats <= 2
              ? "64px"
              : "80px",
        }}
      >
        <div className="text-center">
          <div>{name}</div>
          <div className="text-xs">{seats} seats</div>
        </div>
      </div>
    </div>
  );
};

export { DraggableTable, type DraggableTableProps };
