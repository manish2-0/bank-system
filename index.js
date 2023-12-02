const express = require('express');
const cors = require('cors');

const app = express();

const allowedOrigins = [
    
    'https://bank-system-binarynumbers.vercel.app',
    'http://127.0.0.1:5500',
    'http://localhost:8000',
    'http://localhost:3000'
];

const credentials = (req, res, next) => {
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
        res.header('Access-Control-Allow-Credentials', true);
    }
    next();
}

const corsOptions = {
    origin: (origin, callback) => {
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    optionsSuccessStatus: 200
}

app.use(credentials);

// Cross Origin Resource Sharing
app.use(cors(corsOptions));

// built-in middleware for json 
app.use(express.json());

// for parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const userController = require('./controller/userController')
app.post("/signup", userController.signup);
app.post("/login", userController.login);
app.post("/logout", userController.logout);
app.get("/customers", userController.getCustomers);

const actionController = require('./controller/actionController')
app.post("/action", actionController.action);
// app.get("/history/:customer_id", refreshRouter);



let PORT = 3306;

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
