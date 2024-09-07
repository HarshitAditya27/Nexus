import React, { useState } from "react";
import DocumentHeader from "./DocumentHeader";
import DocumentInfo from "./DocumentInfo";
import DocumentEditor from "./DocumentEditor";
import { Button } from "@/components/ui/button";
import { MessageCircle, X } from "lucide-react";
import CommentBox from "./CommentBox";

function DocumentEditorSection({ params }) {
  const [openComment, setOpenComment] = useState(false);

  return (
    <div>
      <DocumentHeader />
      <DocumentInfo params={params} />
      <div className="grid grid-cols-4">
        <div className="col-span-3">
          <DocumentEditor params={params} />
        </div>
        <div className="fixed right-5 bottom-5">
          <Button onClick={() => setOpenComment(!openComment)}>
            {openComment ? <X /> : <MessageCircle />}
          </Button>
          {openComment && <CommentBox />}
        </div>
      </div>
    </div>
  );
}

export default DocumentEditorSection;
