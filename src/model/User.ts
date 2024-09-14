import mongoose ,{Schema, Document} from "mongoose";
export interface Message extends Document {
    content:string;
    createdAt:Date;
} //First we define type of data.Document is used for type saftey
const MessageSchema : Schema<Message> = new Schema ({
    content:{
        type:String,
        requiered: true
    },
    createdAt:{
        type:Date,
        required:true,
        default:Date.now()
    }
})
//User structure
export interface User extends Document {
    username:string;
    email:string;
    password:string;
    verifyCode:string;
    verifyCodeExpiry:Date;
    isAcceptingMesage:boolean;
    messages:Message[];
    isVerified:boolean;
} 
const UserSchema : Schema<User> = new Schema ({
   username:{
    type:String,
    required:[true,"Username is required"],
    trim:true,
    unique:true,
   },
   email: {
    type:String,
    required:[true,"Email is required"],
    unique:true,
    match:[/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,'Please use a valid email addresss']

   },
   password:{
    type:String,
    required:[true,'Please is required']
   },
   verifyCode:{
    type:String,
    required:[true,'Please is required']
   },
   verifyCodeExpiry:{
    type:Date,
    required:[true,'Please is required']
   },
   isVerified:{
    type:  Boolean,
    default: false,
   },
   isAcceptingMesage:{
    type:  Boolean,
    default: false,
   },
   messages :[MessageSchema]

})
const UserModel=(mongoose.models.User as mongoose.Model<User>)||mongoose.model<User>("User",UserSchema);
//Here we export usermodel in two forms ,first we assume model is already created and in next we create schema for new 
export default UserModel;