import React from "react";
import Button from "../Button";
import moment from "moment";

import classes from "./BlogItem.module.css";
import Link from "next/link";
import useLoading from "../../Hooks/useLoading";
import Loader from "../Loader";
import Overlay from "../Overlay";

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
        className={`w-full p-2 mb-4 flex flex-col justify-center ${classes["blog-item"]} shadow-sm hover:shadow-lg`}
      >
        <h1 className="font-medium text-2xl ml-2">{blog.title}</h1>
        <p
          className={`rounded-lg p-2 mt-2 mb-2 ${classes["summary"]} font-medium`}
        >
          ...{blog.summary}...
        </p>
        <div className="flex justify-between items-center">
          <div className="flex items-center text-gray-600 text-sm">
            <span className="font-medium ">Published - </span>
            <span>{moment(blog.createdAt).format("LL")}</span>
          </div>
          <Link href={`/blogs/${blog.slug}`}>
            <Button onClick={initiateLoading}>Read</Button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default BlogItem;
