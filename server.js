//importação da função randomUUID
const { randomUUID } = require("crypto")
//importação do framework express
const express = require("express")

const app = express()

app.use(express.json())
//criação do vetor
const alunos = []

app.get("/alunos", (request, response) =>{//Define uma rota HTTP GET para o endpoint /alunos. Quando uma solicitação GET é feita para este endpoint, a função callback fornecida é executada.
    return response.json(alunos)//Envia uma resposta JSON contendo o array alunos. Isso permite que o cliente que fez a solicitação GET receba todos os dados dos alunos armazenados no array alunos.
})

app.post("/alunos", (request, response) =>{//Define uma rota HTTP POST para o endpoint /alunos. Quando uma solicitação POST é feita para este endpoint, a função callback fornecida é executada.
    const {nome,email} = request.body//Extrai os campos nome e email do corpo da solicitação (request.body). Isso pressupõe que o corpo da solicitação contém um objeto JSON com esses campos.
    const uuid = randomUUID()//Gera um UUID (Universally Unique Identifier) aleatório. Este UUID será usado para identificar de forma única cada aluno.
    const aluno = {
        uuid,
        nome,
        email,
    }//Cria um objeto aluno com as propriedades uuid, nome e email.
    alunos.push(aluno)//Adiciona o objeto aluno ao array alunos
    return response.json(aluno)//Envia uma resposta JSON contendo o objeto aluno recém-criado. Isso permite que o cliente que fez a solicitação POST receba os dados do aluno criado.
})

app.listen(3333, () =>{
    console.log("Servidor on")
})

app.delete("/alunos/:uuid", (request, response) =>{//Define uma rota HTTP DELETE para o endpoint /alunos/:uuid. O :uuid é um parâmetro de rota que representa o UUID do aluno que será deletado.
    const {uuid} = request.params//Extrai o parâmetro uuid da URL da solicitação (request.params).

    const pos = alunos.findIndex(aluno => aluno.uuid == uuid)//Procura o índice do aluno no array alunos cujo UUID corresponde ao UUID fornecido na solicitação. A função findIndex retorna o índice do primeiro elemento que satisfaz a condição ou -1 se nenhum elemento for encontrado.
    if(pos < 0)//Verifica se o índice retornado é menor que 0, o que significa que nenhum aluno com o UUID fornecido foi encontrado.
        return response.status(400).json({mensage: "Aluno não encontrado"})//Se nenhum aluno for encontrado (índice menor que 0), retorna uma resposta HTTP com status 400 (Bad Request) e uma mensagem JSON indicando que o aluno não foi encontrado.

    const aluno = alunos[pos]//Se o aluno for encontrado, armazena o objeto aluno correspondente ao índice encontrado.
    alunos.splice(pos, 1)//Remove o aluno do array alunos usando o método splice, que remove 1 elemento a partir do índice pos.
    return response.json(aluno)//Retorna uma resposta JSON contendo o objeto aluno que foi deletado. Isso permite que o cliente que fez a solicitação DELETE saiba qual aluno foi removido.
})

app.put("/alunos/:uuid", (request, response) =>{
    const {uuid} = request.params//Extrai o parâmetro uuid da URL da solicitação (request.params). Este UUID identifica o aluno que deve ser atualizado.
    const {nome, email} = request.body//Extrai os campos nome e email do corpo da solicitação (request.body). Isso pressupõe que o corpo da solicitação contém um objeto JSON com esses campos.

    const pos = alunos.findIndex(aluno => aluno.uuid == uuid)//Procura o índice do aluno no array alunos cujo UUID corresponde ao UUID fornecido na solicitação. A função findIndex retorna o índice do primeiro elemento que satisfaz a condição ou -1 se nenhum elemento for encontrado.

    if(pos < 0)//Verifica se o índice retornado é menor que 0, o que significa que nenhum aluno com o UUID fornecido foi encontrado.
        return response.status(400).json({mensage: "Aluno não encontrado"})//Se nenhum aluno for encontrado (índice menor que 0), retorna uma resposta HTTP com status 400 (Bad Request) e uma mensagem JSON indicando que o aluno não foi encontrado.

    const aluno ={
        uuid,
        nome,
        email
    }//Cria um novo objeto aluno com as propriedades uuid, nome e email. Os valores dessas propriedades são os que foram extraídos do corpo da solicitação e o UUID fornecido.
    alunos[pos] = aluno//Atualiza o objeto aluno no array alunos na posição pos com o novo objeto aluno criado.
    return response.json(aluno)//Retorna uma resposta JSON contendo o objeto aluno atualizado. Isso permite que o cliente que fez a solicitação PUT saiba quais dados do aluno foram atualizados.

})