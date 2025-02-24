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
}

const imagemPrincipal = document.querySelector(".main-iamgem");
const nomeDaImagem = document.querySelector(".container-imagem-none");

inputUpload.addEventListener("change", async (evento) => {      //para quando ocorrer uma mudanca no arquivo, definindo como async
    const arquivo = evento.target.files[0];
    
    //validacao 
    if (arquivo) {
        try {
            const ConteudoDoArquivo = await lerConteudoDoArquivo(arquivo);     //o evento sera esperado
            imagemPrincipal.src = ConteudoDoArquivo.url;
            nomeDaImagem.textContent = ConteudoDoArquivo.nome;
        } catch (erro) {
            console.erro ("Erro na leitura do arquivo.")
        }
    }
})

