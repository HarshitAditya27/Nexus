"use client";
import React, { useEffect } from "react";
import SideNav from "../../_components/SideNav";
import DocumentEditorSection from "../../_components/DocumentEditorSection";
import { Room } from "@/app/Room";

function WorkspaceDocument({ params }) {
  // useEffect(() => {
  //   console.log(params);
  // }, [params]);
  return (
    <Room params={params}>
      <div>
        <div className="">
          <SideNav params={params} />
        </div>
        <div className="md:ml-72">
          <DocumentEditorSection params={params} />
        </div>
      </div>
    </Room>
  );
}

export default WorkspaceDocument;
