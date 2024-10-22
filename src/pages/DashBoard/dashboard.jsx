/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
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
} from "@/components/ui/dialog";
import { Plus, Edit, Trash2, Eye } from "lucide-react";
import { toast } from "sonner";
import Add from "../AddPage/add";
import EditPage from "../EditPage/editPage";
import { Skeleton } from "@/components/ui/skeleton"; // Import Skeleton

export default function Dashboard() {
  const baseURL = "https://66c6a2a88b2c10445bc73c2d.mockapi.io/Orichids";
  const [apiData, setApiData] = useState([]); // Sử dụng state để lưu dữ liệu từ API
  const [isLoading, setIsLoading] = useState(true); // State để quản lý skeleton loading
  const [selectedOrchid, setSelectedOrchid] = useState(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [orchidToDelete, setOrchidToDelete] = useState(null);

  // Fetch data từ API khi component được render
  const fetchAPI = () => {
    setIsLoading(true); // Bắt đầu quá trình load
    fetch(baseURL)
      .then((resp) => resp.json())
      .then((data) => {
        setApiData(data);
        setIsLoading(false); // Tắt loading khi load xong
      })
      .catch((err) => {
        console.error(err);
        setIsLoading(false); // Tắt loading khi có lỗi
      });
  };

  useEffect(() => {
    fetchAPI();
  }, []);

  // Hàm xử lý xóa sau khi xác nhận
  const confirmDelete = () => {
    if (!orchidToDelete) return;

    fetch(`${baseURL}/${orchidToDelete.Id}`, {
      method: "DELETE",
    })
      .then(() => {
        fetchAPI(); // Fetch lại dữ liệu sau khi xóa
        setOrchidToDelete(null); // Xóa giá trị của orchid sau khi đã xóa
        setIsConfirmDialogOpen(false); // Đóng dialog
        toast.success(`Deleted ${orchidToDelete?.name} successfully!`); // Sử dụng orchidToDelete để lấy tên
      })
      .catch((err) => console.error(err));
  };

  // Hàm mở dialog xóa
  const handleDelete = (orchid) => {
    setOrchidToDelete(orchid); // Lưu orchid để xóa
    setIsConfirmDialogOpen(true); // Mở dialog xác nhận
  };

  const closeAddDialog = () => {
    setIsAddDialogOpen(false);
    const triggerButton = document.getElementById("addTriggerButton"); // Lấy phần tử nút mở dialog
    if (triggerButton) {
      triggerButton.focus(); // Đặt focus lại về nút trigger sau khi dialog đóng
    }
  };

  // Hàm closeEditDialog để đóng dialog chỉnh sửa và đưa focus về nút Edit
  const closeEditDialog = () => {
    setIsEditDialogOpen(false);
  };

  return (
    <div className="mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Orchid Dashboard</h1>
      <div className="mb-4">
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button id="addTriggerButton">
              <Plus className="mr-2 h-4 w-4" /> Add Orchid
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Orchid</DialogTitle>
            </DialogHeader>
            <Add onAddSuccess={fetchAPI} onCloseDialog={closeAddDialog} />{" "}
            {/* Gọi lại fetchAPI sau khi thêm thành công */}
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
            <TableHead className="text-gray-700">Iframe</TableHead>{" "}
            {/* Thêm cột iframe */}
            <TableHead className="text-gray-700">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {/* Hiển thị skeleton khi đang tải dữ liệu */}
          {isLoading
            ? Array.from({ length: 5 }).map((_, index) => (
                <TableRow key={index} className="bg-white border-t">
                  <TableCell>
                    <Skeleton className="w-24 h-24 rounded-md" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-6 w-32 rounded-lg" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-6 w-32 rounded-lg" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-6 w-24 rounded-lg" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-6 w-32 rounded-lg" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-6 w-32 rounded-lg" />
                  </TableCell>
                </TableRow>
              ))
            : apiData.map((orchid) => (
                <TableRow key={orchid.Id} className="bg-white border-t">
                  <TableCell>
                    <img
                      src={orchid.image}
                      alt={orchid.name}
                      width={100}
                      height={100}
                      className="rounded-md object-cover"
                      onError={(e) =>
                        (e.target.src = "https://via.placeholder.com/100")
                      }
                    />
                  </TableCell>
                  <TableCell className="text-gray-800">{orchid.name}</TableCell>
                  <TableCell className="text-gray-800">
                    {orchid.origin}
                  </TableCell>
                  <TableCell className="text-gray-800">
                    {orchid.color}
                  </TableCell>
                  <TableCell className="text-gray-800">
                    {/* Hiển thị iframe */}
                    <iframe
                      src={orchid.iframe}
                      title={orchid.name}
                      width="300"
                      height="300"
                      className="rounded-md"
                      allowFullScreen
                    />
                  </TableCell>
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
                              src={selectedOrchid?.image || ""}
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
                              <strong>Details:</strong>{" "}
                              {selectedOrchid?.details}
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
                          <EditPage
                            orchid={selectedOrchid}
                            onEditSuccess={fetchAPI}
                            onCloseDialog={closeEditDialog}
                          />
                        </DialogContent>
                      </Dialog>

                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleDelete(orchid)}
                      >
                        <Trash2 className="h-4 w-4 text-red-700" />
                      </Button>

                      <Dialog
                        open={isConfirmDialogOpen}
                        onOpenChange={setIsConfirmDialogOpen}
                      >
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Confirm Delete</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4">
                            <p>
                              Are you sure you want to delete{" "}
                              {orchidToDelete?.name}?
                            </p>
                          </div>
                          <DialogFooter>
                            <Button
                              variant="secondary"
                              onClick={() => setIsConfirmDialogOpen(false)}
                            >
                              Cancel
                            </Button>
                            <Button
                              variant="destructive"
                              onClick={confirmDelete}
                            >
                              Delete
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
        </TableBody>
      </Table>
    </div>
  );
}
