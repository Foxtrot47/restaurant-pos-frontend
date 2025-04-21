import { useState, useEffect, useRef } from "react";
import { useDrag, useDrop, DndProvider } from "react-dnd";
import { DraggableTable } from "../components/DraggableTable";
import { tableData } from "../data/tables";

// Main component with drag and drop functionality
export default function TablesPage() {
  const [tables, setTables] = useState(tableData);

  const [selectedTable, setSelectedTable] = useState(null);

  // Load table positions from server on component mount
  useEffect(() => {
    // Example: Load table positions from server
    const loadTablesFromServer = async () => {
      try {
        // const response = await fetch('/api/tables');
        // const data = await response.json();
        // setTables(data.tables);
        // Temporary comment out actual API call for this example
      } catch (error) {
        console.error("Failed to load tables:", error);
      }
    };

    loadTablesFromServer();
  }, []);

  // Save table positions to server when they change
  const saveTablePositions = async () => {
    try {
      const serializedTables = tables.map(
        ({ id, left, top, type, seats, status }) => ({
          id,
          left,
          top,
          type,
          seats,
          status,
        })
      );

      // Example: Send to server
      // await fetch('/api/tables', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ tables: serializedTables }),
      // });

      console.log("Tables saved:", serializedTables);
    } catch (error) {
      console.error("Failed to save table positions:", error);
    }
  };

  const moveTable = (id: number, left: number, top: number) => {
    setTables(
      tables.map((table) => {
        if (table.id === id) {
          return { ...table, left, top };
        }
        return table;
      })
    );

    // Optional: Debounce this to avoid too many saves
    // You could use lodash debounce or a setTimeout
    saveTablePositions();
  };

  const dropRef = useRef(null);

  const [, drop] = useDrop({
    accept: "TABLE",
    drop: (item: { id: number; left: number; top: number }, monitor) => {
      const delta = monitor.getDifferenceFromInitialOffset();
      if (!delta) {
        console.error("No delta found for drop operation.");
        return;
      }
      const left = Math.round(item.left + delta.x);
      const top = Math.round(item.top + delta.y);
      moveTable(item.id, left, top);
      return undefined;
    },
  });

  // Effect to connect the drop ref
  useEffect(() => {
    drop(dropRef);
  }, [drop]);

  return (
    <>
      <div className="w-2/3 border-r h-screen">
        <div className="p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Tables</h2>
            <div className="flex items-center gap-3">
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-green-500 mr-1"></div>
                <span className="text-xs text-neutral-500">Available</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-red-500 mr-1"></div>
                <span className="text-xs text-neutral-500">Occupied</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-blue-500 mr-1"></div>
                <span className="text-xs text-neutral-500">Reserved</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-yellow-500 mr-1"></div>
                <span className="text-xs text-neutral-500">Blocked</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 mb-4">
            <div className="relative">
              <select className="block w-44 pl-3 pr-10 py-2 text-base border border-neutral-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                <option>Main Floor</option>
                <option>Outdoor</option>
                <option>Mezzanine</option>
              </select>
            </div>
          </div>
        </div>
        <div
          className="tables-container px-4 pb-4 h-full"
          style={{ maxHeight: "calc(100vh - 200px)" }}
        >
          <div
            ref={dropRef}
            className="relative bg-neutral-100 rounded-lg p-4 h-full min-h-full"
          >
            {/* Fixed elements */}
            <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-neutral-300 px-4 py-2 rounded-md text-sm text-center">
              <i className="fas fa-door-open mr-1"></i> Entrance
            </div>

            <div className="absolute top-20 right-8 bg-neutral-300 p-3 rounded-md w-40 h-24 flex items-center justify-center">
              <span className="text-sm font-bold">Bar</span>
            </div>

            <div className="absolute bottom-8 left-8 bg-neutral-300 p-3 rounded-md w-48 h-32 flex items-center justify-center">
              <span className="text-sm font-bold">Kitchen</span>
            </div>

            {/* Draggable tables */}
            {tables.map((table) => (
              <DraggableTable
                id={table.id}
                key={table.id}
                name={table.name}
                type={table.type}
                seats={table.seats}
                status={table.status}
                left={table.left}
                top={table.top}
                onClick={() => setSelectedTable(table)}
              />
            ))}
          </div>
        </div>
        {/* Add a save button for manually saving positions */}
        <button
          className="fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded shadow"
          onClick={saveTablePositions}
        >
          Save Table Layout
        </button>
      </div>
      <div className="w-1/3 p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Table Details</h2>
          <div className="flex items-center gap-2">
            <div className="flex items-center bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm">
              <span className="h-2 w-2 bg-red-500 rounded-full mr-2"></span>
              Occupied
            </div>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="font-semibold mb-1">Table 2</h3>
          <p className="text-sm text-neutral-500 mb-1">Main Floor • 4 Seats</p>
          <p className="text-sm text-neutral-500">
            Occupied since: <span className="font-medium">5:30 PM</span> (37
            min)
          </p>
        </div>

        <div className="mb-6 border rounded-lg p-4">
          <h3 className="font-semibold mb-2">Current Order</h3>
          <div className="flex items-center gap-2 mb-2">
            <div className="bg-orange-200 rounded-md w-8 h-8 flex items-center justify-center text-orange-600 font-medium">
              A4
            </div>
            <div>
              <h3 className="font-semibold text-sm">Order #ID945632</h3>
              <p className="text-xs text-neutral-500">
                Ariel Hikmat • 2 guests
              </p>
            </div>
          </div>

          <div className="text-sm">
            <div className="flex justify-between items-center mt-2 text-neutral-600">
              <span>Items: 3</span>
              <span>$87.34</span>
            </div>
            <div className="flex justify-between items-center mt-1 text-neutral-600">
              <span>Status:</span>
              <span className="text-blue-600">Food being prepared</span>
            </div>
            <button className="w-full mt-3 border border-orange-400 text-orange-500 rounded-md py-1 text-sm">
              View Order Details
            </button>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="font-semibold mb-2">Actions</h3>
          <div className="grid grid-cols-2 gap-3">
            <button className="bg-orange-400 text-white rounded-md py-2 text-sm font-medium">
              <i className="fas fa-utensils mr-1"></i> New Order
            </button>
            <button className="bg-green-500 text-white rounded-md py-2 text-sm font-medium">
              <i className="fas fa-dollar-sign mr-1"></i> Pay Bill
            </button>
            <button className="border border-neutral-300 text-neutral-700 rounded-md py-2 text-sm font-medium">
              <i className="fas fa-user-plus mr-1"></i> Change Guests
            </button>
            <button className="border border-neutral-300 text-neutral-700 rounded-md py-2 text-sm font-medium">
              <i className="fas fa-exchange-alt mr-1"></i> Transfer
            </button>
            <button className="border border-neutral-300 text-neutral-700 rounded-md py-2 text-sm font-medium">
              <i className="fas fa-broom mr-1"></i> Mark for Cleaning
            </button>
            <button className="border border-neutral-300 text-neutral-700 rounded-md py-2 text-sm font-medium">
              <i className="fas fa-calendar-alt mr-1"></i> Reserve
            </button>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="font-semibold mb-2">Reservation History</h3>
          <div className="text-sm border rounded-lg divide-y">
            <div className="p-3">
              <div className="flex justify-between">
                <span className="font-medium">John Davis</span>
                <span className="text-neutral-500">Today</span>
              </div>
              <div className="flex justify-between text-neutral-600 mt-1">
                <span>12:30 PM - 2:00 PM</span>
                <span>4 guests</span>
              </div>
            </div>
            <div className="p-3">
              <div className="flex justify-between">
                <span className="font-medium">Sarah Miller</span>
                <span className="text-neutral-500">Today</span>
              </div>
              <div className="flex justify-between text-neutral-600 mt-1">
                <span>2:30 PM - 4:00 PM</span>
                <span>2 guests</span>
              </div>
            </div>
            <div className="p-3">
              <div className="flex justify-between">
                <span className="font-medium">Ariel Hikmat</span>
                <span className="text-neutral-500">Today</span>
              </div>
              <div className="flex justify-between text-neutral-600 mt-1">
                <span>5:30 PM - 7:00 PM</span>
                <span>2 guests</span>
              </div>
              <div className="mt-1 text-green-600 text-xs">
                <i className="fas fa-check-circle mr-1"></i> Current customer
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex gap-2">
          <button className="flex-1 bg-orange-400 text-white rounded-md py-3 font-medium">
            Edit Table
          </button>
          <button className="p-3 border border-neutral-300 rounded-md">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-neutral-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
              />
            </svg>
          </button>
        </div>
      </div>
    </>
  );
}
