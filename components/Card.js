import React from "react";
import Image from "next/image";
// import { ACTIONS } from "../pages";

export default function Card({ card, index, closed }) {
  if (card.kind) {
    function cardImage(kind) {
      switch (kind) {
        case "karo":
          return "/icons/karo.svg";
        case "kupa":
          return "/icons/kupa.svg";
        case "maca":
          return "/icons/maca.svg";
        case "sinek":
          return "/icons/sinek.svg";
        case "joker":
          return "/icons/joker.png";
        default:
          break;
      }
    }

    return (
      <div
        className={`${card.kind} ${
          closed === true ? "closed" : " "
        } card cursor-pointer hover:-translate-y-1 transition-all w-full `}
      >
        <div className="card-inner">
          <div className="card-front">
            <div className="card-topleft">
              <span className={card.kind === "joker" ? "vertical-text uppercase" : " "}>{card.number}</span>
              <Image src={cardImage(card.kind)} alt={card.kind} height={10} width={10} />
            </div>
            <span className="card-center">
              <Image src={cardImage(card.kind)} alt={card.kind} height={35} width={35} />
            </span>
            <div className="card-bottomright">
              <span className={card.kind === "joker" ? "vertical-text uppercase" : " "}>{card.number}</span>
              <Image src={cardImage(card.kind)} alt={card.kind} height={10} width={10} />
            </div>
          </div>

          <div className="card-back text-2xl">
            <span>
              <Image src={"/icons/stress.png"} height={23} width={100}></Image>
            </span>
          </div>
        </div>
      </div>
    );
  } else {
    return null;
  }
}
