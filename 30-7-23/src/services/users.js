import fs from 'fs'
import path from 'path';
import { compare, hash } from 'bcrypt';

const filePath = path.join(process.cwd(),"src", "data","users.json");
// const fs = require("fs")
export function getAll(){
    const data = fs.readFileSync(filePath);
    return (JSON.parse(data));
}

export function getByEmail(email){
    const data = getAll();
    return data.find(p =>p.email === email);
}

export async function save(email,password){
    const found = getByEmail(email);
    if(found){
        throw new Error("User already exits.");
    }
    const data = getAll();
    const hashedPass = await hash(password,12);
    data.push({
        id:data.length + 1,
        email,
        password:hashedPass,
    });
    console.log(data);
    fs.writeFileSync(filePath,JSON.stringify(data));
};

export async function verifyPass(hashedPass,password){
    const isValid = await compare(password,hashedPass);
    return isValid;
}