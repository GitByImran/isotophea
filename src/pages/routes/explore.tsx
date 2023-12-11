import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { Input } from "@/components/ui/input";
import {
  useGetPosts,
  useSearchPosts,
} from "@/lib/react-query/queriesAndMutations";

import { Models } from "appwrite";
import Link from "next/link";
import React, { useState } from "react";
import useDebounce from "../hooks/uneDebounce";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Dot, MoveRight, Search, SearchIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/utils";

const SearchBox = () => {
  const [searchValue, setSearchValue] = useState("");
  /*   const debounceValue = useDebounce(searchValue, 500); */
  const { data: posts, fetchNextPage, hasNextPage } = useGetPosts();
  const {
    data: searchedPosts,
    isFetching: isSearchFetching,
    isFetched: isSearchFetchingComplete,
  } = useSearchPosts(searchValue);

  const shouldShowSearchResults = searchValue !== "";
  /*   const shouldShowPosts =
    !shouldShowSearchResults &&
    posts?.pages.every((item) => item?.documents.length === 0); */

  console.log(posts);
  return (
    <div className="sm:max-w-[500px] sm:mx-auto">
      <div className="relative flex items-center gap-3">
        <input
          id="searchInput"
          type="text"
          placeholder="serach your text here"
          onChange={(e) => setSearchValue(e.target.value)}
          className="w-full px-5 py-2 border border-gray-500 rounded text-md"
        />
        <button className="absolute text-gray-500 right-5">
          <SearchIcon size={20} />
        </button>
      </div>
      <div className="my-2 text-sm text-gray-500">
        {isSearchFetching && (
          <img
            src="/loader.svg"
            alt=""
            height={24}
            width={24}
            className="my-5"
          />
        )}
        {searchedPosts?.documents.length === 0 && (
          <div className="mt-2">
            <p>No results found.</p>
          </div>
        )}
      </div>
      {searchedPosts?.documents.map((post, index) => (
        <div
          className="flex flex-col gap-2 px-2 py-2 my-2 border border-gray-500 rounded hover:bg-gray-500 hover:text-white"
          key={index}
        >
          <Link
            href={`/shared/postDetails/${post.$id}`}
            className="flex items-center justify-between text-sm"
          >
            <div className="flex items-center gap-2">
              <img
                src={post.imageUrl}
                alt=""
                className="object-cover w-8 h-8 rounded"
              />
              <p>{post.caption}</p>
            </div>
            <MoveRight size={16} className="" />
          </Link>
        </div>
      ))}
      {!searchedPosts && (
        <p className="my-5 font-semibold">Explore from suggest</p>
      )}
      {posts?.pages[0]?.documents.length === 0 && (
        <img src="/loader.svg" alt="loading" />
      )}
      <div className="grid grid-cols-12 gap-5">
        {!searchedPosts &&
          posts?.pages[0]?.documents.map((post: any, index: any) => (
            <div key={index} className="col-span-6 overflow-hidden rounded-xl">
              <Link href={`/shared/postDetails/${post.$id}`}>
                <div className="relative">
                  <img src={post?.imageUrl} alt="" className="" />
                  <div
                    className="absolute bottom-0 flex items-center justify-between w-full p-2 text-sm"
                    style={{
                      background:
                        "linear-gradient(-180deg, hsla(0, 0%, 0%, 0), hsla(0, 0%, 0%, 1))",
                    }}
                  >
                    <div className="flex items-center gap-2">
                      <img
                        src={post.creator.imageUrl}
                        alt=""
                        className="w-5 h-5 rounded-full"
                      />
                      <p className="w-24 break-words truncate">
                        {post.creator.name}
                      </p>
                    </div>
                    <p>{post.likes.length}</p>
                  </div>
                  <div className="absolute top-0 left-0 p-2">
                    <p className="flex items-center text-sm text-gray-400">
                      <Dot />
                      {formatDate(post.$createdAt)}
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          ))}
      </div>
    </div>
  );
};

export default SearchBox;
