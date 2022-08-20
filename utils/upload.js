
var axios = require('axios');
var FormData = require('form-data');

exports.sendAuthMail = function (email) {

    var data = new FormData();
    data.append('email', email);

    var config = {
        method: 'post',
        url: 'https://zep.us/api/me/signin',
        data: data
    };

    axios(config)
        .then(function (response) {
            console.log(JSON.stringify(response.data));
        })
        .catch(function (error) {
            console.log(error);
        });
}

exports.getAuthToken = function (email, key) {

    var data = new FormData();
    data.append('email', email);
    data.append('t', key);

    var config = {
        method: 'post',
        url: 'https://zep.us/api/me/signin/confirm',
        headers: {
            'Cookie': '.AspNetCore.Session=CfDJ8F1b9ttwOadPjVuGHkYnESoc3GWq51W9rdoxaBuXQKKZneL2QaPMmfC1MLPiGgmjjRPXXr8EldGMWpREcTHdTsOOdwaIG1vUjhCWz7NOt8yazTbUupRdcsRgaWtx64hG5A2ZNKRiU8WLlPN5G4%2BlwGVRV5zqZydSIesqr9yR4%2BuW',
            ...data.getHeaders()
        },
        data: data
    };

    axios(config)
        .then(function (response) {
            console.log(JSON.stringify(response.data));
        })
        .catch(function (error) {
            console.log(error);
        });

}