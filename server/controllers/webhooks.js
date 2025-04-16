import { Webhook} from "svix";
import User from "../models/User.js";

//API controller function to manage clerk user with database
  
export const clerkWebhooks = async (req,res) => {
   try {

        //crete a Svix instance with clerk webhook secret.

        console.log("Webhook secret:", process.env.CLERK_WEBHOOK_SECRET)
        
        const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET)
        
        await whook.verify(JSON.stringify(req.body),{

        "svix-id": req.headers["svix-id"],
        "svix-timestamp": req.headers["svix-timestamp"],
        "svix-signature": req.headers["svix-signature"],
       })
    
        

        //Getting data from request body
        const {data,type}  = req.body

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
            
            
            default:
                break;
        }

    } catch (error) {
        console.log(error.message);
        res.json({success :false , message : 'Webhooks Error'})
        
    }
}