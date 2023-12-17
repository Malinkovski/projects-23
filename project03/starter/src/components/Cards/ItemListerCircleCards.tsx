import React from "react";
import CardWithCircleBadge from "./CardWithCircleBadge";

interface ItemListerWithcircleCardsProps<T> {
  items: Array<T>;
  main_href: string;
  starting_item_number?: number;
}

//!COMPONENT NOT USED //WIP
//! used for home, brands

const ItemListerWithcircleCards: React.FC<
  ItemListerWithcircleCardsProps<any>
> = ({ items, main_href, starting_item_number: n }) => {
  return (
    <>
      {items.slice(n ? n : 0).map((item, index) => (
        <div
          key={index}
          className={`img-container ${
            index % 2 === 0
              ? "bot-img"
              : `top-img ${
                  index === items.length - 1 - 1 && index % 2 !== 0
                    ? "no-bg"
                    : "reverse-bg"
                }`
          }`}
        >
          <CardWithCircleBadge
            backgroundUrl={item.image}
            header={item.title}
            text={item.text}
            href={`/${main_href}/${item.id}`}
          />
        </div>
      ))}
    </>
  );
};

export default ItemListerWithcircleCards;
