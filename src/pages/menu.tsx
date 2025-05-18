import { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardFooter
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
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { PlusCircle, Pencil, Trash2, Search } from "lucide-react";

// Sample data
const categories = [
  { id: 1, name: "Appetizers", nameAr: "المقبلات", description: "Small dishes served before the main course", active: true },
  { id: 2, name: "Main Course", nameAr: "الطبق الرئيسي", description: "Primary dishes of the meal", active: true },
  { id: 3, name: "Desserts", nameAr: "الحلويات", description: "Sweet dishes served after the main course", active: true },
  { id: 4, name: "Beverages", nameAr: "المشروبات", description: "Drinks menu", active: true },
];

const menuItems = [
  { id: 1, name: "Caesar Salad", nameAr: "سلطة سيزر", category: "Appetizers", price: 8.99, image: "https://placehold.co/100x100", active: true },
  { id: 2, name: "Grilled Chicken", nameAr: "دجاج مشوي", category: "Main Course", price: 16.99, image: "https://placehold.co/100x100", active: true },
  { id: 3, name: "Chocolate Cake", nameAr: "كعكة شوكولاتة", category: "Desserts", price: 6.99, image: "https://placehold.co/100x100", active: true },
  { id: 4, name: "Fresh Orange Juice", nameAr: "عصير برتقال طازج", category: "Beverages", price: 4.99, image: "https://placehold.co/100x100", active: true },
];

export default function MenuManagement() {
  const [currentTab, setCurrentTab] = useState("categories");
  const [selectedBranch, setSelectedBranch] = useState("main");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
        <h1 className="text-4xl font-bold mb-4 sm:mb-0">Menu Management</h1>
        
        <Select value={selectedBranch} onValueChange={setSelectedBranch}>
          <SelectTrigger className="w-[240px] text-xl h-14">
            <SelectValue placeholder="Select Branch" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="main" className="text-xl">Main Branch</SelectItem>
            <SelectItem value="downtown" className="text-xl">Downtown Branch</SelectItem>
            <SelectItem value="mall" className="text-xl">Mall Branch</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Tabs value={currentTab} onValueChange={setCurrentTab} className="mb-8">
        <TabsList className="grid w-full grid-cols-2 h-16">
          <TabsTrigger value="categories" className="text-xl">Menu Categories</TabsTrigger>
          <TabsTrigger value="items" className="text-xl">Menu Items</TabsTrigger>
        </TabsList>
        
        {/* Categories Tab */}
        <TabsContent value="categories" className="mt-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold">Menu Categories</h2>
            <Button size="lg" className="text-xl">
              <PlusCircle className="mr-2 h-6 w-6" /> Add New Category
            </Button>
          </div>
          
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-xl w-1/4">Name (English)</TableHead>
                    <TableHead className="text-xl w-1/4">Name (Arabic)</TableHead>
                    <TableHead className="text-xl w-1/3">Description</TableHead>
                    <TableHead className="text-xl w-1/8">Status</TableHead>
                    <TableHead className="text-xl w-1/8">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {categories.map((category) => (
                    <TableRow key={category.id}>
                      <TableCell className="text-xl font-medium">{category.name}</TableCell>
                      <TableCell className="text-xl">{category.nameAr}</TableCell>
                      <TableCell className="text-xl">{category.description}</TableCell>
                      <TableCell>
                        <span className={`text-xl px-3 py-1 rounded-full ${category.active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                          {category.active ? 'Active' : 'Inactive'}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="icon">
                            <Pencil className="h-6 w-6" />
                          </Button>
                          <Button variant="outline" size="icon" className="text-red-500 hover:text-red-700">
                            <Trash2 className="h-6 w-6" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Menu Items Tab */}
        <TabsContent value="items" className="mt-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold">Menu Items</h2>
            <Button size="lg" className="text-xl">
              <PlusCircle className="mr-2 h-6 w-6" /> Add New Item
            </Button>
          </div>
          
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-6 w-6" />
              <Input
                type="text"
                placeholder="Search menu items..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 text-xl h-14"
              />
            </div>
            <Select value={filterCategory} onValueChange={setFilterCategory}>
              <SelectTrigger className="w-[240px] text-xl h-14">
                <SelectValue placeholder="Filter by Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all" className="text-xl">All Categories</SelectItem>
                <SelectItem value="Appetizers" className="text-xl">Appetizers</SelectItem>
                <SelectItem value="Main Course" className="text-xl">Main Course</SelectItem>
                <SelectItem value="Desserts" className="text-xl">Desserts</SelectItem>
                <SelectItem value="Beverages" className="text-xl">Beverages</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {menuItems
              .filter(item => filterCategory === "all" || item.category === filterCategory)
              .filter(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                item.nameAr.includes(searchQuery))
              .map((item) => (
                <Card key={item.id} className="overflow-hidden">
                  <div className="flex items-center p-6">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-24 h-24 object-cover rounded mr-4" 
                    />
                    <div>
                      <h3 className="text-2xl font-semibold">{item.name}</h3>
                      <p className="text-xl text-gray-600">{item.nameAr}</p>
                      <p className="text-xl text-gray-500">{item.category}</p>
                      <p className="text-xl font-bold mt-2">${item.price.toFixed(2)}</p>
                    </div>
                  </div>
                  <CardFooter className="bg-gray-50 flex justify-between p-4">
                    <div className="flex items-center space-x-2">
                      <Switch id={`active-${item.id}`} checked={item.active} />
                      <Label htmlFor={`active-${item.id}`} className="text-xl">
                        {item.active ? "Active" : "Inactive"}
                      </Label>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="icon">
                        <Pencil className="h-6 w-6" />
                      </Button>
                      <Button variant="outline" size="icon" className="text-red-500 hover:text-red-700">
                        <Trash2 className="h-6 w-6" />
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Add Category Modal would go here */}
      {/* Add Menu Item Modal would go here */}
    </div>
  );
}