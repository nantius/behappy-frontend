class Usuario{
    constructor(){
        this.nome = ''
        this.genero = ''
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