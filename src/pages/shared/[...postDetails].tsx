import { Button } from "@/components/ui/button";
import {
  useDeletePost,
  useGetPostById,
  useGetUserPosts,
} from "@/lib/react-query/queriesAndMutations";
import { formatDate } from "@/lib/utils";
import { useRouter } from "next/router";
import React from "react";
import {
  Clipboard,
  Clock,
  Dot,
  FileCheck,
  MoreVertical,
  PenSquare,
  Trash,
} from "lucide-react";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import PostStats from "./postStats";
import { Dialog, DialogHeader, DialogTrigger } from "@/components/ui/dialog";
import { DialogContent } from "@radix-ui/react-dialog";
import { useUserContext } from "@/context/authContext";
import { ToastAction } from "@/components/ui/toast";
import { toast } from "@/components/ui/use-toast";

const PostDetails = () => {
  const router = useRouter();
  const { user } = useUserContext();
  const getPostId = router.asPath.split("/")[3];
  const { data: post, isPending } = useGetPostById(getPostId || "");
  const { mutate: deletePost } = useDeletePost();

  const handleCopyLink = () => {
    const linkToCopy = window.location.href;
    navigator.clipboard.writeText(linkToCopy).then(() => {
      toast({
        title: "Link copied to clipboard!",
        action: <ToastAction altText="Done">Done</ToastAction>,
      });
    });
  };

  const handleDeletePost = () => {
    try {
      deletePost({ postId: getPostId, imageId: post?.imageId });
      router.back();
    } catch (error) {
      console.log(error);
    }
  };

  if (!user || !post) return;

  console.log(user, post);

  return (
    <div className="sm:max-w-[500px] sm:mx-auto my-5">
      <div className="flex items-center gap-2">
        <FileCheck size={20} strokeWidth={2} />
        <h2 className="text-lg"> Post</h2>
      </div>
      <div className="my-10">
        {post === undefined ? (
          <img src="/loader.svg" alt="" />
        ) : (
          <div>
            <div className="flex items-center gap-3 my-5">
              <img
                src={post?.creator.imageUrl}
                alt=""
                className="w-12 h-12 rounded-full"
              />
              <div>
                <p>{post?.creator.name}</p>
                <p className="flex items-center text-sm">
                  <span>{post && formatDate(post?.$createdAt)}</span>
                  <Dot />
                  <span>{post?.location}</span>
                </p>
              </div>
            </div>
            <div>
              <div className="grid grid-cols-12 gap-5 p-5 overflow-hidden border border-gray-500 rounded-xl">
                <div className="col-span-12 sm:col-span-6 h-60">
                  <img
                    src={post?.imageUrl}
                    alt=""
                    className="object-cover w-full h-full rounded-xl"
                  />
                </div>
                <div className="col-span-12 sm:col-span-6">
                  <div className="flex flex-col justify-between h-full gap-5">
                    <p className="text-sm">{post?.caption}</p>
                    <PostStats post={post} userId={user.id} />
                  </div>
                </div>
              </div>
              <div>
                <div className="my-5">
                  <ul className="flex gap-2">
                    {post?.tags.map((tag: string, index: number) => (
                      <li
                        key={index}
                        className="flex text-sm font-semibold text-gray-500"
                      >
                        #{tag}
                      </li>
                    ))}
                  </ul>
                  <div
                    className={`flex items-center gap-3 my-5 ${
                      user.id !== post.creator.$id && "hidden"
                    }`}
                  >
                    <Button
                      variant={"destructive"}
                      size={"icon"}
                      onClick={handleDeletePost}
                      className="text-white rounded"
                    >
                      <Trash size={16} />
                    </Button>
                    <Link href={`/routes/editPost/${post?.$id}`}>
                      <Button
                        variant={"secondary"}
                        size={"icon"}
                        className="text-black rounded"
                      >
                        <PenSquare size={16} />
                      </Button>
                    </Link>
                    <Button
                      variant={"default"}
                      size={"icon"}
                      onClick={handleCopyLink}
                      className="text-white rounded"
                    >
                      <Clipboard size={16} />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PostDetails;
