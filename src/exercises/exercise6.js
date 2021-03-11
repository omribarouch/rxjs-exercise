const {fromHttpRequest} = require('../utils/http');
const {takeLast, mergeAll, filter, map} = require('rxjs/operators');

fromHttpRequest('https://orels-moviedb.herokuapp.com/movies')
    .pipe(
        mergeAll(),
        filter(movie => movie.year < 1990 && movie.directors.length > 1),
        map(movie => movie.title)
    )
    .subscribe(console.log);