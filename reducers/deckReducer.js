import { ACTIONS } from "../actions/actions";

export function deckReducer(deck, action) {
    var playerCards = [];
    var movingCard = {};
    switch (action.type) {
  
      case ACTIONS.SET_CARDS:
        return { ...deck, active_deck: action.payload.active_deck };
  
      case ACTIONS.TABLE_TO_PLAYER:
        if (deck.active_deck) {
          const playerCards = [];
          const remainingCards = [];
          for (let index = 0; index < action.payload.amount; index++) {
            const card = deck.active_deck[index];
            playerCards.push(card);
          }
          for (let index = action.payload.amount; index < deck.active_deck.length; index++) {
            const card = deck.active_deck[index];
            remainingCards.push(card);
          }
          return {
            ...deck,
            players: {
              ...deck.players,
              [action.payload.player]: {
                ...deck.players[action.payload.player],
                cards: playerCards,
              },
            },
            active_deck: remainingCards,
          };
        }
      case ACTIONS.TABLE_TO_PLAYER_QUEST:
        if (deck.active_deck) {
          const questCards = [];
          const remainingCards = [];
  
          for (let index = 0; index < action.payload.amount; index++) {
            const card = deck.active_deck[index];
            questCards.push(card);
          }
  
          for (let index = action.payload.amount; index < deck.active_deck.length; index++) {
            const card = deck.active_deck[index];
            remainingCards.push(card);
          }
          return {
            ...deck,
            players: {
              ...deck.players,
              [action.payload.player]: {
                ...deck.players[action.payload.player],
                quests: questCards,
              },
            },
            active_deck: remainingCards,
          };
        }
      case ACTIONS.ADD_TO_COLLECTION:
        movingCard = deck.players[action.payload.player].cards[action.payload.index];
        playerCards = Array.from(deck.players[action.payload.player].cards);
        const tempCollection = { ...deck.collections[action.payload.destination] };
  
        tempCollection.cards.push(movingCard);
        playerCards.splice(action.payload.index, 1);
  
        return {
          ...deck,
          collections: {
            ...deck.collections,
            [action.payload.destination]: {
              ...deck.collections[action.payload.destination],
              cards: tempCollection.cards,
            },
          },
          players: {
            ...deck.players,
            [action.payload.player]: {
              ...deck.players[action.payload.player],
              cards: playerCards,
            },
          },
        };
  
      case ACTIONS.TOGGLE_COLLECTION_LOCK:
        return {
          ...deck,
          collections: {
            ...deck.collections,
            [action.payload.destination]: {
              ...deck.collections[action.payload.destination],
              locked: action.payload.locked,
            },
          },
        };
  
      case ACTIONS.UNLOCK_ALL_COLLECTIONS:
        const tempCollections = { ...deck.collections };
        for (let index = 0; index < 8; index++) {
          tempCollections["collection" + index].locked = false;
        }
        return {
          ...deck,
          collections: tempCollections,
        };
      case ACTIONS.PLAYER_TO_TRASH:
        movingCard = deck.players[action.payload.player].cards[action.payload.index];
        playerCards = Array.from(deck.players[action.payload.player].cards);
        const tempTrash = { ...deck.trash };
  
        tempTrash.push(movingCard);
        playerCards.splice(action.payload.index, 1);
  
        return {
          ...deck,
          trash: tempTrash,
          players: {
            ...deck.players,
            [action.payload.player]: {
              ...deck.players[action.payload.player],
              cards: playerCards,
            },
          },
        };
    }
  }