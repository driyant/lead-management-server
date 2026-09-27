import 'dotenv/config';
import app from './app.js';

const PORT = process.env.PORT || 3001;

const start = (port: string | number): void => {
  try {
    app.listen(port, () => {
      console.log(`🚀 Server is running at http://localhost:${port}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

start(PORT);