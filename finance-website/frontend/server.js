import express from 'express';
import path from 'path';

const app = express();
const port = process.env.PORT || 5173;

// Serve static files from the React frontend app
app.use(express.static(path.resolve(path.dirname(''), 'build')))

// Anything that doesn't match the above, send back index.html
app.get('*', (req, res) => {
  res.sendFile(path.resolve(path.dirname(''), 'build', 'index.html'))
})

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});