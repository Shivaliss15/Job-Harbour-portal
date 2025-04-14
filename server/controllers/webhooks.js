import { Webhook } from 'svix';
import User from '../models/User.js';

export const clerkWebhooks = async (req, res) => {
  try {
    const payload = req.body.toString('utf-8'); // Convert Buffer to string
    const headers = req.headers;

    const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);
    whook.verify(payload, headers); // Verify the webhook signature

    const { data, type } = JSON.parse(payload); // Parse the payload

    switch (type) {
      case 'user.created':
        const userData = {
          _id: data.id,
          email: data.email_addresses[0].email_address,
          name: `${data.first_name} ${data.last_name}`,
          image: data.image_url,
          resume: '',
        };
        await User.create(userData);
        break;

      case 'user.updated':
        const updatedData = {
          email: data.email_addresses[0].email_address,
          name: `${data.first_name} ${data.last_name}`,
          image: data.image_url,
        };
        await User.findByIdAndUpdate(data.id, updatedData);
        break;

      case 'user.deleted':
        await User.findByIdAndDelete(data.id);
        break;

      default:
        break;
    }

    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Webhook processing error:', error);
    res.status(400).json({ success: false, message: 'Webhook verification failed' });
  }
};
