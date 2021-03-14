const { mergeAll, map } = require("rxjs/operators");
const { concat, of } = require('rxjs');
const {fromHttpRequest} = require('../utils/http');

concat(
    fromHttpRequest('https://orels-moviedb.herokuapp.com/movies')
        .pipe(
            mergeAll(),
            map(movie => movie.title)
        ),
    of('...'),
    fromHttpRequest('https://orels-moviedb.herokuapp.com/directors')
        .pipe(
            mergeAll(),
            map(director => director.name)
        ),  
    of('...'),
    fromHttpRequest('https://orels-moviedb.herokuapp.com/genres')
        .pipe(
            mergeAll(),
            map(genre => genre.name)
        ) 
).subscribe(console.log);