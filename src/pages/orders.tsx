import OrderDetailSmallCard from "../components/OrderDetailSmallCard";
import { dummyOrders } from "../data/orders";

export default function OrdersPage() {
  return (
    <>
      <div className="w-3/4 border-r overflow-auto h-screen">
        <div className="p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Orders</h2>
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
                placeholder="Search by name, order or etc"
              />
            </div>

            <div className="relative">
              <select className="block w-36 pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                <option>All</option>
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
              New Order
            </button>
          </div>
        </div>

        <div className="px-4 pb-4 grid grid-cols-2 gap-4">
        {
          dummyOrders.map(dummyorder => (
            <OrderDetailSmallCard order={dummyorder}  />
          ))
        }
        </div>
      </div>

      <div className="w-1/3 p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Order Details</h2>
          <div className="flex items-center gap-2">
            <div className="flex items-center bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm">
              <span className="h-2 w-2 bg-green-500 rounded-full mr-2"></span>
              Completed
            </div>
            <button className="text-gray-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="font-semibold mb-1">Recipient: Ariel Hikmat</h3>
          <p className="text-sm text-gray-500 mb-1">
            Wed, July 12,2024 at 06:12 PM
          </p>
          <p className="text-sm text-gray-500">#ID945252</p>
        </div>

        <div className="space-y-4">
          <div className="flex gap-4">
            <div className="w-16 h-16 bg-gray-100 rounded-md overflow-hidden flex items-center justify-center">
              <img
                src="/api/placeholder/64/64"
                alt="Cheeseburger"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1">
              <h4 className="font-semibold">classNameic Cheeseburger</h4>
              <p className="text-xs text-gray-500">Category: Fastfood</p>
              <p className="text-xs text-gray-500">Note: Less Onion</p>
              <p className="font-semibold mt-1">$10.99</p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="w-16 h-16 bg-gray-100 rounded-md overflow-hidden flex items-center justify-center">
              <img
                src="/api/placeholder/64/64"
                alt="Fish and Chips"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1">
              <h4 className="font-semibold">Fish and Chips</h4>
              <p className="text-xs text-gray-500">Category: Fastfood</p>
              <p className="font-semibold mt-1">2× $10.99</p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="w-16 h-16 bg-gray-100 rounded-md overflow-hidden flex items-center justify-center">
              <img
                src="/api/placeholder/64/64"
                alt="Greek Gyro"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1">
              <h4 className="font-semibold">Greek Gyro Plate</h4>
              <p className="text-xs text-gray-500">Category: Drink</p>
              <p className="text-xs text-gray-500">Note: Less Ice</p>
              <p className="font-semibold mt-1">$13.99</p>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <div className="flex justify-between text-sm mb-2">
            <span>Items (3)</span>
            <span>$57.87</span>
          </div>
          <div className="flex justify-between text-sm mb-4">
            <span>Tax (10%)</span>
            <span>$5.79</span>
          </div>
          <div className="flex justify-between font-semibold text-lg border-t pt-4">
            <span>Total</span>
            <span>$63.66</span>
          </div>
        </div>

        <div className="mt-6 flex gap-2">
          <button className="flex-1 bg-orange-400 text-white rounded-md py-3 font-medium">
            Print Bill
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
