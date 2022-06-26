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
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta
          name="description"
          content="Since a very young age, I have a passion for writing. There is not a specific domain in
          which I write. Philosophy, self-help, productivity, inspirational,
          socio-economic issues etc., whichever topic gets my attention."
        />
        <title>ShoebIlyas Writes</title>
      </Head>

      {/* {showNewsletter && (
        <Overlay onClose={closeNewsLetter}>
          <Newsletter onClose={closeNewsLetter} />
        </Overlay>
      )} */}
      <Navbar />
      <div className={`w-full h-screen flex flex-col md:items-center mt-4`}>
        <main className="md:w-3/5 sm:w-full sm:px-6 mb-auto sm:px-1 flex flex-col items-center justify-center">
          <div className="sm:w-11/12 md:w-4/12 my-4">
            <Input value={search} onChange={searchChangeHandler} />
          </div>
          <div className="md:w-4/5 lg:w-3/5 px-4 sm:w-full flex flex-col justify-center items-center mt-4">
            {blogs.map((blog) => (
              <>
                <BlogItem key={blog.id} blog={blog} />
              </>
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
