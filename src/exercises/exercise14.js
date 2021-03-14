const {fromHttpRequest} = require('../utils/http');
const {mergeAll, mergeMap, take, filter, count} = require('rxjs/operators');

fromHttpRequest('https://orels-moviedb.herokuapp.com/genres')
    .pipe(
        mergeAll(),
        filter(genre => genre.name == "action"),
        mergeMap(genre => fromHttpRequest('https://orels-moviedb.herokuapp.com/directors')
        .pipe(
            mergeAll(),
            mergeMap(director => fromHttpRequest('https://orels-moviedb.herokuapp.com/movies')
            .pipe(
                mergeAll(),
                take(100),
                filter(movie => movie.genres.includes(genre.id) && movie.directors.includes(director.id)),
                count(),
            ))
        ))
    ).subscribe(console.log);