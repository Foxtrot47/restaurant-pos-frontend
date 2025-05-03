// OrderDetailSmallCard.tsx
import type { Order } from "../data/orders";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

const getStatusColor = (status: string) => {
  // Simplified color system - all using variations of blue and gray
  const statusColors = {
    "Completed": "bg-blue-50 text-blue-600 border-blue-200",
    "Preparing": "bg-blue-100 text-blue-600 border-blue-200",
    "Pending": "bg-gray-100 text-gray-700 border-gray-200",
    "Cancelled": "bg-gray-200 text-gray-700 border-gray-300",
  };
  
  return statusColors[status as keyof typeof statusColors] || "bg-gray-100 text-gray-600 border-gray-200";
};

export default function OrderDetailSmallCard({ order }: { order: Order }) {
  return (
    <Card className="hover:shadow-md transition-shadow cursor-pointer">
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <div className="flex items-start gap-3">
            <div className={`w-8 h-8 rounded-md flex items-center justify-center font-medium ${getStatusColor(order.status)}`}>
              B1
            </div>
            <div>
              <h4 className="font-medium">{order.customerName}</h4>
              <p className="text-xs text-muted-foreground">#{order.id}</p>
            </div>
          </div>
          <p className="text-xs text-muted-foreground">{order.dateTime}</p>
        </div>

        <div className="mt-3">
          <p className="text-sm font-medium">
            {order.items?.length || 2} items • ${order.total || "45.50"}
          </p>
          <p className="text-xs text-muted-foreground mt-1 truncate max-w-[280px]">
            {order.items?.map(item => item.name).join(", ") || "Caesar Salad, Iced Tea"}
          </p>
        </div>
      </CardContent>

      <CardFooter className="px-4 pb-4 pt-0 gap-2">
        <Button 
          variant="outline" 
          size="sm" 
          className="flex-1"
          onClick={(e) => {
            e.stopPropagation();
            // Cancel order logic
          }}
        >
          Cancel
        </Button>
        
        {order.status === "Pending" && (
          <Button 
            variant="default" 
            size="sm" 
            className="flex-1 bg-blue-600 hover:bg-blue-700"
            onClick={(e) => {
              e.stopPropagation();
              // Accept order logic
            }}
          >
            Accept
          </Button>
        )}
        
        {order.status === "Preparing" && (
          <Button 
            variant="default"
            size="sm" 
            className="flex-1 bg-blue-600 hover:bg-blue-700"
            onClick={(e) => {
              e.stopPropagation();
              // Complete order logic
            }}
          >
            Complete
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}