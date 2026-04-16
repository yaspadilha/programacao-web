import { CatalogoFilmes } from "./CatalogoFilmes.js";
import * as readline from 'readline-sync';

const catalogo = new CatalogoFilmes();

function MenuPrincipal() {

    let execucao = true;

    while (execucao) {
        console.log('\n' + '------------------')
        console.log('CATÁLOGO DE FILMES')
        console.log('------------------')
        console.log('Índice')
        console.log('------------------')
        console.log('1 - Adicionar filme')
        console.log('2 - Listar todos os filmes')
        console.log('3 - Buscar filme por titulo ou genero')
        console.log('4 - Remover filme')
        console.log('5 - Sair')
        console.log('------------------')

        console.log('\n' + 'Selecione uma opção: ')
        const resposta = readline.questionInt();

        switch (resposta) {
            case 1: 
                catalogo.adicionarFilme();
                break;
            case 2:
                catalogo.listarFilmes();
                break;
            case 3:
                const titulo = readline.question("Digite o nome ou o genero do filme: ");
                catalogo.buscarFilmes(titulo);
                break;
            case 4:
                const nomeFilme = readline.question("Digite o nome do filme: ");
                catalogo.removerFilme(nomeFilme);
                break;
            case 5:
                console.log("Encerrando aplicação...")
                execucao = false;
                break;
        }
    }
}

MenuPrincipal();