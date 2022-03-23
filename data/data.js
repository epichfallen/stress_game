const numbers = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
const values = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13'];
const kinds = ["karo", "sinek", "maca", "kupa"];
const joker = { joker: true };

const populateCards = () => {
  let temp = [];
  kinds.forEach((kind) => {
    numbers.forEach((number,index) => {
      temp.push({ id: kind + number, number, kind, closed: false, value: values[index] });
    });
  });
  temp.push({ id: "joker", number: "joker" , kind:"joker", closed: false, value: '14' });
  return temp;
};



export const deckData = populateCards();
// export const deckData = [
//     {
//         "id": "karoA",
//         "number": "A",
//         "kind": "karo",
//         "closed": false
//     },
//     {
//         "id": "karo2",
//         "number": "2",
//         "kind": "karo",
//         "closed": false
//     },
//     {
//         "id": "karo3",
//         "number": "3",
//         "kind": "karo",
//         "closed": false
//     },
//     {
//         "id": "karo4",
//         "number": "4",
//         "kind": "karo",
//         "closed": false
//     },
//     {
//         "id": "karo5",
//         "number": "5",
//         "kind": "karo",
//         "closed": false
//     },
//     {
//         "id": "karo6",
//         "number": "6",
//         "kind": "karo",
//         "closed": false
//     },
//     {
//         "id": "karo7",
//         "number": "7",
//         "kind": "karo",
//         "closed": false
//     },
//     {
//         "id": "karo8",
//         "number": "8",
//         "kind": "karo",
//         "closed": false
//     },
//     {
//         "id": "karo9",
//         "number": "9",
//         "kind": "karo",
//         "closed": false
//     },
//     {
//         "id": "karo10",
//         "number": "10",
//         "kind": "karo",
//         "closed": false
//     },
//     {
//         "id": "karoJ",
//         "number": "J",
//         "kind": "karo",
//         "closed": false
//     },
//     {
//         "id": "karoQ",
//         "number": "Q",
//         "kind": "karo",
//         "closed": false
//     },
//     {
//         "id": "karoK",
//         "number": "K",
//         "kind": "karo",
//         "closed": false
//     },
//     {
//         "id": "sinekA",
//         "number": "A",
//         "kind": "sinek",
//         "closed": false
//     },
//     {
//         "id": "sinek2",
//         "number": "2",
//         "kind": "sinek",
//         "closed": false
//     },
//     {
//         "id": "sinek3",
//         "number": "3",
//         "kind": "sinek",
//         "closed": false
//     },
//     {
//         "id": "sinek4",
//         "number": "4",
//         "kind": "sinek",
//         "closed": false
//     },
//     {
//         "id": "sinek5",
//         "number": "5",
//         "kind": "sinek",
//         "closed": false
//     },
//     {
//         "id": "sinek6",
//         "number": "6",
//         "kind": "sinek",
//         "closed": false
//     },
//     {
//         "id": "sinek7",
//         "number": "7",
//         "kind": "sinek",
//         "closed": false
//     },
//     {
//         "id": "sinek8",
//         "number": "8",
//         "kind": "sinek",
//         "closed": false
//     },
//     {
//         "id": "sinek9",
//         "number": "9",
//         "kind": "sinek",
//         "closed": false
//     },
//     {
//         "id": "sinek10",
//         "number": "10",
//         "kind": "sinek",
//         "closed": false
//     },
//     {
//         "id": "sinekJ",
//         "number": "J",
//         "kind": "sinek",
//         "closed": false
//     },
//     {
//         "id": "sinekQ",
//         "number": "Q",
//         "kind": "sinek",
//         "closed": false
//     },
//     {
//         "id": "sinekK",
//         "number": "K",
//         "kind": "sinek",
//         "closed": false
//     },
//     {
//         "id": "macaA",
//         "number": "A",
//         "kind": "maca",
//         "closed": false
//     },
//     {
//         "id": "maca2",
//         "number": "2",
//         "kind": "maca",
//         "closed": false
//     },
//     {
//         "id": "maca3",
//         "number": "3",
//         "kind": "maca",
//         "closed": false
//     },
//     {
//         "id": "maca4",
//         "number": "4",
//         "kind": "maca",
//         "closed": false
//     },
//     {
//         "id": "maca5",
//         "number": "5",
//         "kind": "maca",
//         "closed": false
//     },
//     {
//         "id": "maca6",
//         "number": "6",
//         "kind": "maca",
//         "closed": false
//     },
//     {
//         "id": "maca7",
//         "number": "7",
//         "kind": "maca",
//         "closed": false
//     },
//     {
//         "id": "maca8",
//         "number": "8",
//         "kind": "maca",
//         "closed": false
//     },
//     {
//         "id": "maca9",
//         "number": "9",
//         "kind": "maca",
//         "closed": false
//     },
//     {
//         "id": "maca10",
//         "number": "10",
//         "kind": "maca",
//         "closed": false
//     },
//     {
//         "id": "macaJ",
//         "number": "J",
//         "kind": "maca",
//         "closed": false
//     },
//     {
//         "id": "macaQ",
//         "number": "Q",
//         "kind": "maca",
//         "closed": false
//     },
//     {
//         "id": "macaK",
//         "number": "K",
//         "kind": "maca",
//         "closed": false
//     },
//     {
//         "id": "kupaA",
//         "number": "A",
//         "kind": "kupa",
//         "closed": false
//     },
//     {
//         "id": "kupa2",
//         "number": "2",
//         "kind": "kupa",
//         "closed": false
//     },
//     {
//         "id": "kupa3",
//         "number": "3",
//         "kind": "kupa",
//         "closed": false
//     },
//     {
//         "id": "kupa4",
//         "number": "4",
//         "kind": "kupa",
//         "closed": false
//     },
//     {
//         "id": "kupa5",
//         "number": "5",
//         "kind": "kupa",
//         "closed": false
//     },
//     {
//         "id": "kupa6",
//         "number": "6",
//         "kind": "kupa",
//         "closed": false
//     },
//     {
//         "id": "kupa7",
//         "number": "7",
//         "kind": "kupa",
//         "closed": false
//     },
//     {
//         "id": "kupa8",
//         "number": "8",
//         "kind": "kupa",
//         "closed": false
//     },
//     {
//         "id": "kupa9",
//         "number": "9",
//         "kind": "kupa",
//         "closed": false
//     },
//     {
//         "id": "kupa10",
//         "number": "10",
//         "kind": "kupa",
//         "closed": false
//     },
//     {
//         "id": "kupaJ",
//         "number": "J",
//         "kind": "kupa",
//         "closed": false
//     },
//     {
//         "id": "kupaQ",
//         "number": "Q",
//         "kind": "kupa",
//         "closed": false
//     },
//     {
//         "id": "kupaK",
//         "number": "K",
//         "kind": "kupa",
//         "closed": false
//     },
//     {
//         "id": "joker",
//         "number": "joker",
//         "kind": "joker",
//         "closed": false
//     }
// ]

