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
import FileUploader from "../shared/fileUploader";
import { postValidation } from "@/lib/validation";
import { PostFormProps } from "@/types";
import { useUserContext } from "@/context/authContext";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/router";
import { useCreatePost } from "@/lib/react-query/queriesAndMutations";
import { ToastClose } from "@radix-ui/react-toast";
import { ToastAction } from "@/components/ui/toast";

const CreatePost = ({ post }: PostFormProps) => {
  const { user } = useUserContext();
  const router = useRouter();
  const { mutateAsync: createPost, isPending: isLoadingCreate } =
    useCreatePost();

  const form = useForm<z.infer<typeof postValidation>>({
    resolver: zodResolver(postValidation),
    defaultValues: {
      caption: post ? post?.caption : "",
      file: [],
      location: post ? post?.location : "",
      tags: post ? post?.tags : "",
    },
  });
  const onSubmit = async (values: z.infer<typeof postValidation>) => {
    const newPost = await createPost({
      ...values,
      userId: user.id,
    });

    if (!newPost) {
      console.log("couldnot post,please try again");
      toast({
        title: "Couldnot post,please try again!",
      });
    } else {
      toast({
        title: "Post has been uploaded.",
        action: <ToastAction altText="Done">Done</ToastAction>,
      });
      router.push("/");
    }
  };
  return (
    <div className="sm:max-w-[500px] mx-auto">
      <div>
        <div className="flex gap-2">
          <ImagePlus size={20} strokeWidth={2} />
          <p>Create a new Post</p>
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
                      className="w-full overflow-hidden rounded custom-scrollbar textarea-suggestion"
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
                  <FormLabel>Select Photo</FormLabel>
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
                    <Input className="w-full rounded" {...field} />
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
                      className="w-full overflow-hidden rounded"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center gap-5 py-5">
              <Button variant={"outline"} type="button" className="rounded">
                Cancel
              </Button>
              <Button variant={"outline"} type="submit" className="rounded">
                Send
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default CreatePost;
