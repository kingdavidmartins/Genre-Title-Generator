const fs = require('fs');
const objify = (obj) => JSON.parse(JSON.stringify(obj));
const titles = JSON.parse(fs.readFileSync('movieTitleListSuper.txt', 'utf8'));
const movieGenre = JSON.parse(fs.readFileSync('movieGenreTransformSuper.txt', 'utf8'));


const generate = (genreArg) => {

  let genreTitle = [];
  let genreDict = [];
  let statsWord = {};
  let initWords = [];
  let terminals = {};

  let mapGenre = movieGenre
    .map(obj =>
      objify({
        title: obj.title,
        genres: (typeof obj.genres === 'string') ? [obj.genres] : obj.genres
    }));

  // create a array of all genres
  mapGenre
    .forEach((obj) =>
      obj
        .genres
        .forEach((x) =>
          (genreDict.indexOf(x) === -1)
            ? genreDict.push(x)
            : x));

  // creates a list of new title base on genre
  mapGenre
    .forEach((obj) =>
      (obj.genres.indexOf(genreArg) === -1)
        ? obj
        : genreTitle.push(obj.title));

  // get all the 1st words of the titles
  genreTitle
    .forEach((title) => {
      let words = title.split(' ');
      terminals[words[words.length - 1]] = true;
      initWords.push(words[0]);

      // creates a map of all the different words that are next
      words
        .forEach((_, index) =>
          (statsWord.hasOwnProperty(words[index]))
            ? statsWord[words[index]].push(words[index+1])
            : statsWord[words[index]] = [words[index+1]]);
    });

  const selection = (a) => a[ Math.floor( a.length * Math.random() ) ];

  const make_title = (min_length) => {
    word = selection(initWords);
    let title = [word];
    while (statsWord.hasOwnProperty(word)) {
      let next_words = statsWord[word];
      word = selection(next_words);
      title.push(word);
      if (title.length > min_length && terminals.hasOwnProperty(word)) break;
    }
    if (title.length < min_length) return make_title(min_length);
    return title.join(' ');
  };

  let newTitle = make_title(4 + Math.floor(3 * Math.random()));
  return newTitle;

}

console.log(
  generate('War')
);
