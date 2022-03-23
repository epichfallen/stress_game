import React,{useContext} from 'react'
import { Droppable } from "react-beautiful-dnd";
import { deckContext } from "../context/deckContext";
import Collection from './Collection';

export default function Collections() {
    const deck = useContext(deckContext);

    const collections = [];
    for (let index = 0; index < 8; index++) {
      collections.push(
        <Droppable key={"collection" + index} droppableId={"collection" + index} isDropDisabled={deck.collections["collection" + index].locked}>
          {(provided, snapshot) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className={`${
                snapshot.isDraggingOver ? "bg-blue-500/[0.3] transform-none" : "bg-slate-500/[0.3]"
              } collectionColumn flex flex-col items-center h-full rounded-lg `}
            >
              <Collection dragging={snapshot.isDraggingOver} Collection={deck.collections["collection" + index].cards} />
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      );
    }
  return (
    collections
  )
}
