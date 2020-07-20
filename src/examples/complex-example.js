const {fromHttpRequest} = require('../utils/http');
const {from} = require('rxjs');
const {mergeAll, mergeMap, map, max, toArray, filter, groupBy, count, take} = require('rxjs/operators');

// Emit the year in which there were most thriller movies

// I created this function because making a request for the server is very slow.
function getGenre(id) {
    const genres = [{"id": 1, "name": "thriller"}, {"id": 2, "name": "mystery"}, {"id": 3, "name": "western"}, {
        "id": 4,
        "name": "drama"
    }, {"id": 5, "name": "music"}, {"id": 6, "name": "fantasy"}, {"id": 7, "name": "war"}, {
        "id": 8,
        "name": "romance"
    }, {"id": 9, "name": "crime"}, {"id": 10, "name": "sport"}, {"id": 11, "name": "comedy"}, {
        "id": 12,
        "name": "biography"
    }, {"id": 13, "name": "history"}, {"id": 14, "name": "horror"}, {"id": 15, "name": "adventure"}, {
        "id": 16,
        "name": "musical"
    }, {"id": 17, "name": "action"}, {"id": 18, "name": "sci_fi"}, {"id": 19, "name": "film_noir"}, {
        "id": 20,
        "name": "animation"
    }, {"id": 21, "name": "family"}];
    return genres.find(genre => genre.id === id);
}

// EXAMPLE 1 : This will run fast because of the cached array
fromHttpRequest('https://orels-moviedb.herokuapp.com/movies')
    .pipe(
        mergeAll(),
        mergeMap(movie => from(movie.genres).pipe(
            map(genreId => getGenre(genreId).name),
            toArray(),
            map(genres => {
                return {
                    year: parseInt(movie.year),
                    genres: genres
                }
            })
        )),
        filter(movie => movie.genres.includes('thriller')),
        groupBy(movie => movie.year),
        mergeMap(group => group.pipe(count(), map(movieCount => [group.key, movieCount]))),
        max((a, b) => a[1] < b[1] ? -1 : 1)
    ).subscribe(console.log);

// EXAMPLE 2 : This will run very very slow if it will run on the whole dataset, so I'm running only on 100 movies.
fromHttpRequest('https://orels-moviedb.herokuapp.com/movies')
    .pipe(
        mergeAll(),
        take(100),
        mergeMap(movie => from(movie.genres).pipe(
            mergeMap(genreId => {
                return fromHttpRequest(`https://orels-moviedb.herokuapp.com/genres/${genreId}`)
                    .pipe(map(genre => genre.name))
            }),
            toArray(),
            map(genres => {
                return {
                    year: parseInt(movie.year),
                    genres: genres
                }
            })
        )),
        filter(movie => movie.genres.includes('thriller')),
        groupBy(movie => movie.year),
        mergeMap(group => group.pipe(count(), map(movieCount => [group.key, movieCount]))),
        max((a, b) => a[1] < b[1] ? -1 : 1)
    ).subscribe(console.log);


