const _ = require('lodash');
const fs = require('fs');

const objify = (obj) => JSON.parse(obj);
const structNewObj = (value) => JSON.parse(JSON.stringify(value));

// for small data set
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


// for large data set
fs.readFile('movieGenreRawLarge.js', 'utf8' , (err, data) => {
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


  // saves an array of objects from movieGenreRawLarge to movieGenreTransformLarge.txt in my formatting
  fs.writeFile('movieGenreTransformLarge.txt', JSON.stringify(newData), (err) =>
    console.log(err ? `Err: ${err}` : `transform of large file was saved`));

  // saves an array of all the movie title's from movieGenreRawLarge to movieTitleListLarge.txt
  fs.writeFile('movieTitleListLarge.txt', JSON.stringify(movieList), (err) =>
    console.log(err ? `Err: ${err}` : `list of large movie title's was saved`));
});


// for Super large data set
fs.readFile('movieGenreRawSuper.js', 'utf8' , (err, data) => {
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


  // saves an array of objects from movieGenreRawSuper to movieGenreTransformSuper.txt in my formatting
  fs.writeFile('movieGenreTransformSuper.txt', JSON.stringify(newData), (err) =>
    console.log(err ? `Err: ${err}` : `transform of large file was saved`));

  // saves an array of all the movie title's from movieGenreRawSuper to movieTitleListSuper.txt
  fs.writeFile('movieTitleListSuper.txt', JSON.stringify(movieList), (err) =>
    console.log(err ? `Err: ${err}` : `list of large movie title's was saved`));
});
