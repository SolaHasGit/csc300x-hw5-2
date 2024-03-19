# *jokebook* API documentation 

## Endpoint 1 - Get /jokebook/categories
Responds with a list of possible categories in the jokebook.
[funnyJoke, lameJoke]

## Endpoint 2 - Get /jokebook/joke/:category

responds with a JSON response.
will send the list of jokes from the specified /:category
add an optional query parameter 'limit' that limits the number of jokes returned.
If the category is not valid, will respond with {'error': 'no category listed for [category]'} where [category] is
replaced by the user-specified category.

## Endpoint 3 - POST /jokebook/joke/new

Requires three parameters: category, joke, and response, sent with the body of the request.
• Should add the joke to the array corresponding to the given category, following the format: {joke: [JOKE],
response: [RESPONSE]}, where [JOKE] and [RESPONSE] are the joke and response from the body of the request,
respectively.
• Responds with the updated joke array.
• If missing one of the required parameters, or category isn’t one of funnyJoke or lameJoke, the service should
respond with {'error': 'invalid or insufficient user input'} and a 400 status code.

