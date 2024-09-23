import { resend } from "@/lib/resend";
import VerificationEmail from "../../emails/VerificationEmail";
import { ApiResponse } from "@/types/ApiResponse";
export async function sendVerificationEmail(
    username:string,
    email:string,
    verifyCode:string, 
):Promise<ApiResponse> // on return response type 
{
    try {
        await resend.emails.send({
            from: 'Acme <onboarding@resend.dev>',
            to: email,
            subject: 'Ngl message verification code',
            react: VerificationEmail({username,otp:verifyCode}),
          });
        return { success:true,message:"Verification email send successfully"}
 } catch (emailError) {
        console.log("Error in sending email",emailError);
        return { success:false,message:"Failed to send  verification email"
        }
        
    }
}

