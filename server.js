const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;

app.use(express.static('public'));
app.use(express.json());

const filePath = path.join(__dirname, 'tasks.txt');

app.post('/add-task', (req, res) => {
  const { name, desc, deadline } = req.body;
  const data = `Task: ${name}\nDescription: ${desc}\nDeadline: ${deadline}\n\n`;

  fs.appendFile(filePath, data, (err) => {
    if (err) return res.status(500).send('Error writing to file.');
    res.send('Task saved successfully!');
  });
});

app.get('/tasks', (req, res) => {
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) return res.status(500).send('Error reading file.');
    res.type('text/plain').send(data);
  });
});

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
