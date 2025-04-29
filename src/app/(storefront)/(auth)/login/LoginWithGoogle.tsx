import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";

export function LoginWithGoogle() {
  return (
    <Button
      onClick={() => signIn("google")}
      variant="outline"
      className="w-full mt-2"
    >
      Login with Google
    </Button>
  );
}
