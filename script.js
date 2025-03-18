const amigos = [];

function exibirMensagem(texto, cor = "red") {
    const mensagem = document.getElementById("mensagem");
    mensagem.textContent = texto;
    mensagem.style.color = cor;
}

function adicionarAmigo() {
    let nome = document.getElementById("amigo").value.trim();
    
    if (nome === "") {
        exibirMensagem("Por favor, insira um nome válido.");
        return;
    }

    if (amigos.includes(nome)) {
        exibirMensagem("Este nome já foi adicionado.");
        return;
    }

    amigos.push(nome);
    atualizarLista();
    exibirMensagem("Amigo adicionado com sucesso!", "green");
    document.getElementById("amigo").value = ""; 
}

function atualizarLista() {
    const lista = document.getElementById("listaAmigos");
    lista.innerHTML = "";

    amigos.forEach((nome, index) => {
        const li = document.createElement("li");
        li.innerHTML = `${nome} <button onclick="removerAmigo(${index})">❌</button>`;
        lista.appendChild(li);
    });
}

function removerAmigo(index) {
    amigos.splice(index, 1);
    atualizarLista();
}

function sortearAmigo() {
    if (amigos.length < 2) {
        exibirMensagem("Adicione pelo menos 2 participantes.");
        return;
    }

    let sorteio = [...amigos];
    let resultado = {};

    for (let i = 0; i < amigos.length; i++) {
        let disponiveis = sorteio.filter(nome => nome !== amigos[i]);

        if (disponiveis.length === 0) {
            exibirMensagem("Erro no sorteio, tente novamente!");
            return;
        }

        let sorteado = disponiveis[Math.floor(Math.random() * disponiveis.length)];
        resultado[amigos[i]] = sorteado;
        sorteio = sorteio.filter(nome => nome !== sorteado);
    }

    exibirResultado(resultado);
}

function exibirResultado(resultado) {
    const resultadoDiv = document.getElementById("resultado");
    resultadoDiv.innerHTML = "<strong>Parabéns! O sorteio foi realizado:</strong>";

    let listaResultados = "<ul>";
    for (let pessoa in resultado) {
        listaResultados += `<li>${pessoa} ➡️ ${resultado[pessoa]}</li>`;
    }
    listaResultados += "</ul>";

    resultadoDiv.innerHTML = listaResultados;
}

function reiniciarLista() {
    amigos.length = 0;
    atualizarLista();
    document.getElementById("resultado").innerHTML = "";
    exibirMensagem("Lista reiniciada.", "black");
}
