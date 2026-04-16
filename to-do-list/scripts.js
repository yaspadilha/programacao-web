let tarefaEditandoIndex = null;

// MODAL

function abrirModal() {
    document.getElementById("nome").value = "";
    document.getElementById("categoria").value = "Trabalho";
    document.getElementById("prioridade").value = "Alta";
    document.getElementById("prazo").value = "";
    document.getElementById("modal").style.display = "flex";
}

function fecharModal() {
    document.getElementById("modal").style.display = "none";
}

// TAREFAS

function cadastrarTarefa() {
    const nome = document.getElementById("nome").value;
    const categoria = document.getElementById("categoria").value;
    const prioridade = document.getElementById("prioridade").value;
    const prazo = document.getElementById("prazo").value;

    const novaTarefa = {
        nome,
        categoria,
        prioridade,
        prazo,
        feito: false
    }

    const tarefas = pegarTarefas();

    if (tarefaEditandoIndex !== null) {
        tarefas[tarefaEditandoIndex] = novaTarefa;
        tarefaEditandoIndex = null;
    } else {
        tarefas.push(novaTarefa);
    }

    salvarTarefas(tarefas);

    renderizarTarefas();
    alert('Tarefa cadastrada com sucesso!')
    fecharModal();
}

function pegarTarefas() {
    return JSON.parse(localStorage.getItem("tarefas")) || [];
}

function salvarTarefas(tarefas) {
    return localStorage.setItem("tarefas", JSON.stringify(tarefas))
}

function editarTarefa(index) {
    const tarefas = pegarTarefas();
    const tarefa = tarefas[index];

    document.getElementById("nome").value = tarefa.nome;
    document.getElementById("categoria").value = tarefa.categoria;
    document.getElementById("prioridade").value = tarefa.prioridade;
    document.getElementById("prazo").value = tarefa.prazo;

    tarefaEditandoIndex = index;

    document.getElementById("modal").style.display = "flex";
}

function deletarTarefa(index) {
    const tarefas = pegarTarefas();

    tarefas.splice(index, 1);
    salvarTarefas(tarefas);
    renderizarTarefas();
}

function concluirTarefa(index) {
    const tarefas = pegarTarefas();

    tarefas[index].feito = !tarefas[index].feito;

    salvarTarefas(tarefas);
    renderizarTarefas();
}

// FORMATACAO DA DATA

function formatarData(data) {
    return data.split('-').reverse().join('/');
}

// RENDERIZACAO 

function renderizarTarefas() {
    const tarefas = pegarTarefas();
    const tbody = document.getElementById("lista-tarefas");

    const filtroCategoria = document.getElementById("filtroCategoria").value;
    const filtroPrioridade = document.getElementById("filtroPrioridade").value;

    tbody.innerHTML = "";

    if (tarefas.length == 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="6">Nenhuma tarefa cadastrada.</td>
            </tr>
        `;
        return;
    }
    else {
        tarefas
            .filter((tarefa) => {
                return (
                    (filtroCategoria === "" || tarefa.categoria === filtroCategoria) &&
                    (filtroPrioridade === "" || tarefa.prioridade === filtroPrioridade)
                );
            })
            .forEach((tarefa, index) => {
                const linha = `
                <tr class="${tarefa.feito ? "concluida" : ""}">
                    <td>${tarefa.nome}</td>
                    <td>${tarefa.prioridade}</td>
                    <td>${tarefa.categoria}</td>
                    <td>${formatarData(tarefa.prazo)}</td>
                    <td>
                        <button class="btn-editar" onclick="editarTarefa(${index})">Editar</button>
                        <button class="btn-deletar" onclick="deletarTarefa(${index})">Deletar</button>
                    </td>
                    <td>
                        <input type="checkbox" 
                            ${tarefa.feito ? "checked" : ""} 
                            onclick="concluirTarefa(${index})"
                        >
                    </td>
                </tr>
            `;

                tbody.innerHTML += linha;
            });
    }
}

document.getElementById("filtroCategoria")
    .addEventListener("change", renderizarTarefas);

document.getElementById("filtroPrioridade")
    .addEventListener("change", renderizarTarefas);

renderizarTarefas();