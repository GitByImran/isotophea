import { useGetRecentPosts } from "@/lib/react-query/queriesAndMutations";
import { Newspaper } from "lucide-react";
import React from "react";
import PostCard from "../shared/postCard";
import { Models } from "appwrite";

const HomePage: React.FC = () => {
  const {
    data: posts,
    isPending: isPostLoading,
    isError: isPostError,
  } = useGetRecentPosts();

  if (!posts) {
    return;
  }

  return (
    <div className="mx-auto" style={{ maxWidth: 500 }}>
      <div className="flex items-center gap-2">
        <Newspaper size={20} strokeWidth={2} />
        <h2 className="text-lg"> Feed</h2>
      </div>
      <div className="flex flex-col items-center my-5">
        {!posts && (
          <img src="/loader.svg" alt="loading" height={24} width={24} />
        )}
        {!isPostLoading && !posts ? (
          <></>
        ) : (
          <ul className="flex flex-col w-full gap-5">
            {posts?.documents.map((post: Models.Document, index: number) => (
              <PostCard post={post} key={index} />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default HomePage;
