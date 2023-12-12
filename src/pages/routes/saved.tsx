import { useGetCurrentUser } from "@/lib/react-query/queriesAndMutations";
import { Models } from "appwrite";
import { Bookmark } from "lucide-react";
import React from "react";
import PostStats from "../shared/postStats";
import { useUserContext } from "@/context/authContext";
import Link from "next/link";

const Saved = () => {
  const { data: currentUser, isLoading: isLoadingCurrentUser } =
    useGetCurrentUser();

  const savePosts = currentUser?.save
    .map((savePost: Models.Document) => ({
      ...savePost.post,
      creator: {
        imageUrl: currentUser.imageUrl,
      },
    }))
    .reverse();

  if (!currentUser) {
    return (
      <div className="sm:max-w-[500px] mx-auto flex justify-center my-5">
        <img src="/loader.svg" alt="loading" height={24} width={24} />
      </div>
    );
  }

  return (
    <div className="sm:max-w-[500px] mx-auto my-5">
      <div className="flex gap-2">
        <Bookmark strokeWidth={2} size={20} /> Saved
      </div>
      {!savePosts && (
        <div className="sm:max-w-[500px] mx-auto flex justify-center items-center w-full h-full my-5">
          <img src="/loader.svg" alt="loading" height={24} width={24} />
        </div>
      )}
      <div className="my-5">
        <div className="grid grid-cols-12 gap-5">
          {savePosts?.length === 0 ? (
            <>No saved posts.</>
          ) : (
            savePosts?.map((post: any, index: any) => (
              <Link
                key={index}
                href={`/shared/postDetails/${post.$id}`}
                className="h-40 col-span-6 overflow-hidden rounded-xl"
              >
                <div className="w-full h-full">
                  <img
                    src={post.imageUrl}
                    alt=""
                    loading="lazy"
                    className="object-cover w-full h-full duration-300 custom-rounded hover:scale-110"
                  />
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Saved;
