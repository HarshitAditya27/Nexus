import Header from "@/app/_components/Header";
import WorkspaceList from "@/app/_components/WorkspaceList";
import { UserButton } from "@clerk/nextjs";
import React from "react";

function Dashboard() {
  return (
    <div>
      <Header />
      <WorkspaceList />
    </div>
  );
}

export default Dashboard;
