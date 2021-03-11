const {fromHttpRequest} = require('../utils/http');
const {mergeAll, file, filter, map} = require('rxjs/operators');

fromHttpRequest('https://orels-moviedb.herokuapp.com/movies')
    .pipe(
        mergeAll(),
        filter(movie => movie.id % 3 == 0),
        map(movie => movie.title)
    )
    .subscribe(console.log);