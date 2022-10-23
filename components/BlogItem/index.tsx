import React from "react";
import Button from "shoebilyas-common/components/Button";
import moment from "moment";

import classes from "./BlogItem.module.css";
import Link from "next/link";
import useLoading from "shoebilyas-common/Hooks/useLoading";
import Loader from "shoebilyas-common/components/Loader";
import Overlay from "shoebilyas-common/components/Overlay";

const DUMMYDATA = {
  id: Math.random().toString(32),
  title: "This is a title of my blog a very initial design though",
  summary:
    "This is a title of my blog a very initial design thoughThis is a title of my blog a very initial design thoughThis is a title of my blog a very initial design thoughThis is a title of my blog a very initial design though",
  date: Date.now(),
};

interface IProps {
  blog: any;
}

const BlogItem: React.FC<IProps> = ({ blog }) => {
  const { loading, initiateLoading } = useLoading();

  return (
    <>
      {loading && (
        <Overlay>
          <Loader />
        </Overlay>
      )}
      <div
        className={`w-full p-4 flex md:mb-0 flex-col justify-between ${classes["blog-item"]} shadow-sm hover:shadow-lg`}
      >
        <div>
          <h1 className="font-bold text-2xl ml-2 mb-2">{blog.title}</h1>
        </div>
        <div>
          <p
            className={`rounded-lg p-2 mt-2 mb-2 ${classes["summary"]} text-gray-400 `}
          >
            {/* <span className="font-bold text-2xl">
            {blog.summary.slice(0, 1).toUpperCase()}
          </span> */}
            {blog.summary.slice(0, 125)}...
          </p>
          <div className="flex justify-between items-center">
            <div className="flex items-center text-gray-600 text-sm ml-2">
              <span className="font-medium ">Published - </span>
              <span>{moment(blog.createdAt).format("LL")}</span>
            </div>
            <Link href={`/blogs/${blog.slug}`}>
              <Button onClick={initiateLoading}>Read</Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogItem;
