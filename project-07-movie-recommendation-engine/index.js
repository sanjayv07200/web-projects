const fs = require("fs");

const dataStr = fs.readFileSync("data.json", "utf-8");
const data = JSON.parse(dataStr);

const genreInput = process.argv.slice(2).at(0);

const topPickByGenre = {};

data.forEach(function (movie) {
  if (movie.genre.map((str) => str.toLocaleLowerCase()).includes(genreInput)) {
    console.log(`- ${movie.title} (${movie.year}) - ${movie.rating}`);
  }

  movie.genre.forEach(function (genre) {
    if (topPickByGenre[genre] === undefined) {
      topPickByGenre[genre] = { title: "", rating: 0 };
    }

    if (topPickByGenre[genre].rating < movie.rating) {
      topPickByGenre[genre].title = movie.title;
      topPickByGenre[genre].rating = movie.rating;
    }
  });
});

console.log("Top Picks by Genre:");

for (let genre in topPickByGenre) {
  const { title, rating } = topPickByGenre[genre];
  console.log(`- ${genre}: ${title} (${rating})`);
}
