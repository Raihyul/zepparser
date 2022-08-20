const express = require('express')
const app = express()
const { getJson } = require('./translate.js')
const port = 3000
const { getFileContents } = require('./utils/fileManager.js')

app.get('/', (req, res) => {
    const targetDir = './result'
    const fileContents = getFileContents('./Export-15a220e5-9f32-4501-9456-2320c3d9d915.zip', targetDir);
    json_result = getJson(fileContents, targetDir)
    res.send(json_result)
})

app.post('/auth', (req, res) => {
    const { email } = req.body
    if (!email) {
        res.status(400).send('Email is required')
    }
    else {

        var axios = require('axios');
        var FormData = require('form-data');
        var data = new FormData();
        data.append('email', 'dev.seonghun@gmail.com');

        var config = {
            method: 'post',
            url: 'https://zep.us/api/me/signin',
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

})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
