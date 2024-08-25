import React from "react";
import Logo from "./Logo";
import { UserButton } from "@clerk/nextjs";

function Header() {
  return (
    <div className="flex justify-between items-center p-3 shadow-sm">
      <Logo />
      <UserButton />
    </div>
  );
}

export default Header;
