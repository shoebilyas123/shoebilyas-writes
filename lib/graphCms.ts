import { gql, GraphQLClient } from "graphql-request";

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
      writtenAt
      summary
    }
  }
  `;
    const { blog } = await client.request(query);
    const transformed: IBlog = {
      ...blog,
      createdAt: blog.writtenAt,
      content: `${blog.content.html}`
        .replaceAll("</p>", "</p><br/>")
        .replaceAll("<h1>", '<h1 className="text-2xl font-bold">')
        .replaceAll("<h2>", '<h2 className="text-xl font-bold">'),
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
          writtenAt
        }
      }
    `;

    const { blogs } = await client.request(query);
    const transformedBlogs: IBlogItem[] = blogs.map((blog: any) => ({
      ...blog,
      createdAt: blog.writtenAt,
    }));
    return transformedBlogs;
  } catch (err) {
    console.log(err);
    return [];
  }
}
