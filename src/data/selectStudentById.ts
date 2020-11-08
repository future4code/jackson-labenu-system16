import { connection } from '../index';

export default async function selectStudentById(
    id:string
    ) {
    const result = await connection.raw(`
        SELECT TRUNCATE((DATEDIFF(CURDATE(), birthdate)/365),0)
        as age FROM labenu_students
        WHERE ID = "${id}"
    `)
    return result[0][0];
}