import type { Metadata } from "next";
import "../globals.css";
import { ThemeProvider } from "@/components/dashboard/ThemeProvider";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: "Cartify",
  description: "Your Cart, Your Way.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased min-h-screen flex flex-col`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex-grow h-full flex flex-col gap-10">
            <main className="flex-1 flex justify-center">
              <div className="w-11/12">{children}</div>
            </main>
            <Toaster />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
