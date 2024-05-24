import type { Metadata } from "next";
import "./globals.css";
import { cn } from "@/lib/utils";
import { IBMPlex } from "./font";

export const metadata: Metadata = {
  title: "Pixify",
  description: "Cloudinary AI powered image generator",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn("font-IBMPlex antialiased", IBMPlex.variable)}>
        {children}
      </body>
    </html>
  );
}
