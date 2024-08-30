import React, { useEffect, useRef } from "react";
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import Delimiter from "@editorjs/delimiter";
import Alert from "editorjs-alert";
import Table from "@editorjs/table";
import List from "@editorjs/list";
import CodeTool from "@editorjs/code";
import SimpleImage from "@editorjs/simple-image";
function DocumentEditor() {
  const ref = useRef();
  let editor;
  useEffect(() => {
    InitEditor();
  }, []);
  const SaveDocument = () => {
    ref.current.save().then((outputData) => {
      console.log(outputData);
    });
  };
  const InitEditor = () => {
    if (!editor?.current) {
      editor = new EditorJS({
        onChange: (ap, event) => {
          SaveDocument();
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
    <div className="lg:-ml-40">
      <div id="editorjs"></div>
    </div>
  );
}

export default DocumentEditor;
