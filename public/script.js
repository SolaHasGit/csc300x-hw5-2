//Script for handling the front end

"use strict";

document.addEventListener('DOMContentLoaded', function () {
    const jokeContainer = document.getElementById('joke');
    const categoriesList = document.getElementById('categories');
    const addJokeForm = document.getElementById('add-joke-form');

    // Function to fetch categories and display them
    function fetchCategories() {
        const allCategories = ['funnyJoke', 'lameJoke']; // Add all your categories here
        allCategories.forEach(category => {
            const listItem = document.createElement('li');
            listItem.textContent = category;
            listItem.addEventListener('click', () => fetchJokesByCategory(category));
            categoriesList.appendChild(listItem);
        });
    }

    // Function to fetch jokes by category
    function fetchJokesByCategory(category) {
        fetch(`/jokebook/joke/${category}`)
            .then(response => response.json())
            .then(jokes => {
                jokeContainer.innerHTML = '';
                jokes.forEach(joke => {
                    jokeContainer.innerHTML += `<p>${joke.joke}</p><p><em>${joke.response}</em></p>`;
                });
            })
            .catch(error => console.error(`Error fetching ${category} jokes:`, error));
    }

    // Function to fetch a random joke upon page load
    function fetchRandomJoke() {
        fetch('/jokebook/categories')
            .then(response => response.json())
            .then(categories => {
                const randomCategory = categories[Math.floor(Math.random() * categories.length)];
                return fetch(`/jokebook/joke/${randomCategory}`);
            })
            .then(response => response.json())
            .then(jokes => {
                const randomJoke = jokes[Math.floor(Math.random() * jokes.length)];
                jokeContainer.innerHTML = `<p>${randomJoke.joke}</p><p><em>${randomJoke.response}</em></p>`;
            })
            .catch(error => console.error('Error fetching random joke:', error));
    }

    // Function to add a new joke
    function addNewJoke(category, joke, response) {
        fetch('/jokebook/joke/new', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                category,
                joke,
                response
            })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Invalid or insufficient user input');
            }
            return response.json();
        })
        .then(() => fetchJokesByCategory(category)) // Fetch and display jokes for the specified category
        .catch(error => console.error('Error adding joke:', error.message));
    }

    // Event listener for add joke form submission
    addJokeForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const category = addJokeForm.category.value;
        const newJoke = addJokeForm['new-joke'].value;
        const response = addJokeForm.response.value;

        // Check if any of the fields are empty
        if (!category || !newJoke || !response) {
            console.error('Invalid or insufficient user input');
            // Display error message
            const errorMessage = document.getElementById('error-message');
            errorMessage.textContent = 'Please fill out all fields.';
            errorMessage.style.display = 'block';
            return;
        }

        // Check if category is valid
        if (!['funnyJoke', 'lameJoke'].includes(category)) {
            console.error('Invalid category:', category);
            // Display error message
            const errorMessage = document.getElementById('error-message');
            errorMessage.textContent = 'Invalid category. Please choose a valid category.';
            errorMessage.style.display = 'block';
            return;
        }

        // Hide any existing error message
        const errorMessage = document.getElementById('error-message');
        errorMessage.style.display = 'none';

        addNewJoke(category, newJoke, response);
        addJokeForm.reset();
    });

    fetchCategories();

    // Fetch a random joke upon page load
    fetchRandomJoke();
});
