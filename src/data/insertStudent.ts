import { connection } from '../index';

export default async function insertStudent(
    id:number,
    name:string,
    email: string,
    birthdate:string,
    hobby:string
    ) {
    await connection
    .insert({
        hobby
    })
    .into("labenu_hobbies")
    await connection
    .insert({
        id,
        name,
        email,
        birthdate
    })
    .into("labenu_students")
}