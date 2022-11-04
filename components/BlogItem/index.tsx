import React from "react";
import Button from "shoebilyas-common/components/Button";
import moment from "moment";
import { useTheme } from "next-themes";
import { HiShare } from "react-icons/hi";

import classes from "./BlogItem.module.css";
import Link from "next/link";
import useLoading from "shoebilyas-common/Hooks/useLoading";
import Loader from "shoebilyas-common/components/Loader";
import Overlay from "shoebilyas-common/components/Overlay";
import { IBlogItem } from "shoebilyas-common/interface/blogs";

const DUMMYDATA = {
  id: Math.random().toString(32),
  title: "This is a title of my blog a very initial design though",
  summary:
    "This is a title of my blog a very initial design thoughThis is a title of my blog a very initial design thoughThis is a title of my blog a very initial design thoughThis is a title of my blog a very initial design though",
  date: Date.now(),
};

interface IProps {
  blog: IBlogItem;
}

interface IShareData {
  title: string;
  text: string;
  url: string;
}

const BlogItem: React.FC<IProps> = ({ blog }) => {
  const { loading, initiateLoading } = useLoading();
  const { theme } = useTheme();

  const webshareHandler = async () => {
    const shareData: IShareData = {
      title: blog.title,
      text: blog.summary,
      url: `https://shoebilyas.com/blogs/${blog.slug}`,
    };

    try {
      await navigator.share(shareData);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {loading && (
        <Overlay>
          <Loader />
        </Overlay>
      )}
      <div
        className={`w-full p-4 flex md:mb-0 flex-col justify-between bg-white dark:bg-zinc-900 dark:bg-opacity-25 dark:border dark:border-zinc-900 border border-transparent transition dark:hover:border-orange-800 rounded-md  shadow-sm hover:shadow-lg`}
      >
        <div>
          <h1
            className="font-bold text-2xl ml-2 mb-2"
            style={{ color: theme === "dark" ? "" : "var(--font-purple-dark)" }}
          >
            {blog.title}
          </h1>
        </div>
        <div>
          <p
            className={`rounded-lg p-2 mt-2 mb-2 ${classes["summary"]} text-gray-400 dark:text-gray-300 `}
          >
            {/* <span className="font-bold text-2xl">
            {blog.summary.slice(0, 1).toUpperCase()}
          </span> */}
            {blog.summary.slice(0, 125)}...
          </p>
          <div className="flex justify-between items-center">
            <div className="flex items-center text-gray-600 dark:text-gray-400 text-sm ml-2">
              <span className="font-medium ">Published - </span>
              <span>{moment(blog.createdAt).format("LL")}</span>
            </div>
            <div className="flex space-x-2">
              <Button
                onClick={webshareHandler}
                className="border  border-white px-4 py-1 rounded-lg hover:bg-white hover:text-zinc-900 transition-all"
              >
                <HiShare />
                {/* Share */}
              </Button>
              <Link href={`/blogs/${blog.slug}`}>
                <Button onClick={initiateLoading}>Read</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogItem;
