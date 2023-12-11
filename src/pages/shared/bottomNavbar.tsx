"use client";
import { useUserContext } from "@/context/authContext";
import { Bookmark, Home, PlusSquare, Search, UsersRound } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import React from "react";

const BottomNavbar = () => {
  const { user } = useUserContext();
  const { theme } = useTheme();

  return (
    <div className={`w-full px-5 py-2 border-t root bottom-light`}>
      <div className="flex flex-row justify-between gap-3 nav-menus">
        <Link
          href="/"
          className="flex items-center gap-2 p-2 text-lg hover:bg-cyan-500 hover:rounded-lg hover:text-white"
        >
          <Home strokeWidth={2} size={20} />
        </Link>
        <Link
          href="/routes/explore"
          className="flex items-center gap-2 p-2 text-lg hover:bg-cyan-500 hover:rounded-lg hover:text-white"
        >
          <Search strokeWidth={2} size={20} />
        </Link>
        <Link
          href="/routes/createPost"
          className="flex items-center gap-2 p-2 text-lg hover:bg-cyan-500 hover:rounded-lg hover:text-white"
        >
          <PlusSquare strokeWidth={2} size={20} />
        </Link>
        <Link
          href="/routes/people"
          className="flex items-center gap-2 p-2 text-lg hover:bg-cyan-500 hover:rounded-lg hover:text-white"
        >
          <UsersRound strokeWidth={2} size={20} />
        </Link>
        <Link
          href="/routes/saved"
          className="flex items-center gap-2 p-2 text-lg hover:bg-cyan-500 hover:rounded-lg hover:text-white"
        >
          <Bookmark strokeWidth={2} size={20} />
        </Link>
      </div>
    </div>
  );
};

export default BottomNavbar;
