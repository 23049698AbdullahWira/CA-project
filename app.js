const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const mysql = require('mysql2');
const session = require('express-session');

const app = express();
const port = 3000;

// MySQL connection configuration
const connection = mysql.createConnection({
    //host: 'localhost',
    //user: 'root',
    //password: '',
    //database: 'books'
    host: 'mysql-abdullahwira.alwaysdata.net',
    user: '371307',
    password: 'Wira_23049698!',
    database: 'abdullahwira_project'
});

// Connect to MySQL
connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL database: ' + err.stack);
        return;
    }
    console.log('Connected to MySQL database as id ' + connection.threadId);
});

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

// Session management
app.use(session({
    secret: 'secret_key',
    resave: false,
    saveUninitialized: true
}));

// Multer storage configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        if (file.fieldname === 'cover') {
            cb(null, 'public/uploads/');
        } else if (file.fieldname === 'readLink') {
            cb(null, 'public/pdfs/');
        }
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });

// Helper function to get image paths
function getImagePaths(folder) {
    return fs.readdirSync(path.join(__dirname, 'public', folder)).map(file => path.join(folder, file));
}

// Middleware to check if user is logged in
function checkAuth(req, res, next) {
    if (req.session.user) {
        next();
    } else {
        res.redirect('/login');
    }
}

// Routes for CRUD operations
// Default route - Load books for all users, redirect to login for certain actions
app.get('/', (req, res) => {
    connection.query('SELECT * FROM books', (err, rows) => {
        if (err) throw err;

        const images = getImagePaths('images');
        const uploads = getImagePaths('uploads');
        res.render('index', { books: rows, images, uploads, user: req.session.user });
    });
});

// Search bar 
app.get('/search', (req, res) => {
    const query = req.query.query.toLowerCase();
    connection.query('SELECT * FROM books WHERE LOWER(title) LIKE ?', [`%${query}%`], (err, rows) => {
        if (err) throw err;

        res.render('index', { books: rows, images: getImagePaths('images'), uploads: getImagePaths('uploads'), user: req.session.user });
    });
});

// Get a specific book by ID
app.get('/books/:id', function (req, res) {
    const bookId = parseInt(req.params.id);
    connection.query('SELECT * FROM books WHERE id = ?', [bookId], (err, rows) => {
        if (err) throw err;

        if (rows.length > 0) {
            res.render('bookInfo', { book: rows[0], user: req.session.user });
        } else {
            res.status(404).send('book not found');
        }
    });
});

// Add a new book form
app.get('/addbook', checkAuth, function (req, res) {
    res.render('addbook');
});

// Add a new book with updated multer fields handling
app.post('/books', checkAuth, upload.fields([{ name: 'cover', maxCount: 1 }, { name: 'readLink', maxCount: 1 }]), function (req, res) {
    const { title, description, author, pages } = req.body;
    const cover = req.files['cover'] ? '/uploads/' + req.files['cover'][0].filename : null;
    const readLink = req.files['readLink'] ? '/pdfs/' + req.files['readLink'][0].filename : null;

    connection.query('INSERT INTO books (title, description, author, pages, cover, readLink) VALUES (?, ?, ?, ?, ?, ?)',
        [title, description, author, pages, cover, readLink],
        (err, result) => {
            if (err) throw err;

            console.log('New book added with ID: ', result.insertId);
            res.redirect('/');
        });
});

// Update a book by ID - Display update form
app.get('/books/:id/update', checkAuth, function (req, res) {
    const bookId = parseInt(req.params.id);
    connection.query('SELECT * FROM books WHERE id = ?', [bookId], (err, rows) => {
        if (err) throw err;

        if (rows.length > 0) {
            res.render('updatebook', { updatebook: rows[0] });
        } else {
            res.status(404).send('book not found');
        }
    });
});

// Update a book by ID - Handle update form submission
app.post('/books/:id/update', checkAuth, upload.fields([{ name: 'cover', maxCount: 1 }, { name: 'readLink', maxCount: 1 }]), function (req, res) {
    const bookId = parseInt(req.params.id);
    const { title, description, author, pages } = req.body;
    const cover = req.files['cover'] ? '/uploads/' + req.files['cover'][0].filename : null;
    const readLink = req.files['readLink'] ? '/pdfs/' + req.files['readLink'][0].filename : null;

    connection.query('UPDATE books SET title = ?, description = ?, author = ?, pages = ?, cover = ?, readLink = ? WHERE id = ?',
        [title, description, author, pages, cover, readLink, bookId],
        (err, result) => {
            if (err) throw err;

            console.log('book updated successfully.');
            res.redirect('/');
        });
});

// Delete a book by ID
app.get('/books/:id/delete', checkAuth, function (req, res) {
    const bookId = parseInt(req.params.id);
    connection.query('DELETE FROM books WHERE id = ?', [bookId], (err, result) => {
        if (err) throw err;

        console.log('book deleted successfully.');
        res.redirect('/');
    });
});

// Registration route
app.get('/register', (req, res) => {
    res.render('register');
});

app.post('/register', (req, res) => {
    const { username, password } = req.body;

    connection.query('INSERT INTO Users (username, password) VALUES (?, ?)', [username, password], (err, result) => {
        if (err) {
            console.error('Error registering user: ' + err.stack);
            res.status(500).send('Internal server error');
            return;
        }

        console.log('User registered with ID: ', result.insertId);
        res.redirect('/login');
    });
});

// Login route - Render login form
app.get('/login', (req, res) => {
    res.render('login'); // Assuming 'login' is your EJS template for the login form
});

// Handle login POST request
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    connection.query('SELECT * FROM Users WHERE username = ? AND password = ?', [username, password], (err, rows) => {
        if (err) {
            console.error('Error during login:', err.stack);
            res.status(500).send('Internal server error');
            return;
        }

        if (rows.length > 0) {
            req.session.user = rows[0];
            console.log('User logged in:', username);
            res.redirect('/');
        } else {
            console.log('Invalid username or password');
            res.status(401).send('Invalid username or password');
        }
    });
});

// Logout route
app.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/login');
});

// Start the server and listen on the specified port
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});

// Handle MySQL connection closure on process termination
process.on('SIGINT', () => {
    connection.end();
    console.log('MySQL connection closed.');
    process.exit(0);
});
