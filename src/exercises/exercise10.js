const {fromHttpRequest} = require('../utils/http');
const {mergeAll, mergeMap, map, filter, toArray, concatAll, take} = require('rxjs/operators');

fromHttpRequest('https://orels-moviedb.herokuapp.com/directors')
    .pipe(
        mergeAll(),
        filter(director => director.name == "Quentin Tarantino"),
        mergeMap(quentin => fromHttpRequest('https://orels-moviedb.herokuapp.com/movies').pipe(
            mergeAll(),
            filter(movie => movie.directors.includes(quentin.id)),
            map(movie => [movie.title, movie.year]),
            toArray(),
            map(movies => movies.sort((a, b) => a[1] > b[1] ? -1 : 1)),
            concatAll(),
            take(5)
        ))
    ).subscribe(console.log);