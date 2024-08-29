"use client";
import React, { useEffect } from "react";
import SideNav from "../../_components/SideNav";
import DocumentEditorSection from "../../_components/DocumentEditorSection";

function Workspace({ params }) {
  useEffect(() => {
    console.log(params);
  }, [params]);
  return (
    <div>
      <div className="">
        <SideNav params={params} />
      </div>
      <div className="md:ml-72">
        <DocumentEditorSection params={params} />
      </div>
    </div>
  );
}

export default Workspace;
