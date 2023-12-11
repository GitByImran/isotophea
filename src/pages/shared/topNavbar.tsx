import { Button } from "@/components/ui/button";
import { useGetCurrentUser } from "@/lib/react-query/queriesAndMutations";
import { LogOut } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { ModeToggle } from "../../components/ui/modeToggle";

const TopNavbar = () => {
  const router = useRouter();
  const { data: currentUser } = useGetCurrentUser();

  const handleLogOut = () => {
    router.push("/auth/signInForm");
  };

  return (
    <div className="w-full px-5 py-3 border-b">
      <div className="flex items-center justify-between">
        <div>
          <img src="/isotope-logo.png" alt="" className="w-10" />
        </div>
        <div className="flex items-center gap-3">
          <Link href={`/routes/profile/${currentUser?.$id}`}>
            <img
              src={currentUser?.imageUrl}
              alt=""
              className="w-10 h-10 rounded-full"
            />
          </Link>

          <Button
            variant={"default"}
            size={"icon"}
            onClick={handleLogOut}
            className="rounded-full"
          >
            <LogOut size={18} />
          </Button>
          <ModeToggle />
        </div>
      </div>
    </div>
  );
};

export default TopNavbar;
