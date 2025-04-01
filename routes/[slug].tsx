import { Handlers, PageProps } from "$fresh/server.ts";
import { Head } from "$fresh/runtime.ts";
import { getPost, Post } from "@/utils/posts.ts";
import { CSS, KATEX_CSS, render } from "$gfm";

export const handler: Handlers<Post> = {
  async GET(_req, ctx) {
    try {
      const post = await getPost(ctx.params.slug);
      return ctx.render(post as Post);
    } catch {
      return ctx.renderNotFound();
    }
  },
};



export default function PostPage(props: PageProps<Post>) {
  const post = props.data;
  const bg_col = `hsl(${ Math.random () * 360 }, 100%, 66%)`
  return (
    <>
      <Head>
        <style dangerouslySetInnerHTML={{ __html: CSS }} />
        <style dangerouslySetInnerHTML={{ __html: KATEX_CSS }} />
      </Head>
      <style>
        {`
          body {
            background-color: ${bg_col};
          }
          
          .markdown-body {
            background-color: transparent;}
        `}
      </style>
      
      <main class="max-w-screen-md px-4 pt-16 mx-auto">
        <h1 class="text-5xl font-bold">{post.title}</h1>
        <time class="text-black">
          {new Date(post.publishedAt).toLocaleDateString("en-us", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </time>
        <a href="/" class="block mt-4 text-black">← Back to home</a>
        <div
          class="mt-8 mb-48 markdown-body"
          dangerouslySetInnerHTML={{ __html: render(post.content, {
            disableHtmlSanitization: post.disableHtmlSanitization,
            allowMath: post.allowMath,
          }) }}
        />
        </main>
    </>
  );
}
