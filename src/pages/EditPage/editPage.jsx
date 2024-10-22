import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

// Định nghĩa schema validation bằng Zod
const orchidSchema = z.object({
  name: z.string().nonempty("Name is required"),
  origin: z.string().nonempty("Origin is required"),
  color: z.string().nonempty("Color is required"),
  details: z.string().nonempty("Details are required"),
  image: z.string().nonempty("Image is not empty"), // Giữ image là trường duy nhất cho URL ảnh
});

function EditPage({ orchid, onEditSuccess, onCloseDialog }) {
  // Nhận props từ component cha và sử dụng đúng id
  const baseURL = `https://66c6a2a88b2c10445bc73c2d.mockapi.io/Orichids/${orchid.Id}`; // Sử dụng id viết thường

  const form = useForm({
    resolver: zodResolver(orchidSchema),
    defaultValues: {
      name: orchid?.name || "",
      origin: orchid?.origin || "",
      color: orchid?.color || "",
      details: orchid?.details || "",
      image: orchid?.image || "", // Giữ nguyên trường image
    },
  });

  // Hàm xử lý chỉnh sửa Orchid
  const handleEdit = (data) => {
    fetch(baseURL, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data), // Chỉ cần truyền data, bao gồm cả image
    })
      .then(() => {
        toast.success(`Updated ${data.name} successfully!`);
        if (onEditSuccess) {
          onEditSuccess(); // Gọi hàm callback sau khi chỉnh sửa thành công
        }
        if (onCloseDialog) {
          onCloseDialog(); // Đóng dialog sau khi chỉnh sửa thành công
        }
      })
      .catch((err) => {
        console.error(err);
        toast.error("Failed to update orchid");
      });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleEdit)} className="space-y-4">
        <FormField
          name="name"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="origin"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Origin</FormLabel>
              <FormControl>
                <Input placeholder="Origin" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="color"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Color</FormLabel>
              <FormControl>
                <Input placeholder="Color" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="details"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Details</FormLabel>
              <FormControl>
                <Input placeholder="Details" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="image"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image URL</FormLabel>
              <FormControl>
                <Input placeholder="https://example.com/image.jpg" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Cancel
            </Button>
          </DialogClose>
          <Button type="submit">Save</Button>
        </DialogFooter>
      </form>
    </Form>
  );
}

export default EditPage;
