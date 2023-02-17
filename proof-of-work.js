// Import necessary packages
const express = require('express');
const crypto = require('crypto');

// Create an Express app
const app = express();

// Define the Proof-of-Work algorithm
function proofOfWork(data, difficulty) {
  let nonce = 0;
  let hash = '';

  while (hash.substring(0, difficulty) !== '0'.repeat(difficulty)) {
    nonce++;
    hash = crypto
      .createHash('sha256')
      .update(data + nonce)
      .digest('hex');
  }

  return { nonce, hash };
}

// Define the API endpoint for the Proof-of-Work function
app.get('/proof-of-work', (req, res) => {
  const { data, difficulty } = req.query;

  // Check if the required parameters are present
  if (!data || !difficulty) {
    res.status(400).json({ error: 'Missing required parameters' });
    return;
  }

  // Validate the input parameters
  if (isNaN(parseInt(difficulty, 10))) {
    res.status(400).json({ error: 'Invalid difficulty value' });
    return;
  }

  // Perform the Proof-of-Work
  const { nonce, hash } = proofOfWork(data, parseInt(difficulty, 10));

  res.json({ nonce, hash });
});

// Start the server
app.listen(3000, () => {
  console.log('Proof-of-Work server listening on port 3000');
});
This script defines an Express app that listens for GET requests to the /proof-of-work endpoint. The endpoint expects two query parameters: data and difficulty. The data parameter is the input data for the Proof-of-Work function, and the difficulty parameter specifies the number of leading zeros that the hash output should have.

When a request is received, the script checks for the presence and validity of the required parameters, and then performs the Proof-of-Work function using the proofOfWork function. The function generates a random nonce value and calculates the hash of the input data concatenated with the nonce. It repeats this process until a hash is generated with the required number of leading zeros.

Finally, the script returns a JSON object containing the nonce and hash values.

You can test this script by sending a GET request to the http://localhost:3000/proof-of-work endpoint with the data and difficulty query parameters. For example:

bash
Copy code
http://localhost:3000/proof-of-work?data=hello&difficulty=4
This will perform a Proof-of-Work operation on the input string "hello" with a difficulty of 4, and return a JSON object with the resulting nonce and hash values.




