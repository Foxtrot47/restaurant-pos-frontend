import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PlusCircle, Pencil, Trash2 } from "lucide-react";

// Sample data
const sections = [
  { id: 1, name: "Indoor", description: "Main indoor seating area" },
  { id: 2, name: "Patio", description: "Outdoor seating area" },
  { id: 3, name: "Upstairs", description: "Second floor seating" },
];

const tables = [
  { id: 1, name: "Table 1", section: "Indoor", capacity: 4 },
  { id: 2, name: "Table 2", section: "Indoor", capacity: 2 },
  { id: 3, name: "Table 3", section: "Indoor", capacity: 6 },
  { id: 4, name: "Table 4", section: "Patio", capacity: 4 },
  { id: 5, name: "Table 5", section: "Patio", capacity: 8 },
  { id: 6, name: "Table 6", section: "Upstairs", capacity: 4 },
];

export default function TableManagement() {
  const [currentTab, setCurrentTab] = useState("sections");
  const [selectedBranch, setSelectedBranch] = useState("main");
  const [isAddSectionOpen, setIsAddSectionOpen] = useState(false);
  const [isAddTableOpen, setIsAddTableOpen] = useState(false);
  const [newSection, setNewSection] = useState({ name: "", description: "" });
  const [newTable, setNewTable] = useState({
    name: "",
    section: "",
    capacity: 2,
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
        <h1 className="text-4xl font-bold mb-4 sm:mb-0">Table Management</h1>

        <Select value={selectedBranch} onValueChange={setSelectedBranch}>
          <SelectTrigger className="w-[240px] text-xl h-14">
            <SelectValue placeholder="Select Branch" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="main" className="text-xl">
              Main Branch
            </SelectItem>
            <SelectItem value="downtown" className="text-xl">
              Downtown Branch
            </SelectItem>
            <SelectItem value="mall" className="text-xl">
              Mall Branch
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Tabs value={currentTab} onValueChange={setCurrentTab} className="mb-8">
        <TabsList className="grid w-full grid-cols-2 h-16">
          <TabsTrigger value="sections" className="text-xl">
            Sections
          </TabsTrigger>
          <TabsTrigger value="tables" className="text-xl">
            Tables
          </TabsTrigger>
        </TabsList>

        {/* Sections Tab */}
        <TabsContent value="sections" className="mt-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold">Restaurant Sections</h2>
            <Dialog open={isAddSectionOpen} onOpenChange={setIsAddSectionOpen}>
              <DialogTrigger asChild>
                <Button size="lg" className="text-xl">
                  <PlusCircle className="mr-2 h-6 w-6" /> Add New Section
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle className="text-2xl">
                    Add New Section
                  </DialogTitle>
                  <DialogDescription className="text-lg">
                    Create a new seating section for your restaurant.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-1 gap-2">
                    <Label htmlFor="section-name" className="text-xl">
                      Section Name
                    </Label>
                    <Input
                      id="section-name"
                      className="text-xl h-14"
                      value={newSection.name}
                      onChange={(e) =>
                        setNewSection({ ...newSection, name: e.target.value })
                      }
                    />
                  </div>
                  <div className="grid grid-cols-1 gap-2">
                    <Label htmlFor="section-description" className="text-xl">
                      Description (Optional)
                    </Label>
                    <Input
                      id="section-description"
                      className="text-xl h-14"
                      value={newSection.description}
                      onChange={(e) =>
                        setNewSection({
                          ...newSection,
                          description: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button
                    variant="outline"
                    onClick={() => setIsAddSectionOpen(false)}
                    className="text-lg h-14"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={() => {
                      console.log("Adding section:", newSection);
                      setIsAddSectionOpen(false);
                      setNewSection({ name: "", description: "" });
                    }}
                    className="text-lg h-14"
                  >
                    Add Section
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-xl w-1/3">
                      Section Name
                    </TableHead>
                    <TableHead className="text-xl w-1/2">Description</TableHead>
                    <TableHead className="text-xl w-1/6">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sections.map((section) => (
                    <TableRow key={section.id}>
                      <TableCell className="text-xl font-medium">
                        {section.name}
                      </TableCell>
                      <TableCell className="text-xl">
                        {section.description}
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="icon">
                            <Pencil className="h-6 w-6" />
                          </Button>
                          <Button
                            variant="outline"
                            size="icon"
                            className="text-red-500 hover:text-red-700"
                          >
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

        {/* Tables Tab */}
        <TabsContent value="tables" className="mt-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold">Restaurant Tables</h2>
            <Dialog open={isAddTableOpen} onOpenChange={setIsAddTableOpen}>
              <DialogTrigger asChild>
                <Button size="lg" className="text-xl">
                  <PlusCircle className="mr-2 h-6 w-6" /> Add New Table
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle className="text-2xl">Add New Table</DialogTitle>
                  <DialogDescription className="text-lg">
                    Create a new table and assign it to a section.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-1 gap-2">
                    <Label htmlFor="table-name" className="text-xl">
                      Table Name/Number
                    </Label>
                    <Input
                      id="table-name"
                      className="text-xl h-14"
                      value={newTable.name}
                      onChange={(e) =>
                        setNewTable({ ...newTable, name: e.target.value })
                      }
                    />
                  </div>
                  <div className="grid grid-cols-1 gap-2">
                    <Label htmlFor="table-section" className="text-xl">
                      Section
                    </Label>
                    <Select
                      value={newTable.section}
                      onValueChange={(value) =>
                        setNewTable({ ...newTable, section: value })
                      }
                    >
                      <SelectTrigger
                        id="table-section"
                        className="text-xl h-14"
                      >
                        <SelectValue placeholder="Select Section" />
                      </SelectTrigger>
                      <SelectContent>
                        {sections.map((section) => (
                          <SelectItem
                            key={section.id}
                            value={section.name}
                            className="text-xl"
                          >
                            {section.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-1 gap-2">
                    <Label htmlFor="table-capacity" className="text-xl">
                      Capacity (number of seats)
                    </Label>
                    <Input
                      id="table-capacity"
                      type="number"
                      min="1"
                      className="text-xl h-14"
                      value={newTable.capacity}
                      onChange={(e) =>
                        setNewTable({
                          ...newTable,
                          capacity: parseInt(e.target.value) || 1,
                        })
                      }
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button
                    variant="outline"
                    onClick={() => setIsAddTableOpen(false)}
                    className="text-lg h-14"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={() => {
                      console.log("Adding table:", newTable);
                      setIsAddTableOpen(false);
                      setNewTable({ name: "", section: "", capacity: 2 });
                    }}
                    className="text-lg h-14"
                  >
                    Add Table
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-xl w-1/3">
                      Table Name/Number
                    </TableHead>
                    <TableHead className="text-xl w-1/3">Section</TableHead>
                    <TableHead className="text-xl w-1/6">Capacity</TableHead>
                    <TableHead className="text-xl w-1/6">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {tables.map((table) => (
                    <TableRow key={table.id}>
                      <TableCell className="text-xl font-medium">
                        {table.name}
                      </TableCell>
                      <TableCell className="text-xl">{table.section}</TableCell>
                      <TableCell className="text-xl">
                        {table.capacity} seats
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="icon">
                            <Pencil className="h-6 w-6" />
                          </Button>
                          <Button
                            variant="outline"
                            size="icon"
                            className="text-red-500 hover:text-red-700"
                          >
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
      </Tabs>
    </div>
  );
}
