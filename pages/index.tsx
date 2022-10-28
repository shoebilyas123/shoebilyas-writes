import React from "react";
import type { GetServerSideProps, GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { useDispatch, useSelector } from "react-redux";

import Input from "shoebilyas-common/components/Input";
import BlogItem from "../components/BlogItem";
import { getAllBlogs } from "shoebilyas-common/lib/graphCms";
import { AppProps } from "next/app";
import Footer from "../components/Footer";
import { IBlogItem } from "shoebilyas-common/interface/blogs";
import Overlay from "shoebilyas-common/components/Overlay";
import Navbar from "shoebilyas-common/components/Navbar";
import Newsletter from "../components/Newsletter";
import { setSeen } from "../store/slice/newsletter";

interface IProps {
  blogList: IBlogItem[];
}

interface IState {
  blogs: IBlogItem[];
}
const Home: NextPage<IProps & AppProps> = ({ blogList }) => {
  const dispatch = useDispatch();
  const { isSeen } = useSelector((state: any) => state.newsletter);
  const [search, setSearch] = React.useState<string>("");
  const [isSearching, setIsSearching] = React.useState<boolean>(false);
  const [blogs, setBlogs] = React.useState<IState["blogs"]>(blogList);
  const [filteredBlogs, setFilteredBlogs] = React.useState<IState["blogs"]>([]);

  const closeNewsLetter = () => {
    dispatch(setSeen());
  };

  const searchChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    if (e.target.value === "") {
      setIsSearching(false);
      setBlogs(blogList);
      setFilteredBlogs([]);
    } else {
      const searchTerm = new RegExp(search.toLowerCase(), "g");
      setFilteredBlogs(
        blogs.filter((blog) => blog.title.toLowerCase().search(searchTerm) > -1)
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

      {!isSeen && (
        <Overlay>
          <Newsletter onClose={closeNewsLetter} />
        </Overlay>
      )}
      <Navbar />
      <div className={`w-full flex flex-col md:items-center mt-4`}>
        <main className="md:w-3/5 sm:w-full mb-auto sm:px-1 flex flex-col items-center min-h-[69vh]">
          <div className="sm:w-11/12 md:w-4/12 my-8">
            <Input value={search} onChange={searchChangeHandler} />
          </div>
          {/* <div className="md:w-4/5 lg:w-3/5 px-4 sm:w-full flex flex-col justify-center items-center mt-4"> */}
          <div className="px-4 grid md:grid-cols-2 sm:grid-cols-1 gap-4">
            {(filteredBlogs.length > 0 ? filteredBlogs : blogs).map((blog) => (
              <BlogItem key={blog.id} blog={blog} />
            ))}
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async () => {
  const blogList: IBlogItem[] = await getAllBlogs();
  return { props: { blogList } };
};
