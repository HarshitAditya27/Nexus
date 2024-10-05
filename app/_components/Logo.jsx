import Image from "next/image";
import React from "react";

function Logo() {
  return (
    <div className="flex item-center gap-4">
      <Image src={"/Logo.png"} alt="logo" width={60} height={60} />
      <h2 className="font-bold text-xl">Nexus</h2>
    </div>
  );
}

export default Logo;
