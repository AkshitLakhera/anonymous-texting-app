import {z} from 'zod';
export const usernameValidation= 
    z.string()
    .min(2,"Username must be atleast two character")
    .max(20,"Username must not more then 20 character")
    .regex(/^[a-zA-Z0-9]+$/,"Username must not contains special character")
    

//we make object when we have to check multiple things.
export const signUpSchema = z.object({
    username:usernameValidation,
    email:z.string().email({message:'Invalid email  must address'}),
    password: z.string().min(6,{message:"password  must  be at  least 6  character"}),
})