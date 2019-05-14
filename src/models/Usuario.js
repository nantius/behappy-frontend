import Avatar from './Avatar';

class Usuario{
    constructor(){
        this.nome = ''
        this.genero = ''
        this.avatar = Avatar.obterTodos()[0]
    }

    validarNome(){
        if(
        typeof this.nome === 'string' &&
        this.nome.length != 0 && 
        this.nome.length <= 40){
            return true;
        }
        return false;
    }

    validarGenero(){
        // retorna true se this.genero for igual a algum dos itens do array, caso contrário retorna false
        return ['m', 'f'].some(param => {
            return this.genero === param
        })
    }
}

export default Usuario;