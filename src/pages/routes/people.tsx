import { useToast } from "@/components/ui/use-toast";
import { useUserContext } from "@/context/authContext";
import { useGetUsers } from "@/lib/react-query/queriesAndMutations";
import { UsersRound } from "lucide-react";
import Link from "next/link";
import React from "react";

const People = () => {
  const { toast } = useToast();
  const { user } = useUserContext();
  const {
    data: creators,
    isLoading: isPeopleLoading,
    isError: isErrorCreators,
  } = useGetUsers();

  if (isErrorCreators) {
    toast({ title: "Something went wrong." });
    return;
  }

  if (!creators || !user) {
    return (
      <div className="sm:max-w-[500px] mx-auto flex justify-center my-5">
        <img src="/loader.svg" alt="loading" height={24} width={24} />
      </div>
    );
  }

  const getCreators = creators?.documents.filter(
    (creator) => creator.$id !== user.id
  );

  return (
    <div className="sm:max-w-[500px] mx-auto my-5">
      <div className="flex items-center gap-2">
        <UsersRound strokeWidth={2} size={20} />
        People
      </div>
      {isPeopleLoading && (
        <div className="sm:max-w-[500px] mx-auto flex justify-center items-center w-full h-full">
          <img
            src="/loader.svg"
            alt="loading"
            height={24}
            width={24}
            className="my-5"
          />
        </div>
      )}
      <div className="my-5 creators-cards">
        <div className="grid grid-cols-12 gap-5">
          {getCreators?.map((creator, index) => (
            <Link
              href=""
              key={index}
              className="col-span-6 overflow-hidden border shadow-md rounded-xl"
            >
              <div className="flex flex-col items-center gap-3 px-2 py-5">
                <img
                  src={creator.imageUrl}
                  alt=""
                  className="w-16 h-16 rounded-full"
                />
                <div className="text-center">
                  <p className="font-semibold">{creator.name}</p>
                  <p className="text-sm text-gray-500">@{creator.username}</p>
                </div>
                <button className="px-5 py-1 text-white bg-blue-500 rounded">
                  follow
                </button>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default People;
