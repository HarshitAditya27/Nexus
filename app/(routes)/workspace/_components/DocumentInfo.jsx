"use client";
import EmojiPickercomponent from "@/app/_components/EmojiPickerComponent";
import CoverPicker from "@/components/ui/CoverPicker";
import { db } from "@/config/firebaseConfig";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { SmilePlus } from "lucide-react";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

function DocumentInfo({ params }) {
  const [coverImage, setCoverImage] = useState("/cover.jpg");
  const [emoji, setEmoji] = useState();
  const [documentInfo, setDocumentInfo] = useState();
  useEffect(() => {
    params && GetDocumentInfo();
  }, [params]);

  const GetDocumentInfo = async () => {
    const docRef = doc(db, "workspaceDocuments", params?.documentid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log(docSnap.data());
      setDocumentInfo(docSnap.data());
      setEmoji(docSnap.data()?.emoji);
      docSnap.data()?.coverImage && setCoverImage(docSnap.data()?.coverImage);
    }
  };

  const updateDocumentInfo = async (key, value) => {
    const docRef = doc(db, "workspaceDocuments", params?.documentid);
    await updateDoc(docRef, {
      [key]: value,
    });
    toast("Document updated");
  };

  return (
    <div>
      <CoverPicker
        setNewCover={(cover) => {
          setCoverImage(cover);
          updateDocumentInfo("coverImage", cover);
        }}
      >
        {" "}
        <div className="relative group cursor-pointer">
          <h2 className="hidden absolute p-4 w-full h-full items-center group-hover:flex justify-center">
            Change cover
          </h2>
          <div className="group-hover:opacity-40">
            <Image
              src={coverImage}
              height={400}
              width={400}
              className="w-full h-[200px] object-cover rounded-t-xl"
            />
          </div>
        </div>
      </CoverPicker>
      <div className="absolute ml-10 mt-[-40px] cursor-pointer">
        <EmojiPickercomponent
          setEmojiIcon={(emoji) => {
            setEmoji(emoji);
            updateDocumentInfo("emoji", emoji);
          }}
        >
          <div className="bg-[#ffffffb0] p-4 rounded-md">
            {emoji ? (
              <span className="text-5xl">{emoji}</span>
            ) : (
              <SmilePlus className="h-10 w-10 text-gray-500" />
            )}
          </div>
        </EmojiPickercomponent>
      </div>
      <div className="mt-10 p-10">
        <input
          type="text"
          placeholder="Untitled Document"
          defaultValue={documentInfo?.documentName}
          className="font-bold text-4xl outline-none"
          onBlur={(event) =>
            updateDocumentInfo("documentName", event.target.value)
          }
        />
      </div>
    </div>
  );
}

export default DocumentInfo;
