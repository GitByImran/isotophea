import { useUserContext } from "@/context/authContext";
import { formatDate } from "@/lib/utils";
import { PostCardProps } from "@/types";
import { Dot, PenSquare } from "lucide-react";
import Link from "next/link";
import PostStats from "./postStats";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetRecentPosts } from "@/lib/react-query/queriesAndMutations";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const PostCard = ({ post }: PostCardProps) => {
  const { user } = useUserContext();
  const { isPending: isPostLoading } = useGetRecentPosts();

  if (!post || !user) return;

  return (
    <div className="overflow-hidden border shadow-lg dark:border-gray-500 rounded-xl ">
      <div className="">
        <div className="flex justify-between w-full gap-2 p-2">
          <Link
            href={`/profile/${post?.creator.$id}`}
            className="flex items-center gap-2"
          >
            <img
              src={post?.creator?.imageUrl || "/dummy-avatar.png"}
              alt="post creator"
              className="w-12 h-12 rounded-full"
              loading="lazy"
            />
            <div className="flex flex-col">
              <p className="text-md">{post?.creator.name}</p>
              <p className="flex items-center text-sm text-gray-400">
                <span>{formatDate(post.$createdAt)}</span>
                <Dot />
                <span>{post.location}</span>
              </p>
            </div>
          </Link>
          <Link
            href={`/routes/editPost/${post?.$id}`}
            className={`${user?.id !== post?.creator.$id && "hidden"}`}
          >
            <PenSquare size={20} />{" "}
          </Link>
        </div>
        <div className="p-2">
          <Link href={`/shared/postDetails/${post?.$id}`}>
            <p className="">{post?.caption}</p>
            <ul className="flex items-center gap-2 text-sm text-gray-500">
              {post?.tags.map((tag: string, index: number) => (
                <li key={index}>#{tag}</li>
              ))}
            </ul>
          </Link>
        </div>
        <div>
          <Dialog>
            <DialogTrigger className="w-full">
              <img
                src={post?.imageUrl}
                alt=""
                className="object-cover w-full h-60"
                loading="lazy"
              />
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px] p-0">
              <img
                src={post?.imageUrl}
                alt=""
                className="w-full h-full"
                loading="lazy"
              />
            </DialogContent>
          </Dialog>
        </div>
        <div className="px-5 py-2">
          <PostStats post={post} userId={user?.id} />
        </div>
      </div>
    </div>
  );
};

export default PostCard;
