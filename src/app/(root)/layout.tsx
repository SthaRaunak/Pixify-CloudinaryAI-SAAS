import MobileNav from "@/components/shared/MobileNav";
import Sidebar from "@/components/shared/Sidebar";
import React from "react";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="root">
      {/* TODO : sidebar component */}
      <Sidebar />
      {/* TODO : mobile navbar */}
      <MobileNav />
      <div className="root-container">
        <div className="wrapper">{children}</div>
      </div>
    </main>
  );
}

export default Layout;