import { useEffect, useState } from "react";
import styles from "./Freeboard.module.scss";
import AllArticleItem from "./AllArticleItem";
import { Article, ArticleApiData } from "@/types/ArticleTypes";
import SearchInput from "@/components/Layout/SearchInput";
import Button from "@/components/Layout/Button";
import { getArticle } from "@/lib/articleApi";
import SortDropdown from "@/components/Layout/Dropdown/SortDropdown";
import {
  defaultOrderType,
  orderTypeKeysKR,
  orderTypeKR,
  orderTypeUS,
} from "@/constants/orderConstants";
import { Link, useLocation, useNavigate } from "react-router-dom";

interface AllArticleListProps {
  initialArticles: Article[];
}

const AllArticleList: React.FC<AllArticleListProps> = ({ initialArticles }) => {
  const [articles, setArticles] = useState<Article[]>(initialArticles);
  const [orderBy, setOrderBy] = useState(defaultOrderType);
  const items = orderTypeKeysKR;
  const location = useLocation();
  const navigate = useNavigate();

  const queryParams = new URLSearchParams(location.search);
  const keyword = queryParams.get("q") || "";

  const handleOrderChange = (option: string) => {
    setOrderBy(orderTypeUS[option as keyof typeof orderTypeUS]);
  };

  const fetchData = async ({ orderBy, pageSize, keyword }: ArticleApiData) => {
    try {
      const searchKeyword = Array.isArray(keyword) ? keyword[0] : keyword;
      const result = await getArticle({
        orderBy,
        pageSize,
        keyword: searchKeyword,
      });

      setArticles(result.list ?? []);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSortBySearch = (value: string) => {
    const searchValue = value.trim();
    if (!searchValue) {
      navigate("/boards");
    } else {
      navigate(`/boards?q=${searchValue}`);
    }
  };

  useEffect(() => {
    fetchData({ orderBy, pageSize: 10, keyword });
  }, [orderBy, keyword]);

  return (
    <section className={styles["all-article"]}>
      <div className={styles["all-title-wrapper"]}>
        <h1 className={styles.title}>게시글</h1>
        <Button href="/addboard">글쓰기</Button>
      </div>
      <div className={styles["search-wrapper"]}>
        <SearchInput onSortBySearch={handleSortBySearch} />
        <SortDropdown
          onOrderChange={handleOrderChange}
          items={items}
          defaultOrderType={orderTypeKR[defaultOrderType]}
        />
      </div>
      {articles.length
        ? articles.map((article) => (
            <Link to={`/board/${article.id}`} key={article.id}>
              <AllArticleItem article={article} />
            </Link>
          ))
        : keyword && (
            <div
              className={styles["no-search-message"]}
            >{`'${keyword}'(으)로 검색된 결과가 없습니다.`}</div>
          )}
    </section>
  );
};

export default AllArticleList;
