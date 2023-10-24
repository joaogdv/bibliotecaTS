"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var leitor = require("readline-sync");
var biblioteca_1 = require("./biblioteca");
var biblioteca = new biblioteca_1.SistemaBiblioteca();
var menu = true;
while (true) {
    console.log("1 - Cadastrar Livro");
    console.log("2 - Cadastrar Usuário");
    console.log("3 - Emprestar Livro");
    console.log("4 - Devolver Livro");
    console.log("5 - Consultar Livros Disponíveis");
    console.log("6 - Sair");
    var opcao = leitor.questionInt("Digite o número da opção desejada: ");
    switch (opcao) {
        case 1:
            var tituloLivro = leitor.question("Título do livro: ");
            var autorLivro = leitor.question("Autor do livro: ");
            var anoPublicacao = leitor.questionInt("Ano de publicação do livro: ");
            var quantidadeDisponivel = leitor.questionInt("Quantidade disponível do livro: ");
            var novoLivro = new biblioteca_1.Livro(tituloLivro, autorLivro, anoPublicacao, quantidadeDisponivel);
            biblioteca.cadastrarLivro(novoLivro);
            break;
        case 2:
            var nomeUsuario = leitor.question("Nome do usuário: ");
            var emailUsuario = leitor.question("E-mail do usuário: ");
            var novoUsuario = new biblioteca_1.Usuario(nomeUsuario, emailUsuario);
            biblioteca.cadastrarUsuario(novoUsuario);
            break;
        case 3:
            var livroIdEmprestimo = leitor.questionInt("ID do livro a emprestar: ");
            var usuarioIdEmprestimo = leitor.questionInt("ID do usuário que vai emprestar: ");
            biblioteca.emprestarLivro(livroIdEmprestimo, usuarioIdEmprestimo);
            break;
        case 4:
            var livroIdDevolucao = leitor.questionInt("ID do livro a devolver: ");
            var usuarioIdDevolucao = leitor.questionInt("ID do usuário que vai devolver: ");
            biblioteca.devolverLivro(livroIdDevolucao, usuarioIdDevolucao);
            break;
        case 5:
            var livrosDisponiveis = biblioteca.consultarLivrosDisponiveis();
            console.log("Livros disponíveis:");
            livrosDisponiveis.forEach(function (livro) {
                console.log("ID: ".concat(livro.getId(), ", T\u00EDtulo: ").concat(livro.getTitulo(), ", Autor: ").concat(livro.getAutor()));
            });
            break;
        case 6:
            console.log("Saindo do sistema.");
            menu = false;
        default:
            console.log("Opção inválida. Por favor, escolha uma opção válida.");
    }
}
