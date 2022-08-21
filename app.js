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
        const result = getAuthToken(email, res)
        if (getAuthToken(email, res)) {
            res.status(200).send('Auth success')
        }

    }

})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
