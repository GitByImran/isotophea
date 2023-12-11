import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useUserContext } from "@/context/authContext";
import {
  useGetUserById,
  useUpdateUser,
} from "@/lib/react-query/queriesAndMutations";
import { profileValidation } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import ProfileUploader from "./profileUploader";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

const EditProfile = () => {
  const router = useRouter();
  const { user, setUser } = useUserContext();
  const id = router.asPath.split("/")[3];

  const form = useForm<z.infer<typeof profileValidation>>({
    resolver: zodResolver(profileValidation),
    defaultValues: {
      file: [],
      name: user.name,
      username: user.username,
      email: user.email,
      bio: user.bio || "",
    },
  });

  const { data: currentUser } = useGetUserById(id || "");
  const { mutateAsync: updateUser, isPending: isLoadingUpdate } =
    useUpdateUser();

  if (!currentUser)
    return <div className="w-full h-full flex-center">Loading...</div>;

    if (!user || !id) return;

  const handleUpdate = async (value: z.infer<typeof profileValidation>) => {
    const updatedUser = await updateUser({
      userId: currentUser.$id,
      name: value.name,
      bio: value.bio,
      file: value.file,
      imageUrl: currentUser.imageUrl,
      imageId: currentUser.imageId,
    });

    if (!updatedUser) {
      console.log("Update user failed. Please try again.");
    }

    setUser({
      ...user,
      name: updatedUser?.name,
      bio: updatedUser?.bio,
      imageUrl: updatedUser?.imageUrl,
    });
    return router.push(`/routes/profile/${id}`);
  };

  return (
    <div className="sm:max-w-[500px] mx-auto">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleUpdate)}
          className="flex flex-col w-full space-y-4"
        >
          <FormField
            control={form.control}
            name="file"
            render={({ field }) => (
              <FormItem className="flex justify-center">
                <FormControl>
                  <ProfileUploader
                    fieldChange={field.onChange}
                    mediaUrl={currentUser.imageUrl}
                  />
                </FormControl>
                <FormMessage className="" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="">Name</FormLabel>
                <FormControl>
                  <Input type="text" className="" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="">Username</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    className=""
                    // defaultValue={currentUser.username}
                    {...field}
                    disabled
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="">Email</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    className=""
                    // defaultValue={currentUser.email}
                    {...field}
                    disabled
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="bio"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="">Bio</FormLabel>
                <FormControl>
                  <Textarea className="custom-scrollbar" {...field} />
                </FormControl>
                <FormMessage className="shad-form_message" />
              </FormItem>
            )}
          />

          <div className="flex items-center gap-4">
            <Button type="button" className="" onClick={() => router.back()}>
              Cancel
            </Button>
            <Button type="submit" className="" disabled={isLoadingUpdate}>
              {isLoadingUpdate && "..."}
              Update Profile
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default EditProfile;
