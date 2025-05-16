import { redirect } from "next/navigation";
import React from "react";

export default async function Page() {
  // redirect to /dasdhboard

  await redirect("/dashboard");

  return <div>page</div>;
}
