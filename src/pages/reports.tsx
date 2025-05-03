// ReportsPage.tsx
import { useEffect, useRef, useState } from "react";
import { Chart } from "chart.js/auto";
import {
  Download,
  Printer,
  Share,
  Filter,
  ChevronDown,
  FileText,
  BarChart3,
  TrendingUp,
  Clock,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

export default function ReportsPage() {
  const salesChartRef = useRef<HTMLCanvasElement | null>(null);
  const categoryChartRef = useRef<HTMLCanvasElement | null>(null);
  const hoursChartRef = useRef<HTMLCanvasElement | null>(null);
  const staffHoursChartRef = useRef<HTMLCanvasElement | null>(null);
  const laborCostChartRef = useRef<HTMLCanvasElement | null>(null);

  const [activeReport, setActiveReport] = useState("overview");
  const [timeRange, setTimeRange] = useState("7days");

  useEffect(() => {
    if (salesChartRef.current == null) return;
    const salesCtx = salesChartRef.current.getContext("2d");
    if (salesCtx == null) return;

    const blueColor = "#2563eb"; // Blue-600
    const lightBlueColor = "rgba(37, 99, 235, 0.1)"; // Blue-600 with opacity
    const grayColor = "#64748b"; // Gray-500

    const salesChart = new Chart(salesCtx, {
      type: "line",
      data: {
        labels: [
          "Apr 6",
          "Apr 7",
          "Apr 8",
          "Apr 9",
          "Apr 10",
          "Apr 11",
          "Apr 12",
        ],
        datasets: [
          {
            label: "Revenue",
            data: [2250, 1980, 2420, 2680, 3120, 3450, 2425],
            borderColor: blueColor,
            backgroundColor: lightBlueColor,
            fill: true,
            tension: 0.3,
            yAxisID: "y",
          },
          {
            label: "Orders",
            data: [102, 94, 112, 123, 145, 156, 100],
            borderColor: grayColor,
            borderDash: [5, 5],
            tension: 0.3,
            yAxisID: "y1",
          },
        ],
      },
      options: {
        responsive: true,
        interaction: {
          mode: "index",
          intersect: false,
        },
        scales: {
          y: {
            type: "linear",
            display: true,
            position: "left",
            title: {
              display: true,
              text: "Revenue ($)",
            },
          },
          y1: {
            type: "linear",
            display: true,
            position: "right",
            title: {
              display: true,
              text: "Orders",
            },
            grid: {
              drawOnChartArea: false,
            },
          },
        },
      },
    });

    return () => {
      salesChart.destroy();
    };
  }, [salesChartRef]);

  // Category Performance Chart
  useEffect(() => {
    if (categoryChartRef.current == null) return;
    const categoryCtx = categoryChartRef.current.getContext("2d");
    if (categoryCtx == null) return;

    const blueShades = [
      "rgba(37, 99, 235, 0.9)", // Blue-600
      "rgba(59, 130, 246, 0.8)", // Blue-500
      "rgba(96, 165, 250, 0.8)", // Blue-400
      "rgba(147, 197, 253, 0.8)", // Blue-300
      "rgba(191, 219, 254, 0.8)", // Blue-200
    ];

    const categoryChart = new Chart(categoryCtx, {
      type: "doughnut",
      data: {
        labels: [
          "Main Courses",
          "Appetizers",
          "Desserts",
          "Beverages",
          "Sides",
        ],
        datasets: [
          {
            data: [42, 23, 12, 18, 5],
            backgroundColor: blueShades,
            borderWidth: 0,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: "right",
          },
          tooltip: {
            callbacks: {
              label: function (context) {
                return context.label + ": " + context.raw + "% of sales";
              },
            },
          },
        },
      },
    });

    return () => {
      categoryChart.destroy();
    };
  }, [categoryChartRef]);

  // Peak Hours Chart
  useEffect(() => {
    if (hoursChartRef.current == null) return;
    const hoursCtx = hoursChartRef.current.getContext("2d");
    if (hoursCtx == null) return;

    const blueColor = "rgba(37, 99, 235, 0.7)"; // Blue-600 with opacity

    const hoursChart = new Chart(hoursCtx, {
      type: "bar",
      data: {
        labels: [
          "11am",
          "12pm",
          "1pm",
          "2pm",
          "3pm",
          "4pm",
          "5pm",
          "6pm",
          "7pm",
          "8pm",
          "9pm",
          "10pm",
        ],
        datasets: [
          {
            label: "Orders",
            data: [32, 58, 75, 41, 25, 34, 52, 87, 105, 94, 63, 22],
            backgroundColor: blueColor,
            borderWidth: 0,
            borderRadius: 4,
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: "Number of Orders",
            },
          },
          x: {
            title: {
              display: true,
              text: "Hour of Day",
            },
          },
        },
      },
    });

    return () => {
      hoursChart.destroy();
    };
  }, [hoursChartRef]);

  // Staff Hours Chart
  useEffect(() => {
    if (staffHoursChartRef.current == null) return;
    const staffHoursCtx = staffHoursChartRef.current.getContext("2d");
    if (staffHoursCtx == null) return;

    const blueShades = [
      "rgba(37, 99, 235, 0.8)", // Blue-600
      "rgba(59, 130, 246, 0.8)", // Blue-500
      "rgba(96, 165, 250, 0.8)", // Blue-400
      "rgba(147, 197, 253, 0.8)", // Blue-300
      "rgba(191, 219, 254, 0.8)", // Blue-200
    ];

    const staffHoursChart = new Chart(staffHoursCtx, {
      type: "pie",
      data: {
        labels: [
          "Servers",
          "Kitchen Staff",
          "Bartenders",
          "Hosts",
          "Management",
        ],
        datasets: [
          {
            data: [135, 115, 42, 35, 25],
            backgroundColor: blueShades,
            borderWidth: 0,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: "bottom",
          },
        },
      },
    });

    return () => {
      staffHoursChart.destroy();
    };
  }, [staffHoursChartRef]);

  // Labor Cost Chart
  useEffect(() => {
    if (laborCostChartRef.current == null) return;
    const laborCostCtx = laborCostChartRef.current.getContext("2d");
    if (laborCostCtx == null) return;

    const blueColor = "rgba(37, 99, 235, 0.7)"; // Blue-600 with opacity

    const laborCostChart = new Chart(laborCostCtx, {
      type: "bar",
      data: {
        labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        datasets: [
          {
            label: "Labor Cost",
            data: [620, 580, 650, 710, 890, 950, 818],
            backgroundColor: blueColor,
            borderWidth: 0,
            borderRadius: 4,
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: "Cost ($)",
            },
          },
        },
      },
    });

    return () => {
      laborCostChart.destroy();
    };
  }, [laborCostChartRef]);

  return (
    <div className="flex-1 overflow-hidden flex flex-col h-[calc(100vh-4rem)]">
      {/* Header */}
      <div className="p-4 border-b">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Reports & Analytics</h2>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button variant="outline" size="sm">
              <Printer className="h-4 w-4 mr-2" />
              Print
            </Button>
            <Button
              size="sm"
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              <Share className="h-4 w-4 mr-2" />
              Share
            </Button>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select time range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7days">Last 7 days</SelectItem>
                <SelectItem value="30days">Last 30 days</SelectItem>
                <SelectItem value="quarter">Last quarter</SelectItem>
                <SelectItem value="year">Last year</SelectItem>
                <SelectItem value="custom">Custom range</SelectItem>
              </SelectContent>
            </Select>

            <Select defaultValue="all">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All locations</SelectItem>
                <SelectItem value="louvre">Louvre Opera</SelectItem>
                <SelectItem value="champs">Champs-Élysées</SelectItem>
                <SelectItem value="montmartre">Montmartre</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              More Filters
            </Button>
          </div>

          <Tabs defaultValue="daily">
            <TabsList>
              <TabsTrigger value="daily">Daily</TabsTrigger>
              <TabsTrigger value="weekly">Weekly</TabsTrigger>
              <TabsTrigger value="monthly">Monthly</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      {/* Main content area - scrollable */}
      <div className="flex-1 overflow-auto pb-6">
          <div className="m-0">
            {/* KPI Cards */}
            <div className="grid grid-cols-4 gap-4 p-4">
              <Card>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <div className="text-gray-500 text-sm">Total Revenue</div>
                    <Badge className="bg-blue-50 text-blue-600 border-blue-200">
                      +12.5%
                    </Badge>
                  </div>
                  <div className="text-2xl font-bold mb-1">$18,325</div>
                  <div className="text-xs text-gray-500">
                    vs $16,294 last period
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <div className="text-gray-500 text-sm">Total Orders</div>
                    <Badge className="bg-blue-50 text-blue-600 border-blue-200">
                      +8.2%
                    </Badge>
                  </div>
                  <div className="text-2xl font-bold mb-1">832</div>
                  <div className="text-xs text-gray-500">
                    vs 769 last period
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <div className="text-gray-500 text-sm">
                      Average Order Value
                    </div>
                    <Badge className="bg-blue-50 text-blue-600 border-blue-200">
                      +3.9%
                    </Badge>
                  </div>
                  <div className="text-2xl font-bold mb-1">$22.03</div>
                  <div className="text-xs text-gray-500">
                    vs $21.19 last period
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <div className="text-gray-500 text-sm">
                      Table Turnover Rate
                    </div>
                    <Badge
                      variant="outline"
                      className="bg-gray-50 text-gray-600 border-gray-200"
                    >
                      -2.1%
                    </Badge>
                  </div>
                  <div className="text-2xl font-bold mb-1">3.7x</div>
                  <div className="text-xs text-gray-500">
                    vs 3.78x last period
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Revenue & Orders Chart */}
            <div className="p-4">
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <CardTitle>Revenue & Orders</CardTitle>
                    <CardDescription>April 6 - April 12, 2025</CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  <canvas ref={salesChartRef} className="max-h-96"></canvas>
                </CardContent>
              </Card>
            </div>

            {/* Top selling items & Category performance */}
            <div className="p-4 grid grid-cols-2 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <CardTitle>Top Selling Items</CardTitle>
                    <Button variant="link" className="text-blue-600 p-0 h-auto">
                      View All
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      {
                        name: "Wagyu Burger",
                        orders: 237,
                        revenue: 4740,
                        percent: 25.9,
                      },
                      {
                        name: "Grilled Salmon",
                        orders: 192,
                        revenue: 3840,
                        percent: 21.0,
                      },
                      {
                        name: "Truffle Pizza",
                        orders: 168,
                        revenue: 2940,
                        percent: 16.0,
                      },
                      {
                        name: "Craft Cocktails",
                        orders: 143,
                        revenue: 1716,
                        percent: 9.4,
                      },
                      {
                        name: "Dessert Platter",
                        orders: 132,
                        revenue: 1320,
                        percent: 7.2,
                      },
                    ].map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between pb-2 border-b"
                      >
                        <div className="flex items-center">
                          <div className="bg-blue-50 w-10 h-10 rounded-md flex items-center justify-center mr-3 text-blue-600">
                            {item.name.charAt(0)}
                          </div>
                          <div>
                            <div className="font-medium">{item.name}</div>
                            <div className="text-xs text-gray-500">
                              {item.orders} orders
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-medium">${item.revenue}</div>
                          <div className="text-xs text-gray-500">
                            {item.percent}% of sales
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <CardTitle>Category Performance</CardTitle>
                    <Button variant="link" className="text-blue-600 p-0 h-auto">
                      View All
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <canvas ref={categoryChartRef} className="max-h-96"></canvas>
                </CardContent>
              </Card>
            </div>

            {/* Peak Hours & Staff Performance */}
            <div className="p-4 grid grid-cols-2 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <CardTitle>Peak Hours</CardTitle>
                    <CardDescription>Last 7 days average</CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  <canvas ref={hoursChartRef} className="max-h-96"></canvas>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <CardTitle>Staff Performance</CardTitle>
                    <Button variant="link" className="text-blue-600 p-0 h-auto">
                      View All
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      {
                        name: "Jane Smith",
                        initials: "JS",
                        sales: 5240,
                        orders: 248,
                        percent: 92,
                        change: "+12%",
                      },
                      {
                        name: "Mark Johnson",
                        initials: "MJ",
                        sales: 4920,
                        orders: 226,
                        percent: 86,
                        change: "+5%",
                      },
                      {
                        name: "Alex Lee",
                        initials: "AL",
                        sales: 4312,
                        orders: 198,
                        percent: 75,
                        change: "-2%",
                      },
                      {
                        name: "Sarah Parker",
                        initials: "SP",
                        sales: 3853,
                        orders: 160,
                        percent: 67,
                        change: "-15%",
                      },
                    ].map((staff, index) => (
                      <div key={index} className="flex items-center">
                        <div className="bg-blue-100 w-10 h-10 rounded-full flex items-center justify-center mr-3 text-blue-600 font-bold">
                          {staff.initials}
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-center mb-1">
                            <div className="font-medium">{staff.name}</div>
                            <div className="text-sm font-medium">
                              ${staff.sales}
                            </div>
                          </div>
                          <Progress value={staff.percent} className="h-2" />
                          <div className="flex justify-between items-center mt-1">
                            <div className="text-xs text-gray-500">
                              {staff.orders} orders
                            </div>
                            <div
                              className={`text-xs ${
                                staff.change.startsWith("+")
                                  ? "text-blue-600"
                                  : "text-gray-500"
                              }`}
                            >
                              {staff.change} vs avg
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Customer Satisfaction, Inventory, Labor Analysis */}
            <div className="p-4 grid grid-cols-3 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <CardTitle>Customer Satisfaction</CardTitle>
                    <Button variant="link" className="text-blue-600 p-0 h-auto">
                      View All
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-center items-center mb-4">
                    <div className="relative">
                      <div className="flex items-center justify-center">
                        <svg viewBox="0 0 36 36" className="w-28 h-28">
                          <path
                            className="text-gray-200 fill-current"
                            d="M18 2.0845
                          a 15.9155 15.9155 0 0 1 0 31.831
                          a 15.9155 15.9155 0 0 1 0 -31.831"
                          />
                          <path
                            className="text-blue-600 fill-current"
                            strokeDasharray="85, 100"
                            d="M18 2.0845
                          a 15.9155 15.9155 0 0 1 0 31.831
                          a 15.9155 15.9155 0 0 1 0 -31.831"
                          />
                        </svg>
                        <div className="absolute text-center">
                          <div className="text-3xl font-bold">4.2</div>
                          <div className="text-xs text-gray-500">out of 5</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    {[
                      { stars: 5, percent: 52 },
                      { stars: 4, percent: 28 },
                      { stars: 3, percent: 12 },
                      { stars: 2, percent: 6 },
                      { stars: 1, percent: 2 },
                    ].map((rating) => (
                      <div
                        key={rating.stars}
                        className="flex items-center gap-2"
                      >
                        <div className="text-sm w-12">{rating.stars} stars</div>
                        <div className="flex-1">
                          <Progress value={rating.percent} className="h-2" />
                        </div>
                        <div className="text-sm w-8">{rating.percent}%</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <CardTitle>Inventory Alerts</CardTitle>
                    <Button variant="link" className="text-blue-600 p-0 h-auto">
                      View All
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      { name: "Fresh Salmon", amount: "0.8kg" },
                      { name: "Truffle Oil", amount: "50ml" },
                    ].map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between pb-2 border-b"
                      >
                        <div className="flex items-center">
                          <div className="bg-gray-100 w-10 h-10 rounded-md flex items-center justify-center mr-3 text-gray-600">
                            {item.name.charAt(0)}
                          </div>
                          <div>
                            <div className="font-medium">{item.name}</div>
                            <div className="text-xs text-gray-500">
                              Low Stock ({item.amount})
                            </div>
                          </div>
                        </div>
                        <Button size="sm" variant="outline" className="text-xs">
                          Order Now
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <CardTitle>Labor Analysis</CardTitle>
                    <CardDescription>April 6 - April 12, 2025</CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-2 mb-4">
                    <div className="p-3 border rounded-lg">
                      <div className="text-sm text-gray-500 mb-1">
                        Labor Cost
                      </div>
                      <div className="text-xl font-bold">$5,218</div>
                      <div className="text-xs text-gray-500">
                        28.5% of revenue
                      </div>
                    </div>
                    <div className="p-3 border rounded-lg">
                      <div className="text-sm text-gray-500 mb-1">
                        Total Hours
                      </div>
                      <div className="text-xl font-bold">352</div>
                      <div className="text-xs text-blue-600">
                        -3.2% vs last week
                      </div>
                    </div>
                    <div className="p-3 border rounded-lg">
                      <div className="text-sm text-gray-500 mb-1">
                        Sales Per Labor Hour
                      </div>
                      <div className="text-xl font-bold">$52.06</div>
                      <div className="text-xs text-blue-600">
                        +4.8% vs last week
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <div className="text-sm font-medium mb-2">
                        Staff Hours by Position
                      </div>
                      <canvas ref={staffHoursChartRef} height="130"></canvas>
                    </div>
                    <div>
                      <div className="text-sm font-medium mb-2">
                        Labor Cost by Day
                      </div>
                      <canvas ref={laborCostChartRef} height="130"></canvas>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
      </div>
    </div>
  );
}
