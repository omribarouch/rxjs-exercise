const { of } = require("rxjs");
const { mergeAll, mergeMap, map, toArray, groupBy, count, reduce, filter, scan, merge } = require("rxjs/operators");
const {fromHttpRequest} = require('../utils/http');

fromHttpRequest('https://orels-moviedb.herokuapp.com/movies')
    .pipe(
        mergeAll(),
        map(movie => {
            return {
                year: movie.year,
                count: reduce((acc, m) => m.year == movie.year ? acc++ : acc, 0)
            }
        })
    ).subscribe(console.log);