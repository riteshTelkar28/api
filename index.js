const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json({ limit: '10mb' }));

// Helper function to check if a number is prime
const isPrime = (num) => {
  if (num <= 1) return false;
  for (let i = 2; i * i <= num; i++) {
    if (num % i === 0) return false;
  }
  return true;
};

// POST endpoint for processing data
app.post('/bfhl', (req, res) => {
  const { data, file_b64 } = req.body;

  // Validate and process input
  const numbers = data.filter(item => !isNaN(item)).map(Number);
  const alphabets = data.filter(item => isNaN(item));
  const highestLowercase = alphabets.filter(char => /[a-z]/.test(char)).sort().pop();
  const isPrimeFound = numbers.some(isPrime);

  const fileData = file_b64 ? Buffer.from(file_b64, 'base64') : null;
  const fileValid = fileData ? true : false;
  const fileMimeType = fileValid ? 'image/png' : null; // Replace with actual MIME type checking logic
  const fileSizeKB = fileValid ? (fileData.length / 1024).toFixed(2) : null;

  // Response object
  const response = {
    is_success: true,
    user_id: 'john_doe_17091999',
    email: 'john@xyz.com',
    roll_number: 'ABCD123',
    numbers,
    alphabets,
    highest_lowercase_alphabet: highestLowercase ? [highestLowercase] : [],
    is_prime_found: isPrimeFound,
    file_valid: fileValid,
    file_mime_type: fileMimeType,
    file_size_kb: fileSizeKB
  };

  res.json(response);
});

// GET endpoint with a hardcoded response
app.get('/bfhl', (req, res) => {
  res.json({ operation_code: 1 });
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
