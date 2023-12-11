import { useForm } from "react-hook-form";
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
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { signInvalidation } from "@/lib/validation";
import Link from "next/link";
import { useToast } from "@/components/ui/use-toast";
import { useSigninAccount } from "@/lib/react-query/queriesAndMutations";
import { useRouter } from "next/router";
import { useUserContext } from "@/context/authContext";

const SignInForm = () => {
  const { toast } = useToast();
  const router = useRouter();
  const { checkAuthUser, isLoading: isUserLoading } = useUserContext();

  const { mutateAsync: signInAccount } = useSigninAccount();

  const form = useForm<z.infer<typeof signInvalidation>>({
    resolver: zodResolver(signInvalidation),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSignin = async (values: z.infer<typeof signInvalidation>) => {
    const session = await signInAccount({
      email: values.email,
      password: values.password,
    });
    if (!session) {
      toast({ title: "Login failed. Please try again." });

      return;
    }

    const isLoggedIn = await checkAuthUser();

    console.log("entering", isLoggedIn);
    if (isLoggedIn) {
      console.log("login success with ", session);
      form.reset();

      router.push("/");
    } else {
      toast({ title: "Login failed. Please try again." });

      return;
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-screen gap-5">
      <Form {...form}>
        <div className="flex flex-col items-center gap-2 py-2">
          <img src="/isotope-logo.png" alt="" className="w-10" />
          <h2 className="font-semibold">Welcome Back</h2>
        </div>
        <form
          onSubmit={form.handleSubmit(handleSignin)}
          className="space-y-3 w-60"
        >
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
            Sign in {isUserLoading && "..."}
          </Button>
        </form>
        <div className="text-sm">
          Don't have an account,
          <Link href="/auth/signUpForm" className="underline">
            Create a account
          </Link>
        </div>
      </Form>
    </div>
  );
};

export default SignInForm;
