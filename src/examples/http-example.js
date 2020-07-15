const { fromHttpRequest } = require('../utils/http');

fromHttpRequest('https://orels-moviedb.herokuapp.com/directors')
    .subscribe(directors => {
        console.log(directors);
    });