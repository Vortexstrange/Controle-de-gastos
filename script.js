const CATEGORIAS = [
    "Alimentação",
    "Transporte",
    "Moradia",
    "Lazer",
    "Saúde",
    "Educação",
    "Outros"
];

const CHAVE_STORAGE = "controle-gastos:v1";

const formatadorMoeda = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL"
});

const form = document.getElementById("form-gasto");
const campoDescricao = document.getElementById("descricao");
const campoValor = document.getElementById("valor");
const campoData = document.getElementById("data");
const campoCategoria = document.getElementById("categoria");
const campoFiltro = document.getElementById("filtro");
const listaGastos = document.getElementById("lista-gastos");
const listaResumo = document.getElementById("resumo");
const elTotal = document.getElementById("total");
const elErro = document.getElementById("erro");
const elVazio = document.getElementById("vazio");

let gastos = carregarGastos();

function carregarGastos() {
    try {
        const dados = localStorage.getItem(CHAVE_STORAGE);

        return dados ? JSON.parse(dados) : [];
    } catch (error) {
        console.error("Erro ao carregar os gastos:", error);
        return [];
    }
}

function salvarGastos() {
    localStorage.setItem(CHAVE_STORAGE, JSON.stringify(gastos));
}

function hoje() {
    return new Date().toLocaleDateString("sv-SE");
}

function formatarData(dataISO) {
    const [ano, mes, dia] = dataISO.split("-");

    return `${dia}/${mes}/${ano}`;
}

function mostrarErro(mensagem) {
    elErro.textContent = mensagem;
}

function preencherCategorias() {
    CATEGORIAS.forEach((categoria) => {
        campoCategoria.add(new Option(categoria, categoria));
        campoFiltro.add(new Option(categoria, categoria));
    });
}

function adicionarGasto(evento) {
    evento.preventDefault();

    const descricao = campoDescricao.value.trim();
    const valor = parseFloat(campoValor.value);
    const data = campoData.value;
    const categoria = campoCategoria.value;

    if (!descricao) {
        return mostrarErro("Informe uma descrição.");
    }

    if (Number.isNaN(valor) || valor <= 0) {
        return mostrarErro("Informe um valor válido.");
    }

    if (!data) {
        return mostrarErro("Informe a data.");
    }

    const novoGasto = {
        id: Date.now(),
        descricao: descricao,
        valor: valor,
        categoria: categoria,
        data: data
    };

    gastos.push(novoGasto);

    salvarGastos();

    mostrarErro("");

    form.reset();

    campoData.value = hoje();

    render();
}

function removerGasto(id) {
    gastos = gastos.filter((gasto) => gasto.id !== id);

    salvarGastos();

    render();
}

function criarItem(gasto) {
    const li = document.createElement("li");
    li.className = "gasto";

    const info = document.createElement("div");
    info.className = "gasto-info";

    const titulo = document.createElement("strong");
    titulo.textContent = gasto.descricao;

    const detalhe = document.createElement("small");
    detalhe.textContent = `${gasto.categoria} | ${formatarData(gasto.data)}`;

    info.append(titulo, detalhe);

    const valor = document.createElement("span");
    valor.className = "gasto-valor";
    valor.textContent = formatadorMoeda.format(gasto.valor);

    const botao = document.createElement("button");

    botao.type = "button";
    botao.className = "btn-remover";
    botao.textContent = "Excluir";
    botao.setAttribute(
        "aria-label",
        `Excluir ${gasto.descricao}`
    );

    botao.addEventListener("click", () => {
        removerGasto(gasto.id);
    });

    li.append(info, valor, botao);

    return li;
}

function render() {
    const filtro = campoFiltro.value;

    const visiveis =
        filtro === "todas"
            ? gastos
            : gastos.filter((gasto) => gasto.categoria === filtro);

    const ordenados = [...visiveis].sort((a, b) =>
        b.data.localeCompare(a.data)
    );

    listaGastos.replaceChildren(
        ...ordenados.map(criarItem)
    );

    elVazio.hidden = ordenados.length > 0;

    const total = gastos.reduce(
        (soma, gasto) => soma + gasto.valor,
        0
    );

    elTotal.textContent = formatadorMoeda.format(total);

    renderResumo();
}

function renderResumo() {
    const porCategoria = {};

    gastos.forEach((gasto) => {
        porCategoria[gasto.categoria] =
            (porCategoria[gasto.categoria] || 0) + gasto.valor;
    });

    const itens = Object.entries(porCategoria).map(
        ([categoria, total]) => {
            const li = document.createElement("li");

            const nome = document.createElement("span");
            nome.textContent = categoria;

            const soma = document.createElement("strong");
            soma.textContent = formatadorMoeda.format(total);

            li.append(nome, soma);

            return li;
        }
    );

    listaResumo.replaceChildren(...itens);
}

preencherCategorias();

campoData.value = hoje();

form.addEventListener("submit", adicionarGasto);

campoFiltro.addEventListener("change", render);

render();