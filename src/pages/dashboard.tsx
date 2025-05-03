// DashboardPage.tsx
import { useState } from "react";
import { 
  TrendingUp, 
  Users, 
  DollarSign, 
  Calendar, 
  Clock, 
  Utensils, 
  Bell, 
  ChevronRight,
  ShoppingBag,
  FileText,
  Star,
  ArrowUpRight,
  MoreHorizontal,
  Plus,
  CalendarDays,
  Timer
} from "lucide-react";
import { 
  Card, 
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";

export default function DashboardPage() {
  const [selectedTab, setSelectedTab] = useState("overview");
  
  return (
    <div className="flex-1 overflow-hidden flex flex-col h-[calc(100vh-4rem)]">
      {/* Dashboard Header */}
      <div className="p-4 border-b">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-2xl font-bold">Dashboard</h2>
            <p className="text-sm text-gray-500">Welcome back, John. Here's what's happening today.</p>
          </div>
          
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="bg-blue-50 text-blue-600">
              <Clock className="h-3 w-3 mr-1" />
              Saturday, May 3, 2025
            </Badge>
            <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
              <Plus className="h-4 w-4 mr-2" /> 
              Quick Actions
            </Button>
          </div>
        </div>
        
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="sales">Sales</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="tables">Tables</TabsTrigger>
          </TabsList>
          <div className="flex-1 overflow-auto px-4 py-4">
        <TabsContent value="overview" className="m-0">
          {/* Summary Stats */}
          <div className="grid grid-cols-4 gap-4 mb-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Today's Revenue</p>
                    <h3 className="text-2xl font-bold">$4,285</h3>
                    <p className="text-xs text-blue-600 flex items-center mt-1">
                      <TrendingUp className="h-3 w-3 mr-1" /> 
                      +12.5% from yesterday
                    </p>
                  </div>
                  <div className="bg-blue-100 p-3 rounded-full">
                    <DollarSign className="h-5 w-5 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Active Orders</p>
                    <h3 className="text-2xl font-bold">24</h3>
                    <p className="text-xs text-blue-600 flex items-center mt-1">
                      <TrendingUp className="h-3 w-3 mr-1" /> 
                      8 more than usual
                    </p>
                  </div>
                  <div className="bg-blue-100 p-3 rounded-full">
                    <FileText className="h-5 w-5 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Table Occupancy</p>
                    <h3 className="text-2xl font-bold">68%</h3>
                    <p className="text-xs text-blue-600 flex items-center mt-1">
                      <TrendingUp className="h-3 w-3 mr-1" /> 
                      12 tables occupied
                    </p>
                  </div>
                  <div className="bg-blue-100 p-3 rounded-full">
                    <Utensils className="h-5 w-5 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Reservations</p>
                    <h3 className="text-2xl font-bold">18</h3>
                    <p className="text-xs text-blue-600 flex items-center mt-1">
                      <TrendingUp className="h-3 w-3 mr-1" /> 
                      6 upcoming tonight
                    </p>
                  </div>
                  <div className="bg-blue-100 p-3 rounded-full">
                    <Calendar className="h-5 w-5 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Active Orders & Today's Reservations */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <Card className="col-span-2">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle>Active Orders</CardTitle>
                  <Button variant="ghost" size="sm" className="text-blue-600 gap-1" asChild>
                    <a href="/orders">
                      View All <ChevronRight className="h-4 w-4" />
                    </a>
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { id: "ORD-7845", table: "T4", customer: "Michael Chen", items: 5, total: "$124.50", time: "12:05 PM", status: "Preparing" },
                    { id: "ORD-7844", table: "T7", customer: "Sarah Johnson", items: 3, total: "$58.25", time: "11:58 AM", status: "Ready" },
                    { id: "ORD-7843", table: "T2", customer: "David Brown", items: 2, total: "$34.80", time: "11:45 AM", status: "Delivered" },
                    { id: "ORD-7842", table: "T9", customer: "Emma Wilson", items: 4, total: "$97.20", time: "11:32 AM", status: "Preparing" },
                  ].map((order) => (
                    <div key={order.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                      <div className="flex items-center gap-3">
                        <div className="bg-blue-50 p-2 rounded-md text-blue-600 font-medium text-sm">
                          {order.table}
                        </div>
                        <div>
                          <h4 className="font-medium">{order.id}</h4>
                          <p className="text-xs text-gray-500">{order.customer} • {order.items} items</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{order.total}</p>
                        <p className="text-xs text-gray-500">{order.time}</p>
                      </div>
                      <Badge 
                        className={`${
                          order.status === "Ready" ? "bg-green-50 text-green-600 border-green-200" :
                          order.status === "Preparing" ? "bg-yellow-50 text-yellow-600 border-yellow-200" :
                          "bg-blue-50 text-blue-600 border-blue-200"
                        }`}
                      >
                        {order.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle>Today's Reservations</CardTitle>
                  <Button variant="ghost" size="sm" className="text-blue-600 gap-1" asChild>
                    <a href="/reservations">
                      View All <ChevronRight className="h-4 w-4" />
                    </a>
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { id: "RSV-4256", name: "Alexander Smith", time: "6:30 PM", guests: 4, status: "Confirmed", table: "T8" },
                    { id: "RSV-4257", name: "Jessica Williams", time: "7:00 PM", guests: 2, status: "Confirmed", table: "T3" },
                    { id: "RSV-4258", name: "Robert Johnson", time: "7:30 PM", guests: 6, status: "Pending", table: "-" },
                    { id: "RSV-4259", name: "Maria Garcia", time: "8:00 PM", guests: 3, status: "Confirmed", table: "T5" },
                  ].map((reservation) => (
                    <div key={reservation.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                      <div>
                        <h4 className="font-medium">{reservation.name}</h4>
                        <div className="flex items-center text-xs text-gray-500 mt-1">
                          <CalendarDays className="h-3 w-3 mr-1" /> 
                          {reservation.time} • {reservation.guests} guests
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge 
                          className={`${
                            reservation.status === "Confirmed" ? "bg-blue-50 text-blue-600 border-blue-200" :
                            "bg-yellow-50 text-yellow-600 border-yellow-200"
                          }`}
                        >
                          {reservation.status}
                        </Badge>
                        <Badge variant="outline">{reservation.table}</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Popular Items & Restaurant Performance */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <Card>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle>Popular Items Today</CardTitle>
                  <Button variant="ghost" size="sm" className="text-blue-600 gap-1" asChild>
                    <a href="/menu">
                      Menu <ChevronRight className="h-4 w-4" />
                    </a>
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { name: "Grilled Salmon", orders: 28, category: "Main Course", price: "$24.50" },
                    { name: "Truffle Pasta", orders: 24, category: "Main Course", price: "$22.00" },
                    { name: "Chocolate Soufflé", orders: 18, category: "Dessert", price: "$9.50" },
                    { name: "Craft IPA", orders: 16, category: "Beverages", price: "$7.50" },
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 border rounded-lg">
                      <div className="bg-blue-50 h-10 w-10 rounded-md flex items-center justify-center text-blue-600 font-medium">
                        #{index + 1}
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <h4 className="font-medium">{item.name}</h4>
                          <span className="text-sm font-medium">{item.price}</span>
                        </div>
                        <div className="flex justify-between text-xs text-gray-500 mt-1">
                          <span>{item.category}</span>
                          <span>{item.orders} orders today</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card className="col-span-2">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle>Restaurant Performance</CardTitle>
                  <Button variant="ghost" size="sm" className="text-blue-600 gap-1" asChild>
                    <a href="/reports">
                      Reports <ChevronRight className="h-4 w-4" />
                    </a>
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <h3 className="text-sm font-medium mb-2">Hourly Sales Today</h3>
                    <div className="h-48 bg-gray-50 rounded-lg flex items-center justify-center">
                      {/* Sales chart would go here */}
                      <p className="text-gray-400">Sales Chart</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <h3 className="text-sm font-medium">Table Turnover Rate</h3>
                        <span className="text-xs text-blue-600">3.8x today</span>
                      </div>
                      <Progress value={76} className="h-2" />
                      <p className="text-xs text-gray-500 mt-1">76% of target (5.0x)</p>
                    </div>
                    
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <h3 className="text-sm font-medium">Avg. Order Value</h3>
                        <span className="text-xs text-blue-600">$32.50 today</span>
                      </div>
                      <Progress value={85} className="h-2" />
                      <p className="text-xs text-gray-500 mt-1">85% of target ($38.00)</p>
                    </div>
                    
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <h3 className="text-sm font-medium">Customer Satisfaction</h3>
                        <span className="text-xs text-blue-600">4.8/5 today</span>
                      </div>
                      <Progress value={95} className="h-2" />
                      <p className="text-xs text-gray-500 mt-1">95% of target (5.0/5)</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4">
                  <h3 className="text-sm font-medium mb-2">Staff on Duty</h3>
                  <div className="flex flex-wrap gap-2">
                    {[
                      { name: "Alex Kim", role: "Manager", time: "10:00 AM - 8:00 PM" },
                      { name: "Maria Rodriguez", role: "Head Chef", time: "9:00 AM - 5:00 PM" },
                      { name: "James Wilson", role: "Server", time: "11:00 AM - 7:00 PM" },
                      { name: "Sarah Chen", role: "Server", time: "4:00 PM - 10:00 PM" },
                      { name: "David Lee", role: "Bartender", time: "3:00 PM - 11:00 PM" },
                    ].map((staff, index) => (
                      <div key={index} className="flex items-center gap-2 p-2 border rounded-lg">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="bg-blue-100 text-blue-600 text-xs">
                            {staff.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium">{staff.name}</p>
                          <div className="flex items-center text-xs text-gray-500">
                            <span>{staff.role}</span>
                            <span className="mx-1">•</span>
                            <Timer className="h-3 w-3 mr-1" /> 
                            <span>{staff.time}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Notifications & Quick Actions */}
          <div className="grid grid-cols-3 gap-4">
            <Card className="col-span-2">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle>Recent Notifications</CardTitle>
                  <Button variant="ghost" size="sm" className="text-blue-600 gap-1">
                    Mark All as Read <Bell className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { message: "Table 5 has been waiting for their check for over 10 minutes", time: "2 minutes ago", type: "warning" },
                    { message: "New reservation for tonight at 8:00 PM (Party of 4)", time: "15 minutes ago", type: "info" },
                    { message: "Inventory alert: Running low on Fresh Salmon (0.8kg remaining)", time: "32 minutes ago", type: "danger" },
                    { message: "Order #ORD-7840 was completed and paid ($156.78)", time: "45 minutes ago", type: "success" },
                  ].map((notification, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 border rounded-lg">
                      <div className={`p-2 rounded-full ${
                        notification.type === "warning" ? "bg-yellow-50 text-yellow-600" :
                        notification.type === "danger" ? "bg-red-50 text-red-600" :
                        notification.type === "success" ? "bg-green-50 text-green-600" :
                        "bg-blue-50 text-blue-600"
                      }`}>
                        <Bell className="h-4 w-4" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm">{notification.message}</p>
                        <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>Mark as read</DropdownMenuItem>
                          <DropdownMenuItem>Take action</DropdownMenuItem>
                          <DropdownMenuItem>Dismiss</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-2">
                  <Button className="h-auto py-4 flex-col gap-2 bg-blue-600 hover:bg-blue-700">
                    <ShoppingBag className="h-5 w-5" />
                    <span>New Order</span>
                  </Button>
                  <Button className="h-auto py-4 flex-col gap-2 bg-blue-600 hover:bg-blue-700">
                    <Calendar className="h-5 w-5" />
                    <span>Add Reservation</span>
                  </Button>
                  <Button variant="outline" className="h-auto py-4 flex-col gap-2">
                    <Users className="h-5 w-5" />
                    <span>Manage Staff</span>
                  </Button>
                  <Button variant="outline" className="h-auto py-4 flex-col gap-2">
                    <DollarSign className="h-5 w-5" />
                    <span>View Reports</span>
                  </Button>
                </div>
                
                <div className="mt-4">
                  <div className="text-sm font-medium mb-2">Quick Search</div>
                  <div className="flex gap-2">
                    <Input placeholder="Order, table, or customer" />
                    <Button variant="outline" size="icon">
                      <Users className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                <div className="mt-4">
                  <div className="text-sm font-medium mb-2">Today's Goals</div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Sales Target</span>
                      <span className="font-medium">$4,285 / $8,000</span>
                    </div>
                    <Progress value={53.5} className="h-2" />
                    
                    <div className="flex items-center justify-between text-sm mt-3">
                      <span>Customer Rating</span>
                      <span className="font-medium">4.8 / 5.0</span>
                    </div>
                    <div className="flex text-yellow-500">
                      {[1, 2, 3, 4].map((i) => (
                        <Star key={i} className="h-4 w-4 fill-current" />
                      ))}
                      <Star className="h-4 w-4 fill-current text-yellow-500 opacity-80" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="sales" className="m-0">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-center h-40">
                <p className="text-gray-500">Sales dashboard content would appear here.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="orders" className="m-0">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-center h-40">
                <p className="text-gray-500">Orders dashboard content would appear here.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="tables" className="m-0">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-center h-40">
                <p className="text-gray-500">Tables dashboard content would appear here.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </div>
        </Tabs>
      </div>
      
      {/* Main Dashboard Content - Scrollable */}
    </div>
  );
}