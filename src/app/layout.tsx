import type { Metadata } from "next";
import "./globals.css";
import { cn } from "@/lib/utils";
import { IBMPlex } from "./font";
import { ClerkProvider } from "@clerk/nextjs";

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
    <ClerkProvider
      appearance={{
        variables: {
          colorPrimary: "#624cf5",
        },
      }}
    >
      {/*this provider provides active session and user context to the children*/}

      <html lang="en">
        <body className={cn("font-IBMPlex antialiased", IBMPlex.variable)}>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
