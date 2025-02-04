import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import Image from "next/image";
import { StarIcon } from "lucide-react";

export function ProductCard({ product }: { product: IProduct }) {
  return (
    <Card className="flex flex-col">
      <CardHeader className="flex w-full h-56 justify-center items-center">
        <Image
          src={product.image}
          alt={product.title}
          width={200}
          height={200}
          className="object-contain h-44"
        />
      </CardHeader>
      <CardContent className="flex-grow">
        <CardTitle>{product.title}</CardTitle>
        <p>{product.description.slice(0, 20)}</p>
      </CardContent>
      <CardFooter>
        <div className="w-full flex justify-between">
          <span>$ {product.price}</span>
          <div className="flex gap-1">
            {new Array(Math.round(product.rating.rate)).fill(0).map((_, i) => (
              <StarIcon
                key={i}
                className="fill-yellow-500 text-yellow-500 !size-5"
              />
            ))}
            {new Array(5 - Math.round(product.rating.rate))
              .fill(0)
              .map((_, i) => (
                <StarIcon key={i} className="text-muted-foreground !size-5" />
              ))}
            <span className="text-muted-foreground text-sm">
              ({product.rating.count})
            </span>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
