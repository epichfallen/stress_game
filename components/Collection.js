import React from "react";
import Card from "../components/Card";
import { Draggable } from "react-beautiful-dnd";

export default function Collection({ Collection,dragging }) {
  
  if (Collection != null) {
    const cards = Collection.map((card, index) => {
      return (
        <Draggable key={card.kind + card.number} draggableId={card.kind + card.number} index={index} isDragDisabled={true} >
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              className={`mb-[-105%] `}
            >
              <Card key={card.kind + card.number} card={card} />
            </div>
          )}
        </Draggable>
      );
    });

    return <div className="collection">{cards}</div>;
  } else {
    return null;
  }
}
