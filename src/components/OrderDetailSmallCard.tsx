import type { Order } from "../data/orders";

const getStatusColor = (status: string) => {
  switch (status) {
    case "Accepted":
      return "bg-green-100 text-green-600";
    case "Completed":
      return "bg-blue-100 text-blue-600";
    case "Pending":
      return "bg-yellow-100 text-yellow-600";
    case "Cancelled":
      return "bg-red-100 text-red-600";
    default:
      return "bg-gray-100 text-gray-600";
  }
}

export default function OrderDetailSmallCard({ order }: { order: Order }) {
  return (
    <div className="bg-white border rounded-lg overflow-hidden">
      <div className="p-4">
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center gap-3">
            <div className="bg-orange-200 rounded-md w-8 h-8 flex items-center justify-center text-orange-600 font-medium">
              A4
            </div>
            <div>
              <h3 className="font-semibold">Ariel Hikmat</h3>
              <p className="text-xs text-gray-500">Order #{order.id}</p>
            </div>
          </div>
          <div className={`px-2 py-1 rounded-md text-xs ${getStatusColor(order.status)}`}>
            {order.status}
          </div>
        </div>
        <p className="text-xs text-gray-500 mb-2">{order.dateTime}</p>
        <p className="text-xs text-gray-500 text-right">{order.dateTime}</p>
      </div>

      <div className="px-4 pb-4">
        <div className="flex justify-between text-xs text-gray-500 mb-2">
          <span className="w-1/2">Items</span>
          <span className="w-1/4 text-center">Qty</span>
          <span className="w-1/4 text-right">Price</span>
        </div>

        <div className="space-y-2">
          {order.items.map((orderItem) => (
            <div className="flex justify-between items-center text-sm">
              <span className="w-1/2">{orderItem.name}</span>
              <span className="w-1/4 text-center">{orderItem.quantity}</span>
              <span className="w-1/4 text-right">${orderItem.price}</span>
            </div>
          ))}
        </div>

        <div className="mt-3 pb-3 border-b">
          <div className="flex justify-between items-center">
            <span className="font-semibold">Total</span>
            <span className="font-semibold">${order.total}</span>
          </div>
        </div>

        <div className="mt-3 flex gap-2">
          <button className="flex-1 border border-gray-300 rounded-md py-2 text-sm font-medium">
            See Details
          </button>
          <button className="flex-1 bg-orange-400 text-white rounded-md py-2 text-sm font-medium">
            Pay Bills
          </button>
        </div>
      </div>
    </div>
  );
}
