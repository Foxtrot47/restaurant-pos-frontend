export const dummyOrders: Order[] = [
  {
    id: "DD945252",
    customerName: "Ariel Hikmat",
    dateTime: "Wed, July 12 2024, 06:12 PM",
    status: "Accepted", // 'Accepted', 'Completed', 'Pending', etc.
    items: [
      { name: "Scrambled eggs with toas", quantity: 1, price: 16.99 },
      { name: "Smoked Salmon Bagel", quantity: 2, price: 38.98 }, // Price seems per item, adjust if needed
      { name: "Classic Lemonade", quantity: 1, price: 10.99 },
    ],
    total: 66.96, // Calculated or from source
  },
  {
    id: "DD945253", // Different ID for uniqueness
    customerName: "Ariel Hikmat",
    dateTime: "Wed, July 12 2024, 06:12 PM",
    status: "Completed",
    items: [
      {
        name: "Classic Cheeseburger",
        quantity: 1,
        price: 10.99,
        notes: "Note: Less Onion",
      },
      { name: "Fish and Chips", quantity: 2, price: 10.99, notes: "2x $10.99" },
      {
        name: "Greek Gyro Plate",
        quantity: 1,
        price: 13.99,
        category: "Fastfood",
      },
    ],
    total: 46.96,
    subtotal: 57.87, // These seem off in the image, recalculating based on items
    tax: 5.79,
    grandTotal: 63.66,
  },
  {
    id: "DD945254",
    customerName: "Ariel Hikmat",
    dateTime: "Wed, July 12 2024, 06:18 PM",
    status: "Pending", // Example status
    items: [
      { name: "Vegetarian Pad Thai", quantity: 1, price: 16.99 },
      { name: "Shrimp Tacos", quantity: 2, price: 19.49 },
      { name: "Belgian Waffles", quantity: 1, price: 38.98 },
    ],
    total: 75.46,
  },
  {
    id: "DD945255",
    customerName: "Paul Rey",
    dateTime: "Wed, July 12 2024, 06:18 PM",
    status: "Pending", // Example status
    items: [
      { name: "Margherita Pizza", quantity: 1, price: 16.99 },
      { name: "Belgian Waffles", quantity: 2, price: 38.98 },
      { name: "Virgin Mojito", quantity: 1, price: 16.99 },
    ],
    total: 97.95,
  },
  // Add more dummy orders as needed
];

export interface OrderItem {
  name: string;
  quantity: number;
  price: number;
  notes?: string; // Optional: Some items might have notes (e.g., "Less Onion")
  category?: string; // Optional: Some items might have a category (e.g., "Fastfood")
}

/**
 * Defines the possible statuses an order can have.
 * Using a union type improves type safety compared to just `string`.
 */
export type OrderStatus = "Accepted" | "Completed" | "Pending" | "Cancelled";
// Add any other potential statuses your system might use.
// If statuses can be dynamic or less predictable, you could use `string` instead,
// but the union type is generally preferred.

/**
 * Represents the main structure of a restaurant order.
 */
export interface Order {
  id: string; // Unique identifier for the order (e.g., "DD945252")
  customerName: string;
  dateTime: string; // Date and time of the order (could be `Date` type if needed, but string is often simpler for display)
  status: OrderStatus; // The current status of the order
  items: OrderItem[]; // An array containing the items in the order
  total: number; // The total calculated for the order card view
  subtotal?: number; // Optional: Detailed subtotal, often shown in details view for completed orders
  tax?: number; // Optional: Tax amount, often shown in details view
  grandTotal?: number; // Optional: The final total including tax, often shown in details view
}
