import { useState, useEffect } from "react";
import {
  Search,
  Calendar,
  Filter,
  Download,
  MoreHorizontal,
  ArrowUpDown,
} from "lucide-react";
import { dummyOrders, type Order, type OrderStatus } from "../data/orders";

// Import shadcn components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { DatePicker } from "@/components/ui/date-picker";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function PastOrdersPage() {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<OrderStatus | "All">("All");
  const [dateRange, setDateRange] = useState({
    startDate: "",
    endDate: "",
  });
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentView, setCurrentView] = useState<"table" | "grid">("table");
  const ordersPerPage = 8;

  // Get past orders (sorted by date, newest first)
  const pastOrders = [...dummyOrders].sort((a, b) => {
    return new Date(b.dateTime).getTime() - new Date(a.dateTime).getTime();
  });

  // Apply filters whenever search query, status filter, or date range changes
  useEffect(() => {
    let orders = pastOrders;

    // Apply search query filter
    if (searchQuery) {
      orders = orders.filter(
        (order) =>
          order.customerName
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          order.id.toString().includes(searchQuery) ||
          order.items.some((item) =>
            item.name.toLowerCase().includes(searchQuery.toLowerCase())
          )
      );
    }

    // Apply status filter
    if (statusFilter !== "All") {
      orders = orders.filter((order) => order.status === statusFilter);
    }

    // Apply date range filter
    if (dateRange.startDate) {
      const startDate = new Date(dateRange.startDate);
      orders = orders.filter((order) => new Date(order.dateTime) >= startDate);
    }

    if (dateRange.endDate) {
      const endDate = new Date(dateRange.endDate);
      endDate.setHours(23, 59, 59);
      orders = orders.filter((order) => new Date(order.dateTime) <= endDate);
    }

    setFilteredOrders(orders);
    setCurrentPage(1); // Reset to first page when filters change
  }, [searchQuery, statusFilter, dateRange]);

  // Pagination
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = filteredOrders.slice(
    indexOfFirstOrder,
    indexOfLastOrder
  );
  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);

  // Format date for display
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);

      // Check if date is valid
      if (isNaN(date.getTime())) {
        return "Invalid date";
      }

      return new Intl.DateTimeFormat("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }).format(date);
    } catch (error) {
      return "Invalid date";
    }
  };

  // Get status badge variant
  const getStatusBadge = (status: OrderStatus) => {
    switch (status) {
      case "Completed":
        return <Badge variant="success">{status}</Badge>;
      case "Pending":
        return <Badge variant="warning">{status}</Badge>;
      case "Preparing":
        return <Badge variant="default">{status}</Badge>;
      case "Cancelled":
        return <Badge variant="destructive">{status}</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const openOrderDetails = (order: Order) => {
    setSelectedOrder(order);
    setDetailsOpen(true);
  };

  return (
    <div className="mx-auto container p-4 space-y-6">
      <div className="flex flex-col space-y-2">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold tracking-tight">Order History</h1>
          <Tabs
            defaultValue="table"
            value={currentView}
            onValueChange={(v) => setCurrentView(v as "table" | "grid")}
            className="w-auto"
          >
            <TabsList>
              <TabsTrigger value="table">Table</TabsTrigger>
              <TabsTrigger value="grid">Grid</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        <p className="text-muted-foreground">View and manage all past orders</p>
      </div>

      <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4 md:items-end">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by name, order ID, or items..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              <span>Filters</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80 p-4" align="end">
            <div className="space-y-4">
              <h4 className="font-medium">Filter Orders</h4>
              <div className="space-y-2">
                <label className="text-sm font-medium">Status</label>
                <Select
                  value={statusFilter}
                  onValueChange={(value) =>
                    setStatusFilter(value as OrderStatus | "All")
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All">All Statuses</SelectItem>
                    <SelectItem value="Pending">Pending</SelectItem>
                    <SelectItem value="Preparing">Preparing</SelectItem>
                    <SelectItem value="Completed">Completed</SelectItem>
                    <SelectItem value="Cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Date Range</label>
                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-1">
                    <label className="text-xs text-muted-foreground">
                      From
                    </label>
                    <DatePicker
                      value={
                        dateRange.startDate
                          ? new Date(dateRange.startDate)
                          : undefined
                      }
                      onChange={(date) =>
                        setDateRange({
                          ...dateRange,
                          startDate: date?.toISOString() || "",
                        })
                      }
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs text-muted-foreground">To</label>
                    <DatePicker
                      value={
                        dateRange.endDate
                          ? new Date(dateRange.endDate)
                          : undefined
                      }
                      onChange={(date) =>
                        setDateRange({
                          ...dateRange,
                          endDate: date?.toISOString() || "",
                        })
                      }
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-between pt-2">
                <Button
                  variant="ghost"
                  onClick={() => {
                    setSearchQuery("");
                    setStatusFilter("All");
                    setDateRange({ startDate: "", endDate: "" });
                  }}
                >
                  Reset
                </Button>
                <Button>Apply Filters</Button>
              </div>
            </div>
          </PopoverContent>
        </Popover>

        <Button variant="outline" className="flex items-center gap-2">
          <Download className="h-4 w-4" />
          <span>Export</span>
        </Button>
      </div>

      <Tabs defaultValue="table">
        <TabsContent value="table" className="mt-0">
          <Card>
            <CardHeader className="p-4">
              <CardDescription>
                Showing {currentOrders.length} of {filteredOrders.length} orders
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[80px]">
                        <div className="flex items-center gap-1">
                          ID <ArrowUpDown className="h-3 w-3" />
                        </div>
                      </TableHead>
                      <TableHead>
                        <div className="flex items-center gap-1">
                          Customer <ArrowUpDown className="h-3 w-3" />
                        </div>
                      </TableHead>
                      <TableHead>
                        <div className="flex items-center gap-1">
                          Date <ArrowUpDown className="h-3 w-3" />
                        </div>
                      </TableHead>
                      <TableHead>Items</TableHead>
                      <TableHead>
                        <div className="flex items-center gap-1">
                          Total <ArrowUpDown className="h-3 w-3" />
                        </div>
                      </TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {currentOrders.length > 0 ? (
                      currentOrders.map((order) => (
                        <TableRow
                          key={order.id}
                          className="cursor-pointer hover:bg-muted/50"
                          onClick={() => openOrderDetails(order)}
                        >
                          <TableCell className="font-medium">
                            #{order.id}
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Avatar className="h-8 w-8">
                                <AvatarFallback>
                                  {order.customerName.charAt(0)}
                                </AvatarFallback>
                              </Avatar>
                              <span>{order.customerName}</span>
                            </div>
                          </TableCell>
                          <TableCell>{formatDate(order.dateTime)}</TableCell>
                          <TableCell>
                            <span className="font-medium">
                              {order.items.length}
                            </span>
                            <span className="text-muted-foreground ml-1">
                              items
                            </span>
                            <p className="text-xs text-muted-foreground truncate max-w-[200px]">
                              {order.items.map((item) => item.name).join(", ")}
                            </p>
                          </TableCell>
                          <TableCell className="font-medium">
                            $
                            {order.grandTotal?.toFixed(2) ||
                              order.total.toFixed(2)}
                          </TableCell>
                          <TableCell>{getStatusBadge(order.status)}</TableCell>
                          <TableCell className="text-right">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={(e) => {
                                e.stopPropagation();
                                openOrderDetails(order);
                              }}
                            >
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={7} className="h-24 text-center">
                          No orders found matching your criteria.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
            <CardFooter className="flex items-center justify-between p-4">
              <div className="text-sm text-muted-foreground">
                Page {currentPage} of {Math.max(1, totalPages)}
              </div>
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={currentPage === 1}
                >
                  Previous
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  disabled={currentPage === totalPages || totalPages === 0}
                >
                  Next
                </Button>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="grid" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {currentOrders.length > 0 ? (
              currentOrders.map((order) => (
                <Card
                  key={order.id}
                  className="cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => openOrderDetails(order)}
                >
                  <CardHeader className="p-4 pb-2 space-y-2">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>
                            {order.customerName.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{order.customerName}</p>
                          <p className="text-xs text-muted-foreground">
                            #{order.id}
                          </p>
                        </div>
                      </div>
                      {getStatusBadge(order.status)}
                    </div>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <div className="text-sm text-muted-foreground">
                      {formatDate(order.dateTime)}
                    </div>
                    <div className="mt-2">
                      <p className="text-sm font-medium">Items:</p>
                      <ul className="text-sm text-muted-foreground">
                        {order.items.slice(0, 2).map((item, i) => (
                          <li key={i} className="truncate">
                            {item.quantity}× {item.name}
                          </li>
                        ))}
                        {order.items.length > 2 && (
                          <li className="text-xs">
                            +{order.items.length - 2} more items
                          </li>
                        )}
                      </ul>
                    </div>
                  </CardContent>
                  <CardFooter className="p-4 pt-0 flex justify-between">
                    <span className="font-medium">Total:</span>
                    <span className="font-bold">
                      ${order.grandTotal?.toFixed(2) || order.total.toFixed(2)}
                    </span>
                  </CardFooter>
                </Card>
              ))
            ) : (
              <div className="col-span-full text-center py-8 text-muted-foreground">
                No orders found matching your criteria.
              </div>
            )}
          </div>

          <div className="mt-4 flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              Page {currentPage} of {Math.max(1, totalPages)}
            </div>
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages || totalPages === 0}
              >
                Next
              </Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {/* Order details sheet */}
      <Sheet
        open={detailsOpen}
        onOpenChange={(open) => {
          setDetailsOpen(open);
          if (!open) setSelectedOrder(null);
        }}
      >
        <SheetContent className="sm:max-w-md">
          <SheetHeader>
            <SheetTitle>Order Details</SheetTitle>
            <SheetDescription>
              {selectedOrder && `Order #${selectedOrder.id}`}
            </SheetDescription>
          </SheetHeader>

          {selectedOrder && (
            <ScrollArea className="h-[calc(100vh-8rem)]">
              <div className="py-6 space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground mb-1">
                      Customer
                    </h4>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback>
                          {selectedOrder.customerName.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <p className="font-medium">
                        {selectedOrder.customerName}
                      </p>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground mb-1">
                      Date & Time
                    </h4>
                    <p>{formatDate(selectedOrder.dateTime)}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground mb-1">
                      Status
                    </h4>
                    {getStatusBadge(selectedOrder.status)}
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground mb-1">
                      Total
                    </h4>
                    <p className="font-bold">
                      $
                      {selectedOrder.grandTotal?.toFixed(2) ||
                        selectedOrder.total.toFixed(2)}
                    </p>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="font-semibold text-lg mb-4">Order Items</h3>
                  <div className="space-y-4">
                    {selectedOrder.items?.map((item, index) => (
                      <div key={index} className="flex gap-4">
                        <div className="w-16 h-16 bg-muted rounded-md overflow-hidden flex items-center justify-center">
                          <img
                            src={`https://source.unsplash.com/100x100/?food,${item.name
                              .toLowerCase()
                              .replace(/\s/g, "")}`}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between">
                            <h4 className="font-semibold">{item.name}</h4>
                            <p className="font-semibold">
                              ${item.price.toFixed(2)}
                            </p>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Category: {item.category}
                          </p>
                          {item.notes && (
                            <p className="text-sm text-muted-foreground italic">
                              "{item.notes}"
                            </p>
                          )}
                          <p className="text-sm">Quantity: {item.quantity}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                <div className="bg-muted/50 p-4 rounded-lg">
                  <div className="flex justify-between text-sm mb-2">
                    <span>Subtotal</span>
                    <span>${selectedOrder.subtotal?.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm mb-4">
                    <span>Tax (10%)</span>
                    <span>${selectedOrder.tax?.toFixed(2)}</span>
                  </div>
                  <Separator className="my-2" />
                  <div className="flex justify-between font-bold">
                    <span>Total</span>
                    <span>
                      $
                      {selectedOrder.grandTotal?.toFixed(2) ||
                        selectedOrder.total.toFixed(2)}
                    </span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button className="flex-1">Print Receipt</Button>
                  <Button variant="outline">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </ScrollArea>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}
