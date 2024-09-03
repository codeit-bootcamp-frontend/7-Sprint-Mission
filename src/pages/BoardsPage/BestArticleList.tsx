import { useQuery } from "@tanstack/react-query";
import styles from "./Freeboard.module.scss";
import BestArticleItem from "./BestArticleItem";
import { getArticle } from "@/lib/articleApi";
import { Article } from "@/types/ArticleTypes";
import useDeviceType from "@/hooks/useDeviceType";
import { DeviceTypePageSize } from "@/constants/deviceSizesConstants";
import { ORDER_TYPE_ENUM } from "@/constants/orderConstants";
import { Link } from "react-router-dom";

const { MOBILE_PAGE_SIZE, TABLET_PAGE_SIZE, DESKTOP_PAGE_SIZE } =
  DeviceTypePageSize;

const BestArticleList = () => {
  const { isMobile, isTablet } = useDeviceType();

  const pageSize = isTablet
    ? TABLET_PAGE_SIZE
    : isMobile
    ? MOBILE_PAGE_SIZE
    : DESKTOP_PAGE_SIZE;

  const {
    data: articles = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["bestArticles", pageSize],
    queryFn: () =>
      getArticle({
        orderBy: ORDER_TYPE_ENUM.LIKE,
        pageSize,
      }).then((result) => result.list),
  });

  if (isLoading) return <></>;
  if (isError) return <></>;

  return (
    <section className={styles["best-article"]}>
      <h1 className={styles.title}>베스트 게시글</h1>
      <div className={styles["card-container"]}>
        {articles.map((article: Article) => (
          <Link to={`/board/${article.id}`} key={article.id}>
            <BestArticleItem article={article} />
          </Link>
        ))}
      </div>
    </section>
  );
};

export default BestArticleList;
