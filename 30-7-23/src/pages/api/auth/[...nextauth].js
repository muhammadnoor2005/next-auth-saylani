import { getByEmail, verifyPass } from "@/services/users";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
export const authOptions = {
    session:{
        jwt: true
    },
    providers:[
        CredentialsProvider({
            async authorize({email,password}){
                const user = getByEmail(email);
                if(!user){
                    throw new Error("user not found");
                }
                const isValid = await verifyPass(user.password,password);
                if (!isValid){
                    throw new Error("Incorrect password");
                }
                return{email};
            }
        })
    ]
}
export default NextAuth(authOptions);
