import { useState } from "react";
import { 
  Card, 
  CardContent
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Search, Eye } from "lucide-react";

// Sample data
const orders = [
  { 
    id: "ORD-001", 
    date: new Date("2025-05-18T12:30:00"), 
    table: "Table 3", 
    type: "Dine In", 
    status: "Served", 
    amount: 45.99, 
    staff: "Sarah" 
  },
  { 
    id: "ORD-002", 
    date: new Date("2025-05-18T13:15:00"), 
    table: "Table 1", 
    type: "Dine In", 
    status: "Preparing", 
    amount: 32.50, 
    staff: "Mike" 
  },
  { 
    id: "ORD-003", 
    date: new Date("2025-05-18T12:45:00"), 
    type: "Takeaway", 
    status: "Paid", 
    amount: 24.99, 
    staff: "John" 
  },
  { 
    id: "ORD-004", 
    date: new Date("2025-05-18T11:20:00"), 
    type: "HungerStation", 
    status: "Paid", 
    amount: 37.75, 
    staff: "Sarah" 
  },
  { 
    id: "ORD-005", 
    date: new Date("2025-05-17T19:30:00"), 
    table: "Table 5", 
    type: "Dine In", 
    status: "Paid", 
    amount: 89.50, 
    staff: "Mike" 
  },
];

// Sample order details
const sampleOrderDetail = {
  id: "ORD-002",
  date: new Date("2025-05-18T13:15:00"),
  table: "Table 1",
  type: "Dine In",
  status: "Preparing",
  amount: 32.50,
  staff: "Mike",
  items: [
    { name: "Caesar Salad", quantity: 1, price: 8.99, modifiers: [] },
    { name: "Grilled Chicken", quantity: 1, price: 16.99, modifiers: ["No Spice"] },
    { name: "Fresh Orange Juice", quantity: 1, price: 4.99, modifiers: ["Large Size +$1.50"] }
  ],
  specialInstructions: "Allergic to nuts",
  subtotal: 30.97,
  tax: 1.53,
  total: 32.50,
  paymentMethod: "Pending",
  timestamps: {
    placed: "2025-05-18 13:15:00",
    prepared: null,
    paid: null
  }
};

