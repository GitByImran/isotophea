import { useUserContext } from "@/context/authContext";
import {
  useDeleteSavedPost,
  useGetCurrentUser,
  useLikePost,
  useSavePost,
} from "@/lib/react-query/queriesAndMutations";
import { checkIsLiked } from "@/lib/utils";
import { PostStatsProps } from "@/types";
import { Models } from "appwrite";
import { MessageCircle } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const PostStats = ({ post, userId }: PostStatsProps) => {
  const likesList = post?.likes.map((user: Models.Document) => user.$id) || [];
  const [likes, setLikes] = useState<string[]>(likesList);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    setLikes(likesList);
  }, [post]);

  const { mutate: likePost } = useLikePost();
  const { mutate: savePost, isPending: isSavingPending } = useSavePost();
  const { mutate: deleteSavedPost, isPending: isDeletingSaved } =
    useDeleteSavedPost();

  const { data: currentUser, refetch } = useGetCurrentUser();

  const savedPostRecord = currentUser?.save.find(
    (record: Models.Document) => record.post.$id === post?.$id
  );

  useEffect(() => {
    setIsSaved(!!savedPostRecord);
  }, [currentUser]);

  const handleLikePost = (
    e: React.MouseEvent<HTMLImageElement, MouseEvent>
  ) => {
    e.stopPropagation();

    let likesArray = [...likes];

    if (likesArray.includes(userId)) {
      likesArray = likesArray.filter((Id) => Id !== userId);
      refetch();
    } else {
      likesArray.push(userId);
      refetch();
    }
    setLikes(likesArray);
    likePost({ postId: post?.$id || "", likesArray });
  };
  const handleSavePost = (
    e: React.MouseEvent<HTMLImageElement, MouseEvent>
  ) => {
    e.stopPropagation();

    if (savedPostRecord) {
      setIsSaved(false);
      return deleteSavedPost(savedPostRecord.$id);
    } else {
      savePost({ postId: post?.$id || "", userId });
      setIsSaved(true);
    }
  };
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <img
          src={checkIsLiked(likes, userId) ? "/liked.svg" : "/like.svg"}
          alt="like"
          height={20}
          width={20}
          onClick={(e) => handleLikePost(e)}
          className="cursor-pointer"
        />
        <p className="text-sm">{likes?.length}</p>
      </div>

      <div className="flex items-center gap-2">
        {isSavingPending || isDeletingSaved ? (
          <img
            src="/loader.svg"
            alt="saving"
            height={20}
            width={20}
            onClick={(e) => handleSavePost(e)}
            className="cursor-pointer"
          />
        ) : (
          <img
            src={isSaved ? "/saved.svg" : "/save.svg"}
            alt="save"
            height={20}
            width={20}
            onClick={(e) => handleSavePost(e)}
            className="cursor-pointer"
          />
        )}
      </div>
    </div>
  );
};

export default PostStats;
