"use client";

import EmojiPickercomponent from "@/app/_components/EmojiPickercomponent";
import { Button } from "@/components/ui/button";
import CoverPicker from "@/components/ui/CoverPicker";
import { Input } from "@/components/ui/input";
import { db } from "@/config/firebaseConfig";
import { useAuth, useUser } from "@clerk/nextjs";
import { doc, setDoc } from "firebase/firestore";
import { Loader2Icon, SmilePlus } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import React, { useState } from "react";
import uuid4 from "uuid4";

function page() {
  const [coverImage, setCoverImage] = useState("/cover.jpg");
  const [workspaceName, setWorkspaceName] = useState();
  const [emoji, setEmoji] = useState();
  const { user } = useUser();
  const { orgId } = useAuth();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const OnCreateWorkspace = async () => {
    setLoading(true);
    const workspaceId = Date.now();
    const result = await setDoc(doc(db, "workspace", workspaceId.toString()), {
      workspaceName: workspaceName,
      emoji: emoji,
      coverImage: coverImage,
      createdBy: user?.primaryEmailAddress?.emailAddress,
      id: workspaceId,
      orgId: orgId ? orgId : user?.primaryEmailAddress?.emailAddress,
    });
    const docId = uuid4();
    await setDoc(doc(db, "workspaceDocuments", docId.toString()), {
      workspaceId: workspaceId,
      createdBy: user?.primaryEmailAddress?.emailAddress,
      coverImage: null,
      emoji: null,
      id: docId,
      documentName: "Untitled Document",
      documentOutput: [],
    });
    await setDoc(doc(db, "documentOutput", docId.toString()), {
      docId: docId,
      output: [],
    });
    setLoading(false);
    router.replace("/workspace/" + workspaceId + "/" + docId);
  };

  return (
    <div className="p-10 md:px-36 lg:px-64 xl:px-96 py-28">
      <div className="shadow-2xl rounded-xl">
        <CoverPicker setNewCover={(value) => setCoverImage(value)}>
          <div className="relative group cursor-pointer">
            <h2 className="hidden absolute p-4 w-full h-full items-center group-hover:flex justify-center">
              Change cover
            </h2>
            <div className="group-hover:opacity-69">
              <Image
                src={coverImage}
                height={400}
                width={400}
                className="w-full h-[150px] object-cover rounded-t-xl"
              />
            </div>
          </div>
        </CoverPicker>

        <div className="p-12">
          <h2 className="font-medium text-xl">Create a new workspace</h2>
          <h2>
            Welcome to your shared workspace for team collaboration! Feel free
            to personalize the name whenever you'd like.
          </h2>
          <div className="mt-8 flex gap-2 items-center">
            <EmojiPickercomponent setEmojiIcon={(value) => setEmoji(value)}>
              <Button variant="outline">{emoji ? emoji : <SmilePlus />}</Button>
            </EmojiPickercomponent>
            <Input
              placeholder="Workspace name"
              onChange={(e) => setWorkspaceName(e.target.value)}
            />
          </div>
          <div className="mt-7 flex justify-end gap-6">
            <Button
              disabled={!workspaceName?.length || loading}
              onClick={OnCreateWorkspace}
            >
              Create {loading && <Loader2Icon className="animate-spin ml-2" />}
            </Button>
            <Button variant="outline">Cancel</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
