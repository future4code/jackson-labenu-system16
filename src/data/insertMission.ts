import { connection } from '../index';

export default async function insertMission(
    id:number,
    name:string,
    start: string,
    end:string,
    module:string
    ) {
    await connection
    .insert({
        id,
        name,
        start,
        end,
        module
    })
    .into("labenu_missions")
}