"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SistemaBiblioteca = exports.Usuario = exports.Livro = void 0;
var Livro = /** @class */ (function () {
    function Livro(titulo, autor, anoPublicacao, quantidadeDisponivel) {
        this.id = Livro.proximoId++;
        this.titulo = titulo;
        this.autor = autor;
        this.anoPublicacao = anoPublicacao;
        this.quantidadeDisponivel = quantidadeDisponivel;
    }
    Livro.prototype.getId = function () {
        return this.id;
    };
    Livro.prototype.getTitulo = function () {
        return this.titulo;
    };
    Livro.prototype.getAutor = function () {
        return this.autor;
    };
    Livro.prototype.getAnoPublicacao = function () {
        return this.anoPublicacao;
    };
    Livro.prototype.getQuantidadeDisponivel = function () {
        return this.quantidadeDisponivel;
    };
    Livro.prototype.emprestarLivro = function () {
        if (this.quantidadeDisponivel > 0) {
            this.quantidadeDisponivel--;
            return true;
        }
        return false;
    };
    Livro.prototype.devolverLivro = function () {
        this.quantidadeDisponivel++;
    };
    Livro.proximoId = 1;
    return Livro;
}());
exports.Livro = Livro;
var Usuario = /** @class */ (function () {
    function Usuario(nome, email) {
        this.livrosEmprestados = [];
        this.id = Usuario.proximoId++;
        this.nome = nome;
        this.email = email;
    }
    Usuario.prototype.getId = function () {
        return this.id;
    };
    Usuario.prototype.getNome = function () {
        return this.nome;
    };
    Usuario.prototype.getEmail = function () {
        return this.email;
    };
    Usuario.prototype.getLivrosEmprestados = function () {
        return this.livrosEmprestados;
    };
    Usuario.prototype.emprestarLivro = function (livro) {
        if (this.livrosEmprestados.length < 3 && livro.getQuantidadeDisponivel() > 0) {
            if (livro.emprestarLivro()) {
                this.livrosEmprestados.push(livro);
                return true;
            }
        }
        return false;
    };
    Usuario.prototype.devolverLivro = function (livro) {
        var index = this.livrosEmprestados.indexOf(livro);
        if (index !== -1) {
            this.livrosEmprestados.splice(index, 1);
            livro.devolverLivro();
        }
    };
    Usuario.proximoId = 1;
    return Usuario;
}());
exports.Usuario = Usuario;
var SistemaBiblioteca = /** @class */ (function () {
    function SistemaBiblioteca() {
        this.livros = [];
        this.usuarios = [];
    }
    SistemaBiblioteca.prototype.cadastrarLivro = function (livro) {
        this.livros.push(livro);
    };
    SistemaBiblioteca.prototype.cadastrarUsuario = function (usuario) {
        this.usuarios.push(usuario);
    };
    SistemaBiblioteca.prototype.emprestarLivro = function (livroId, usuarioId) {
        var livro = this.getLivroPorId(livroId);
        var usuario = this.getUsuarioPorId(usuarioId);
        if (livro && usuario) {
            if (usuario.emprestarLivro(livro)) {
                console.log("Livro \"".concat(livro.getTitulo(), "\" emprestado para ").concat(usuario.getNome(), "."));
            }
            else {
                console.log("O empr\u00E9stimo do livro \"".concat(livro.getTitulo(), "\" para ").concat(usuario.getNome(), " n\u00E3o foi poss\u00EDvel."));
            }
        }
        else {
            console.log('Livro ou usuário não encontrado.');
        }
    };
    SistemaBiblioteca.prototype.devolverLivro = function (livroId, usuarioId) {
        var livro = this.getLivroPorId(livroId);
        var usuario = this.getUsuarioPorId(usuarioId);
        if (livro && usuario) {
            usuario.devolverLivro(livro);
            console.log("Livro \"".concat(livro.getTitulo(), "\" devolvido por ").concat(usuario.getNome(), "."));
        }
        else {
            console.log('Livro ou usuário não encontrado.');
        }
    };
    SistemaBiblioteca.prototype.consultarLivrosDisponiveis = function () {
        return this.livros.filter(function (livro) { return livro.getQuantidadeDisponivel() > 0; });
    };
    SistemaBiblioteca.prototype.getUsuarioPorId = function (usuarioId) {
        return this.usuarios.find(function (usuario) { return usuario.getId() === usuarioId; });
    };
    SistemaBiblioteca.prototype.getLivroPorId = function (livroId) {
        return this.livros.find(function (livro) { return livro.getId() === livroId; });
    };
    return SistemaBiblioteca;
}());
exports.SistemaBiblioteca = SistemaBiblioteca;
var sistemaBiblioteca = new SistemaBiblioteca();
var livro1 = new Livro('Livro 1', 'Autor 1', 2020, 5);
var livro2 = new Livro('Livro 2', 'Autor 2', 2019, 3);
var usuario1 = new Usuario('Usuário 1', 'usuario1@email.com');
sistemaBiblioteca.cadastrarLivro(livro1);
sistemaBiblioteca.cadastrarLivro(livro2);
sistemaBiblioteca.cadastrarUsuario(usuario1);
sistemaBiblioteca.emprestarLivro(livro1.getId(), usuario1.getId());
sistemaBiblioteca.emprestarLivro(livro2.getId(), usuario1.getId());
console.log("Livros emprestados por ".concat(usuario1.getNome(), ":"));
usuario1.getLivrosEmprestados().forEach(function (livro) {
    console.log("- ".concat(livro.getTitulo()));
});
sistemaBiblioteca.devolverLivro(livro1.getId(), usuario1.getId());
console.log("Livros emprestados por ".concat(usuario1.getNome(), " ap\u00F3s a devolu\u00E7\u00E3o:"));
usuario1.getLivrosEmprestados().forEach(function (livro) {
    console.log("- ".concat(livro.getTitulo()));
});
