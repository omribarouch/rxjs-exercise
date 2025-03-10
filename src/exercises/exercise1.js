const {fromHttpRequest} = require('../utils/http');
const {take, mergeAll} = require('rxjs/operators');

fromHttpRequest('https://orels-moviedb.herokuapp.com/directors')
    .pipe(
        mergeAll(),
        take(1)
    )
    .subscribe(console.log);