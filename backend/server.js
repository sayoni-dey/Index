import express from 'express';
import dotenv from 'dotenv';
import helmet from 'helmet';
import cors from 'cors';
import mongoose from 'mongoose';    
import webhookRoutes from './routes/webhook.routes.js';
import { clerkMiddleware } from '@clerk/express';
import institutionRoutes from './routes/institution.routes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
});

app.use(helmet());
app.use(cors());
app.use('/api/webhooks', webhookRoutes);
app.use(clerkMiddleware());
app.use(express.json({ limit: '2mb' }));

app.use('/api/institution', institutionRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});