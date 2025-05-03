// TablesPage.tsx
import { useState, useEffect } from "react";
import { tableData, type Table } from "../data/tables";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table as UITable,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { 
  Search, Filter, UtensilsCrossed, DollarSign, UserPlus, 
  RefreshCw, Trash2, CalendarDays, Edit, MoreVertical 
} from "lucide-react";

export default function TablesPage() {
  const [tables, setTables] = useState(tableData);
  const [selectedTable, setSelectedTable] = useState<Table | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  
  // Load table data from the server
  useEffect(() => {
    // Simulating API call
    console.log("Tables loaded");
  }, []);

  // Filter tables based on search query and status filter
  const filteredTables = tables.filter(table => {
    const matchesSearch = 
      table.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      table.id.toString().includes(searchQuery);
    
    const matchesStatus = statusFilter === "all" || table.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  // Group tables by floor
  const mainFloorTables = filteredTables.filter(table => table.id <= 8);
  const barAreaTables = filteredTables.filter(table => table.id > 8);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "available":
        return <Badge className="bg-blue-50 text-blue-600 border-blue-200">Available</Badge>;
      case "reserved":
        return <Badge className="bg-gray-100 text-gray-700 border-gray-200">Reserved</Badge>;
      case "occupied":
        return <Badge className="bg-gray-200 text-gray-700 border-gray-300">Occupied</Badge>;
      case "blocked":
        return <Badge className="bg-gray-300 text-gray-700 border-gray-400">Blocked</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  return (
    <div className="flex h-[calc(100vh-4rem)] overflow-hidden">
      {/* Tables list section */}
      <div className="w-2/3 border-r overflow-hidden flex flex-col">
        <div className="p-4 border-b">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Tables Management</h2>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              Add New Table
            </Button>
          </div>

          <div className="flex gap-2 mb-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
              <Input 
                placeholder="Search tables..." 
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="available">Available</SelectItem>
                <SelectItem value="reserved">Reserved</SelectItem>
                <SelectItem value="occupied">Occupied</SelectItem>
                <SelectItem value="blocked">Blocked</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Tabs defaultValue="all" className="flex-1 flex flex-col">
          <div className="px-4 pt-2">
            <TabsList>
              <TabsTrigger value="all">All Tables</TabsTrigger>
              <TabsTrigger value="main">Main Floor</TabsTrigger>
              <TabsTrigger value="bar">2nd Floor</TabsTrigger>
            </TabsList>
          </div>

          <div className="flex-1 overflow-auto p-4">
            <TabsContent value="all" className="m-0 h-full">
              <UITable>
                <TableHeader>
                  <TableRow>
                    <TableHead>Table</TableHead>
                    <TableHead>Seats</TableHead>
                    <TableHead>Floor</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Occupants</TableHead>
                    <TableHead>Time</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTables.map((table) => (
                    <TableRow 
                      key={table.id}
                      className={selectedTable?.id === table.id ? "bg-blue-50" : ""}
                      onClick={() => setSelectedTable(table)}
                    >
                      <TableCell className="font-medium">{table.name}</TableCell>
                      <TableCell>{table.seats}</TableCell>
                      <TableCell>{table.id <= 8 ? "Main Floor" : "2nd Floor"}</TableCell>
                      <TableCell>{getStatusBadge(table.status)}</TableCell>
                      <TableCell>
                        {table.status === "occupied" ? "2 Guests" : 
                         table.status === "reserved" ? "Reservation" : "-"}
                      </TableCell>
                      <TableCell>
                        {table.status === "occupied" ? "37 min" : 
                         table.status === "reserved" ? "5:30 PM" : "-"}
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </UITable>
            </TabsContent>

            <TabsContent value="main" className="m-0 h-full">
              <UITable>
                <TableHeader>
                  <TableRow>
                    <TableHead>Table</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Seats</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Occupants</TableHead>
                    <TableHead>Time</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mainFloorTables.map((table) => (
                    <TableRow 
                      key={table.id}
                      className={selectedTable?.id === table.id ? "bg-blue-50" : ""}
                      onClick={() => setSelectedTable(table)}
                    >
                      <TableCell className="font-medium">{table.name}</TableCell>
                      <TableCell className="capitalize">{table.type}</TableCell>
                      <TableCell>{table.seats}</TableCell>
                      <TableCell>{getStatusBadge(table.status)}</TableCell>
                      <TableCell>
                        {table.status === "occupied" ? "2 Guests" : 
                         table.status === "reserved" ? "Reservation" : "-"}
                      </TableCell>
                      <TableCell>
                        {table.status === "occupied" ? "37 min" : 
                         table.status === "reserved" ? "5:30 PM" : "-"}
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </UITable>
            </TabsContent>

            <TabsContent value="bar" className="m-0 h-full">
              <UITable>
                <TableHeader>
                  <TableRow>
                    <TableHead>Table</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Seats</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Occupants</TableHead>
                    <TableHead>Time</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {barAreaTables.map((table) => (
                    <TableRow 
                      key={table.id}
                      className={selectedTable?.id === table.id ? "bg-blue-50" : ""}
                      onClick={() => setSelectedTable(table)}
                    >
                      <TableCell className="font-medium">{table.name}</TableCell>
                      <TableCell className="capitalize">{table.type}</TableCell>
                      <TableCell>{table.seats}</TableCell>
                      <TableCell>{getStatusBadge(table.status)}</TableCell>
                      <TableCell>
                        {table.status === "occupied" ? "2 Guests" : 
                         table.status === "reserved" ? "Reservation" : "-"}
                      </TableCell>
                      <TableCell>
                        {table.status === "occupied" ? "37 min" : 
                         table.status === "reserved" ? "5:30 PM" : "-"}
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </UITable>
            </TabsContent>
          </div>
        </Tabs>
      </div>

      {/* Table details section */}
      <div className="w-1/3 overflow-y-auto">
        {selectedTable ? (
          <div className="p-4">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-xl">
                      Table {selectedTable.name}
                    </CardTitle>
                    <CardDescription>
                      {selectedTable.id <= 8 ? "Main Floor" : "Bar Area"} • {selectedTable.seats} Seats • {selectedTable.type.charAt(0).toUpperCase() + selectedTable.type.slice(1)}
                    </CardDescription>
                  </div>
                  {getStatusBadge(selectedTable.status)}
                </div>
              </CardHeader>
              <CardContent>
                {selectedTable.status === "occupied" && (
                  <>
                    <div className="mb-6">
                      <h3 className="font-medium mb-2">Current Occupants</h3>
                      <p className="text-sm">
                        <span className="font-medium">Ariel Hikmat</span> and 1 guest
                      </p>
                      <p className="text-sm text-gray-500">
                        Seated: 5:30 PM (37 minutes ago)
                      </p>
                    </div>

                    <div className="mb-6">
                      <h3 className="font-medium mb-2">Order Details</h3>
                      <div className="bg-gray-50 p-3 rounded-md">
                        <div className="flex justify-between text-sm">
                          <span>Order #ID945632</span>
                          <span>$87.34</span>
                        </div>
                        <p className="text-sm text-gray-500 mt-1">3 items</p>
                        <p className="text-sm text-blue-600 mt-1">Food being prepared</p>
                        <Button variant="outline" className="w-full mt-3 text-sm border-blue-200 text-blue-600">
                          View Order Details
                        </Button>
                      </div>
                    </div>
                  </>
                )}

                {selectedTable.status === "reserved" && (
                  <div className="mb-6">
                    <h3 className="font-medium mb-2">Reservation</h3>
                    <p className="text-sm">
                      <span className="font-medium">John Davis</span> and 3 guests
                    </p>
                    <p className="text-sm text-gray-500">
                      Reserved for: 5:30 PM - 7:00 PM
                    </p>
                  </div>
                )}

                <div className="mb-4">
                  <h3 className="font-medium mb-3">Actions</h3>
                  <div className="grid grid-cols-2 gap-3">
                    <Button 
                      className="bg-blue-600 hover:bg-blue-700 text-white"
                      disabled={selectedTable.status === "blocked"}
                    >
                      <UtensilsCrossed className="mr-2 h-4 w-4" /> New Order
                    </Button>
                    <Button 
                      className="bg-blue-600 hover:bg-blue-700 text-white"
                      disabled={selectedTable.status !== "occupied"}
                    >
                      <DollarSign className="mr-2 h-4 w-4" /> Pay Bill
                    </Button>
                    <Button 
                      variant="outline"
                      disabled={!["occupied", "reserved"].includes(selectedTable.status)}
                    >
                      <UserPlus className="mr-2 h-4 w-4" /> Change Guests
                    </Button>
                    <Button 
                      variant="outline"
                      disabled={selectedTable.status !== "occupied"}
                    >
                      <RefreshCw className="mr-2 h-4 w-4" /> Transfer
                    </Button>
                    <Button variant="outline">
                      <CalendarDays className="mr-2 h-4 w-4" /> 
                      {selectedTable.status === "reserved" ? "Edit Reservation" : "Reserve"}
                    </Button>
                    <Button variant="outline">
                      <Edit className="mr-2 h-4 w-4" /> Edit Table
                    </Button>
                  </div>
                </div>

                {(selectedTable.status === "occupied" || selectedTable.status === "reserved") && (
                  <div>
                    <h3 className="font-medium mb-2">Reservation History</h3>
                    <div className="divide-y border rounded-md">
                      <div className="p-3">
                        <div className="flex justify-between">
                          <span className="font-medium">John Davis</span>
                          <span className="text-gray-500">Today</span>
                        </div>
                        <div className="flex justify-between text-gray-600 mt-1 text-sm">
                          <span>12:30 PM - 2:00 PM</span>
                          <span>4 guests</span>
                        </div>
                      </div>
                      <div className="p-3">
                        <div className="flex justify-between">
                          <span className="font-medium">Sarah Miller</span>
                          <span className="text-gray-500">Today</span>
                        </div>
                        <div className="flex justify-between text-gray-600 mt-1 text-sm">
                          <span>2:30 PM - 4:00 PM</span>
                          <span>2 guests</span>
                        </div>
                      </div>
                      {selectedTable.status === "occupied" && (
                        <div className="p-3 bg-blue-50">
                          <div className="flex justify-between">
                            <span className="font-medium">Ariel Hikmat</span>
                            <span className="text-gray-500">Today</span>
                          </div>
                          <div className="flex justify-between text-gray-600 mt-1 text-sm">
                            <span>5:30 PM - 7:00 PM</span>
                            <span>2 guests</span>
                          </div>
                          <div className="mt-1 text-blue-600 text-xs flex items-center">
                            <div className="w-2 h-2 bg-blue-600 rounded-full mr-1"></div>
                            Current customer
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        ) : (
          <div className="h-full flex items-center justify-center p-6 text-center">
            <div>
              <h3 className="font-medium text-lg mb-2">No Table Selected</h3>
              <p className="text-gray-500 mb-4">Select a table from the list to view details</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}