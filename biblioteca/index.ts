import * as leitor from 'readline-sync';
import { Livro, Usuario, SistemaBiblioteca } from './biblioteca';

const biblioteca = new SistemaBiblioteca();
let menu: boolean = true

while (true) {
  console.log("1 - Cadastrar Livro");
  console.log("2 - Cadastrar Usuário");
  console.log("3 - Emprestar Livro");
  console.log("4 - Devolver Livro");
  console.log("5 - Consultar Livros Disponíveis");
  console.log("6 - Sair");

  const opcao = leitor.questionInt("Digite o número da opção desejada: ");

  switch (opcao) {
    case 1:
      const tituloLivro = leitor.question("Título do livro: ");
      const autorLivro = leitor.question("Autor do livro: ");
      const anoPublicacao = leitor.questionInt("Ano de publicação do livro: ");
      const quantidadeDisponivel = leitor.questionInt("Quantidade disponível do livro: ");
      const novoLivro = new Livro(tituloLivro, autorLivro, anoPublicacao, quantidadeDisponivel);
      biblioteca.cadastrarLivro(novoLivro);
      break;
    case 2:
      const nomeUsuario = leitor.question("Nome do usuário: ");
      const emailUsuario = leitor.question("E-mail do usuário: ");
      const novoUsuario = new Usuario(nomeUsuario, emailUsuario);
      biblioteca.cadastrarUsuario(novoUsuario);
      break;
    case 3:
      const livroIdEmprestimo = leitor.questionInt("ID do livro a emprestar: ");
      const usuarioIdEmprestimo = leitor.questionInt("ID do usuário que vai emprestar: ");
      biblioteca.emprestarLivro(livroIdEmprestimo, usuarioIdEmprestimo);
      break;
    case 4:
      const livroIdDevolucao = leitor.questionInt("ID do livro a devolver: ");
      const usuarioIdDevolucao = leitor.questionInt("ID do usuário que vai devolver: ");
      biblioteca.devolverLivro(livroIdDevolucao, usuarioIdDevolucao);
      break;
    case 5:
      const livrosDisponiveis = biblioteca.consultarLivrosDisponiveis();
      console.log("Livros disponíveis:");
      livrosDisponiveis.forEach((livro) => {
        console.log(`ID: ${livro.getId()}, Título: ${livro.getTitulo()}, Autor: ${livro.getAutor()}`);
      });
      break;
    case 6:
      console.log("Saindo do sistema.");
      menu = false
    default:
      console.log("Opção inválida. Por favor, escolha uma opção válida.");
  }
}
