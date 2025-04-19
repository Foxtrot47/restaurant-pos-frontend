import { Link, Outlet } from "react-router";

export default function Layout() {
  return (
    <div className="bg-white w-full rounded-t-3xl shadow-lg overflow-hidden" style={{ maxHeight: "100vh"}}>
      <div className="flex justify-between items-center p-4 border-b max-h-16">
        <div className="flex items-center">
          <div className="bg-orange-500 rounded-full p-2 mr-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
          </div>
          <span className="font-bold text-lg">EATS BITS</span>
          <div className="ml-4 text-gray-400">
          </div>
        </div>

        <div className="flex gap-4 items-center">
          <button className="p-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-gray-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>
          </button>
          <div className="flex items-center gap-2">
            <div className="bg-orange-400 rounded-full w-10 h-10 flex items-center justify-center text-white font-semibold">
              JD
            </div>
            <div>
              <p className="font-semibold text-sm">John Doe</p>
              <p className="text-xs text-gray-500">Admin</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex w-full">
        <div className="w-64 border-r">
          <ul className="py-4">
            <li className="px-4 py-3 mx-2 mb-2 bg-orange-50 text-orange-500 rounded-lg">
              <Link to={"/orders"} className="flex items-center gap-3">
                <i className="fas fa-clipboard-list"></i>
                <span>Orders</span>
              </Link>
            </li>
            <li className="px-4 py-3 mx-2 mb-2 text-gray-600 hover:bg-gray-100 rounded-lg">
              <Link to={"/tables"} className="flex items-center gap-3">
                <i className="fas fa-utensils"></i>
                <span>Table</span>
              </Link>
            </li>
            <li className="px-4 py-3 mx-2 mb-2 text-gray-600 hover:bg-gray-100 rounded-lg">
              <Link to={"/reports"} className="flex items-center gap-3">
                <i className="fas fa-users"></i>
                <span>Reports</span>
              </Link>
            </li>
          </ul>
        </div>

        <Outlet />
      </div>
    </div>
  );
}
