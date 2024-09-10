"use client";

import {
  LiveblocksProvider,
  RoomProvider,
  ClientSideSuspense,
} from "@liveblocks/react/suspense";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/config/firebaseConfig";

export function Room({ children, params }) {
  return (
    <LiveblocksProvider
      authEndpoint={"/api/liveblocks-auth?roomId=" + params?.documentid}
      resolveUsers={async ({ userIds }) => {
        const q = query(
          collection(db, "LoopUsers"),
          where("email", "in", userIds)
        );
        const querySnapshot = await getDocs(q);
        const userList = [];
        querySnapshot.forEach((doc) => {
          console.log(doc.data());
          userList.push(doc.data());
        });

        // Return a list of users
        return userList;
      }}
      resolveMentionSuggestions={async ({ text, roomId }) => {
        const q = query(
          collection(db, "LoopUsers"),
          where("email", "!=", null)
        );
        const querySnapshot = await getDocs(q);
        let userList = [];
        querySnapshot.forEach((doc) => {
          userList.push(doc.data());
        });
        // If there's a query, filter for the relevant users
        if (text) {
          // Filter any way you'd like, e.g. checking if the name matches
          userList = userList.filter((user) => user.name.includes(text));
        }

        // Return the filtered `userIds`
        return userList.map((user) => user.email);
      }}

      // publicApiKey={process.env.NEXT_PUBLIC_LIVEBLOCK_PK}
    >
      <RoomProvider id={params?.documentid ? params?.documentid : "1"}>
        <ClientSideSuspense fallback={<div>Loading…</div>}>
          {children}
        </ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  );
}
