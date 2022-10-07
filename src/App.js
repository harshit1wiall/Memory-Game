import { useState,useEffect} from 'react';
import './App.css';
import SingleCard from './components/SingleCard';

const cardImages=[
  {"src":"/img/helmet-1.png", matched: false },
  {"src":"/img/potion-1.png", matched: false },
  {"src":"/img/ring-1.png", matched: false },
  {"src":"/img/scroll-1.png", matched: false },
  {"src":"/img/shield-1.png", matched: false },
  {"src":"/img/sword-1.png", matched: false }
]


export default function App() {

const [cards,setCards]=useState([]);
const [turns,setTurns]=useState(0);
const [choiceOne,setChoiceOne]=useState(null);
const [choiceTwo,setChoiceTwo]=useState(null);
const [disabled,setDisabled]=useState(false);

// this will shuffle the cards

const shuffleCards=()=>{
  const shuffledCards=[...cardImages,...cardImages]
  .sort(()=> Math.random() -0.5)
  .map(card =>({...card,id:Math.random()}))
  setCards(shuffledCards)
  setTurns(0);
}

// handle choice

const handleChoice=(card)=>{
 choiceOne ? setChoiceTwo(card): setChoiceOne(card);
}



// comaprison of the cards
useEffect(() => {
  if(choiceOne && choiceTwo)
  {
    setDisabled(true)
    if(choiceOne.src === choiceTwo.src)
    {
      setCards(prevCards=>{
        return prevCards.map(card => {
          if(card.src===choiceOne.src)
          {
            return {...card,matched:true};
          }else
          return card
        })
      })
      resetTurn();
    }else
    setTimeout(() =>
      resetTurn(), 500); 
  }
  
}, [choiceOne,choiceTwo])

console.log(cards);


// RESET Turn
const resetTurn = () =>{
  setChoiceOne(null); 
  setChoiceTwo(null);
  setTurns(prevTurns => prevTurns+1)
  setDisabled(false);
}

  return (
    <div className="App">
      <h1>Magic Match</h1>
      <button onClick={shuffleCards}>New Game</button>
      <div className="card-grid">
        {cards.map(card => (
         <SingleCard onClick={resetTurn}
         key={card.id} 
         card={card}
         handleChoice={handleChoice}
         flipped={card===choiceOne || card===choiceTwo || card.matched}
         disabled={disabled}
         />
        ))}
      </div>
      <p>Count - {turns}</p>
    </div>
  );
}
