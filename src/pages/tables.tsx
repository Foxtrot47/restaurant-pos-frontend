export default function TablesPage() {
  return (
    <>
      <div className="w-2/3 border-r h-screen">
        <div className="p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Floor Plan</h2>
            <div className="flex items-center gap-3">
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-green-500 mr-1"></div>
                <span className="text-xs text-gray-500">Available</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-red-500 mr-1"></div>
                <span className="text-xs text-gray-500">Occupied</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-blue-500 mr-1"></div>
                <span className="text-xs text-gray-500">Reserved</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-yellow-500 mr-1"></div>
                <span className="text-xs text-gray-500">Needs Cleaning</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 mb-4">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg
                  className="h-5 w-5 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Search by table number"
              />
            </div>

            <div className="relative">
              <select className="block w-32 pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                <option>Main Floor</option>
                <option>Outdoor</option>
                <option>Mezzanine</option>
              </select>
            </div>

            <button className="bg-orange-400 text-white px-4 py-2 rounded-md flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
              Add Table
            </button>
          </div>
        </div>

        <div className="tables-container px-4 pb-4 h-full" style={{ maxHeight: 'calc(100vh - 200px)' }}>
          <div className="relative bg-gray-100 rounded-lg p-4 h-full min-h-full">
            <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-gray-300 px-4 py-2 rounded-md text-sm text-center">
              <i className="fas fa-door-open mr-1"></i> Entrance
            </div>

            <div className="absolute top-20 right-8 bg-gray-300 p-3 rounded-md w-40 h-24 flex items-center justify-center">
              <span className="text-sm font-bold">Bar</span>
            </div>

            <div className="absolute bottom-8 left-8 bg-gray-300 p-3 rounded-md w-48 h-32 flex items-center justify-center">
              <span className="text-sm font-bold">Kitchen</span>
            </div>

            <div className="absolute top-24 left-16">
              <div className="bg-green-500 w-20 h-20 rounded-full flex items-center justify-center text-white font-bold shadow-md cursor-pointer hover:opacity-90">
                <div className="text-center">
                  <div>T1</div>
                  <div className="text-xs">4 seats</div>
                </div>
              </div>
            </div>

            <div className="absolute top-24 left-48">
              <div className="bg-red-500 w-20 h-20 rounded-full flex items-center justify-center text-white font-bold shadow-md cursor-pointer hover:opacity-90">
                <div className="text-center">
                  <div>T2</div>
                  <div className="text-xs">4 seats</div>
                </div>
              </div>
            </div>

            <div className="absolute top-24 left-80">
              <div className="bg-blue-500 w-20 h-20 rounded-full flex items-center justify-center text-white font-bold shadow-md cursor-pointer hover:opacity-90">
                <div className="text-center">
                  <div>T3</div>
                  <div className="text-xs">4 seats</div>
                </div>
              </div>
            </div>

            <div className="absolute top-56 left-24">
              <div className="bg-yellow-500 w-28 h-16 rounded-md flex items-center justify-center text-white font-bold shadow-md cursor-pointer hover:opacity-90">
                <div className="text-center">
                  <div>T4</div>
                  <div className="text-xs">2 seats</div>
                </div>
              </div>
            </div>

            <div className="absolute top-56 left-64">
              <div className="bg-red-500 w-28 h-16 rounded-md flex items-center justify-center text-white font-bold shadow-md cursor-pointer hover:opacity-90">
                <div className="text-center">
                  <div>T5</div>
                  <div className="text-xs">2 seats</div>
                </div>
              </div>
            </div>

            <div className="absolute top-86 left-16">
              <div className="bg-green-500 w-40 h-20 rounded-md flex items-center justify-center text-white font-bold shadow-md cursor-pointer hover:opacity-90">
                <div className="text-center">
                  <div>T6</div>
                  <div className="text-xs">6 seats</div>
                </div>
              </div>
            </div>

            <div className="absolute top-86 left-64">
              <div className="bg-green-500 w-40 h-20 rounded-md flex items-center justify-center text-white font-bold shadow-md cursor-pointer hover:opacity-90">
                <div className="text-center">
                  <div>T7</div>
                  <div className="text-xs">6 seats</div>
                </div>
              </div>
            </div>

            <div className="absolute top-48 right-36">
              <div className="bg-red-500 w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-xs shadow-md cursor-pointer hover:opacity-90">
                B1
              </div>
            </div>

            <div className="absolute top-48 right-20">
              <div className="bg-green-500 w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-xs shadow-md cursor-pointer hover:opacity-90">
                B2
              </div>
            </div>

            <div className="absolute top-48 right-6">
              <div className="bg-green-500 w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-xs shadow-md cursor-pointer hover:opacity-90">
                B3
              </div>
            </div>

            <div className="absolute bottom-28 right-32">
              <div className="bg-blue-500 w-56 h-24 rounded-lg flex items-center justify-center text-white font-bold shadow-md cursor-pointer hover:opacity-90">
                <div className="text-center">
                  <div>T8</div>
                  <div className="text-xs">8 seats</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-1/3 p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Table Details</h2>
          <div className="flex items-center gap-2">
            <div className="flex items-center bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm">
              <span className="h-2 w-2 bg-red-500 rounded-full mr-2"></span>
              Occupied
            </div>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="font-semibold mb-1">Table 2</h3>
          <p className="text-sm text-gray-500 mb-1">Main Floor • 4 Seats</p>
          <p className="text-sm text-gray-500">
            Occupied since: <span className="font-medium">5:30 PM</span> (37
            min)
          </p>
        </div>

        <div className="mb-6 border rounded-lg p-4">
          <h3 className="font-semibold mb-2">Current Order</h3>
          <div className="flex items-center gap-2 mb-2">
            <div className="bg-orange-200 rounded-md w-8 h-8 flex items-center justify-center text-orange-600 font-medium">
              A4
            </div>
            <div>
              <h3 className="font-semibold text-sm">Order #ID945632</h3>
              <p className="text-xs text-gray-500">Ariel Hikmat • 2 guests</p>
            </div>
          </div>

          <div className="text-sm">
            <div className="flex justify-between items-center mt-2 text-gray-600">
              <span>Items: 3</span>
              <span>$87.34</span>
            </div>
            <div className="flex justify-between items-center mt-1 text-gray-600">
              <span>Status:</span>
              <span className="text-blue-600">Food being prepared</span>
            </div>
            <button className="w-full mt-3 border border-orange-400 text-orange-500 rounded-md py-1 text-sm">
              View Order Details
            </button>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="font-semibold mb-2">Actions</h3>
          <div className="grid grid-cols-2 gap-3">
            <button className="bg-orange-400 text-white rounded-md py-2 text-sm font-medium">
              <i className="fas fa-utensils mr-1"></i> New Order
            </button>
            <button className="bg-green-500 text-white rounded-md py-2 text-sm font-medium">
              <i className="fas fa-dollar-sign mr-1"></i> Pay Bill
            </button>
            <button className="border border-gray-300 text-gray-700 rounded-md py-2 text-sm font-medium">
              <i className="fas fa-user-plus mr-1"></i> Change Guests
            </button>
            <button className="border border-gray-300 text-gray-700 rounded-md py-2 text-sm font-medium">
              <i className="fas fa-exchange-alt mr-1"></i> Transfer
            </button>
            <button className="border border-gray-300 text-gray-700 rounded-md py-2 text-sm font-medium"> 
              <i className="fas fa-broom mr-1"></i> Mark for Cleaning
            </button>
            <button className="border border-gray-300 text-gray-700 rounded-md py-2 text-sm font-medium">
              <i className="fas fa-calendar-alt mr-1"></i> Reserve
            </button>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="font-semibold mb-2">Reservation History</h3>
          <div className="text-sm border rounded-lg divide-y">
            <div className="p-3">
              <div className="flex justify-between">
                <span className="font-medium">John Davis</span>
                <span className="text-gray-500">Today</span>
              </div>
              <div className="flex justify-between text-gray-600 mt-1">
                <span>12:30 PM - 2:00 PM</span>
                <span>4 guests</span>
              </div>
            </div>
            <div className="p-3">
              <div className="flex justify-between">
                <span className="font-medium">Sarah Miller</span>
                <span className="text-gray-500">Today</span>
              </div>
              <div className="flex justify-between text-gray-600 mt-1">
                <span>2:30 PM - 4:00 PM</span>
                <span>2 guests</span>
              </div>
            </div>
            <div className="p-3">
              <div className="flex justify-between">
                <span className="font-medium">Ariel Hikmat</span>
                <span className="text-gray-500">Today</span>
              </div>
              <div className="flex justify-between text-gray-600 mt-1">
                <span>5:30 PM - 7:00 PM</span>
                <span>2 guests</span>
              </div>
              <div className="mt-1 text-green-600 text-xs">
                <i className="fas fa-check-circle mr-1"></i> Current customer
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex gap-2">
          <button className="flex-1 bg-orange-400 text-white rounded-md py-3 font-medium">
            Edit Table
          </button>
          <button className="p-3 border border-gray-300 rounded-md">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-gray-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
              />
            </svg>
          </button>
        </div>
      </div>
    </>
  );
}
