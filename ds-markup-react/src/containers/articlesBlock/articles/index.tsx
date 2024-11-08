import React, { useEffect, useState } from "react";
import { useDB } from "@/hooks/getDB";
import { Content } from "@/types/db";
import { ArticleCard } from "../articleCard";
import "./style.css";
import { Loading } from "@/containers/loading";

// // Define TypeScript types for the data structure
// type Article = {
//   title: string;
//   text: string;
//   accent: string;
//   date: string;
//   duration: number;
//   size: string;
//   tags: string[];
//   img: {
//     url: string;
//     shape: string;
//   };
//   stamp: {
//     word: string;
//     type: string;
//     position: string;
//   };
// };

// type ContentResponse = {
//   items: Article[];
//   ticker: {
//     text: string;
//     color: string;
//   };
// };

// interface ArticleCardProps {
//   article: Article;
// }

export const Articles: React.FC = () => {
  const { fetchData } = useDB("sections");
  const [data, setData] = useState<Content | null>(null);

  // const item = fetchData?.main.items[1]; !!!

  useEffect(() => {
    setData(fetchData?.content);
  }, [fetchData]);

  if (!data) return <Loading />;
  console.log(data);

  return (
    <section className="articles">
      <div className="container articles-cnt">
        {data?.items.map((article, index) => (
          <ArticleCard key={index} article={article} index={index} />
        ))}
      </div>
    </section>
  );
};

// export const ArticleFashion: React.FC = () => {
//   const { fetchData } = useDB("sections");
//   const [article, setArticle] = useState<Item3 | null>(null);

//   // const item = fetchData?.main.items[0]; !!!

//   useEffect(() => {
//     setArticle(fetchData?.content.items[0]);
//   }, [fetchData]);

//   if (!article) {
//     return <div>Loading components...</div>;
//   }

//   return (
//     <div className="articles-cards__card card card-fashion">
//       <div className="card__img-wrapper">
//         <div
//           className={`card__img-wrp img-wrp img-wrp-cards mask mask-fashion`}
//         >
//           <MaskedImage
//             src={article.img.url}
//             alt={
//               article.title ||
//               "imagen de una niña con una computadora portátil en su regazo"
//             }
//             maskSrc={MaskImageSrc}
//             className="mask-gaming gaming__img-wrp"
//           />
//         </div>
//         <span
//           className={`img-wrp__stiker-articles stiker-fashion stiker-img stiker-img_top-left stiker-img_l_t_47`}
//         >
//           <StickersFasion />
//         </span>
//       </div>

//       <div
//         className={`articles__content-info content-info content-info-fashion`}
//       >
//         <div className="content-info__links links-cards">
//           <ul className={`content-info__list list list-fashion list-cards`}>
//             {article.tags.map((tag, index) => (
//               <li key={index} className="list__item">
//                 <a
//                   href="#"
//                   className={`list__link ${index === 0 ? "btn link-fashion" : ""}`}
//                 >
//                   {tag}
//                 </a>
//               </li>
//             ))}
//           </ul>
//         </div>

//         <div className="content-info__text text-info text-info-articles text-info-card">
//           <h3 className="text-info__title">{article.title}</h3>
//           <p className="text-info__sub-text">{article.text}</p>
//         </div>

//         <div className="content-info__date">
//           <p className="content-info__date-text date-text">
//             <span className="date-text__icon icon">
//               <IconDate />
//             </span>
//             <span className="date-text__txt">{article.date}</span>
//           </p>
//           <p className="content-info__time time">
//             <span className="time__icon icon">
//               <IconTime />
//             </span>
//             <span className="time__text">{article.duration} min</span>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };
