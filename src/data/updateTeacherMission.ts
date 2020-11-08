import { connection } from '../index';

export default async function updateTeacherMission(
    id:string,
    mission_id:string,
    ) {
    if(mission_id) {
        await connection.raw(`
            UPDATE labenu_teachers
            SET mission_id = "${mission_id}"
            WHERE id = "${id}";
        `)
    }
}