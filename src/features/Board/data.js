import { amber, blueGrey, blue, cyan } from '@material-ui/core/colors';

const jake = {
  id: '1',
  name: 'Jake',
};

const BMO = {
  id: '2',
  name: 'BMO',
};

const finn = {
  id: '3',
  name: 'Finn',
};

const princess = {
  id: '4',
  name: 'Princess',
};

export const authors = [jake, BMO, finn, princess];

export const quotes = [
  {
    id: '1',
    content: 'Sometimes life is scary and dark',
  },
  {
    id: '2',
    content:
      'Sucking at something is the first step towards being sorta good at something.',
  },
  {
    id: '3',
    content: "You got to focus on what's real, man",
  },
  {
    id: '4',
    content: 'Is that where creativity comes from? From sad biz?',
  },
  {
    id: '5',
    content: 'Homies help homies. Always',
  },
  {
    id: '6',
    content: 'Responsibility demands sacrifice',
  },
  {
    id: '7',
    content: "That's it! The answer was so simple, I was too smart to see it!",
  },
];

const getByAuthor = (author, items) =>
  items.filter((quote) => quote.author === author);

export const authorQuoteMap = authors.reduce(
  (previous, author) => ({
    ...previous,
    [author.name]: getByAuthor(author, quotes),
  }),
  {},
);
