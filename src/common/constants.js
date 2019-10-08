import { blue, red, yellow, green } from "@material-ui/core/colors";

export const hats = {
  blue: {
    name: 'Управление',
    color: blue[200],
  },
  white: {
    name: 'Информация и факты',
    color: '#fff',
  },
  red: {
    name: 'Эмоции и чувства',
    color: red[200],
  },
  black: {
    name: 'Критическое суждение',
    color: '#000',
  },
  yellow: {
    name: 'Оптимистичность',
    color: yellow[200],
  },
  green: {
    name: 'Креативность',
    color: green[200],
  },
};

export const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID
};

export const CARD_WIDTH = 240;