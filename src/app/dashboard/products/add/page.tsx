"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
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
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { productTypes } from "@/db/schemas/product.sql";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import FileUploader from "@/components/ui/FileUploader";

const formSchema = z
  .object({
    name: z.string().min(2, {
      message: "Product name must be at least 2 characters.",
    }),
    description: z.string().min(10, {
      message: "Description must be at least 10 characters.",
    }),
    type: z.enum([productTypes.DIGITAL, productTypes.PHYSICAL]),
    price: z.string().regex(/^\d+(\.\d{1,2})?$/, {
      message: "Please enter a valid price (e.g., 10.99)",
    }),
    thumbnailUrl: z
      .union([
        z.string().url({ message: "Please enter a valid URL" }),
        z.instanceof(File),
      ])
      .nullable()
      .refine(
        (val) =>
          val instanceof File || (typeof val === "string" && val.length > 0),
        {
          message: "Image is required",
        }
      ),
    fileUrl: z.string().url().optional(),
    initialStock: z.number().min(0).optional(),
  })
  .superRefine((data, ctx) => {
    if (data.type === productTypes.DIGITAL && !data.fileUrl) {
      ctx.addIssue({
        path: ["fileUrl"],
        code: z.ZodIssueCode.custom,
        message: "File URL is required for digital products.",
      });
    }

    if (
      data.type === productTypes.PHYSICAL &&
      (data.initialStock === undefined || data.initialStock === null)
    ) {
      ctx.addIssue({
        path: ["initialStock"],
        code: z.ZodIssueCode.custom,
        message: "Initial stock is required for physical products.",
      });
    }
  });

export default function ProductAddPage() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      type: productTypes.DIGITAL,
      price: "",
      thumbnailUrl: "",
      fileUrl: "",
      initialStock: 0,
    },
  });

  const productType = useWatch({
    control: form.control,
    name: "type",
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <div className="container">
      <h1 className="text-3xl font-bold mb-5">Add New Product</h1>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter product name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter product description"
                        className="min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Product Type</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select product type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value={productTypes.DIGITAL}>
                            Digital Product
                          </SelectItem>
                          <SelectItem value={productTypes.PHYSICAL}>
                            Physical Product
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Price</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          step="0.01"
                          placeholder="0.00"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Enter the price in your base currency
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Media</CardTitle>
            </CardHeader>
            <CardContent>
              <FormField
                control={form.control}
                name="thumbnailUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Thumbnail</FormLabel>
                    <FormControl>
                      <FileUploader
                        value={field.value}
                        onChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          {productType === productTypes.DIGITAL && (
            <Card>
              <CardHeader>
                <CardTitle>Digital Product Details</CardTitle>
              </CardHeader>
              <CardContent>
                <FormField
                  control={form.control}
                  name="fileUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Product File URL</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="https://example.com/file.pdf"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Enter the URL where your digital product file is hosted
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
          )}

          {productType === productTypes.PHYSICAL && (
            <Card>
              <CardHeader>
                <CardTitle>Inventory Management</CardTitle>
              </CardHeader>
              <CardContent>
                <FormField
                  control={form.control}
                  name="initialStock"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Initial Stock</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min="0"
                          placeholder="0"
                          {...field}
                          onChange={(e) =>
                            field.onChange(parseInt(e.target.value))
                          }
                        />
                      </FormControl>
                      <FormDescription>
                        Set the initial inventory quantity
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
          )}

          <div className="flex justify-end gap-4">
            <Button variant="outline" type="button">
              Cancel
            </Button>
            <Button type="submit">Create Product</Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
