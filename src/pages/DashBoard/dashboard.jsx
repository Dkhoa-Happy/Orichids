import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Plus, Edit, Trash2, Eye } from "lucide-react";

export default function Dashboard() {
  const baseURL = "https://66c6a2a88b2c10445bc73c2d.mockapi.io/Orichids";
  const [apiData, setApiData] = useState([]); // Sử dụng state để lưu dữ liệu từ API
  const [selectedOrchid, setSelectedOrchid] = useState(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);

  // Fetch data từ API khi component được render
  const fetchAPI = () => {
    fetch(baseURL)
      .then((resp) => resp.json())
      .then((data) => setApiData(data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchAPI();
  }, []);

  // Handle thêm dữ liệu vào API
  const handleAdd = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const newOrchid = {
      name: formData.get("name"),
      origin: formData.get("origin"),
      color: formData.get("color"),
      details: formData.get("details"),
      imageUrl: formData.get("imageUrl"),
    };
    // Gửi POST request để thêm dữ liệu
    fetch(baseURL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newOrchid),
    })
      .then(() => fetchAPI()) // Fetch lại dữ liệu sau khi thêm mới
      .catch((err) => console.error(err));

    setIsAddDialogOpen(false);
  };

  // Handle chỉnh sửa dữ liệu
  const handleEdit = (event) => {
    event.preventDefault();
    if (!selectedOrchid) return;
    const formData = new FormData(event.currentTarget);
    const updatedOrchid = {
      ...selectedOrchid,
      name: formData.get("name"),
      origin: formData.get("origin"),
      color: formData.get("color"),
      details: formData.get("details"),
      imageUrl: formData.get("imageUrl"),
    };

    // Gửi PUT request để chỉnh sửa dữ liệu
    fetch(`${baseURL}/${selectedOrchid.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedOrchid),
    })
      .then(() => fetchAPI()) // Fetch lại dữ liệu sau khi chỉnh sửa
      .catch((err) => console.error(err));

    setIsEditDialogOpen(false);
  };

  // Handle xóa dữ liệu
  const handleDelete = (id) => {
    // Gửi DELETE request để xóa dữ liệu
    fetch(`${baseURL}/${id}`, {
      method: "DELETE",
    })
      .then(() => fetchAPI()) // Fetch lại dữ liệu sau khi xóa
      .catch((err) => console.error(err));
  };

  const OrchidForm = ({ orchid, onSubmit }) => (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <Label htmlFor="name">Name</Label>
        <Input id="name" name="name" defaultValue={orchid?.name} required />
      </div>
      <div>
        <Label htmlFor="origin">Origin</Label>
        <Input
          id="origin"
          name="origin"
          defaultValue={orchid?.origin}
          required
        />
      </div>
      <div>
        <Label htmlFor="color">Color</Label>
        <Input id="color" name="color" defaultValue={orchid?.color} required />
      </div>
      <div>
        <Label htmlFor="details">Details</Label>
        <Input
          id="details"
          name="details"
          defaultValue={orchid?.details}
          required
        />
      </div>
      <div>
        <Label htmlFor="imageUrl">Image URL</Label>
        <Input
          id="imageUrl"
          name="imageUrl"
          defaultValue={orchid?.imageUrl}
          required
        />
      </div>
      <DialogFooter>
        <DialogClose asChild>
          <Button type="button" variant="secondary">
            Cancel
          </Button>
        </DialogClose>
        <Button type="submit">Save</Button>
      </DialogFooter>
    </form>
  );

  return (
    <div className=" mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Orchid Dashboard</h1>
      <div className="mb-4">
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Add Orchid
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Orchid</DialogTitle>
            </DialogHeader>
            <OrchidForm onSubmit={handleAdd} />
          </DialogContent>
        </Dialog>
      </div>
      <Table className="bg-white border border-gray-300 rounded-lg shadow">
        <TableHeader className="bg-gray-100">
          <TableRow>
            <TableHead className="text-gray-700">Image</TableHead>
            <TableHead className="text-gray-700">Name</TableHead>
            <TableHead className="text-gray-700">Origin</TableHead>
            <TableHead className="text-gray-700">Color</TableHead>
            <TableHead className="text-gray-700">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {apiData.map((orchid) => (
            <TableRow key={orchid.id} className="bg-white border-t">
              <TableCell>
                <img
                  src={orchid.image || orchid.imageUrl} // Thay đổi src thành image hoặc imageUrl
                  alt={orchid.name}
                  width={100}
                  height={100}
                  className="rounded-md object-cover"
                  onError={(e) =>
                    (e.target.src = "https://via.placeholder.com/100")
                  } // Thêm fallback ảnh mặc định khi URL lỗi
                />
              </TableCell>
              <TableCell className="text-gray-800">{orchid.name}</TableCell>
              <TableCell className="text-gray-800">{orchid.origin}</TableCell>
              <TableCell className="text-gray-800">{orchid.color}</TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <Dialog
                    open={isViewDialogOpen}
                    onOpenChange={setIsViewDialogOpen}
                  >
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => setSelectedOrchid(orchid)}
                      >
                        <Eye className="h-4 w-4 text-yellow-400" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>{selectedOrchid?.name}</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <img
                          src={selectedOrchid?.imageUrl || ""}
                          alt={selectedOrchid?.name || ""}
                          width={200}
                          height={200}
                          className="rounded-md object-cover mx-auto"
                        />
                        <p>
                          <strong>Origin:</strong> {selectedOrchid?.origin}
                        </p>
                        <p>
                          <strong>Color:</strong> {selectedOrchid?.color}
                        </p>
                        <p>
                          <strong>Details:</strong> {selectedOrchid?.details}
                        </p>
                      </div>
                    </DialogContent>
                  </Dialog>
                  <Dialog
                    open={isEditDialogOpen}
                    onOpenChange={setIsEditDialogOpen}
                  >
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => setSelectedOrchid(orchid)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Edit Orchid</DialogTitle>
                      </DialogHeader>
                      <OrchidForm
                        orchid={selectedOrchid}
                        onSubmit={handleEdit}
                      />
                    </DialogContent>
                  </Dialog>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleDelete(orchid.id)}
                  >
                    <Trash2 className="h-4 w-4 text-red-700" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
