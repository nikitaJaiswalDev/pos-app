require('dotenv').config()
const express = require('express');
const cors = require('cors')
const createError = require('http-errors')
require('./helpers/init_mongodb')
const multer = require('multer')
const GridFsStorage = require('multer-gridfs-storage')
const Grid = require('gridfs-stream')
const bodyParser = require('body-parser')

const AuthRoute = require('./Routes/Auth.route')
const EmployeeRoute = require('./Routes/Employee.route')
const ProfilePictureRoute = require('./Routes/ProfilePicture.Route')
const RoleNamesRoute = require('./Routes/RoleNames.Route')
const RoleListRoute = require('./Routes/RoleList.Route')

const app = express();

// Middleware
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(cors())

const PORT = process.env.PORT


app.get('/', (req, res) => {
    res.send('Hello from server');
});

app.use('/auth', AuthRoute)
app.use('/employee', EmployeeRoute)
app.use('/picture', ProfilePictureRoute)
app.use('/role_names', RoleNamesRoute)
app.use('/role_list', RoleListRoute)

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
