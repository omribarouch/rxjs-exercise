const { mergeAll, map, mergeMap, filter, toArray, groupBy, max } = require("rxjs/operators");
const {from} = require('rxjs');
const {fromHttpRequest} = require('../utils/http');

fromHttpRequest('https://orels-moviedb.herokuapp.com/movies')
    .pipe(
        mergeAll(),
        mergeMap(movie => from(movie.genres)
        .pipe(
            map(genreId => fromHttpRequest('https://orels-moviedb.herokuapp.com/genres')
            .pipe(
                filter(genre => genre.id === genreId),
                map(genre => genre.name)
            ),
            toArray(),
            map(genres => {
                return {
                    year: parseInt(movie.year),
                    genres: genres
                }
            })
        ))),
        filter(movie => movie.genres.includes('thriller')),
        groupBy(movie => movie.year),
        mergeMap(group => group.pipe(count(), map(movieCount => [group.key, movieCount]))),
        max((a, b) => a[1] < b[1] ? -1 : 1)
    ).subscribe(console.log);