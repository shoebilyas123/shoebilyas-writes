import { gql, GraphQLClient } from "graphql-request";
import matter from "gray-matter";
import config from "./config";

import { IBlog, IBlogItem } from "../interface/blogs";

// @ts-ignore-next-line
const client = new GraphQLClient(process.env.GRAPHCMS_API);

export async function getBlogBySlug(slug: string) {
  try {
    const query = gql`
  {
    blog(where: {slug: "${slug}"}) {
      title
      content {
        html
      }
      createdAt
    }
  }
  `;
    const { blog } = await client.request(query);
    const transformed: IBlog = {
      ...blog,
      content: `${blog.content.html}`
        .replaceAll("</p>", "</p><br/>")
        .replaceAll("<h1>", '<h1 className="text-2xl font-medium">')
        .replaceAll("<h2>", '<h2 className="text-xl font-medium">'),
    };

    return transformed;
  } catch (err) {
    console.log(err);
    return [];
  }
}

export async function getBlogPaths() {
  const query = gql`
    {
      blogs {
        slug
      }
    }
  `;

  const { blogs } = await client.request(query);

  return (blogs as { slug: string }[]).map((item) => ({
    params: { slug: item.slug },
  }));
}

export async function getAllBlogs() {
  try {
    const query = gql`
      query MyQuery {
        blogs {
          slug
          id
          title
          summary
          createdAt
        }
      }
    `;

    const { blogs } = await client.request(query);
    return blogs as IBlogItem[];
  } catch (err) {
    console.log(err);
    return [];
  }
}
