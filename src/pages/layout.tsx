// Layout.tsx
import { useState } from "react";
import { Link, Outlet, useLocation } from "react-router";
import { 
  ChevronLeft, 
  ChevronRight, 
  Bolt, 
  Bell, 
  ClipboardList, 
  UtensilsCrossed,
  BarChart4,
  Settings,
  Users,
  ShoppingCart
} from "lucide-react";
import { 
  Avatar, 
  AvatarFallback, 
  AvatarImage 
} from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

export default function Layout() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  const navItems = [
    { path: "/dashboard", label: "Dashboard", icon: <BarChart4 size={20} /> },
    { path: "/orders", label: "Orders", icon: <ClipboardList size={20} /> },
    { path: "/tables", label: "Tables", icon: <UtensilsCrossed size={20} /> },
    { path: "/menu", label: "Menu", icon: <ShoppingCart size={20} /> },
    { path: "/reports", label: "Reports", icon: <Users size={20} /> },
  ];

  const isActive = (path: string) => {
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen bg-white overflow-hidden flex">
      {/* Sidebar */}
      <aside 
        className={cn(
          "bg-white border-r transition-all duration-300 flex flex-col",
          collapsed ? "w-16" : "w-64"
        )}
      >
        {/* Logo */}
        <div className={cn(
          "h-16 border-b flex items-center px-4",
          collapsed ? "justify-center" : "justify-between"
        )}>
          {!collapsed && (
            <div className="flex items-center gap-2">
              <div className="bg-blue-600 rounded-full p-2 flex items-center justify-center">
                <Bolt className="h-5 w-5 text-white" />
              </div>
              <span className="font-bold text-lg">EATS BITS</span>
            </div>
          )}
          {collapsed && (
            <div className="bg-blue-600 rounded-full p-2 flex items-center justify-center">
              <Bolt className="h-5 w-5 text-white" />
            </div>
          )}
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setCollapsed(!collapsed)}
            className={collapsed ? "hidden" : ""}
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-4">
          <TooltipProvider delayDuration={0}>
            <ul className="space-y-1">
              {navItems.map((item) => (
                <li key={item.path}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Link
                        to={item.path}
                        className={cn(
                          "flex items-center gap-3 px-4 py-3 mx-2 rounded-md transition-colors",
                          isActive(item.path) 
                            ? "bg-blue-50 text-blue-600" 
                            : "text-gray-600 hover:bg-gray-100",
                          collapsed && "justify-center px-2"
                        )}
                      >
                        <span>{item.icon}</span>
                        {!collapsed && <span>{item.label}</span>}
                      </Link>
                    </TooltipTrigger>
                    {collapsed && (
                      <TooltipContent side="right">
                        {item.label}
                      </TooltipContent>
                    )}
                  </Tooltip>
                </li>
              ))}
            </ul>
          </TooltipProvider>
        </nav>

        {/* Collapse/Expand button at bottom */}
        <div className="p-4 border-t">
          <Button 
            variant="outline" 
            onClick={() => setCollapsed(!collapsed)} 
            className={cn(
              "w-full justify-center",
              collapsed && "p-2"
            )}
          >
            {collapsed ? <ChevronRight className="h-5 w-5" /> : "Collapse"}
          </Button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-16 px-4 border-b flex items-center justify-end">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-0 right-0 h-2 w-2 bg-blue-600 rounded-full" />
            </Button>
            
            <div className="flex items-center gap-2">
              <Avatar>
                <AvatarImage src="/avatar.png" alt="John Doe" />
                <AvatarFallback className="bg-blue-600 text-white">JD</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium">John Doe</p>
                <p className="text-xs text-muted-foreground">Admin</p>
              </div>
            </div>
          </div>
        </header>

        {/* Main content area */}
        <main className="flex-1 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}