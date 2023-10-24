interface Biblioteca {
    cadastrarLivro(livro: Livro): void;
    cadastrarUsuario(usuario: Usuario): void;
    emprestarLivro(livroId: number, usuarioId: number): void;
    devolverLivro(livroId: number, usuarioId: number): void;
    consultarLivrosDisponiveis(): Livro[];
  }
  
 export class Livro {
    private static proximoId = 1;
    private id: number;
    private quantidadeDisponivel: number;
  
    constructor(
      private titulo: string,
      private autor: string,
      private anoPublicacao: number,
      quantidadeDisponivel: number
    ) {
      this.id = Livro.proximoId++;
      this.quantidadeDisponivel = quantidadeDisponivel;
    }
  
    getId(): number {
      return this.id;
    }
  
    getTitulo(): string {
      return this.titulo;
    }
  
    getAutor(): string {
      return this.autor;
    }
  
    getAnoPublicacao(): number {
      return this.anoPublicacao;
    }
  
    getQuantidadeDisponivel(): number {
      return this.quantidadeDisponivel;
    }
  
    emprestarLivro(): boolean {
      if (this.quantidadeDisponivel > 0) {
        this.quantidadeDisponivel--;
        return true;
      }
      return false;
    }
  
    devolverLivro(): void {
      this.quantidadeDisponivel++;
    }
  }
  
 export class Usuario {
    private static proximoId = 1;
    private id: number;
    private livrosEmprestados: Livro[] = [];
  
    constructor(private nome: string, private email: string) {
      this.id = Usuario.proximoId++;
    }
  
    getId(): number {
      return this.id;
    }
  
    getNome(): string {
      return this.nome;
    }
  
    getEmail(): string {
      return this.email;
    }
  
    getLivrosEmprestados(): Livro[] {
      return this.livrosEmprestados;
    }
  
    emprestarLivro(livro: Livro): boolean {
      if (this.livrosEmprestados.length < 3 && livro.getQuantidadeDisponivel() > 0) {
        if (livro.emprestarLivro()) {
          this.livrosEmprestados.push(livro);
          return true;
        }
      }
      return false;
    }
  
    devolverLivro(livro: Livro): void {
      const index = this.livrosEmprestados.indexOf(livro);
      if (index !== -1) {
        this.livrosEmprestados.splice(index, 1);
        livro.devolverLivro();
      }
    }
  }
  
  export class SistemaBiblioteca implements Biblioteca {
    private livros: Livro[] = [];
    private usuarios: Usuario[] = [];
  
    cadastrarLivro(livro: Livro): void {
      this.livros.push(livro);
    }
  
    cadastrarUsuario(usuario: Usuario): void {
      this.usuarios.push(usuario);
    }
  
    emprestarLivro(livroId: number, usuarioId: number): void {
      const livro = this.getLivroPorId(livroId);
      const usuario = this.getUsuarioPorId(usuarioId);
  
      if (livro && usuario) {
        if (usuario.emprestarLivro(livro)) {
          console.log(`Livro "${livro.getTitulo()}" emprestado para ${usuario.getNome()}.`);
        } else {
          console.log(`O empréstimo do livro "${livro.getTitulo()}" para ${usuario.getNome()} não foi possível.`);
        }
      } else {
        console.log('Livro ou usuário não encontrado.');
      }
    }
  
    devolverLivro(livroId: number, usuarioId: number): void {
      const livro = this.getLivroPorId(livroId);
      const usuario = this.getUsuarioPorId(usuarioId);
  
      if (livro && usuario) {
        usuario.devolverLivro(livro);
        console.log(`Livro "${livro.getTitulo()}" devolvido por ${usuario.getNome()}.`);
      } else {
        console.log('Livro ou usuário não encontrado.');
      }
    }
  
    consultarLivrosDisponiveis(): Livro[] {
      return this.livros.filter((livro) => livro.getQuantidadeDisponivel() > 0);
    }
  
    private getUsuarioPorId(usuarioId: number): Usuario | undefined {
      return this.usuarios.find((usuario) => usuario.getId() === usuarioId);
    }
  
    private getLivroPorId(livroId: number): Livro | undefined {
      return this.livros.find((livro) => livro.getId() === livroId);
    }
  }
  
  const sistemaBiblioteca = new SistemaBiblioteca();
  const livro1 = new Livro('Livro 1', 'Autor 1', 2020, 5);
  const livro2 = new Livro('Livro 2', 'Autor 2', 2019, 3);
  const usuario1 = new Usuario('Usuário 1', 'usuario1@email.com');
  
  sistemaBiblioteca.cadastrarLivro(livro1);
  sistemaBiblioteca.cadastrarLivro(livro2);
  sistemaBiblioteca.cadastrarUsuario(usuario1);
  
  sistemaBiblioteca.emprestarLivro(livro1.getId(), usuario1.getId());
  sistemaBiblioteca.emprestarLivro(livro2.getId(), usuario1.getId());
  
  console.log(`Livros emprestados por ${usuario1.getNome()}:`);
  usuario1.getLivrosEmprestados().forEach((livro) => {
    console.log(`- ${livro.getTitulo()}`);
  });
  
  sistemaBiblioteca.devolverLivro(livro1.getId(), usuario1.getId());
  
  console.log(`Livros emprestados por ${usuario1.getNome()} após a devolução:`);
  usuario1.getLivrosEmprestados().forEach((livro) => {
    console.log(`- ${livro.getTitulo()}`);
  });
  