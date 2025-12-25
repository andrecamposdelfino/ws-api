const express = require('express')
const router = require('./router')

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use('/api', router)


const port = 3000
app.listen(port, () => {
    console.log("Server is running on port " + port);
})