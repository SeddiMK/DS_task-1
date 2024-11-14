import { Loading } from "@/components/loading";
import { useDB } from "@/hooks/getDB";
import { Item } from "@/types/db";

export const Privicy: React.FC = () => {
  const { fetchData } = useDB("contacts");

  if (!fetchData) {
    return <Loading />;
  }

  return (
    <>
      {/* Privacy and Terms */}
      <section className="footer__privacy privicy">
        {fetchData.links?.map((item: Item, ind: number) => (
          <a
            key={ind}
            className="privicy__text link link_metis link_metis_color_white"
            href={item.url}
          >
            {item.label}
            <span className="privicy__separator">•</span>
          </a>
        ))}
      </section>
    </>
  );
};
