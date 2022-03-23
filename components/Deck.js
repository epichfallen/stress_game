import React from "react";
import Card from "../components/Card";

export default function Deck({ card }) {
  if(card.length > 0 ){
  return (
    <div className="deck relative">
      <div className="absolute -top-3 -right-3 z-[100] bg-red-400 h-6 w-6 flex items-center justify-center font-semibold text-sm rounded-full">{card.length}</div>
      <Card card={card[0]} closed={false}/>
    </div>
  );
  }else{
    return null
  }
}
