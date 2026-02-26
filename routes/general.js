const express = require('express');
const axios = require('axios');

const public_users = express.Router();

const baseURL = "http://localhost:3000/books";

/* ================================================= */
/* Get the book list available in the shop */
/* ================================================= */
public_users.get('/', async function (req, res) {
    try {
        const response = await axios.get(baseURL);
        return res.status(200).json(response.data);
    } catch (error) {
        return res.status(500).json({ message: "Error retrieving books" });
    }
});

/* ================================================= */
/* Get book details based on ISBN */
/* ================================================= */
public_users.get('/isbn/:isbn', function (req, res) {
    const isbn = req.params.isbn;

    axios.get(`${baseURL}/${isbn}`)
        .then(response => {
            return res.status(200).json(response.data);
        })
        .catch(error => {
            return res.status(404).json({ message: "Book not found" });
        });
});

/* ================================================= */
/* Get book details based on Author */
/* ================================================= */
public_users.get('/author/:author', async function (req, res) {
    const author = req.params.author;

    try {
        const response = await axios.get(`${baseURL}/author/${author}`);
        return res.status(200).json(response.data);
    } catch (error) {
        return res.status(404).json({ message: "Author not found" });
    }
});

/* ================================================= */
/* Get book details based on Title */
/* ================================================= */
public_users.get('/title/:title', async function (req, res) {
    const title = req.params.title;

    try {
        const response = await axios.get(`${baseURL}/title/${title}`);
        return res.status(200).json(response.data);
    } catch (error) {
        return res.status(404).json({ message: "Title not found" });
    }
});

module.exports.general = public_users;
