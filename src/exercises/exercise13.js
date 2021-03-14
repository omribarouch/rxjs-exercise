const {fromHttpRequest} = require('../utils/http');
const {mergeAll, mergeMap, map, max, filter, count, take} = require('rxjs/operators');

fromHttpRequest('https://orels-moviedb.herokuapp.com/directors')
    .pipe(
        mergeAll(),
        take(100),
        mergeMap(director => fromHttpRequest(`https://orels-moviedb.herokuapp.com/movies`)
            .pipe(
                mergeAll(),
                filter(movie => movie.directors.includes(director.id)),
                count(), 
                map(moviesCount => [director.name, moviesCount]),
            )
        ),
        max((a, b) => a[1] < b[1] ? -1 : 1)
    ).subscribe(console.log);