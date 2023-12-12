import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useGetUserById } from "@/lib/react-query/queriesAndMutations";
import { useRouter } from "next/router";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import UserPosts from "./userPosts";
import UserSavePosts from "./userSavePosts";
import { PenSquare, Settings } from "lucide-react";
import {
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { useEffect } from "react";

const Profile = () => {
  const router = useRouter();
  const id = router.asPath.split("/")[3];

  const { data: currentUser, refetch } = useGetUserById(id || "");

  if (!currentUser)
    return (
      <div className="sm:max-w-[500px] mx-auto flex justify-center items-center w-full h-full my-5">
        <img src="/loader.svg" alt="loading" height={24} width={24} />
      </div>
    );
  return (
    <div className="sm:max-w-[500px] mx-auto my-5">
      <div>
        <div className="flex items-center justify-between">
          <div className="flex flex-row items-center w-full gap-5">
            <div className="w-16 h-16 border rounded-full">
              <img
                key={currentUser?.imageUrl}
                src={currentUser?.imageUrl}
                alt=""
                loading="lazy"
                className="w-full h-full rounded-full"
              />
            </div>
            <div className="flex items-center justify-between flex-grow gap-5">
              <p className="text-lg ">@{currentUser?.username}</p>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Settings size={20} className="cursor-pointer" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="">
                  <DropdownMenuItem>
                    <Link
                      href={`/routes/edit-profile/${currentUser?.$id}`}
                      className="flex items-center gap-2 px-5 py-2 "
                    >
                      <PenSquare size={16} /> Edit Profile
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* <div>
            {" "}
            <Settings size={20} className="cursor-pointer" />
          </div> */}
        </div>
        <div className="my-5">
          <div className="flex flex-col gap-2">
            <p className="text-xl font-semibold">{currentUser.name}</p>
            <p className="text-sm">
              {currentUser.bio ? currentUser.bio : "bio will goes here..."}
            </p>
          </div>
          {/* <Separator className="my-5" /> */}
          <div>
            <Tabs defaultValue="posts" className="mx-auto my-5">
              <TabsList
                className="grid w-full grid-cols-2 bg-slate-0"
                style={{ background: "none !important" }}
              >
                <TabsTrigger value="posts" className="">
                  Posts
                </TabsTrigger>
                <TabsTrigger value="saved">Saved</TabsTrigger>
              </TabsList>
              <TabsContent value="posts">
                <UserPosts user={currentUser} />
              </TabsContent>
              <TabsContent value="saved">
                <UserSavePosts user={currentUser} />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
