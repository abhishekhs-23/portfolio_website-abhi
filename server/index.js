import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    message: 'Backend server is running',
    timestamp: new Date().toISOString() 
  });
});

// Welcome endpoint
app.get('/', (req, res) => {
  res.json({ 
    name: 'Portfolio Backend',
    version: '1.0.0',
    description: 'Simple backend server for portfolio'
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

