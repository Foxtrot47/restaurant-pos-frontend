export const tableData: Table[] = [
    {
      id: 1,
      name: "T1",
      type: "round",
      seats: 4,
      status: "available",
      left: 64,
      top: 96,
    },
    {
      id: 2,
      name: "T2",
      type: "round",
      seats: 4,
      status: "occupied",
      left: 192,
      top: 96,
    },
    {
      id: 3,
      name: "T3",
      type: "round",
      seats: 4,
      status: "reserved",
      left: 320,
      top: 96,
    },
    {
      id: 4,
      name: "T4",
      type: "rect",
      seats: 2,
      status: "blocked",
      left: 96,
      top: 224,
    },
    {
      id: 5,
      name: "T5",
      type: "rect",
      seats: 2,
      status: "occupied",
      left: 256,
      top: 224,
    },
    {
      id: 6,
      name: "T6",
      type: "rect",
      seats: 6,
      status: "available",
      left: 64,
      top: 344,
    },
    {
      id: 7,
      name: "T7",
      type: "rect",
      seats: 6,
      status: "available",
      left: 256,
      top: 344,
    },
    {
      id: 8,
      name: "T8",
      type: "rect",
      seats: 8,
      status: "reserved",
      left: 128,
      top: 448,
    },
    {
      id: 9,
      name: "B1",
      type: "round",
      seats: 1,
      status: "occupied",
      left: 144,
      top: 192,
    },
    {
      id: 10,
      name: "B2",
      type: "round",
      seats: 1,
      status: "available",
      left: 80,
      top: 192,
    },
    {
      id: 11,
      name: "B3",
      type: "round",
      seats: 1,
      status: "available",
      left: 24,
      top: 192,
    }
];

export type Table = {
  id: number;
  name: string;
  type: TableShape;
  seats: number;
  status: TableStatus;
  left: number;
  top: number;
};

export type TableStatus = "available" | "reserved" | "occupied" | "blocked";
export type TableShape = "round" | "rect" | "square";
