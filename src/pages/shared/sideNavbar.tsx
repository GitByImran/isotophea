import { Button } from "@/components/ui/button";
import {
  Bookmark,
  CircleUserRound,
  Home,
  LogIn,
  LogOut,
  PlusSquare,
  Search,
  UsersRound,
} from "lucide-react";
import Link from "next/link";
import React, { useEffect } from "react";
import { ModeToggle } from "../../components/ui/modeToggle";
import { Separator } from "@/components/ui/separator";
import { useSignOutAccount } from "@/lib/react-query/queriesAndMutations";
import { initialUser, useUserContext } from "@/context/authContext";
import { useRouter } from "next/router";
import Image from "next/image";
import Swal from "sweetalert2";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import SearchBox from "../routes/explore";

const SideNavbar: React.FC = () => {
  const { user, setUser, isAuthenticated, setIsAuthenticated, isLoading } =
    useUserContext();
  const { mutate: signOut } = useSignOutAccount();
  const router = useRouter();

  const handleSignOut = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    Swal.fire({
      title: "Logout from account, you will redirected to Login",
      showCancelButton: true,
      confirmButtonText: "Proceed",
    }).then((result) => {
      if (result.isConfirmed) {
        signOut();
        setIsAuthenticated(false);
        setUser(initialUser);
        router.push("/auth/signInForm");
      }
    });
  };

  return (
    <section className="sticky top-0 hidden h-screen px-5 overflow-y-auto md:w-72 sm:block">
      <nav>
        <div className="w-40 py-5 logo">
          <img src="/isotope-base-logo.png" alt="" className="w-full" />
        </div>
        <Link href={`/routes/profile/${user.id}`}>
          <div className="flex items-center gap-2 py-2 text-lg">
            <img
              key={user.imageUrl || "/dummy-avatar.png"}
              src={user.imageUrl || "/dummy-avatar.png"}
              alt=""
              className="w-12 h-12 rounded-full"
            />
            <div className="flex flex-col gap-0 truncate">
              <p>{user.name}</p>
              <span className="text-sm text-gray-400 truncate">
                @{user.username}
              </span>
            </div>
          </div>
        </Link>
        <div className="flex flex-col justify-between py-5">
          <div className="flex flex-col gap-3 nav-menus">
            <Link
              href="/"
              className="flex items-center gap-2 px-2 py-2 text-lg duration-150 hover:px-5 hover:bg-cyan-500 hover:rounded hover:text-white"
            >
              <Home strokeWidth={2} size={20} />
              Home
            </Link>
            <Link
              href="/routes/explore"
              className="flex items-center gap-2 px-2 py-2 text-lg duration-150 hover:px-5 hover:bg-cyan-500 hover:rounded hover:text-white"
            >
              <Search strokeWidth={2} size={20} /> search
            </Link>
            <Link
              href="/routes/createPost"
              className="flex items-center gap-2 px-2 py-2 text-lg duration-150 hover:px-5 hover:bg-cyan-500 hover:rounded hover:text-white"
            >
              <PlusSquare strokeWidth={2} size={20} /> create post
            </Link>
            <Link
              href="/routes/people"
              className="flex items-center gap-2 px-2 py-2 text-lg duration-150 hover:px-5 hover:bg-cyan-500 hover:rounded hover:text-white"
            >
              <UsersRound strokeWidth={2} size={20} /> People
            </Link>
            <Link
              href="/routes/saved"
              className="flex items-center gap-2 px-2 py-2 text-lg duration-150 hover:px-5 hover:bg-cyan-500 hover:rounded hover:text-white"
            >
              <Bookmark strokeWidth={2} size={20} /> saved
            </Link>
          </div>
          <Separator className="my-4" />
          <div className="flex flex-col gap-2">
            <div className="auth-menus">
              {isAuthenticated ? (
                <Link
                  href=""
                  onClick={(e: any) => handleSignOut(e)}
                  className="flex items-center gap-2 px-2 py-2 text-lg duration-150 hover:px-5 hover:bg-cyan-500 hover:rounded hover:text-white"
                >
                  <LogOut strokeWidth={2} size={20} /> Logout
                </Link>
              ) : (
                <Link
                  href="/auth/signInForm"
                  className="flex items-center gap-2 px-2 py-2 text-lg duration-150 hover:px-5 hover:bg-cyan-500 hover:rounded hover:text-white"
                >
                  <LogIn strokeWidth={2} size={20} /> Login
                </Link>
              )}
            </div>
            <div className="bottom-0 flex flex-col gap-2 theme-toggler w-fit">
              <ModeToggle />
            </div>
          </div>
        </div>
      </nav>
    </section>
  );
};

export default SideNavbar;
