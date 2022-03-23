import React from "react";
import Card from "../components/Card";
import { Draggable } from "react-beautiful-dnd";



export default function PlayerCards({ PlayerCards }) {
  const cards = PlayerCards.map((card, index) => {
    return (
      <Draggable
        key={card.kind + card.number}
        draggableId={card.kind + card.number}
        index={index}
      >
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className="  mr-2"
          >
            <Card key={card.kind + card.number} card={card} />
          </div>
        )}
      </Draggable>
    );
  });
  return <div className="player-cards">{cards}</div>;
}
