import React, { useEffect, useState } from "react";
import { useDB } from "@/hooks/getDB";
import { Content } from "@/types/db";
import { ArticleCard } from "@/containers/blocks/articlesBlock/articleCard";
import { Loading } from "@/components/loading";
import { Marquee } from "@/components/marquee";
import "./style.css";

export const Articles: React.FC = () => {
  const { fetchData } = useDB("sections");
  const [data, setData] = useState<Content | null>(null);

  useEffect(() => {
    setData(fetchData?.content);
  }, [fetchData]);

  if (!data) return <Loading />;

  return (
    <section className="articles">
      <div className="container articles-cnt">
        {data?.items.map((article, index) => (
          <ArticleCard key={index} article={article} index={index} />
        ))}
      </div>
      <Marquee
        tickerClass="webinars"
        tickerText={data.ticker.text}
        tickerColor={data.ticker.color}
      />
    </section>
  );
};
