const uploadBtn = document.getElementById("upload-btn");
const inputUpload = document.getElementById("imagem-upload");

uploadBtn.addEventListener("click",() => {
    inputUpload.click();
})

function lerConteudoDoArquivo(arquivo) {
    return new Promise((resolve, reject) => {
        const leitor = new FileReader();
        leitor.onload = () => {
            resolve ({url: leitor.result, nome: arquivo.name })
        }

        leitor.onerror = () => {
            reject(`Erro na leitura do arquivo ${arquivo.name}`)
        }

        leitor.readAsDataURL(arquivo)
    })
};

const imagemPrincipal = document.querySelector(".main-imagem");
const nomeDaImagem = document.querySelector(".container-imagem-none p");

inputUpload.addEventListener("change", async (evento) => {      //para quando ocorrer uma mudanca no arquivo, definindo como async
    const arquivo = evento.target.files[0];
    
    //validacao 
    if (arquivo) {
        try {
            const ConteudoDoArquivo = await lerConteudoDoArquivo(arquivo);     //o evento sera esperado
            imagemPrincipal.src = ConteudoDoArquivo.url;
            nomeDaImagem.textContent = ConteudoDoArquivo.nome;
        } catch (erro) {
            console.error ("Erro na leitura do arquivo");
        }
    }
})

const inputTags = document.getElementById("input-tags");
const listaTags = document.getElementById("lista-tags");

inputTags.addEventListener("keypress", (evento) => {
    if (evento.key === "Enter") { //a propriedade key, diz qual e a tecla
    evento.preventDefault();
    const tagTexto = inputTags.value.trim(); //o trim nao permite espaco antes e apos o texto
    if (tagTexto !== "") {
        const tagNova = document.createElement("li");
        tagNova.innerHTML = `<p>${tagTexto}</p> <img src="./img/close-black.svg" class="remove-tag">`
        listaTags.appendChild(tagNova);
        inputTags.value = "";
    }
    }
 })

 listaTags.addEventListener("click", (evento) => {
    if (evento.target.classList.contains("remove-tag")) {
        const tagQueQueremosRemover = evento.target.parentElement;
        listaTags.removeChild(tagQueQueremosRemover);
    }
 })