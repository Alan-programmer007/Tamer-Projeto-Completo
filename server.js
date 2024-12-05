//importação da função randomUUID
const { randomUUID } = require("crypto")
//importação do framework express
const express = require("express")

const cors = require("cors")

const Banco = require("./banco")          

const app = express()

const banco = new Banco()

app.use(cors())

app.use(express.json())
//criação do vetor
const alunos = []

app.get("/alunos", async(request, response) =>{//Define uma rota HTTP GET para o endpoint /alunos. Quando uma solicitação GET é feita para este endpoint, a função callback fornecida é executada.
    //const {uuid} = request.query

    //const pos = alunos.findIndex(aluno => aluno.uuid == uuid)
    //if(uuid)
    //return response.json(alunos[pos])

    const lista = await banco.listar()
    return response.json(lista)
})

app.post("/alunos", (request, response) =>{
    const {nome,email} = request.body
    const uuid = randomUUID()
    const aluno = {
        uuid,
        nome,
        email,
    }
    banco.inserir(aluno)
    //alunos.push(aluno)
    return response.json(aluno)
})

app.listen(3333, () =>{
    console.log("Servidor on")
})

app.delete("/alunos/:id", async(request, response) =>{
    const { id } = request.params

    const pos = await banco.buscar(id)
    console.log(pos)
    if(pos <= 0)
        return response.status(400).json({mensage: "Aluno não encontrado"})

    banco.remover(id)
    return response.json({mensage: "Removido"})
})

app.put("/alunos/:id", async(request, response) =>{
    const {id} = request.params
    const { nome, email} = request.body

    const pos = await banco.buscar(id)
    console.log(pos)
    if(pos <= 0)
        return response.status(400).json({mensage: "Aluno não encontrado"})

    const aluno ={
        id,
        nome,
        email
    }

    banco.atualizar(aluno)
    return response.json({mensage: "Aluno atualizado"})
    //alunos[pos] = aluno
})