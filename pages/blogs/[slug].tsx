import React from "react";
import type { NextPage, GetStaticPaths, GetStaticProps } from "next";
import { GraphQLClient } from "graphql-request";
import { BsArrowLeft } from "react-icons/bs";
import ReactMarkdown from "react-markdown";
import Link from "next/link";
import moment from "moment";
import parser from "html-react-parser";

import { getBlogBySlug, getBlogPaths } from "../../lib/graphCms";
import Button from "../../components/Button";
import Footer from "../../components/Footer";
import Overlay from "../../components/Overlay";
import Loader from "../../components/Loader";
import Navbar from "../../components/Navbar";
import useLoading from "../../Hooks/useLoading";
import Head from "next/head";
import { IBlog } from "../../interface/blogs";

interface IProps {
  blog: IBlog;
}

const BlogPage: NextPage<IProps> = (props) => {
  const { blog } = props;
  const { loading, initiateLoading } = useLoading();

  return (
    <div className="w-full flex flex-col items-center">
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content={`${blog.summary}`} />
        <title>{blog.title}</title>
      </Head>
      <Navbar />

      {loading && (
        <Overlay>
          <Loader />
        </Overlay>
      )}

      <div className="lg:w-6/12 md:w-4/5 sm:w-full flex flex-col md:mt-4 md:mb-6">
        <div className="sm:fixed md:relative sm:top-4 sm:left-4 lg:top-0 lg:left-0">
          <Link href="/">
            <Button
              onClick={initiateLoading}
              className="sm:p-4 rounded-full lg:rounded lg:px-4 lg:py-2"
            >
              <BsArrowLeft />
              <span className="sm:hidden lg:block ml-2">Go Back</span>
            </Button>
          </Link>
        </div>
        <div className="lg:w-11/12 md:w-full sm:w-full h-fit lg:mt-4 bg-white shadow-lg p-6">
          <h1
            className="font-bold text-4xl"
            style={{ color: "var(--font-purple-dark)" }}
          >
            {blog.title}
          </h1>
          <div className="flex flex-row justify-between items-center">
            <p style={{ color: "var(--font-purple)" }}>
              <i>written by </i>
              <strong>Shoeb Ilyas</strong>
            </p>
            <p
              className="text-gray-400 my-3"
              style={{ color: "var(--font-purple)" }}
            >
              Published At {moment(blog.createdAt).format("LL")}
            </p>
          </div>
          <hr />
          {/* <div style={{ fontSize: "25px" }}> */}
          {/* <ReactMarkdown>{blog.content.markdown}</ReactMarkdown> */}
          {/* </div> */}
          <p className="text-24 mt-4">{parser(blog.content)}</p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BlogPage;

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = await getBlogPaths();

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const slug = context.params?.slug;
  const blog = await getBlogBySlug(`${slug}` || "");

  return {
    props: {
      blog,
    },
  };
};
