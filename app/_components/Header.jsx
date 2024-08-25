"use client";
import React from "react";
import Logo from "./Logo";
import { OrganizationSwitcher, useAuth, UserButton } from "@clerk/nextjs";

function Header() {
  const { orgId } = useAuth();
  return (
    <div className="flex justify-between items-center p-3 shadow-sm">
      <Logo />
      <OrganizationSwitcher
        afterLeaveOrganizationUrl={"/dashboard"}
        afterCreateOrganizationUrl={"/dashboard"}
      />
      <UserButton />
    </div>
  );
}

export default Header;
