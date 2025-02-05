import Link from "next/link";
import React from "react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full flex justify-center border-t py-6 md:py-0">
      <div className="w-11/12 container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            Built by{" "}
            <Link href="https://github.com/aumirza" target="_blank">
              Ahmadullah Mirza
            </Link>
            . The source code is available on{" "}
            <Link href="https://github.com/aumirza/cartify" target="_blank">
              GitHub
            </Link>
            .<br />© {currentYear} Cartify. All rights reserved.
          </p>
        </div>
        <div className="flex gap-4">
          <Link href="/terms">Terms</Link>
          <Link href="/privacy">Privacy</Link>
          <Link href="/about">About</Link>
        </div>
      </div>
    </footer>
  );
}
