// Produtos iniciais (Base do seed.py)
const PRODUTOS_BASE = [
    {
        id: 1,
        nome: "Guia de Oxalá",
        preco: 45.90,
        descricao: "Confeccionada com miçangas de vidro branco leitoso, 1 fio.",
        categoria: "Guia de Orixá",
        imagem_url: "https://via.placeholder.com/300",
        status: "disponivel"
    },
    {
        id: 2,
        nome: "Guia de Ogum",
        preco: 45.90,
        descricao: "Confeccionada com miçangas azul marinho de alta qualidade.",
        categoria: "Guia de Orixá",
        imagem_url: "https://via.placeholder.com/300",
        status: "disponivel"
    }
];

// Função para obter todos os produtos (Base + Adicionados pelo Admin)
function obterProdutos() {
    const adicionados = JSON.parse(localStorage.getItem('produtos_extras')) || [];
    return [...PRODUTOS_BASE, ...adicionados];
}

// Função para salvar novo produto
function salvarNovoProduto(produto) {
    const adicionados = JSON.parse(localStorage.getItem('produtos_extras')) || [];
    produto.id = Date.now(); // Gera ID único baseado no timestamp
    adicionados.push(produto);
    localStorage.setItem('produtos_extras', JSON.stringify(adicionados));
}