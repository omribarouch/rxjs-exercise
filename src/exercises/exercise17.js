const { mergeAll, map, mergeMap, take, tap, filter, concatAll, takeLast, groupBy } = require("rxjs/operators");
const {of, from} = require('rxjs');
const {fromHttpRequest} = require('../utils/http');

fromHttpRequest('https://orels-moviedb.herokuapp.com/directors')
.pipe(
    mergeAll(),
    filter(director => director.name == 'Richard Donner'),
    mergeMap(director => fromHttpRequest(`https://orels-moviedb.herokuapp.com/movies`)
        .pipe(
            mergeAll(),
            filter(movie => movie.directors.includes(director.id)),
            mergeMap(movie => fromHttpRequest(`https://orels-moviedb.herokuapp.com/genres`)
            .pipe(
                mergeAll()
            ))
        ))
).subscribe(console.log);