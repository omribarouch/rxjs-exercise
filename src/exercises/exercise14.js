const {fromHttpRequest} = require('../utils/http');
const {mergeAll, mergeMap, map, take, filter, count, concatAll, toArray} = require('rxjs/operators');

fromHttpRequest('https://orels-moviedb.herokuapp.com/genres')
    .pipe(
        mergeAll(),
        filter(genre => genre.name == "action"),
        mergeMap(genre => fromHttpRequest('https://orels-moviedb.herokuapp.com/directors')
        .pipe(
            mergeAll(),
            take(200),
            mergeMap(director => fromHttpRequest('https://orels-moviedb.herokuapp.com/movies')
            .pipe(
                mergeAll(),
                filter(movie => movie.genres.includes(genre.id) && movie.directors.includes(director.id)),
                count(),
                map(moviesCount => [director.name, moviesCount])
            ))
        )),
        toArray(),
        map(directors => directors.sort((a, b) => a[1] > b[1] ? -1 : 1)),
        concatAll(),
        take(5)
    ).subscribe(console.log);