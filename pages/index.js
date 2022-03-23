import React, { useEffect, useReducer, useState } from "react";
import { deckData } from "../data/data";
import Deck from "../components/Deck";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import PlayerCards from "../components/PlayerCards";
import PlayerQuests from "../components/PlayerQuests";
import { deckReducer } from "../reducers/deckReducer";
import { ACTIONS } from "../actions/actions";
import Collections from "../components/Collections";
import { deckContext } from "../context/deckContext";
import gameConfig from "../gameConfig.json";

export default function Home() {
  const [deck, deckDispatch] = useReducer(deckReducer, {
    players: {},
    collections: {
      collection0: {
        locked: false,
        cards: [],
      },
      collection1: {
        locked: false,
        cards: [],
      },
      collection2: {
        locked: false,
        cards: [],
      },
      collection3: {
        locked: false,
        cards: [],
      },
      collection4: {
        locked: false,
        cards: [],
      },
      collection5: {
        locked: false,
        cards: [],
      },
      collection6: {
        locked: false,
        cards: [],
      },
      collection7: {
        locked: false,
        cards: [],
      },
    },
    active_deck: [],
    trash: [],
  });

  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    // const initialDeck = deckData.sort(function () {
    //   return Math.random() - 0.5;
    // });
    const initialDeck = deckData;
    if (initialDeck) {
      deckDispatch({
        type: ACTIONS.SET_CARDS,
        payload: { active_deck: initialDeck },
      });
      serveCards(gameConfig.PLAYER_COUNT, gameConfig.PLAYER_CARD_COUNT, gameConfig.PLAYER_QUEST_COUNT);
      setLoading(false);
    }
  }, []);

  const serveCards = (players, amount, questAmount) => {
    for (let index = 0; index < players; index++) {
      deckDispatch({
        type: ACTIONS.TABLE_TO_PLAYER,
        payload: { player: [index], amount: amount },
      });
      deckDispatch({
        type: ACTIONS.TABLE_TO_PLAYER_QUEST,
        payload: { player: [index], amount: questAmount },
      });
    }
  };

  const getCardValue = (cardId) => {
    if (cardId === "jokerjoker") {
      return 14;
    }
    const selected = deckData.filter((card) => {
      return card.id === cardId;
    });
    return selected[0].value;
  };

  const getCardKind = (cardId) => {
    if (cardId === "jokerjoker") {
      return "joker";
    }
    const selected = deckData.filter((card) => {
      return card.id === cardId;
    });
    return selected[0].kind;
  };

  function handleLogic(result) {
    const CardValue = parseInt(getCardValue(result.draggableId));
    const CardKind = getCardKind(result.draggableId);

    deckDispatch({
      type: ACTIONS.UNLOCK_ALL_COLLECTIONS,
    });

    //All cards except A, K, Joker
    if (CardValue > 1) {
      for (let index = 0; index < 8; index++) {
        const destLength = deck?.collections?.["collection" + index]?.cards?.length;
        // If collection has cards
        if (destLength > 0) {
          //Get the last card kind and value
          const LastCardValue = parseInt(getCardValue(Object.values(deck.collections["collection" + index]?.cards).slice(-1)[0].id));
          const LastCardKind = getCardKind(Object.values(deck.collections["collection" + index]?.cards).slice(-1)[0].id);

          //check if the last cards is same kind and one before
          if (LastCardValue + 1 === CardValue && CardKind === LastCardKind) {
            deckDispatch({
              type: ACTIONS.TOGGLE_COLLECTION_LOCK,
              payload: { destination: ["collection" + index], locked: false },
            });

            //check if the last card is a joker or a king
          } else if (LastCardValue === 14 || LastCardValue === 13) {
            //loop until we get a card that is not a joker or a king to determine collection kind
            for (let index = 0; index < destLength; index++) {
              let selectedValue = getCardValue(Object.values(deck.collections["collection" + index]?.cards).slice(-index)[0].id);
              let selectedKind = getCardKind(Object.values(deck.collections["collection" + index]?.cards).slice(-index)[0].id);
              console.log(selectedKind + selectedValue);

              if (selectedValue !== 14 && selectedValue !== 13) {
                if (selectedValue + index + 1 === CardValue && selectedKind === CardKind) {
                  deckDispatch({
                    type: ACTIONS.TOGGLE_COLLECTION_LOCK,
                    payload: { destination: ["collection" + index], locked: false },
                  });
                }
                break;
                //if there is no cards other than joker or king
              } else if (index === destLength - 1) {
                if (selectedValue === 13 || selectedValue === 14) {
                  deckDispatch({
                    type: ACTIONS.TOGGLE_COLLECTION_LOCK,
                    payload: { destination: ["collection" + index], locked: false },
                  });
                  break;
                }
              } else {
                deckDispatch({
                  type: ACTIONS.TOGGLE_COLLECTION_LOCK,
                  payload: { destination: ["collection" + index], locked: true },
                });
              }
            }
          } else {
            deckDispatch({
              type: ACTIONS.TOGGLE_COLLECTION_LOCK,
              payload: { destination: ["collection" + index], locked: true },
            });
          }
        } else {
          //if collection is empty
          deckDispatch({
            type: ACTIONS.TOGGLE_COLLECTION_LOCK,
            payload: { destination: ["collection" + index], locked: true },
          });
        }
      }
    }

    // if A
    if (CardValue === 1) {
      for (let index = 0; index < 8; index++) {
        // if collection empty
        if (Object.keys(deck.collections["collection" + index].cards).length === 0) {
          deckDispatch({
            type: ACTIONS.TOGGLE_COLLECTION_LOCK,
            payload: { destination: ["collection" + index], locked: false },
          });
        } else {
          deckDispatch({
            type: ACTIONS.TOGGLE_COLLECTION_LOCK,
            payload: { destination: ["collection" + index], locked: true },
          });
        }
      }
    }

    // if Joker or K
    if (CardValue === 13 || CardValue === 14) {
      for (let index = 0; index < 8; index++) {
        deckDispatch({
          type: ACTIONS.TOGGLE_COLLECTION_LOCK,
          payload: { destination: ["collection" + index], locked: false },
        });
      }
    }
  }

  function submitMove(result) {
    if (result.combine) {
      console.log(result.combine);
    }

    if (!result.destination) {
      return;
    }

    if (result.destination.droppableId.includes("collection") && result.source.droppableId === "playerCardsContainer") {
      deckDispatch({
        type: ACTIONS.ADD_TO_COLLECTION,
        payload: {
          player: 0,
          destination: [result.destination.droppableId],
          destination_index: [result.destination.index],
          card_id: [result.draggableId],
          index: [result.source.index],
        },
      });
    }
  }

  if (isLoading) {
    return <div className="App">Game Loading...</div>;
  }

  return (
    <>
      <deckContext.Provider value={deck}>
        <div id="logo"></div>
        <DragDropContext onDragStart={handleLogic} onDragEnd={submitMove}>
          <div id="table" className="text-white bg-gradient-to-r from-teal-700 to-teal-800 p-5 gap-5 items-center justify-center w-screen min-h-screen h-full">
            <div id="left" className="justify-end flex p-5">
              <Deck card={deck.active_deck} />
            </div>

            {/* <div id="right" className="justify-end flex p-5 h-60 bg-gray-600">
            <Droppable droppableId="trashContainer" direction="horizontal" isDropDisabled={true}>
              {(provided, snapshot) => (
                <div {...provided.droppableProps} ref={provided.innerRef} className="flex">
                  <PlayerQuests card={deck.trash} />
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div> */}

            <div id="center" className="grid grid-flow-col gap-2 border-2 h-full border-slate-400/[0.3] rounded-xl p-2">
              <Collections />
            </div>

            <div id="top" className="flex items-center justify-center"></div>

            <div id="bottom" className="flex items-center justify-center gap-12">
              <Droppable droppableId="playerCardsContainer" direction="horizontal" isDropDisabled={true}>
                {(provided, snapshot) => (
                  <div {...provided.droppableProps} ref={provided.innerRef} className="items-center flex">
                    <PlayerCards PlayerCards={deck.players[0].cards} />
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>

              <Droppable droppableId="playerQuestsContainer" direction="horizontal" isDropDisabled={true}>
                {(provided, snapshot) => (
                  <div {...provided.droppableProps} ref={provided.innerRef} className="flex">
                    <PlayerQuests card={deck.players[0].quests} />
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          </div>
        </DragDropContext>
      </deckContext.Provider>
    </>
  );
}
