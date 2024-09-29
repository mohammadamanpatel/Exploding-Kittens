const cardTypes = [
  { type: "cat", emoji: "https://emoji.aranja.com/static/emoji-data/img-apple-160/1f431.png" },
  { type: "defuse", emoji: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSg0W72QQbQWmtjtmB1wwBrTvCp8Jci-QCilA&s" },
  { type: "shuffle", emoji: "https://emoji.aranja.com/static/emoji-data/img-apple-160/1f500.png" },
  { type: "exploding", emoji: "https://emoji.aranja.com/static/emoji-data/img-apple-160/1f4a3.png" },
  { type: "cat", emoji: "https://emoji.aranja.com/static/emoji-data/img-apple-160/1f431.png" }
];

const createDeck = () => {
  let deck = [];

  for (let i = 0; i < 5; i++) {
    const randomIndex = Math.floor(Math.random() * cardTypes.length);
    deck.push(cardTypes[randomIndex]);
  }

  return deck;
};
export default createDeck;
