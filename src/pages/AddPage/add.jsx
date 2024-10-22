/* eslint-disable react/prop-types */
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
  image: z.string().url("Invalid URL"),
});

function Add({ onAddSuccess, onCloseDialog }) {
  // Nhận thêm onCloseDialog từ props
  const baseURL = "https://66c6a2a88b2c10445bc73c2d.mockapi.io/Orichids";

  // Sử dụng hook form với zod resolver
  const form = useForm({
    resolver: zodResolver(orchidSchema),
    defaultValues: {
      name: "",
      origin: "",
      color: "",
      details: "",
      image: "",
    },
  });

  // Hàm xử lý thêm Orchid
  const handleAdd = (data) => {
    fetch(baseURL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then(() => {
        toast.success(`Added ${data.name} successfully!`);
        if (onAddSuccess) {
          onAddSuccess(); // Gọi hàm callback sau khi thêm thành công
        }
        if (onCloseDialog) {
          onCloseDialog(); // Đóng dialog sau khi thêm thành công
        }
      })
      .catch((err) => {
        console.error(err);
        toast.error("Failed to add orchid");
      });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleAdd)} className="space-y-4">
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

export default Add;
