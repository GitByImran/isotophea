import { useGetUserById } from "@/lib/react-query/queriesAndMutations";
import Link from "next/link";
import React from "react";

const UserPosts = ({ user }: any) => {
  console.log(user.posts);
  return (
    <div>
      <div className="grid grid-cols-12">
        {user.posts.map((post: any, index: any) => (
          <Link
            href={`/shared/postDetails/${post.$id}`}
            key={index}
            className="col-span-4 overflow-hidden"
          >
            <img src={post.imageUrl} className="duration-150 hover:scale-110" />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default UserPosts;
