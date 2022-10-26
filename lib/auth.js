import { hash, compare} from "bcrypt";
import { ObjectId } from "mongoose";

export async function hashPassword(password){
    const hashedPassword = await hash(password,12);

    return hashedPassword;

}

export async function verifypassword(password,hashedPassword){
    const isValid = await compare(password,hashedPassword);

    return isValid;
}