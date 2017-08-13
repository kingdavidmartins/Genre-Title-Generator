const _ = require('lodash');
const fs = require('fs');

const objify = (obj) => JSON.parse(obj);
const structNewObj = (value) => JSON.parse(JSON.stringify(value));

fs.readFile('movieGenreRaw.js', 'utf8' , (err, data) => {
  let newData = _.chain(objify(data))
    .map((value, index) =>
      structNewObj({
        title: value.title.slice(0, -7),
        genres: (value.genres.indexOf('|') === -1 ? value.genres : value.genres.split('|'))
      }))
    .value();

  let movieList = _.chain(objify(data))
    .map((value, index) => value.title.slice(0, -7))
    .value();


  // saves an array of objects from movieGenreRaw to movieTitleList.txt in my formatting
  fs.writeFile('movieGenreTransform.txt', JSON.stringify(newData), (err) =>
    console.log(err ? `Err: ${err}` : `transform was saved`));

  // saves an array of all the movie title's from movieGenreRaw to movieTitleList.txt
  fs.writeFile('movieTitleList.txt', JSON.stringify(movieList), (err) =>
    console.log(err ? `Err: ${err}` : `list of movie title's was saved`));
});
