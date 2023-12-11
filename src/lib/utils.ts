import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const convertFileToUrl = (file: File) => URL.createObjectURL(file);

export const formatDate = (dateString: string): string => {
  const currentDate = new Date();
  const postDate = new Date(dateString);

  const timeDifference = currentDate.getTime() - postDate.getTime();
  const secondsDifference = Math.floor(timeDifference / 1000);

  const years = Math.floor(secondsDifference / (365 * 24 * 3600));
  const months = Math.floor(secondsDifference / (30 * 24 * 3600));
  const days = Math.floor(secondsDifference / (24 * 3600));
  const hours = Math.floor(secondsDifference / 3600);
  const minutes = Math.floor(secondsDifference / 60);

  if (years > 0) {
    return `${years} ${years === 1 ? "year" : "years"} ago`;
  } else if (months > 0) {
    return `${months} ${months === 1 ? "month" : "months"} ago`;
  } else if (days > 0) {
    return `${days} ${days === 1 ? "day" : "days"} ago`;
  } else if (hours > 0) {
    return `${hours} ${hours === 1 ? "hour" : "hours"} ago`;
  } else if (minutes > 0) {
    return `${minutes} ${minutes === 1 ? "minute" : "minutes"} ago`;
  } else {
    return "Just now";
  }
};

export const checkIsLiked = (likeList: string[], userId: string) => {
  return likeList?.includes(userId);
};
