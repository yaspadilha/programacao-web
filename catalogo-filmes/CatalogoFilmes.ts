import type { Filme } from './types.js';
import * as readline from 'readline-sync';

export class CatalogoFilmes {
    filmes: Array<Filme>

    constructor() {
        this.filmes = [];
    }

    adicionarFilme() {
        console.log('\n' + '---------------------------------------')
        console.log('Insira um novo filme no catálogo: ')
        console.log('---------------------------------------')

        const nome = readline.question("Nome: ")
        const genero = readline.question("Genero: ")
        const ano = readline.questionInt("Ano da lancamento: ")
        const duracao = readline.questionInt("Duracao (em minutos): ")

        console.log('------------------')

        const novoFilme: Filme = {
            titulo: nome.toUpperCase(),
            genero: genero.toUpperCase(),
            anoLancamento: ano,
            duracao: duracao
        }

        if (nome && genero && ano && duracao) {
            this.filmes.push(novoFilme)
            console.log("\n" + "Filme adicionado com sucesso!" + "\n")
        }
        else {
            console.log('\n' + 'Preencha todos os campos!')
        }
    }

    listarFilmes() {
        console.log('\n' + '-----------------------')
        console.log("Filmes cadastrados: ")
        console.log('-----------------------' + '\n')
        let i = 1
        if (this.filmes) {
            for (let filme of this.filmes) {
                console.log(`${i} - ${filme.titulo}` +
                    `\n` + '\n' + '| Dados do filme |' +
                    '\n' + '\n' + 'Genero: ' + `${filme.genero}` +
                    `\n` + 'Ano de lancamento: ' + `${filme.anoLancamento}` +
                    `\n` + 'Duracao (min): ' + `${filme.duracao}`)
                console.log('-----------------------')
                i++
            }
        }
        else {
            console.log('Nenhum filme foi cadastrado.')
            console.log('------------------')
        }
    }

    buscarFilmes(parametro: string) {
        console.log('\n' + '------------------')
        console.log('Busca por filmes')
        console.log('------------------')
        const filmeTitulo = this.filmes.find((filme) => filme.titulo == parametro.toLocaleUpperCase())
        const filmeGenero = this.filmes.filter((filme) => filme.genero == parametro.toUpperCase())

        if (filmeTitulo) {
            console.log('Filme(s) encontrado(s): ' + '\n')
            console.log(`Titulo: ${filmeTitulo.titulo}`)
            console.log(`Genero: ${filmeTitulo.genero}`)
            console.log(`Ano de lancamento: ${filmeTitulo.anoLancamento}`)
            console.log(`Duracao: ${filmeTitulo.duracao}`)
        }
        else if (filmeGenero.length != 0) {
            console.log('Filme(s) encontrado(s): ')
            console.log('\n' + `${filmeGenero.length} filmes encontrados para o genero ${parametro.toLowerCase()}`)
            for (let filme of filmeGenero) {
                console.log('\n' + `Titulo: ${filme.titulo}`)
                console.log(`Genero: ${filme.genero}`)
                console.log(`Ano de lancamento: ${filme.anoLancamento}`)
                console.log(`Duracao: ${filme.duracao}`)
            }
        }
        else {
            console.log("Filme não encontrado")
        }
        console.log('------------------')
    }

    removerFilme(nome: string) {
        const filme = this.filmes.find((filme) => filme.titulo == nome.toLocaleUpperCase())

        if (filme) {
            const id = this.filmes.indexOf(filme)
            this.filmes.splice(id, 1)
            console.log('\n' + "Filme removido com sucesso!")
        }
        else {
            console.log('\n' + "Filme não encontrado.")
        }
    }
}