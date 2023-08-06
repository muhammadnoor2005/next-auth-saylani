import Form from "@/components/auth/form";
import {signIn} from "next-auth/react"
import { getSession } from "next-auth/react";

export default function SignIn () {
  const onSubmit = (email,password)=>{
    signIn('credentials',{redirect:true,email,password});
    console.log("Login successful");
  }
  return <Form signin={true} onFormSubmit={onSubmit}/>
};
export async function getServerSideProps({req}){
  const session = await getSession({req});
  if(session){
    return{
      redirect:{
        destination:"../profile",
        permanent: false,
      }
    }
  }
  return{
    props:{}
  }
}
