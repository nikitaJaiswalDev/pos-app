require('dotenv').config()
const express = require('express');
const createError = require('http-errors')
require('./heplers/init_mongodb')

const AuthRoute = require('./Routes/Auth.route')
const app = express();
app.use(express.json())
app.use(express.urlencoded({extended: true}))
const PORT = process.env.PORT


app.get('/', (req, res) => {
    res.send('Hello from server');
});

app.use('/auth', AuthRoute)

app.use((err, req, res, next ) => {
    res.status(err.status || 500)
    res.send({
        error: {
            status: err.status || 500,
            message: err.message,
        }
    })
})

app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));
