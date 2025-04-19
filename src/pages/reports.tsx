import { useEffect, useRef } from "react";
import { Chart } from "chart.js/auto";

export default function Reports() {
  const salesChartRef = useRef<HTMLCanvasElement | null>(null);
  const categoryChartRef = useRef<HTMLCanvasElement | null>(null);
  const hourfsChartRef = useRef<HTMLCanvasElement | null>(null);
  const stafHoursChartRef = useRef<HTMLCanvasElement | null>(null);
  const laborCostChartRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (salesChartRef.current == null) return;
    const salesCtx = salesChartRef.current.getContext("2d");
    if (salesCtx == null) return;
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
            borderColor: "rgb(249, 115, 22)",
            backgroundColor: "rgba(249, 115, 22, 0.1)",
            fill: true,
            tension: 0.3,
            yAxisID: "y",
          },
          {
            label: "Orders",
            data: [102, 94, 112, 123, 145, 156, 100],
            borderColor: "rgb(59, 130, 246)",
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
  }, [salesChartRef]);

  // Category Performance Chart
  useEffect(() => {
    if (categoryChartRef.current == null) return;
    const categoryCtx = categoryChartRef.current.getContext("2d");
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
            backgroundColor: [
              "rgba(249, 115, 22, 0.8)",
              "rgba(59, 130, 246, 0.8)",
              "rgba(16, 185, 129, 0.8)",
              "rgba(139, 92, 246, 0.8)",
              "rgba(244, 63, 94, 0.8)",
            ],
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
  }, [categoryChartRef]);

  // Peak Hours Chart
  useEffect(() => {
    if (hourfsChartRef.current == null) return;
    const hoursCtx = hourfsChartRef.current.getContext("2d");
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
            backgroundColor: "rgba(59, 130, 246, 0.7)",
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
  }, [hourfsChartRef]);

  // Staff Hours Chart
  useEffect(() => {
    if (stafHoursChartRef.current == null) return;
    const staffHoursCtx = stafHoursChartRef.current.getContext("2d");
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
            backgroundColor: [
              "rgba(59, 130, 246, 0.8)",
              "rgba(16, 185, 129, 0.8)",
              "rgba(249, 115, 22, 0.8)",
              "rgba(139, 92, 246, 0.8)",
              "rgba(244, 63, 94, 0.8)",
            ],
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
  }, [stafHoursChartRef]);

  // Labor Cost Chart
  useEffect(() => {
    if (laborCostChartRef.current == null) return;
    const laborCostCtx = laborCostChartRef.current.getContext("2d");
    const laborCostChart = new Chart(laborCostCtx, {
      type: "bar",
      data: {
        labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        datasets: [
          {
            label: "Labor Cost",
            data: [620, 580, 650, 710, 890, 950, 818],
            backgroundColor: "rgba(16, 185, 129, 0.7)",
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
  }, [laborCostChartRef]);

  return (
    <div className="flex-1">
      <div className="p-4 border-b">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Reports & Analytics</h2>

          <div className="flex items-center gap-3">
            <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-md flex items-center gap-2">
              <i className="fas fa-download"></i>
              Export
            </button>
            <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-md flex items-center gap-2">
              <i className="fas fa-print"></i>
              Print
            </button>
            <button className="bg-orange-400 text-white px-4 py-2 rounded-md flex items-center gap-2">
              <i className="fas fa-share"></i>
              Share
            </button>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="relative">
              <select className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                <option>Last 7 days</option>
                <option>Last 30 days</option>
                <option>Last quarter</option>
                <option>Last year</option>
                <option>Custom range</option>
              </select>
            </div>

            <div className="relative">
              <select className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                <option>All locations</option>
                <option>Louvre Opera</option>
                <option>Champs-Élysées</option>
                <option>Montmartre</option>
              </select>
            </div>

            <button className="bg-gray-100 px-3 py-2 rounded-md">
              <i className="fas fa-filter"></i>
              More Filters
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button className="bg-gray-100 px-3 py-2 rounded-md active">
              Daily
            </button>
            <button className="px-3 py-2 rounded-md">Weekly</button>
            <button className="px-3 py-2 rounded-md">Monthly</button>
          </div>
        </div>
      </div>

      <div className="h-screen overflow-auto mb-6">
        <div className="grid grid-cols-4 gap-4 p-4">
          <div className="bg-white rounded-lg p-4 border shadow-sm">
            <div className="flex justify-between items-start mb-2">
              <div className="text-gray-500 text-sm">Total Revenue</div>
              <div className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full">
                +12.5%
              </div>
            </div>
            <div className="text-2xl font-bold mb-1">$18,325</div>
            <div className="text-xs text-gray-500">vs $16,294 last period</div>
          </div>

          <div className="bg-white rounded-lg p-4 border shadow-sm">
            <div className="flex justify-between items-start mb-2">
              <div className="text-gray-500 text-sm">Total Orders</div>
              <div className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full">
                +8.2%
              </div>
            </div>
            <div className="text-2xl font-bold mb-1">832</div>
            <div className="text-xs text-gray-500">vs 769 last period</div>
          </div>

          <div className="bg-white rounded-lg p-4 border shadow-sm">
            <div className="flex justify-between items-start mb-2">
              <div className="text-gray-500 text-sm">Average Order Value</div>
              <div className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full">
                +3.9%
              </div>
            </div>
            <div className="text-2xl font-bold mb-1">$22.03</div>
            <div className="text-xs text-gray-500">vs $21.19 last period</div>
          </div>

          <div className="bg-white rounded-lg p-4 border shadow-sm">
            <div className="flex justify-between items-start mb-2">
              <div className="text-gray-500 text-sm">Table Turnover Rate</div>
              <div className="bg-red-100 text-red-700 text-xs px-2 py-1 rounded-full">
                -2.1%
              </div>
            </div>
            <div className="text-2xl font-bold mb-1">3.7x</div>
            <div className="text-xs text-gray-500">vs 3.78x last period</div>
          </div>
        </div>

        <div className="p-4 grid grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-lg border shadow-sm col-span-2">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold">Revenue & Orders</h3>
              <div className="text-sm text-gray-500">
                April 6 - April 12, 2025
              </div>
            </div>
            <canvas ref={salesChartRef} className="max-h-96"></canvas>
          </div>
        </div>

        <div className="p-4 grid grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-lg border shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold">Top Selling Items</h3>
              <button className="text-sm text-orange-500">View All</button>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between pb-2 border-b">
                <div className="flex items-center">
                  <div className="bg-orange-100 w-10 h-10 rounded-md flex items-center justify-center mr-3">
                    <i className="fas fa-hamburger text-orange-500"></i>
                  </div>
                  <div>
                    <div className="font-medium">Wagyu Burger</div>
                    <div className="text-xs text-gray-500">237 orders</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-medium">$4,740</div>
                  <div className="text-xs text-gray-500">25.9% of sales</div>
                </div>
              </div>

              <div className="flex items-center justify-between pb-2 border-b">
                <div className="flex items-center">
                  <div className="bg-orange-100 w-10 h-10 rounded-md flex items-center justify-center mr-3">
                    <i className="fas fa-fish text-orange-500"></i>
                  </div>
                  <div>
                    <div className="font-medium">Grilled Salmon</div>
                    <div className="text-xs text-gray-500">192 orders</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-medium">$3,840</div>
                  <div className="text-xs text-gray-500">21.0% of sales</div>
                </div>
              </div>

              <div className="flex items-center justify-between pb-2 border-b">
                <div className="flex items-center">
                  <div className="bg-orange-100 w-10 h-10 rounded-md flex items-center justify-center mr-3">
                    <i className="fas fa-pizza-slice text-orange-500"></i>
                  </div>
                  <div>
                    <div className="font-medium">Truffle Pizza</div>
                    <div className="text-xs text-gray-500">168 orders</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-medium">$2,940</div>
                  <div className="text-xs text-gray-500">16.0% of sales</div>
                </div>
              </div>

              <div className="flex items-center justify-between pb-2 border-b">
                <div className="flex items-center">
                  <div className="bg-orange-100 w-10 h-10 rounded-md flex items-center justify-center mr-3">
                    <i className="fas fa-glass-martini-alt text-orange-500"></i>
                  </div>
                  <div>
                    <div className="font-medium">Craft Cocktails</div>
                    <div className="text-xs text-gray-500">143 orders</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-medium">$1,716</div>
                  <div className="text-xs text-gray-500">9.4% of sales</div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="bg-orange-100 w-10 h-10 rounded-md flex items-center justify-center mr-3">
                    <i className="fas fa-ice-cream text-orange-500"></i>
                  </div>
                  <div>
                    <div className="font-medium">Dessert Platter</div>
                    <div className="text-xs text-gray-500">132 orders</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-medium">$1,320</div>
                  <div className="text-xs text-gray-500">7.2% of sales</div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg border shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold">Category Performance</h3>
              <button className="text-sm text-orange-500">View All</button>
            </div>
            <canvas ref={categoryChartRef} className="max-h-96"></canvas>
          </div>
        </div>

        <div className="p-4 grid grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-lg border shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold">Peak Hours</h3>
              <div className="text-sm text-gray-500">Last 7 days average</div>
            </div>
            <canvas ref={hourfsChartRef} className="max-h-96"></canvas>
          </div>

          <div className="bg-white p-4 rounded-lg border shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold">Staff Performance</h3>
              <button className="text-sm text-orange-500">View All</button>
            </div>
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="bg-blue-100 w-10 h-10 rounded-full flex items-center justify-center mr-3 text-blue-600 font-bold">
                  JS
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-1">
                    <div className="font-medium">Jane Smith</div>
                    <div className="text-sm font-medium">$5,240</div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: "92%" }}
                    ></div>
                  </div>
                  <div className="flex justify-between items-center mt-1">
                    <div className="text-xs text-gray-500">248 orders</div>
                    <div className="text-xs text-green-600">+12% vs avg</div>
                  </div>
                </div>
              </div>

              <div className="flex items-center">
                <div className="bg-purple-100 w-10 h-10 rounded-full flex items-center justify-center mr-3 text-purple-600 font-bold">
                  MJ
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-1">
                    <div className="font-medium">Mark Johnson</div>
                    <div className="text-sm font-medium">$4,920</div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-purple-600 h-2 rounded-full"
                      style={{ width: "86%" }}
                    ></div>
                  </div>
                  <div className="flex justify-between items-center mt-1">
                    <div className="text-xs text-gray-500">226 orders</div>
                    <div className="text-xs text-green-600">+5% vs avg</div>
                  </div>
                </div>
              </div>

              <div className="flex items-center">
                <div className="bg-green-100 w-10 h-10 rounded-full flex items-center justify-center mr-3 text-green-600 font-bold">
                  AL
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-1">
                    <div className="font-medium">Alex Lee</div>
                    <div className="text-sm font-medium">$4,312</div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-green-600 h-2 rounded-full"
                      style={{ width: "75%" }}
                    ></div>
                  </div>
                  <div className="flex justify-between items-center mt-1">
                    <div className="text-xs text-gray-500">198 orders</div>
                    <div className="text-xs text-gray-500">-2% vs avg</div>
                  </div>
                </div>
              </div>

              <div className="flex items-center">
                <div className="bg-red-100 w-10 h-10 rounded-full flex items-center justify-center mr-3 text-red-600 font-bold">
                  SP
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-1">
                    <div className="font-medium">Sarah Parker</div>
                    <div className="text-sm font-medium">$3,853</div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-red-600 h-2 rounded-full"
                      style={{ width: "67%" }}
                    ></div>
                  </div>
                  <div className="flex justify-between items-center mt-1">
                    <div className="text-xs text-gray-500">160 orders</div>
                    <div className="text-xs text-red-600">-15% vs avg</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 grid grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-lg border shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold">Customer Satisfaction</h3>
              <button className="text-sm text-orange-500">View All</button>
            </div>
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
                      className="text-green-500 fill-current"
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
              <div className="flex items-center gap-2">
                <div className="text-sm">5 stars</div>
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-green-500 h-2 rounded-full"
                    style={{ width: "52%" }}
                  ></div>
                </div>
                <div className="text-sm">52%</div>
              </div>
              <div className="flex items-center gap-2">
                <div className="text-sm">4 stars</div>
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-green-500 h-2 rounded-full"
                    style={{ width: "28%" }}
                  ></div>
                </div>
                <div className="text-sm">28%</div>
              </div>
              <div className="flex items-center gap-2">
                <div className="text-sm">3 stars</div>
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-green-500 h-2 rounded-full"
                    style={{ width: "12%" }}
                  ></div>
                </div>
                <div className="text-sm">12%</div>
              </div>
              <div className="flex items-center gap-2">
                <div className="text-sm">2 stars</div>
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-green-500 h-2 rounded-full"
                    style={{ width: "6%" }}
                  ></div>
                </div>
                <div className="text-sm">6%</div>
              </div>
              <div className="flex items-center gap-2">
                <div className="text-sm">1 star</div>
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-green-500 h-2 rounded-full"
                    style={{ width: "2%" }}
                  ></div>
                </div>
                <div className="text-sm">2%</div>
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg border shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold">Inventory Alerts</h3>
              <button className="text-sm text-orange-500">View All</button>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between pb-2 border-b">
                <div className="flex items-center">
                  <div className="bg-red-100 w-10 h-10 rounded-md flex items-center justify-center mr-3">
                    <i className="fas fa-exclamation-triangle text-red-500"></i>
                  </div>
                  <div>
                    <div className="font-medium">Fresh Salmon</div>
                    <div className="text-xs text-red-500">
                      Low Stock (0.8kg)
                    </div>
                  </div>
                </div>
                <button className="text-xs text-white bg-red-500 px-2 py-1 rounded">
                  Order Now
                </button>
              </div>

              <div className="flex items-center justify-between pb-2 border-b">
                <div className="flex items-center">
                  <div className="bg-red-100 w-10 h-10 rounded-md flex items-center justify-center mr-3">
                    <i className="fas fa-exclamation-triangle text-red-500"></i>
                  </div>
                  <div>
                    <div className="font-medium">Truffle Oil</div>
                    <div className="text-xs text-red-500">Low Stock (50ml)</div>
                  </div>
                </div>
                <button className="text-xs text-white bg-red-500 px-2 py-1 rounded">
                  Order Now
                </button>
              </div>

              <div className="flex items-center justify-between pb-2 border-b">
                <div className="flex items-center"></div>
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg border shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold">Labor Analysis</h3>
              <div className="text-sm text-gray-500">
                April 6 - April 12, 2025
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className="p-3 border rounded-lg">
                <div className="text-sm text-gray-500 mb-1">Labor Cost</div>
                <div className="text-xl font-bold">$5,218</div>
                <div className="text-xs text-gray-500">28.5% of revenue</div>
              </div>
              <div className="p-3 border rounded-lg">
                <div className="text-sm text-gray-500 mb-1">Total Hours</div>
                <div className="text-xl font-bold">352</div>
                <div className="text-xs text-green-600">-3.2% vs last week</div>
              </div>
              <div className="p-3 border rounded-lg">
                <div className="text-sm text-gray-500 mb-1">
                  Sales Per Labor Hour
                </div>
                <div className="text-xl font-bold">$52.06</div>
                <div className="text-xs text-green-600">+4.8% vs last week</div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-sm font-medium mb-2">
                  Staff Hours by Position
                </div>
                <canvas ref={stafHoursChartRef} height="200"></canvas>
              </div>
              <div>
                <div className="text-sm font-medium mb-2">
                  Labor Cost by Day
                </div>
                <canvas ref={laborCostChartRef} height="200"></canvas>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
