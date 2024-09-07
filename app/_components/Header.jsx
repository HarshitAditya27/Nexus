"use client";
import React, { useEffect } from "react";
import Logo from "./Logo";
import {
  OrganizationSwitcher,
  useAuth,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/config/firebaseConfig";

function Header() {
  const { orgId } = useAuth();
  const { user } = useUser();
  useEffect(() => {
    user && saveUserData();
  }, [user]);

  const saveUserData = async () => {
    const docId = user?.primaryEmailAddress?.emailAddress;
    try {
      await setDoc(doc, (db, "LoopUsers", docId), {
        name: user?.fullName,
        avatar: user?.imageUrl,
        email: user?.primaryEmailAddress?.emailAddress,
      });
    } catch (e) {}
  };
  return (
    <div className="flex justify-between items-center p-3 shadow-sm">
      <Logo />
      <OrganizationSwitcher
        afterLeaveOrganizationUrl={"/dashboard"}
        afterCreateOrganizationUrl={"/dashboard"}
      />
      <UserButton />
    </div>
  );
}

export default Header;
