import React from "react";
import DocumentHeader from "./DocumentHeader";
import DocumentInfo from "./DocumentInfo";

function DocumentEditorSection({ params }) {
  return (
    <div>
      <DocumentHeader />
      <DocumentInfo params={params} />
    </div>
  );
}

export default DocumentEditorSection;
