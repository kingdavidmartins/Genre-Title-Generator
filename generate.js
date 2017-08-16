const fs = require('fs');
const objify = (obj) => JSON.parse(JSON.stringify(obj));
const titles = JSON.parse(fs.readFileSync('movieTitleList.txt', 'utf8'));
const movieGenre = JSON.parse(fs.readFileSync('movieGenreTransform.txt', 'utf8'));


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

  // console.log(genreTitle);

  for (let i = 0; i < titles.length; i++) {
      let words = titles[i].split(' ');
      terminals[words[words.length-1]] = true;
      initWords.push(words[0]);
      for (let j = 0; j < words.length - 1; j++) {
        if (statsWord.hasOwnProperty(words[j])) {
          statsWord[words[j]].push(words[j+1]);
        } else {
            statsWord[words[j]] = [words[j+1]];
        }
      }
  }

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

// console.log(
  generate('Drama');
// );
