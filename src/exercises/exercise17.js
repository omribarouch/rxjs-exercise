const { mergeAll, map, mergeMap, take, tap, filter, concatAll, takeLast, groupBy } = require("rxjs/operators");
const {of, from} = require('rxjs');
const {fromHttpRequest} = require('../utils/http');

fromHttpRequest('https://orels-moviedb.herokuapp.com/directors')
.pipe(
    mergeAll(),
    take(10),
    mergeMap(director => fromHttpRequest(`https://orels-moviedb.herokuapp.com/movies`)
        .pipe(
            mergeAll(),
            filter(movie => movie.directors.includes(director.id)),
            map(movie => movie.title)
        )
    )
).subscribe(console.log);