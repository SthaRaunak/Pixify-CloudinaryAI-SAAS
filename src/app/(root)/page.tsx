import { UserButton } from "@clerk/nextjs";
import React from "react";

function HomePage() {
  return <div>
    <p>Home</p>
    <UserButton afterSignOutUrl="/"/>
     </div>;
}

export default HomePage;
