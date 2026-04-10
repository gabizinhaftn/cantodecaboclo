// Gerenciamento do Carrinho no LocalStorage
let carrinho = JSON.parse(localStorage.getItem('carrinho_fio_de_axe')) || [];

function salvarCarrinho() {
    localStorage.setItem('carrinho_fio_de_axe', JSON.stringify(carrinho));
}

function adicionarAoCarrinho(id) {
    const produto = PRODUTOS.find(p => p.id === id);
    if (produto) {
        carrinho.push(produto);
        salvarCarrinho();
        alert(`${produto.nome} adicionado ao carrinho!`);
    }
}

function removerDoCarrinho(index) {
    carrinho.splice(index, 1);
    salvarCarrinho();
    location.reload();
}

function limparCarrinho() {
    localStorage.removeItem('carrinho_fio_de_axe');
    location.reload();
}

/** * ATUALIZAÇÃO: Lógica de Checkout com validação de usuário
 * Mantendo as funções acima intactas.
 */

function finalizarCompra() {
    // Busca o usuário logado no LocalStorage (definido no auth.js)
    const usuarioAtivo = JSON.parse(localStorage.getItem('fio_de_axe_cliente_ativo'));

    // 1. Validação de Login
    if (!usuarioAtivo || !usuarioAtivo.logado) {
        alert("Para concluir sua compra, por favor acesse sua conta ou cadastre-se.");
        window.location.href = 'login.html';
        return;
    }

    // 2. Validação de Carrinho Vazio
    if (carrinho.length === 0) {
        alert("Sua sacola está vazia!");
        return;
    }

    // 3. Preparação da Mensagem para WhatsApp
    const numeroWhatsApp = "5511913333917"; // Seu número configurado
    let total = 0;
    let itensTexto = "";

    carrinho.forEach((item, index) => {
        itensTexto += `${index + 1}. ${item.nome} - R$ ${parseFloat(item.preco).toFixed(2)}\n`;
        total += parseFloat(item.preco);
    });

    const mensagem = encodeURIComponent(
        `Olá! Me chamo ${usuarioAtivo.nome}.\n` +
        `Gostaria de finalizar meu pedido:\n\n` +
        `${itensTexto}\n` +
        `*Total: R$ ${total.toFixed(2)}*\n\n` +
        `Aguardo instruções para pagamento.`
    );

    // 4. Redirecionamento
    window.open(`https://wa.me/${numeroWhatsApp}?text=${mensagem}`, '_blank');
}