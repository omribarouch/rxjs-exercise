const {fromHttpRequest} = require('../utils/http');
const {mergeAll, count} = require('rxjs/operators');

fromHttpRequest('https://orels-moviedb.herokuapp.com/movies')
    .pipe(
        mergeAll(),
        count()
    )
    .subscribe(console.log);