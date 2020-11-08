import { connection } from '../index';

export default async function insertTeacher(
    id:number,
    name:string,
    email: string,
    birthdate:string,
    react: boolean,
    redux: boolean,
    css: boolean,
    testes: boolean,
    typescript: boolean,
    programacao_orientada_a_objetos: boolean,
    backend: boolean
    ) {

    await connection
    .insert({
        id,
        name,
        email,
        birthdate,
    })
    .into("labenu_teachers")

    await connection
    .insert({
        teacher_id: id,
        react,
        redux,
        css,
        testes,
        typescript,
        programacao_orientada_a_objetos,
        backend,
    })
    .into("labenu_teacher_specialities")

}