import { redirect } from "next/navigation";
import { RegisterForm } from "./RegisterForm";
import { auth } from "@/lib/auth";

export default async function RegisterPage() {
  const session = await auth();

  if (session?.user) {
    redirect("/");
  }

  return (
    <div className="h-full flex items-center justify-center">
      <RegisterForm />
    </div>
  );
}
