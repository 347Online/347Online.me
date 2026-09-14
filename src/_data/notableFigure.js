const figures = [
  {
    name: "Phineas Gage",
    url: "https://en.wikipedia.org/wiki/Phineas_Gage",
  },
  {
    name: "Rufus Xavier Sarsaparilla",
    url: "https://www.youtube.com/watch?v=koZFca8AkT0",
  },
  {
    name: "Billy Joel Armstrong",
    url: "https://billyjoelarmstrong.bandcamp.com",
  },
];

const figure = figures[Math.floor(Math.random() * figures.length)];

export default figure;
