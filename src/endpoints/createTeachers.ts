import { Request, Response } from "express";
import moment from "moment";
import insertTeacher from "../data/insertTeacher";

export default async function createTeacher(
    req:Request, 
    res:Response
    ) {
    try {
        // Validar entradas da requisicão
        if(
            !req.body.name ||
            !req.body.email ||
            !req.body.birthdate
        ){
            res.status(400).send({
                message: "Opa! Os campos 'name', 'email' e 'birthdate' devem ser preenchidos"
            })

            return
        }
        // if(
        //     !(req.body.REACT === true || false) &&
        //     !(req.body.REDUX === true || false) &&
        //     !(req.body.CSS === true || false) &&
        //     !(req.body.TESTES === true || false) &&
        //     !(req.body.TYPESCRIPT === true || false) &&
        //     !(req.body.PROGRAMAÇÃO_ORIENTADA_A_OBJETOS === true || false) &&
        //     !(req.body.BACKEND === true || false)
        //     ){
        //     res.status(400).send({
        //         message: "As especialidades devem ser preenchidas com 'true' para especialidades que possui e 'false' para as que não possui"
        //     })
            
        //     return
        // }
        if(
            req.body.react === false &&
            req.body.redux === false &&
            req.body.css ===  false &&
            req.body.testes === false &&
            req.body.typescript === false &&
            req.body.programacao_orientada_a_objetos === false &&
            req.body.backend === false
            ){
            res.status(400).send({
                message: "Pelo menos 1 especialidade deve ser preenchida com 'true'."
            })
            
            return
        }
 
        // Consultar o banco de dados
        const id: number = moment().unix() + Math.random()
        
        await insertTeacher(
            id,
            req.body.name,
            req.body.email,
            moment(req.body.birthdate, "DD/MM/YYYY").format("YYYY-MM-DD"),
            req.body.react,
            req.body.redux,
            req.body.css,
            req.body.testes,
            req.body.typescript,
            req.body.programacao_orientada_a_objetos,
            req.body.backend
        )

        // Responder a requisição
        res.status(200).send({
            message: "Professor(a) inserido(a) com sucesso!",
            id,
            name: req.body.name,
            email: req.body.email, 
            birthdate: req.body.birthdate,
            react: req.body.react,
            redux: req.body.redux,
            css: req.body.css,
            testes: req.body.testes,
            typescript: req.body.typescript,
            programacao_orientada_a_objetos: req.body.programacao_orientada_a_objetos,
            backend: req.body.backend
        })

    } catch (error) {
        res.status(400).send({
            message: error.message || error.sqlMessage
        })
    }
}