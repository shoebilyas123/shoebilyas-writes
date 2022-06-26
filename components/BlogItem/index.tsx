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
        className={`w-full p-2 mb-2 flex flex-col justify-center ${classes["blog-item"]}`}
      >
        <h1 className="font-medium text-xl">{blog.title}</h1>
        <p className={`mt-2 ${classes["summary"]}`}>{blog.summary}</p>
        <div className="flex justify-between items-center">
          <span className="text-gray-600 text-sm">
            {moment(blog.createdAt).format("LL")}
          </span>
          <Link href={`/blogs/${blog.slug}`}>
            <Button onClick={initiateLoading}>Read</Button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default BlogItem;
