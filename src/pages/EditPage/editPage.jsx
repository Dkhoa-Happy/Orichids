/* eslint-disable react/prop-types */
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Star } from "lucide-react";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// Định nghĩa schema validation bằng Zod
const orchidSchema = z.object({
  name: z.string().nonempty("Name is required"),
  origin: z.string().nonempty("Origin is required"),
  color: z.string().nonempty("Color is required"),
  details: z.string().nonempty("Details are required"),
  image: z.string().nonempty("Image is required"),
  iframe: z.string().url("Invalid URL").optional(),
  rating: z.number().min(0).max(5, "Rating must be between 0 and 5"),
  isSpecial: z.boolean(),
  category: z.string().nonempty("Category is required"), // Add validation for category
});

function EditPage({ orchid, onEditSuccess, onCloseDialog }) {
  // Nhận props từ component cha và sử dụng đúng id
  const baseURL = `https://66c6a2a88b2c10445bc73c2d.mockapi.io/Orichids/${orchid.Id}`;

  const form = useForm({
    resolver: zodResolver(orchidSchema),
    defaultValues: {
      name: orchid?.name || "",
      origin: orchid?.origin || "",
      color: orchid?.color || "",
      details: orchid?.details || "",
      image: orchid?.image || "",
      iframe: orchid?.iframe || "",
      rating: orchid?.rating || 0,
      isSpecial: orchid?.isSpecial || false,
      category: orchid?.category || "", // Add category to defaultValues
    },
  });

  // Quản lý trạng thái rating
  const [rating, setRating] = useState(orchid?.rating || 0);

  // Hàm xử lý chỉnh sửa Orchid
  const handleEdit = (data) => {
    fetch(baseURL, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...data, rating }),
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
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Edit Orichid</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleEdit)} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                name="name"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Orichid Name" {...field} />
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
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormField
                name="color"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Color</FormLabel>
                    <FormControl>
                      <Input placeholder="Orichid Color" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="category"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <FormControl>
                      <Input placeholder="Orichid Category" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
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
              name="rating"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Rating</FormLabel>
                  <FormControl>
                    <div className="flex items-center space-x-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`w-6 h-6 cursor-pointer ${
                            star <= rating
                              ? "text-yellow-400 fill-yellow-400"
                              : "text-gray-300"
                          }`}
                          onClick={() => {
                            setRating(star);
                            field.onChange(star);
                          }}
                        />
                      ))}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="isSpecial"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Special Orichid</FormLabel>
                    <FormDescription>
                      This item will be marked as special.
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />
            <FormField
              name="iframe"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Iframe URL</FormLabel>
                  <FormControl>
                    <Input placeholder="https://example.com/embed" {...field} />
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
                    <Input
                      placeholder="https://example.com/image.jpg"
                      {...field}
                    />
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
      </CardContent>
    </Card>
  );
}

export default EditPage;
