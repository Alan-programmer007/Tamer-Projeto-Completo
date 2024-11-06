const sqlite = require('sqlite')
const sqlite3 = require('sqlite3')


class Banco{

    constructor(){
        this.criarTabela()
    }
    

    async sqlConnection() {
    const banco = await sqlite.open({
        filename: 'database.db',
        driver: sqlite3.Database
    })

    return banco;

    }

    async criarTabela() {
    const banco = await this.sqlConnection();

    const tabela = `CREATE TABLE IF NOT EXISTS alunos (
                    id integer PRIMARY KEY AUTOINCREMENT,
                    uuid varchar(100),
                    nome varchar(100),
                    email varchar(100)
                    );`;

    await banco.exec(tabela) 
    }

    async inserir(aluno) {
    const {uuid, nome, email} = aluno;
    const banco = await this.sqlConnection();
    await banco.run("INSERT INTO alunos (uuid, nome, email) values (?, ?, ?)", uuid, nome, email)
    }

    async remover(id) {
    const banco = await this.sqlConnection();
    await banco.run("DELETE FROM alunos WHERE id = ?", id)
    }

    async atualizar(aluno) {
    const { nome, email, id} = aluno;
    const banco = await this.sqlConnection();
    await banco.run("UPDATE alunos SET nome = ?, email = ? WHERE id = ?", nome, email, id )
    }

    async listar() {
    const banco = await this.sqlConnection();
    const result = await banco.all("SELECT * FROM alunos")
    console.log(result)

    return result
    }

    async buscar(id) {
    const banco = await this.sqlConnection();
    const result = await banco.all("SELECT * FROM alunos WHERE id = ?", id)
    
    return result
    }

}


module.exports = Banco;