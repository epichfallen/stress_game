import React from "react";
import Card from "./Card";
import { Draggable } from "react-beautiful-dnd";

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",

  // change background colour if dragging
  background: isDragging ? "lightgreen" : "grey",

  // styles we need to apply on draggables
  ...draggableStyle,
});

export default function PlayerQuests({ card }) {
  if (card.length > 0){
  return (
    <div className="relative">
      <div className="deck">
        <div className="absolute text-white -top-3 -right-4 z-[100] bg-red-400 h-6 w-6 flex items-center justify-center font-semibold text-sm rounded-full">
          {card.length}
        </div>
        STRESS
      </div>
      <Draggable
        key={card[0].kind + card[0].number}
        draggableId={card[0].kind + card[0].number}
        index={0}
      >
        {(provided, snapshot) => (
          <div
            style={getItemStyle(
              snapshot.isDragging,
              provided.draggableProps.style
            )}
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            id="player-quests"
          >
            <Card card={card[0]} closed={false} />
          </div>
        )}
      </Draggable>
    </div>
  )}
  else{
    return null
  }
}
