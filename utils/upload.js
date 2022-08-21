
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
            return true;
        })
        .catch(function (error) {
            console.log(error);
            return false;
        });
}

exports.getAuthToken = function (email, key) {

    var data = new FormData();
    data.append('email', email);
    data.append('t', key);

    var config = {
        method: 'post',
        url: 'https://zep.us/api/me/signin/confirm',
        data: data
    };

    axios(config)
        .then(function (response) {
            console.log(JSON.stringify(response.data));
            return true;
        })
        .catch(function (error) {
            console.log(error);
            return false;
        });

}


exports.uploadFile = function (file, targetDir, cookie, name, desc) {
    var axios = require('axios');
    var FormData = require('form-data');
    var fs = require('fs');
    var data = new FormData();
    data.append('file', fs.createReadStream('/Users/seonghun/GDrive/[03]스펙/[02]동아리및대외활동/[2022][해커톤]Junction 해커톤/File/zep5/Zep.zip'));
    data.append('name', name);
    data.append('desc', desc);
    data.append('type', '1');

    var config = {
        method: 'post',
        url: 'https://zep.us/me/apps/2jmGd5',
        headers: {
            'cookie': cookie,
            ...data.getHeaders()
        },
        data: data
    };

    axios(config)
        .then(function (response) {
            console.log(JSON.stringify(response.data));
            return true;
        })
        .catch(function (error) {
            console.log(error);
            return false;
        });

}