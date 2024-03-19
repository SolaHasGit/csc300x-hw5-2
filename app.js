//This is the script running the backend using node express.

"use strict";

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));


// Define your categories and jokes
let categories = ['funnyJoke', 'lameJoke'];

let jokes = {
    funnyJoke: [
        {
            joke: 'Why did the student eat his homework?',
            response: 'Because the teacher told him it was a piece of cake!'
        },
        {
            joke: 'What kind of tree fits in your hand?',
            response: 'A palm tree'
        },
        {
            joke: 'What is worse than raining cats and dogs?',
            response: 'Hailing taxis'
        }
    ],
    lameJoke: [
        {
            joke: 'Which bear is the most condescending?',
            response: 'Pan-DUH'
        },
        {
            joke: 'What would the Terminator be called in his retirement?',
            response: 'The Exterminator'
        }
    ]
};

// Endpoint to get all categories
app.get('/jokebook/categories', (req, res) => {
    res.json(categories);
});

// Endpoint to get jokes from a specific category
app.get('/jokebook/joke/:category', (req, res) => {
    const category = req.params.category;
    const jokesInCategory = jokes[category];
    if (!jokesInCategory) {
        return res.status(404).json({ error: `No category listed for ${category}` });
    }
    res.json(jokesInCategory);
});

// Endpoint to add a new joke
app.post('/jokebook/joke/new', (req, res) => {
    const { category, joke, response } = req.body;

    if (!category || !joke || !response || !categories.includes(category)) {
        return res.status(400).json({ error: 'Invalid or insufficient user input' });
    }

    jokes[category].push({ joke, response });
    res.json(jokes[category]);
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
