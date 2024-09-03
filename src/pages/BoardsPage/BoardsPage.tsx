import { useQuery } from "@tanstack/react-query";
import BestArticleList from "./BestArticleList";
import AllArticleList from "./AllArticleList";
import styles from "./Freeboard.module.scss";
import { Article } from "@/types/ArticleTypes";
import { getArticle } from "@/lib/articleApi";

const BoardsPage = () => {
  const {
    data: articles,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["articles"],
    queryFn: getArticle as () => Promise<{ list: Article[] }>,
  });

  if (isLoading) {
    return <></>;
  }

  if (isError) {
    return <></>;
  }

  return (
    <div className={styles.main}>
      <BestArticleList />
      <AllArticleList initialArticles={articles?.list ?? []} />
    </div>
  );
};

export default BoardsPage;
