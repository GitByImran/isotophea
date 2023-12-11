import Link from "next/link";
import React from "react";

const UserSavePosts = ({ user }: any) => {
  if (!user) {
    return;
  }
  return (
    <div>
      <div className="grid grid-cols-12">
        {user.save.map((save: any, index: any) => (
          <Link
            href={`/shared/postDetails/${save?.post?.$id}`}
            key={index}
            className="col-span-4 overflow-hidden"
          >
            <img
              src={save?.post?.imageUrl}
              className="duration-150 hover:scale-110"
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default UserSavePosts;