export default function OrderManagement() {
  const [selectedBranch, setSelectedBranch] = useState("main");
  const [orderView, setOrderView] = useState("running"); // "running" or "history"
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterType, setFilterType] = useState("all");
  const [date, setDate] = useState(new Date());
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showOrderDetail, setShowOrderDetail] = useState(false);

  const filteredOrders = orders.filter(order => {
    // Filter by search query
    const matchesSearch = order.id.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          (order.table && order.table.toLowerCase().includes(searchQuery.toLowerCase()));
    
    // Filter by status
    const matchesStatus = filterStatus === "all" || order.status === filterStatus;
    
    // Filter by type
    const matchesType = filterType === "all" || order.type === filterType;
    
    // Filter by view (running or history)
    const matchesView = (orderView === "running" && (order.status !== "Paid" && order.status !== "Cancelled")) ||
                        (orderView === "history" && (order.status === "Paid" || order.status === "Cancelled"));
    
    return matchesSearch && matchesStatus && matchesType && matchesView;
  });

  const viewOrderDetails = (order) => {
    setSelectedOrder(order);
    setShowOrderDetail(true);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
        <h1 className="text-4xl font-bold mb-4 sm:mb-0">Order Management</h1>
        
        <Select value={selectedBranch} onValueChange={setSelectedBranch}>
          <SelectTrigger className="w-[240px] text-xl h-14">
            <SelectValue placeholder="Select Branch" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="main" className="text-xl">Main Branch</SelectItem>
            <SelectItem value="downtown" className="text-xl">Downtown Branch</SelectItem>
            <SelectItem value="mall" className="text-xl">Mall Branch</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Order View Toggle */}
      <div className="flex mb-6">
        <Button 
          onClick={() => setOrderView("running")} 
          variant={orderView === "running" ? "default" : "outline"}
          className="text-xl rounded-r-none px-8 py-6"
        >
          Running Orders
        </Button>
        <Button 
          onClick={() => setOrderView("history")} 
          variant={orderView === "history" ? "default" : "outline"}
          className="text-xl rounded-l-none px-8 py-6"
        >
          Order History
        </Button>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-6 w-6" />
          <Input
            type="text"
            placeholder="Search by Order ID, Table..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-12 text-xl h-14"
          />
        </div>
        
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="text-xl h-14">
            <SelectValue placeholder="Filter by Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all" className="text-xl">All Statuses</SelectItem>
            <SelectItem value="Pending" className="text-xl">Pending</SelectItem>
            <SelectItem value="Preparing" className="text-xl">Preparing</SelectItem>
            <SelectItem value="Ready" className="text-xl">Ready</SelectItem>
            <SelectItem value="Served" className="text-xl">Served</SelectItem>
            <SelectItem value="Paid" className="text-xl">Paid</SelectItem>
            <SelectItem value="Cancelled" className="text-xl">Cancelled</SelectItem>
          </SelectContent>
        </Select>
        
        <Select value={filterType} onValueChange={setFilterType}>
          <SelectTrigger className="text-xl h-14">
            <SelectValue placeholder="Filter by Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all" className="text-xl">All Types</SelectItem>
            <SelectItem value="Dine In" className="text-xl">Dine In</SelectItem>
            <SelectItem value="Takeaway" className="text-xl">Takeaway</SelectItem>
            <SelectItem value="HungerStation" className="text-xl">HungerStation</SelectItem>
            <SelectItem value="Jahez" className="text-xl">Jahez</SelectItem>
            <SelectItem value="Keeta" className="text-xl">Keeta</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Date Picker */}
      <div className="mb-6">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="text-xl h-14">
              <CalendarIcon className="mr-2 h-6 w-6" />
              {format(date, "PPP")}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              initialFocus
              className="text-xl"
            />
          </PopoverContent>
        </Popover>
      </div>

      {/* Orders Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-xl">Order ID</TableHead>
                <TableHead className="text-xl">Date/Time</TableHead>
                <TableHead className="text-xl">Table/Type</TableHead>
                <TableHead className="text-xl">Status</TableHead>
                <TableHead className="text-xl">Amount</TableHead>
                <TableHead className="text-xl">Staff</TableHead>
                <TableHead className="text-xl">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="text-xl font-medium">{order.id}</TableCell>
                  <TableCell className="text-xl">{format(order.date, "MMM d, h:mm a")}</TableCell>
                  <TableCell className="text-xl">{order.table || order.type}</TableCell>
                  <TableCell>
                    <span 
                      className={`text-xl px-3 py-1 rounded-full ${
                        order.status === "Paid" ? "bg-green-100 text-green-800" : 
                        order.status === "Cancelled" ? "bg-red-100 text-red-800" :
                        order.status === "Preparing" ? "bg-yellow-100 text-yellow-800" :
                        order.status === "Ready" ? "bg-blue-100 text-blue-800" :
                        order.status === "Served" ? "bg-purple-100 text-purple-800" :
                        "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {order.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-xl">${order.amount.toFixed(2)}</TableCell>
                  <TableCell className="text-xl">{order.staff}</TableCell>
                  <TableCell>
                    <Button variant="outline" size="icon" onClick={() => viewOrderDetails(order)}>
                      <Eye className="h-6 w-6" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Order Detail Dialog */}
      <Dialog open={showOrderDetail} onOpenChange={setShowOrderDetail}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle className="text-2xl">Order Details</DialogTitle>
          </DialogHeader>
          <div className="mt-4 space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-lg text-gray-500">Order ID</p>
                <p className="text-xl font-medium">{sampleOrderDetail.id}</p>
              </div>
              <div>
                <p className="text-lg text-gray-500">Date/Time</p>
                <p className="text-xl">{format(sampleOrderDetail.date, "MMM d, h:mm a")}</p>
              </div>
              <div>
                <p className="text-lg text-gray-500">Table/Type</p>
                <p className="text-xl">{sampleOrderDetail.table || sampleOrderDetail.type}</p>
              </div>
              <div>
                <p className="text-lg text-gray-500">Status</p>
                <span 
                  className={`text-xl px-3 py-1 rounded-full ${
                    sampleOrderDetail.status === "Paid" ? "bg-green-100 text-green-800" : 
                    sampleOrderDetail.status === "Cancelled" ? "bg-red-100 text-red-800" :
                    sampleOrderDetail.status === "Preparing" ? "bg-yellow-100 text-yellow-800" :
                    "bg-gray-100 text-gray-800"
                  }`}
                >
                  {sampleOrderDetail.status}
                </span>
              </div>
              <div>
                <p className="text-lg text-gray-500">Staff</p>
                <p className="text-xl">{sampleOrderDetail.staff}</p>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-2">Order Items</h3>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-lg">Item</TableHead>
                    <TableHead className="text-lg">Qty</TableHead>
                    <TableHead className="text-lg">Price</TableHead>
                    <TableHead className="text-lg">Total</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sampleOrderDetail.items.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <div>
                          <p className="text-lg font-medium">{item.name}</p>
                          {item.modifiers.map((mod, i) => (
                            <p key={i} className="text-gray-500 text-sm">{mod}</p>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell className="text-lg">{item.quantity}</TableCell>
                      <TableCell className="text-lg">${item.price.toFixed(2)}</TableCell>
                      <TableCell className="text-lg">${(item.quantity * item.price).toFixed(2)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {sampleOrderDetail.specialInstructions && (
              <div>
                <h3 className="text-xl font-semibold mb-2">Special Instructions</h3>
                <p className="text-lg bg-gray-50 p-3 rounded">{sampleOrderDetail.specialInstructions}</p>
              </div>
            )}

            <div className="space-y-2">
              <div className="flex justify-between">
                <p className="text-lg">Subtotal</p>
                <p className="text-lg">${sampleOrderDetail.subtotal.toFixed(2)}</p>
              </div>
              <div className="flex justify-between">
                <p className="text-lg">Tax</p>
                <p className="text-lg">${sampleOrderDetail.tax.toFixed(2)}</p>
              </div>
              <div className="flex justify-between font-bold">
                <p className="text-xl">Total</p>
                <p className="text-xl">${sampleOrderDetail.total.toFixed(2)}</p>
              </div>
              <div className="flex justify-between">
                <p className="text-lg">Payment Method</p>
                <p className="text-lg">{sampleOrderDetail.paymentMethod}</p>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-semibold mb-2">Timestamps</h3>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <p className="text-lg text-gray-500">Order Placed</p>
                  <p className="text-lg">{sampleOrderDetail.timestamps.placed}</p>
                </div>
                <div>
                  <p className="text-lg text-gray-500">Prepared</p>
                  <p className="text-lg">{sampleOrderDetail.timestamps.prepared || "-"}</p>
                </div>
                <div>
                  <p className="text-lg text-gray-500">Paid</p>
                  <p className="text-lg">{sampleOrderDetail.timestamps.paid || "-"}</p>
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <Button 
                onClick={() => setShowOrderDetail(false)}
                className="text-lg"
              >
                Close
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}