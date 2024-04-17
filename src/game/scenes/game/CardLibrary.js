import CancerCard from "./cards/CancerCard";
import InfantryCard from "./cards/InfantryCard";

export default class CardLibrary {
  allCards = [
    CancerCard,
    InfantryCard,
  ]
  allCards() {
    return this.allCards
  }
  randomCard() {
    const randomIndex = Math.floor(Math.random() * (this.allCards.length));

    console.log(randomIndex)
    return this.allCards[randomIndex];
  }
}