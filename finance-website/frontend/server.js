import express from 'express';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const app = express();
const port = process.env.PORT || 5173;

const __dirname = dirname(fileURLToPath(import.meta.url));

// Serve static files from the Vite build output directory
app.use(express.static(path.join(__dirname, 'dist')));

// Catch-all route to let the React router handle routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});