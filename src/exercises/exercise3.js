const {fromHttpRequest} = require('../utils/http');
const {mergeAll, map, filter} = require('rxjs/operators');

fromHttpRequest('https://orels-moviedb.herokuapp.com/directors')
    .pipe(
        mergeAll(),
        map(director => director.name),
        filter(director => director[0].toLowerCase() === 
            director[director.length - 1].toLowerCase())
    )
    .subscribe(console.log);