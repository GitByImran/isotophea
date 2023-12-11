import { useToast } from "@/components/ui/use-toast";
import { useUserContext } from "@/context/authContext";
import { useGetUsers } from "@/lib/react-query/queriesAndMutations";
import { PlusSquare } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

const restrictedForSuggest = ["/routes/people"];

const Suggest = () => {
  const { toast } = useToast();
  const { user } = useUserContext();
  const router = useRouter();
  const {
    data: creators,
    isLoading: isPeopleLoading,
    isError: isErrorCreators,
  } = useGetUsers();

  if (isErrorCreators) {
    toast({ title: "Something went wrong." });
    return;
  }

  const getCreators = creators?.documents.filter(
    (creator) => creator.$id !== user.id
  );

  if (!creators || !user) {
    return (
      <div className="flex items-center justify-center my-10 w-72 h-fit">
        <img src="/loader.svg" alt="loading" height={24} width={24} />
      </div>
    );
  }

  return (
    <div className="sticky top-0 hidden h-screen p-5 overflow-y-auto w-72 lg:block">
      <div className="grid grid-cols-12 gap-5">
        {!restrictedForSuggest.includes(router?.asPath) &&
          getCreators?.map((creator, index) => (
            <Link
              href=""
              key={index}
              className="col-span-12 overflow-hidden border border-gray-500 shadow-md rounded-xl"
            >
              <div className="flex items-center justify-between w-full gap-3 px-2 py-5">
                <div className="flex items-center w-full gap-5 ">
                  <img
                    src={creator.imageUrl}
                    alt=""
                    className="w-12 h-12 rounded-full"
                  />
                  <div className="">
                    <p className="font-semibold truncate w-28">
                      {creator.name}
                    </p>
                    <p className="text-sm text-gray-500">@{creator.username}</p>
                  </div>
                </div>
                <PlusSquare size={20} />
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default Suggest;