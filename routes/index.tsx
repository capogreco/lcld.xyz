import { Handlers, PageProps } from "$fresh/server.ts";
import { getPost, getPosts, Post } from "@/utils/posts.ts";

export const handler: Handlers<Post[]> = {
  async GET(_req, ctx) {
    const posts = await getPosts();
    return ctx.render(posts);
  },
};

export default function BlogIndexPage(props: PageProps<Post[]>) {
  const posts = props.data;
  return (
    <>
      <head>

        <title>Love Continuous, Love Discrete</title>

        <meta name="description" content="blog" />
        <meta property="og:title" content="Love Continuous, Love Discrete" />
        <meta property="og:type" content="website" />
        <meta property="og:description" content="blog" />

        <link rel="modulepreload" href="scripts/falling_bg.js" />
        <link rel="modulepreload" href="scripts/faller.js" />
        <script src="scripts/falling_bg.js" type="module"></script>

      </head>
      <main class="max-w-screen-md px-4 pt-16 mx-auto">      

        <h1 class="text-5xl font-bold">Love Continuous,</h1>
        <h1 class="text-5xl font-bold">Love Discrete</h1>
        {/* <h2 class="mt-4 text-2xl text-black">by Thomas Capogreco</h2> */}

        <div class="mt-8">
          { posts.map (post => <PostCard post={ post } />) }
        </div>

      </main>
      <div class="fixed text-center text-white top-0 right-2">
          → homage to <a href="https://fallingfalling.com">Falling Falling</a>, 
          by <a href="https://www.newrafael.com/info/">Rafaël Rozendaal</a>
      </div>
    </>
  );
}

function PostCard(props: { post: Post }) {
  const { post } = props;
  return (
    <div class="py-8">
      <a class="sm:col-span-2" href={ `/${post.slug}` }>
        <h3 class="text(3xl black) font-bold">
          { post.title }
        </h3>
        <time class="text-black">
          { new Date (post.publishedAt).toLocaleDateString ("en-us", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </time>
        <div class="mt-4 text-black">
          { post.snippet }
        </div>
      </a>
    </div>
  );
}
