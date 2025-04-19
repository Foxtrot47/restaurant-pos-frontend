import type { Order } from "../data/orders";

const getStatusColor = (status: string) => {
  switch (status) {
    case "Completed":
      return "bg-green-100 text-green-600";
    case "Preparing":
      return "bg-blue-100 text-blue-600";
    case "Pending":
      return "bg-yellow-100 text-yellow-600";
    case "Cancelled":
      return "bg-red-100 text-red-600";
    default:
      return "bg-gray-100 text-gray-600";
  }
};

export default function OrderDetailSmallCard({ order }: { order: Order }) {
  return (
    <div className="order-card bg-white border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer">
      <div className="flex justify-between items-start mb-2">
        <div>
          <div className={`rounded-md w-8 h-8 flex items-center justify-center font-medium mb-2 ${getStatusColor(order.status)}`}>
             B1
          </div>
          <h4 className="font-semibold">{order.customerName}</h4>
          <p className="text-xs text-gray-500">#{order.id}</p>
        </div>
        <div className="text-right">
          <p className="text-xs text-gray-500">{order.dateTime}</p>
        </div>
      </div>

      <div className="mt-2">
        <p className="text-sm font-medium">
          {order.items?.length || 2} items • ${order.total || "45.50"}
        </p>
        <p className="text-xs text-gray-500 mt-1 max-w-96">
          {order.items?.map(item => item.name).join(", ") || "Caesar Salad, Iced Tea"}
        </p>
      </div>

      <div className="mt-3 flex gap-2">
        <button 
          className="flex-1 border border-gray-300 rounded-md py-1 text-xs font-medium"
          onClick={(e) => {
            e.stopPropagation();
            // View details logic if needed
          }}
        >
          Cancel
        </button>
        {order.status === "Pending" && (
          <button 
            className="flex-1 bg-orange-400 text-white rounded-md py-1 text-xs font-medium"
            onClick={(e) => {
              e.stopPropagation();
              // Accept order logic
            }}
          >
            Accept
          </button>
        )}
        {order.status === "Preparing" && (
          <button 
            className="flex-1 bg-blue-400 text-white rounded-md py-1 text-xs font-medium"
            onClick={(e) => {
              e.stopPropagation();
              // Prepare order logic
            }}
          >
            Complete
          </button>
        )}
      </div>
    </div>
  );
}