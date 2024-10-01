import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from 'bcrypt';
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { pages } from "next/dist/build/templates/app-page";
export const authOptions: NextAuthOptions = {
  providers :[
    CredentialsProvider({
        id : "credentials",
        name: "Credentials",
        credentials: {
            email: { label: "Email", type: "text",  },
            password: { label: "Password", type: "password" }
          },
          async authorize (credentials:any) :Promise<any>{

            await dbConnect()
            try {
                const user =  await UserModel.findOne({
                    $or : [
                        {email:credentials.identifier.email},
                        {username:credentials.identifier.username}

                    ]

                })
                if(!user) {
                    throw new Error ("No user found with this Email")
                }
                if(!user.isVerified){
                    throw new Error ("Please verify your account before")
                } 
                //checkpassoword 
                const isPasswordCorrect =  await bcrypt.compare(credentials.password,user.password);
                if(isPasswordCorrect){
                    return user
                }else {
                    throw new Error("Incorrect password please enter correct password")
                }          
            } catch (err :any) {
                throw new Error(err)
            }

          }

    })
  ],
  callbacks: {

  },
  pages : {
    signIn :' /sign-in'
  },
  session :{
    strategy : "jwt"
  },
  secret : process.env.NEXTAUTH_SECRET,
}


