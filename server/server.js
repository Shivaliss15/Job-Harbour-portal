import express from 'express';
import cors from 'cors';
import './config/instrument.js';
import 'dotenv/config';
import connectDB from './config/db.js';
import * as Sentry from "@sentry/node"
import { clerkWebhooks } from './controllers/webhooks.js';

import dotenv from 'dotenv';
dotenv.config();

//Initialize Express
const app = express();

//Connect to database
await connectDB()

//middlewares
app.use(cors());

app.post('/webhooks', express.raw({ type: 'application/json' }), clerkWebhooks);

if (process.env.NODE_ENV !== 'production') {
    app.post('/dev-webhooks', express.json(), async (req, res) => {
      try {
        // Simulate the req.body as stringified JSON (like Clerk sends)
        const mockReq = {
          ...req,
          body: req.body,
          headers: {
            ...req.headers,
            'svix-id': 'test-id',
            'svix-timestamp': String(Date.now()),
            'svix-signature': 'test-signature',
          }
        };
  
        // You can directly test logic without real signature verification
        await clerkWebhooks(mockReq, res);
      } catch (error) {
        console.error("Test Webhook Error:", error.message);
        res.status(500).json({ success: false, message: error.message });
      }
    });
  }
  

app.use(express.json());

//Routes
app.get('/' ,(req,res)=> {
    res.send("API working")
})
app.get('/debug-sentry' , function mainHandler(req,res ) { 
    throw new Error("My First Sentry error!")
}) ;


//Port
const PORT = process.env.PORT || 5000 ;

Sentry.setupExpressErrorHandler(app);

app.listen(PORT ,() =>{
    console.log(`Server is running on port ${PORT}`)
})