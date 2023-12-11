import React from "react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { signUpvalidation } from "@/lib/validation";
import Link from "next/link";
import { createUserAccount } from "@/lib/appwrite/api";
import { useToast } from "@/components/ui/use-toast";
import {
  useCreateAccount,
  useSigninAccount,
} from "@/lib/react-query/queriesAndMutations";
import { useRouter } from "next/router";
import { useUserContext } from "@/context/authContext";

const SignUpForm = () => {
  const { toast } = useToast();
  const router = useRouter();
  const { checkAuthUser, isLoading: isUserLoading } = useUserContext();

  const { mutateAsync: createUserAccount, isPending: isCreatingUser } =
    useCreateAccount();

  const { mutateAsync: signInAccount, isPending: isSigningIn } =
    useSigninAccount();

  const form = useForm<z.infer<typeof signUpvalidation>>({
    resolver: zodResolver(signUpvalidation),
    defaultValues: {
      username: "",
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof signUpvalidation>) => {
    const newUser = await createUserAccount(values);

    if (!newUser) {
      return toast({
        title: "Failed to create user, please try again",
      });
    }

    console.log("new user : ", newUser);

    const session = await signInAccount({
      email: values.email,
      password: values.password,
    });

    console.log("session:", session);

    if (!session) {
      return toast({
        title: "Failed to signing in, please try again",
      });
    }

    const isLoggedIn = await checkAuthUser();

    console.log(isLoggedIn);

    if (isLoggedIn) {
      form.reset();
      router.push("/auth/signInForm");
    } else {
      return toast({ title: "Failed to create user, please try again" });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-screen gap-5">
      <Form {...form}>
        <div className="flex flex-col items-center gap-2 py-2">
          <img src="/isotope-logo.png" alt="" className="w-10" />
          <h2 className="font-semibold">Create a new account</h2>
        </div>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3 w-60">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input
                    placeholder="username"
                    {...field}
                    className="rounded"
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="name" {...field} className="rounded" />
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
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="email" {...field} className="rounded" />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="password"
                    {...field}
                    className="rounded"
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="rounded">
            Create account {isCreatingUser && "..."}
          </Button>
        </form>
        <div className="text-sm">
          Already have an account,
          <Link href="/auth/signInForm" className="underline">
            Login now
          </Link>
        </div>
      </Form>
    </div>
  );
};

export default SignUpForm;
