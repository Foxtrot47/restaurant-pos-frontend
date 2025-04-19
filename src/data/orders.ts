import { faker } from "@faker-js/faker";

/**
 * Generates a random order item
 */
function generateOrderItem(): OrderItem {
  const foodItems = [
    { name: "Classic Cheeseburger", category: "Fastfood" },
    { name: "Caesar Salad", category: "Salad" },
    { name: "Margherita Pizza", category: "Pizza" },
    { name: "Chicken Wings", category: "Appetizer" },
    { name: "Fish and Chips", category: "Fastfood" },
    { name: "Greek Gyro Plate", category: "Specialty" },
    { name: "Iced Tea", category: "Drink" },
    { name: "Lemonade", category: "Drink" },
    { name: "Chocolate Cake", category: "Dessert" },
    { name: "French Fries", category: "Side" },
  ];

  const randomFood = faker.helpers.arrayElement(foodItems);
  const quantity = faker.helpers.rangeToNumber({ min: 1, max: 3 });
  const price = parseFloat(faker.commerce.price({ min: 5, max: 15, dec: 2 }));

  // Only add notes sometimes
  const hasNotes = faker.datatype.boolean(0.3); // 30% chance of having notes
  const notes = hasNotes
    ? faker.helpers.arrayElement([
        "Less onion",
        "No mayo",
        "Extra cheese",
        "Well done",
        "Less ice",
        "No salt",
      ])
    : undefined;

  return {
    name: randomFood.name,
    quantity,
    price,
    notes,
    category: randomFood.category,
  };
}

/**
 * Calculates the total price for a collection of order items
 */
function calculateTotal(items: OrderItem[]): {
  subtotal: number;
  tax: number;
  grandTotal: number;
} {
  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const tax = subtotal * 0.1; // 10% tax
  const grandTotal = subtotal + tax;

  return {
    subtotal: parseFloat(subtotal.toFixed(2)),
    tax: parseFloat(tax.toFixed(2)),
    grandTotal: parseFloat(grandTotal.toFixed(2)),
  };
}

/**
 * Generates a specified number of random orders
 */
export function generateDummyOrders(count: number = 20): Order[] {
  const orders: Order[] = [];
  const statuses: OrderStatus[] = [
    "Pending",
    "Preparing",
    "Completed",
    "Cancelled",
  ];

  for (let i = 0; i < count; i++) {
    // Generate random items for this order (1-5 items)
    const numItems = faker.helpers.rangeToNumber({ min: 1, max: 5 });
    const items: OrderItem[] = [];

    for (let j = 0; j < numItems; j++) {
      items.push(generateOrderItem());
    }

    // Calculate financials
    const { subtotal, tax, grandTotal } = calculateTotal(items);

    // Generate a random date from the last 24 hours
    const orderDate = faker.date.recent({ days: 1 });

    // Format the date similar to what's shown in the UI example
    const dateTime = new Intl.DateTimeFormat("en-US", {
      weekday: "short",
      month: "long",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    }).format(orderDate);

    const order: Order = {
      id: faker.string.alphanumeric(6).toUpperCase(),
      customerName: faker.person.fullName(),
      dateTime,
      status: faker.helpers.arrayElement(statuses),
      items,
      total: grandTotal, // For display on card
      subtotal,
      tax,
      grandTotal,
    };

    orders.push(order);
  }

  return orders;
}

// Generate and export the dummy data
export const dummyOrders = generateDummyOrders(20);

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
export type OrderStatus = "Pending" | "Preparing" | "Completed" | "Cancelled";
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
