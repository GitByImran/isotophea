import { ImagePlus } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { postValidation } from "@/lib/validation";
import { useUserContext } from "@/context/authContext";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/router";
import {
  useGetPostById,
  useUpdatePost,
} from "@/lib/react-query/queriesAndMutations";
import FileUploader from "../shared/fileUploader";

const EditPost = () => {
  const { user } = useUserContext();
  const router = useRouter();
  const getPostId = router.asPath.split("/")[3];
  const { data: post, isPending } = useGetPostById(getPostId || "");
  const { mutateAsync: updatePost, isPending: isLoadingUpdate } =
    useUpdatePost();

  const form = useForm<z.infer<typeof postValidation>>({
    resolver: zodResolver(postValidation),
    defaultValues: {
      caption: post?.caption,
      file: [],
      location: post?.location,
      tags: post?.tags,
    },
  });

  const onSubmit = async (values: z.infer<typeof postValidation>) => {
    if (post) {
      const updatedPost = await updatePost({
        ...values,
        postId: post.$id,
        imageId: post.imageId,
        imageUrl: post.imageUrl,
      });

      if (!updatedPost) {
        toast({
          title: `Update failed. Please try again.`,
        });
      }

      router.push("/");
    }
  };

  if (!user || !post || !getPostId) return;

  if (isPending) {
    return <div>loading...</div>;
  }

  return (
    <div className="sm:max-w-[500px] mx-auto">
      <div>
        <div className="flex gap-2">
          <ImagePlus size={20} strokeWidth={2} />
          <p>Edit Post</p>
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="my-5 space-y-2"
          >
            <FormField
              control={form.control}
              name="caption"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Caption</FormLabel>
                  <FormControl>
                    <Textarea
                      className="w-full custom-scrollbar textarea-suggestion rounded-xl"
                      placeholder="what's on your mind..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="file"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Select Photos</FormLabel>
                  <FormControl>
                    <FileUploader
                      fieldChange={field.onChange}
                      mediaUrl={post?.imageUrl}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Add Location</FormLabel>
                  <FormControl>
                    <Input
                      className="w-full custom-scrollbar rounded-xl"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="tags"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Add Tags</FormLabel>
                  <FormControl>
                    <Input
                      className="w-full custom-scrollbar rounded-xl"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div>
              <Button variant={"outline"} type="button">
                Cancel
              </Button>
              <Button
                variant={"outline"}
                type="submit"
                disabled={isLoadingUpdate}
              >
                Update {isLoadingUpdate && "..."}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default EditPost;
