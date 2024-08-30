import React from "react";
import DocumentHeader from "./DocumentHeader";
import DocumentInfo from "./DocumentInfo";
import DocumentEditor from "./DocumentEditor";

function DocumentEditorSection({ params }) {
  return (
    <div>
      <DocumentHeader />
      <DocumentInfo params={params} />
      <DocumentEditor params={params} />
    </div>
  );
}

export default DocumentEditorSection;
