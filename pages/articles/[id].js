import Layout from '../../components/Layout';
import { getArticles, getSingleArticle } from '../../models/article';
import Image from 'next/image';

export default function articles({ articleData }) {
  return (
    <Layout>
      <h2>{articleData.title}</h2>
      <Image
        src={articleData.pictureUrl}
        alt='Picture of the author'
        width={500}
        height={500}

        // blurDataURL="data:..." automatically provided
        // placeholder="blur" // Optional blur-up while loading
      />
      <div>{articleData.body}</div>
    </Layout>
  );
}

export async function getStaticPaths() {
  // Return a list of possible value for id

  const articleList = await getArticles(0, 3);
  const paths = articleList.map((article) => {
    return { params: { id: article.id.toString() } };
  });
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  // Fetch necessary data for the blog post using params.id
  const articleData = await getSingleArticle(params.id);
  console.log(articleData);
  return {
    props: { articleData },
  };
}
