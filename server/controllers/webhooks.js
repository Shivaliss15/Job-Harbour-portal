import { Webhook } from 'svix';
import User from '../models/User.js'


//API controller function to manage clerk user with database

const clerkWebhooks = async (req,res) => {
  

    //crete a Svix instance with clerk webhook secret.
    const svixId = req.headers['svix-id'];
    const svixTimestamp = req.headers['svix-timestamp'];
    const svixSignature = req.headers['svix-signature'];

    // Verify webhook signature
    if (!svixId || !svixTimestamp || !svixSignature) {
      return res.status(400).json({
        error: 'Missing svix headers'
      });
    }
    const payload = req.body;
    const body = JSON.stringify(req.body);
  
     // Webhook secret from environment variables
    const webhookSecret = process.env.CLERK_WEBHOOK_SECRET;
 
    try {
   
        const whook = new Webhook(webhookSecret)  

        const evt = whook.verify(body, {
            'svix-id': svixId,
            'svix-timestamp': svixTimestamp,
            'svix-signature': svixSignature
        });
    

        // Handle different event types
        const { type, data } = evt;

        //Switch case for different events 
        switch (type) {

            case 'user.created':{
                
                const userData ={
                    _id:data.id,
                    email: data.email_addresses[0].email_address,
                    name :data.first_name + " " + data.last_name,
                    image : data.image_url,
                    resume: ''
                }
                await User.create(userData)
                res.status(200).json({ success: true });
                break;
            }
            case 'user.updated':{

                const userData ={
                    
                    email: data.email_addresses[0].email_address,
                    name :data.first_name + " " + data.last_name,
                    image : data.image_url,
                    
                }

                await User.findByIdAndUpdate(data.id , userData)
                res.status(200).json({ success: true });
                break;
            }
            case 'user.deleted': {
                if (!data?.id) {
                    console.log("Missing user ID in user.deleted event");
                    return res.status(400).json({ success: false, message: "Missing user ID" });
                }
            
                await User.findByIdAndDelete(data.id)
                res.status(200).json({ success: true });
                break;
            }
            
        }
        res.status(200).json({ success: true });

    } catch (err) {
        console.error('Error verifying webhook:', err);
        return res.status(400).json({success :false , message : err})
        
    }
};

export default clerkWebhooks;