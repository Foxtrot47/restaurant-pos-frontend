import { useEffect, useState } from "react";
import { FaSearch, FaPlus } from "react-icons/fa";
import OrderDetailSmallCard from "../components/OrderDetailSmallCard";
import { dummyOrders, type Order, type OrderStatus } from "../data/orders";

export default function OrdersPage() {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);

  // Properly type the ordersByStatus object
  const ordersByStatus: Record<OrderStatus, Order[]> = {
    Pending: [],
    Preparing: [],
    Completed: [],
    Cancelled: [],
  };

  // Fill the ordersByStatus object
  dummyOrders.forEach((order) => {
    // Type assertion to ensure the status is valid
    const status = order.status as OrderStatus;
    if (ordersByStatus[status]) {
      ordersByStatus[status].push(order);
    }
  });

  // Common statuses - you may want to derive this from your actual data
  const statuses = ["Pending", "Preparing", "Completed", "Cancelled"];

  const openOrderDetails = (order: Order) => {
    setSelectedOrder(order);
    setDetailsOpen(true);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* orders */}
      <div>
        <div className="p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Orders</h2>

            <button className="bg-orange-400 text-white px-4 py-2 rounded-md flex items-center gap-2">
              <FaPlus className="font-light" />
              New Order
            </button>
          </div>

          <div className="flex items-center gap-2 mb-4">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="text-neutral-500" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-neutral-300 rounded-md leading-5 bg-white placeholder-neutral-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Search by name, order or etc"
              />
            </div>
          </div>
        </div>

        {/* Kanban board layout */}
        <div className="px-4 pb-4 flex gap-4 w-full">
          {statuses.map((status) => (
            <div
              key={status}
              className="flex flex-col max-h-full overflow-y-auto"
              style={{ height: "calc(100vh - 200px)" }}
            >
              <div className="bg-neutral-100 rounded-lg p-3">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold">{status}</h3>
                  <span className="bg-neutral-200 text-neutral-700 text-xs py-1 px-2 rounded-full">
                    {ordersByStatus[status as OrderStatus]?.length || 0}
                  </span>
                </div>

                {/* Each column has its own scrollable area */}
                <div className="space-y-3 overflow-y-auto flex-grow pr-1">
                  {ordersByStatus[status as OrderStatus].map((order) => (
                    <div key={order.id} onClick={() => openOrderDetails(order)}>
                      <OrderDetailSmallCard order={order} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Sliding order details panel */}
      <div
        className={`fixed top-0 right-0 w-1/3 h-full bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
          detailsOpen ? "translate-x-0" : "translate-x-full"
        } overflow-y-auto z-10`}
      >
        {selectedOrder && (
          <>
            <div className="p-4 border-b sticky top-0 bg-white z-20">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold">Order Details</h2>
                <button
                  onClick={() => setDetailsOpen(false)}
                  className="p-2 rounded-full hover:bg-neutral-100"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>

            <div className="p-4">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-semibold mb-1">
                    Recipient: {selectedOrder.customerName}
                  </h3>
                  <p className="text-sm text-neutral-500 mb-1">
                    {selectedOrder.dateTime}
                  </p>
                  <p className="text-sm text-neutral-500">
                    #{selectedOrder.id}
                  </p>
                </div>
                <div
                  className={`flex items-center px-3 py-1 rounded-full text-sm ${
                    selectedOrder.status === "Completed"
                      ? "bg-green-100 text-green-600"
                      : selectedOrder.status === "Pending"
                      ? "bg-yellow-100 text-yellow-600"
                      : selectedOrder.status === "Cancelled"
                      ? "bg-red-100 text-red-600"
                      : "bg-blue-100 text-blue-600"
                  }`}
                >
                  <span className="h-2 w-2 bg-current rounded-full mr-2"></span>
                  {selectedOrder.status}
                </div>
              </div>

              <div className="space-y-4 mt-6">
                {selectedOrder.items?.map((item, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="w-16 h-16 bg-neutral-100 rounded-md overflow-hidden flex items-center justify-center">
                      <img
                        src={`https://source.unsplash.com/100x100/?food,${item.name
                          .toLowerCase()
                          .replace(/\s/g, "")}`}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold">{item.name}</h4>
                      <p className="text-xs text-neutral-500">
                        Category: {item.category}
                      </p>
                      {item.notes && (
                        <p className="text-xs text-neutral-500">
                          Note: {item.notes}
                        </p>
                      )}
                      <p className="font-semibold mt-1">
                        {item.quantity > 1 ? `${item.quantity}× ` : ""}$
                        {item.price.toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6">
                <div className="flex justify-between text-sm mb-2">
                  <span>Items ({selectedOrder.items?.length || 0})</span>
                  <span>${selectedOrder.subtotal?.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm mb-4">
                  <span>Tax (10%)</span>
                  <span>${selectedOrder.tax?.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-semibold text-lg border-t pt-4">
                  <span>Total</span>
                  <span>
                    $
                    {selectedOrder.grandTotal?.toFixed(2) ||
                      selectedOrder.total.toFixed(2)}
                  </span>
                </div>
              </div>

              <div className="mt-6 flex gap-2">
                <button className="flex-1 bg-orange-400 text-white rounded-md py-3 font-medium">
                  Print Bill
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
        )}
      </div>

      {/* Overlay when modal is open */}
      {detailsOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-0"
          onClick={() => setDetailsOpen(false)}
        ></div>
      )}
    </div>
  );
}
