import React from "react";
import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Input from "../components/Input";
import classes from "../styles/Home.module.css";
import BlogItem from "../components/BlogItem";
import { getAllBlogs } from "../lib/graphCms";
import { AppProps } from "next/app";
import Footer from "../components/Footer";
import { IBlogItem } from "../interface/blogs";
import useLoading from "../Hooks/useLoading";
import Overlay from "../components/Overlay";
import Loader from "../components/Loader";
import Navbar from "../components/Navbar";
import Newsletter from "../components/Newsletter";

interface IProps {
  blogList: IBlogItem[];
}

interface IState {
  blogs: IBlogItem[];
}
const Home: NextPage<IProps & AppProps> = ({ blogList }) => {
  const [search, setSearch] = React.useState<string>("");
  const [isSearching, setIsSearching] = React.useState<boolean>(false);
  const [blogs, setBlogs] = React.useState<IState["blogs"]>(blogList);
  const [showNewsletter, setShowNewsletter] = React.useState<boolean>(true);

  const closeNewsLetter = () => {
    setShowNewsletter(false);
  };
  const searchChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    if (e.target.value === "") {
      setIsSearching(false);
      setBlogs(blogList);
    } else {
      const searchTerm = new RegExp(search.toLowerCase(), "g");
      setBlogs((prev) =>
        prev.filter((blog) => blog.title.toLowerCase().search(searchTerm) > -1)
      );
      setIsSearching(true);
    }
  };

  return (
    <>
      {showNewsletter && (
        <Overlay>
          <Newsletter onClose={closeNewsLetter} />
        </Overlay>
      )}
      <Navbar />
      <div className={`w-full h-screen flex flex-col items-center mt-4`}>
        <main className="w-3/5 px-2 mb-auto">
          <Input value={search} onChange={searchChangeHandler} />
          <div className="w-3/5 flex flex-col justify-center items-center mt-4">
            {blogs.map((blog: any) => (
              <BlogItem blog={blog} />
            ))}
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Home;

export const getStaticProps: GetStaticProps = async () => {
  const blogList: IBlogItem[] = await getAllBlogs();
  return { props: { blogList } };
};
