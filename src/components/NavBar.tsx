import React from "react";
import { CategoriesDropdown } from "./CategoriesDropdown";
import { Button } from "./ui/button";
import Link from "next/link";

function NavBar() {
  return (
    <nav className="items-center gap-4 font-semibold hidden sm:flex">
      <Button variant="ghost" asChild>
        <Link href="/products">All Products</Link>
      </Button>
      <CategoriesDropdown />
    </nav>
  );
}

export default NavBar;
