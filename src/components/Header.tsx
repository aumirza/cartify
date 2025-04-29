import React from "react";
import Link from "next/link";
import NavBar from "./NavBar";
import { ProfileMenu } from "./ProfileMenu";
import { CartButton } from "./CartButton";
import { ThemeToggle } from "./dashboard/ThemeToggle";
import { auth } from "@/lib/auth";

export async function Header() {
  const session = await auth();

  return (
    <header className="h-16 flex justify-between items-center p-5 border-b">
      <div className="flex items-center gap-10">
        <Link href="/">
          <h1 className="font-bold text-xl">Cartify</h1>
        </Link>
        <NavBar />
      </div>
      <div className="flex items-center gap-4">
        <CartButton />
        {session?.user ? <ProfileMenu /> : <Link href="/login">Login</Link>}
        <ThemeToggle />
      </div>
    </header>
  );
}
