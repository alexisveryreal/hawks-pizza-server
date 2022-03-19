import express from 'express';

const PORT = 3000;
const app = express();

app.use(express.raw({ type: 'application/vnd.custom-type' }));
app.use(express.text({ type: 'text/html' }));

app.get('/test', (req, res) => {
  res.status(200).send('Hello World');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
