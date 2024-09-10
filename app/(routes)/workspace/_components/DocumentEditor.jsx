import React, { useEffect, useRef, useState } from "react";
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import Delimiter from "@editorjs/delimiter";
import Alert from "editorjs-alert";
import Table from "@editorjs/table";
import List from "@editorjs/list";
import CodeTool from "@editorjs/code";
import SimpleImage from "@editorjs/simple-image";
import { db } from "@/config/firebaseConfig";
import { doc, onSnapshot, updateDoc } from "firebase/firestore";
import { useUser } from "@clerk/nextjs";
import GenerateAITemplate from "./GenerateAITemplate";
function DocumentEditor({ params }) {
  const ref = useRef();
  let editor;
  const { user } = useUser();
  const [documentOutput, setDocumentOutput] = useState([]);
  let isFetched = false;

  useEffect(() => {
    user && InitEditor();
  }, [user]);

  // useEffect(() => {
  //   params && GetDocumentOutput();
  // }, [params]);

  const SaveDocument = () => {
    ref.current.save().then(async (outputData) => {
      console.log(outputData);
      const docRef = doc(db, "documentOutput", params?.documentid);
      await updateDoc(docRef, {
        output: JSON.stringify(outputData),
        editedBy: user?.primaryEmailAddress?.emailAddress,
      });
    });
  };

  const GetDocumentOutput = () => {
    const unsubscribe = onSnapshot(
      doc(db, "documentOutput", params?.documentid),
      (doc) => {
        console.log(doc.data());
        if (
          isFetched == false ||
          doc.data()?.editedBy != user?.primaryEmailAddress?.emailAddress
        )
          doc.data()?.output && editor?.render(JSON.parse(doc.data()?.output));
        isFetched = true;
      }
    );
  };

  const InitEditor = () => {
    if (!editor?.current) {
      editor = new EditorJS({
        onChange: (ap, event) => {
          SaveDocument();
        },
        onReady: () => {
          GetDocumentOutput();
        },
        holder: "editorjs",
        tools: {
          header: Header,
          delimeter: Delimiter,
          alert: {
            class: Alert,
            inlineToolbar: true,
            shortcut: "CMD+SHIFT+A",
            config: {
              alertTypes: [
                "primary",
                "secondary",
                "info",
                "success",
                "warning",
                "danger",
                "light",
                "dark",
              ],
              defaultType: "primary",
              messagePlaceholder: "Enter something",
            },
          },
          list: {
            class: List,
            inlineToolbar: true,
            config: {
              defaultStyle: "unordered",
            },
          },
          table: {
            class: Table,
            inlineToolbar: true,
            config: {
              rows: 2,
              cols: 3,
            },
          },
          code: CodeTool,
          image: SimpleImage,
        },
      });
      ref.current = editor;
    }
  };
  return (
    <div className="">
      <div id="editorjs" className="w-[70%]"></div>
      <div className="fixed bottom-10 md:ml-80 left-0 z-10">
        <GenerateAITemplate
          setGenerateAIOutput={(output) => editor?.render(output)}
        />
      </div>
    </div>
  );
}

export default DocumentEditor;
