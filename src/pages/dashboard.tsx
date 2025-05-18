import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend,
  ResponsiveContainer 
} from 'recharts';
import { Bell } from "lucide-react";

// Sample data for demonstration
const sampleData = [
  { name: 'Jan', Branch1: 4000, Branch2: 2400, Branch3: 3000 },
  { name: 'Feb', Branch1: 3000, Branch2: 1398, Branch3: 2000 },
  { name: 'Mar', Branch1: 2000, Branch2: 9800, Branch3: 2780 },
  { name: 'Apr', Branch1: 2780, Branch2: 3908, Branch3: 1890 },
  { name: 'May', Branch1: 1890, Branch2: 4800, Branch3: 2390 },
  { name: 'Jun', Branch1: 2390, Branch2: 3800, Branch3: 3490 },
];

export default function Dashboard() {
  const [timeFilter, setTimeFilter] = useState("today");
  const [currentTab, setCurrentTab] = useState("sales");

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
        <h1 className="text-4xl font-bold mb-4 sm:mb-0">Dashboard</h1>
        <div className="flex items-center space-x-4">
          <Button variant="outline" size="lg" className="text-xl">
            <Bell className="mr-2 h-6 w-6" />
            Alerts
          </Button>
        </div>
      </div>

      {/* Time Period Filters */}
      <div className="flex flex-wrap gap-4 mb-8">
        <Button 
          variant={timeFilter === "today" ? "default" : "outline"} 
          onClick={() => setTimeFilter("today")}
          className="text-xl px-6 py-3"
        >
          Today
        </Button>
        <Button 
          variant={timeFilter === "yesterday" ? "default" : "outline"} 
          onClick={() => setTimeFilter("yesterday")}
          className="text-xl px-6 py-3"
        >
          Yesterday
        </Button>
        <Button 
          variant={timeFilter === "mtd" ? "default" : "outline"} 
          onClick={() => setTimeFilter("mtd")}
          className="text-xl px-6 py-3"
        >
          MTD
        </Button>
        <Button 
          variant={timeFilter === "ytd" ? "default" : "outline"} 
          onClick={() => setTimeFilter("ytd")}
          className="text-xl px-6 py-3"
        >
          YTD
        </Button>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl text-gray-500">Occupancy Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">78%</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl text-gray-500">Order Volume</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">156</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl text-gray-500">Revenue (Today)</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">$3,450</p>
          </CardContent>
        </Card>
      </div>

      {/* Tabs - Sales / Purchase / Expense */}
      <Tabs value={currentTab} onValueChange={setCurrentTab} className="mb-8">
        <TabsList className="grid w-full grid-cols-3 h-16">
          <TabsTrigger value="sales" className="text-xl">Sales</TabsTrigger>
          <TabsTrigger value="purchase" className="text-xl">Purchase</TabsTrigger>
          <TabsTrigger value="expense" className="text-xl">Expense</TabsTrigger>
        </TabsList>
        
        <TabsContent value="sales" className="mt-6">
          <h2 className="text-3xl font-bold mb-6">Branch Performance - Sales</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <Card className="cursor-pointer hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-2xl">Main Branch</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">$12,450</p>
                <div className="mt-2">
                  <p className="text-xl">Cash: $4,200</p>
                  <p className="text-xl">Card: $7,250</p>
                  <p className="text-xl">Aggregator: $1,000</p>
                </div>
              </CardContent>
            </Card>
            <Card className="cursor-pointer hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-2xl">Downtown Branch</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">$8,320</p>
                <div className="mt-2">
                  <p className="text-xl">Cash: $2,100</p>
                  <p className="text-xl">Card: $5,220</p>
                  <p className="text-xl">Aggregator: $1,000</p>
                </div>
              </CardContent>
            </Card>
            <Card className="cursor-pointer hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-2xl">Mall Branch</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">$6,780</p>
                <div className="mt-2">
                  <p className="text-xl">Cash: $1,780</p>
                  <p className="text-xl">Card: $3,500</p>
                  <p className="text-xl">Aggregator: $1,500</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="purchase" className="mt-6">
          <h2 className="text-3xl font-bold mb-6">Branch Performance - Purchase</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <Card className="cursor-pointer hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-2xl">Main Branch</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">$5,200</p>
                <div className="mt-2">
                  <p className="text-xl">From purchase orders</p>
                </div>
              </CardContent>
            </Card>
            {/* Similar Cards for other branches */}
          </div>
        </TabsContent>
        
        <TabsContent value="expense" className="mt-6">
          <h2 className="text-3xl font-bold mb-6">Branch Performance - Expense</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <Card className="cursor-pointer hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-2xl">Main Branch</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">$3,850</p>
                <div className="mt-2">
                  <p className="text-xl">Actual: $3,850</p>
                  <p className="text-xl">Budget: $4,000</p>
                  <p className="text-xl text-green-500">Under budget: $150</p>
                </div>
              </CardContent>
            </Card>
            {/* Similar Cards for other branches */}
          </div>
        </TabsContent>
      </Tabs>

      {/* Trend Chart */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-3xl">Branch Sales Trend</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={sampleData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" tick={{ fontSize: 16 }} />
                <YAxis tick={{ fontSize: 16 }} />
                <Tooltip contentStyle={{ fontSize: 16 }} />
                <Legend wrapperStyle={{ fontSize: 18, paddingTop: 20 }} />
                <Line type="monotone" dataKey="Branch1" stroke="#8884d8" strokeWidth={3} name="Main Branch" />
                <Line type="monotone" dataKey="Branch2" stroke="#82ca9d" strokeWidth={3} name="Downtown Branch" />
                <Line type="monotone" dataKey="Branch3" stroke="#ff7300" strokeWidth={3} name="Mall Branch" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Alerts Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl">Alerts & Notifications</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 bg-red-50 border-l-4 border-red-500 rounded">
              <h3 className="text-2xl font-semibold text-red-700">Low Stock Alert</h3>
              <p className="text-xl text-red-600">Chicken stock below threshold (2kg remaining)</p>
            </div>
            <div className="p-4 bg-yellow-50 border-l-4 border-yellow-500 rounded">
              <h3 className="text-2xl font-semibold text-yellow-700">Order Delay</h3>
              <p className="text-xl text-yellow-600">Table #12 waiting for 25+ minutes</p>
            </div>
            <div className="p-4 bg-blue-50 border-l-4 border-blue-500 rounded">
              <h3 className="text-2xl font-semibold text-blue-700">Void Notice</h3>
              <p className="text-xl text-blue-600">Order #4532 voided by Manager: John (Wrong order)</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}