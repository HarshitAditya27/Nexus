"use client";
import { useThreads } from "@liveblocks/react";
import { Composer, Thread } from "@liveblocks/react-ui";
import React from "react";

function CommentBox() {
  const { threads } = useThreads();
  return (
    <div className="w-[300px] h-[350px] shadow-lg rounded-lg overflow-auto z-30">
      {threads?.map((thread) => (
        <Thread key={thread.id} thread={thread} />
      ))}
      <Composer className="z-10">
        <Composer.Submit className="btn-primary" style={{ color: "#ffffff" }}>
          Reply
        </Composer.Submit>
      </Composer>
    </div>
  );
}

export default CommentBox;
