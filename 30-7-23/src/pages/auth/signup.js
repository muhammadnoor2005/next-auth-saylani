import Form from "@/components/auth/form";


export default function SignIn () {
  const onSubmit = async(email,password)=>{
    try{
      const response = await fetch("/api/auth/signup",{
        method:"POST",
        body: JSON.stringify({email,password}),
        headers:{
          "Content-Type":"application/json"
        }
      });
      if(response.ok){
        alert("Sign up successful")
      }
    }
    catch(err){
      console.log(err);
    }

  } 
  return <Form signin={false} onFormSubmit={onSubmit}/>
};
