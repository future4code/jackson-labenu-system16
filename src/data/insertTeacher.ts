import { connection } from '../index';

export default async function insertTeacher(
    id:number,
    name:string,
    email: string,
    birthdate:string,
    REACT: boolean,
    REDUX: boolean,
    CSS: boolean,
    TESTES: boolean,
    TYPESCRIPT: boolean,
    PROGRAMAÇÃO_ORIENTADA_A_OBJETOS: boolean,
    BACKEND: boolean
    ) {

    let speciality = []

    if(REACT = true){
        speciality.push('REACT')
    }
    if(REDUX = true){
        speciality.push('REDUX')
    }
    if(CSS = true){
        speciality.push('CSS')
    }
    if(TESTES = true){
        speciality.push('TESTES')
    }
    if(TYPESCRIPT = true){
        speciality.push('TYPESCRIPT')
    }
    if(PROGRAMAÇÃO_ORIENTADA_A_OBJETOS = true){
        speciality.push('PROGRAMAÇÃO ORIENTADA A OBJETOS')
    }
    if(BACKEND = true){
        speciality.push('BACKEND')
    }

    await connection
    .insert({
        id,
        name,
        email,
        birthdate,
        speciality
    })
    .into("labenu_teachers")

}