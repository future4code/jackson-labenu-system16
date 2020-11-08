import { connection } from '../index';

export default async function updateStudentMission(
    id:string,
    mission_id:string,
    ) {
    if(mission_id) {
        await connection.raw(`
            UPDATE labenu_students
            SET mission_id = "${mission_id}"
            WHERE id = "${id}";
        `)
    }
}