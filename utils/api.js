import { AsyncStorage } from "react-native";
import { generateUID } from "./helper";

const FLASHCARDS_STORAGE_KEY = "flashcards_data";

function initialData() {
  return {
    "6h5ims9iks66d4m7kqizmv": {
      id: "6h5ims9iks66d4m7kqizmv",
      title: "Javascript",
      createdAt: new Date("10/21/2020"),
      questions: [
        {
          question:
            "Can you name two programming paradigms important for JavaScript app developers?",
          answer:
            "JavaScript is a multi-paradigm language, supporting imperative/procedural programming along with OOP (Object-Oriented Programming) and functional programming. JavaScript supports OOP with prototypal inheritance.",
        },
        {
          question: 'What is the purpose of "This" operator in JavaScript?',
          answer:
            "The JavaScript this keyword refers to the object it belongs to. This has different values depending on where it is used. In a method, this refers to the owner object and in a function, this refers to the global object.",
        },
        {
          question: " What is Closure?",
          answer:
            "The combination of a function and the lexical environment within which that function was declared.",
        },
      ],
    },
    "6h5ims9iks66d4m7kqizmc": {
      id: "6h5ims9iks66d4m7kqizmc",
      title: "React",
      createdAt: new Date("10/20/2020"),
      questions: [
        {
          question: "What is React",
          answer: "A library for managing user interfaces",
        },
        {
          question: "What is JSX?",
          answer:
            "JSX is a syntax extension to JavaScript and comes with the full power of JavaScript. JSX produces React “elements”. You can embed any JavaScript expression in JSX by wrapping it in curly braces. After compilation, JSX expressions become regular JavaScript objects. This means that you can use JSX inside of if statements and for loops, assign it to variables, accept it as arguments, and return it from functions.",
        },
        {
          question: "Where do you make Ajax requests in React?",
          answer: "The componentDidMount lifecycle event",
        },
      ],
    },
    "6h5ims9iks66d4m7kqizmd": {
      id: "6h5ims9iks66d4m7kqizmd",
      title: "Redux",
      createdAt: new Date("10/19/2020"),
      questions: [
        {
          question: "What is Redux?",
          answer:
            "Redux is a predictable state container for JavaScript apps based on the Flux design pattern. Redux can be used together with ReactJS, or with any other view library. It is tiny (about 2kB) and has no dependencies.",
        },
        {
          question: "How to structure Redux top level directories?",
          answer:
            "Most of the applications has several top-level directories as below 1. Components Used for “dumb” React components unaware of Redux 2. Containers Used for “smart” React components connected to Redux 3. Actions Used for all action creators, where file name corresponds to part of the app 4. Reducers Used for all reducers, where file name corresponds to state key 5. Store Used for store initialization This structure works well for small and mid-level size apps.",
        },
        {
          question: "What is Redux Thunk?",
          answer:
            "Redux Thunk middleware allows you to write action creators that return a function instead of an action. The thunk can be used to delay the dispatch of an action, or to dispatch only if a certain condition is met. The inner function receives the store methods dispatch and getState() as parameters.",
        },
      ],
    },
  };
}

export async function getDecks() {
  try {
    const results = await AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY);
    if (results) {
      const data = JSON.parse(results);
      return data;
    } else {
      await AsyncStorage.setItem(
        FLASHCARDS_STORAGE_KEY,
        JSON.stringify(initialData())
      );
      return initialData();
    }
  } catch (error) {
    await AsyncStorage.setItem(
      FLASHCARDS_STORAGE_KEY,
      JSON.stringify(initialData())
    );
    return initialData();
  }
}

export async function saveDeckTitle(title) {
  const id = generateUID();
  const deck = {
    id: id,
    title: title,
    questions: [],
  };

  await AsyncStorage.mergeItem(
    FLASHCARDS_STORAGE_KEY,
    JSON.stringify({
      [id]: deck,
    })
  );
  return deck;
}

export async function saveCardToDeck(deckId, card) {
  const results = await AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY);
  if (results) {
    const data = JSON.parse(results);
    const deck = data[deckId];
    deck.questions = deck.questions.concat([card]);
    await AsyncStorage.mergeItem(
      FLASHCARDS_STORAGE_KEY,
      JSON.stringify({
        [deckId]: deck,
      })
    );
    return card;
  }
}

export async function removeDeck(deckId) {
  const results = await AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY);
  if (results) {
    const data = JSON.parse(results);
    delete data[deckId];

    await AsyncStorage.setItem(FLASHCARDS_STORAGE_KEY, JSON.stringify(data));
    return data;
  }
  return {};
}
