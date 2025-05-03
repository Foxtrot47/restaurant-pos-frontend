import { useState } from "react";
import { Search, Plus, X } from "lucide-react";
import OrderDetailSmallCard from "../components/OrderDetailSmallCard";
import { dummyOrders, type Order, type OrderStatus } from "../data/orders";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetClose } from "@/components/ui/sheet";

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
    const status = order.status as OrderStatus;
    if (ordersByStatus[status]) {
      ordersByStatus[status].push(order);
    }
  });

  // Common statuses
  const statuses = ["Pending", "Preparing", "Completed", "Cancelled"];

  const openOrderDetails = (order: Order) => {
    setSelectedOrder(order);
    setDetailsOpen(true);
  };

  const getStatusColor = (status: string) => {
    const statusColors = {
      "Completed": "bg-blue-50 text-blue-600 border-blue-200",
      "Preparing": "bg-blue-100 text-blue-600 border-blue-200",
      "Pending": "bg-gray-100 text-gray-700 border-gray-200",
      "Cancelled": "bg-gray-200 text-gray-700 border-gray-300",
    };
    
    return statusColors[status as keyof typeof statusColors] || "bg-gray-100 text-gray-600 border-gray-200";
  };

  return (
    <div className="flex h-[calc(100vh-4rem)] overflow-hidden">
      {/* Orders section */}
      <div className="flex-1">
        <div className="p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Orders</h2>

            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              <Plus className="mr-2 h-4 w-4" />
              New Order
            </Button>
          </div>

          <div className="mb-4 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input 
              className="pl-10" 
              placeholder="Search by name, order or etc" 
            />
          </div>
        </div>

        {/* Kanban board layout */}
        <div className="flex gap-4 px-4 pb-4 overflow-x-auto">
          {statuses.map((status) => (
            <div
              key={status}
              className="flex-shrink-0"
            >
              <div className="bg-gray-50 rounded-lg p-3 h-full">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-medium text-sm">{status}</h3>
                  <Badge variant="outline" className="bg-gray-100">
                    {ordersByStatus[status as OrderStatus]?.length || 0}
                  </Badge>
                </div>

                <ScrollArea className="h-[calc(100vh-12rem)]">
                  <div className="space-y-3 pr-4">
                    {ordersByStatus[status as OrderStatus].map((order) => (
                      <div key={order.id} onClick={() => openOrderDetails(order)}>
                        <OrderDetailSmallCard order={order} />
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Order details side panel */}
      <Sheet open={detailsOpen} onOpenChange={setDetailsOpen}>
        <SheetContent className="w-[400px] sm:w-[540px] p-0 overflow-y-auto">
          {selectedOrder && (
            <>
              <SheetHeader className="p-4 border-b sticky top-0 bg-white">
                <div className="flex justify-between items-center">
                  <SheetTitle>Order Details</SheetTitle>
                  <SheetClose asChild>
                  </SheetClose>
                </div>
              </SheetHeader>

              <div className="p-6">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="font-medium text-lg mb-1">
                      Recipient: {selectedOrder.customerName}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-1">
                      {selectedOrder.dateTime}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      #{selectedOrder.id}
                    </p>
                  </div>
                  <Badge className={getStatusColor(selectedOrder.status)}>
                    {selectedOrder.status}
                  </Badge>
                </div>

                <div className="space-y-4 mt-6">
                  {selectedOrder.items?.map((item, index) => (
                    <div key={index} className="flex gap-4">
                      <div className="w-16 h-16 bg-gray-100 rounded-md overflow-hidden flex items-center justify-center">
                        <img
                          src={`https://source.unsplash.com/100x100/?food,${item.name
                            .toLowerCase()
                            .replace(/\s/g, "")}`}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium">{item.name}</h4>
                        <p className="text-xs text-muted-foreground">
                          Category: {item.category}
                        </p>
                        {item.notes && (
                          <p className="text-xs text-muted-foreground">
                            Note: {item.notes}
                          </p>
                        )}
                        <p className="font-medium mt-1">
                          {item.quantity > 1 ? `${item.quantity}× ` : ""}$
                          {item.price.toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8">
                  <div className="flex justify-between text-sm mb-2">
                    <span>Items ({selectedOrder.items?.length || 0})</span>
                    <span>${selectedOrder.subtotal?.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm mb-4">
                    <span>Tax (10%)</span>
                    <span>${selectedOrder.tax?.toFixed(2)}</span>
                  </div>
                  <Separator className="my-4" />
                  <div className="flex justify-between font-medium text-lg">
                    <span>Total</span>
                    <span>
                      $
                      {selectedOrder.grandTotal?.toFixed(2) ||
                        selectedOrder.total.toFixed(2)}
                    </span>
                  </div>
                </div>

                <div className="mt-8 flex gap-2">
                  <Button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white">
                    Print Bill
                  </Button>
                  <Button variant="outline" size="icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
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
                  </Button>
                </div>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}