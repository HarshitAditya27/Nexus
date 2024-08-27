"use client";
import React, { useEffect } from "react";
import SideNav from "../../_components/SideNav";

function Workspace({ params }) {
  useEffect(() => {
    console.log(params);
  }, [params]);
  return (
    <div>
      <div className="">
        <SideNav params={params} />
      </div>
      <div className="md:ml-72">Document</div>
    </div>
  );
}

export default Workspace;
