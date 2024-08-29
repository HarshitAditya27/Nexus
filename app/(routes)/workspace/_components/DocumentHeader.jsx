import { Button } from "@/components/ui/button";
import { OrganizationSwitcher } from "@clerk/nextjs";
import React from "react";

function DocumentHeader() {
  return (
    <div className="flex justify-between items-center p-3 px-7 shadow-md">
      <div></div>
      <OrganizationSwitcher />
      <div className="flex gap-2">
        <Button>Share</Button>
      </div>
    </div>
  );
}

export default DocumentHeader;
