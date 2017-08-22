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

  // tranform movieGenre into my preferred format
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

  // shows the user the other genre options they have
  console.log(genreDict);

  // picks a random element from that array you pass in
  const selection = (a) => a[ Math.floor( a.length * Math.random() ) ];

  // function that make title of x words from the mapped state + following word probability
  const make_title = (min_length) => {

    // pick a random word to start the title from initWords
    word = selection(initWords);
    let title = [word];

    // loop as long as the selected word is probable and push to title
    while (statsWord.hasOwnProperty(word)) {
      let next_words = statsWord[word];
      word = selection(next_words);
      title.push(word);

      // if length of title > min_length && if selected word exist in terminals break out
      if (title.length > min_length && terminals.hasOwnProperty(word)) {
        break;
      }
    }

    if (title.length < min_length) {
      return make_title(min_length);
    }

    return title.join(' ');
  };

  let newTitle = make_title(4 + Math.floor(3 * Math.random()));
  console.log('\n'+newTitle);

}

// so far my favorite titles are from sci-fi generation
generate('Sci-Fi');
