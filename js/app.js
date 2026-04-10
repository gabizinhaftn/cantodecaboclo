// Funções de Banco de Dados Local
function obterProdutos() {
    return JSON.parse(localStorage.getItem('fio_de_axe_db')) || [];
}

function renderizarProdutos() {
    const container = document.getElementById('grid-produtos');
    if (!container) return;
    
    const produtos = obterProdutos();
    container.innerHTML = produtos.map(p => `
        <div class="card-produto group cursor-pointer" onclick="window.location.href='detalhes.html?id=${p.id}'">
            <div class="relative overflow-hidden bg-stone-200 aspect-[3/4] mb-6 shadow-sm">
                <img src="${p.imagem_url}" class="w-full h-full object-cover group-hover:scale-110 transition duration-700">
            </div>
            <div class="text-center">
                <h3 class="text-sm font-bold uppercase tracking-widest mb-2">${p.nome}</h3>
                <p class="text-stone-400 text-xs mb-2">R$ ${parseFloat(p.preco).toFixed(2)}</p>
                <div class="w-8 h-[1px] bg-stone-200 mx-auto group-hover:w-20 transition-all"></div>
            </div>
        </div>
    `).join('');
}

// Lógica de Postagem com Upload Local
const formAdmin = document.getElementById('form-admin');
if (formAdmin) {
    formAdmin.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const fileInput = document.getElementById('foto_local');
        const file = fileInput.files[0];
        const reader = new FileReader();

        // Quando o navegador terminar de ler a imagem
        reader.onloadend = function() {
            const produtos = obterProdutos();
            const novo = {
                id: Date.now(),
                nome: document.getElementById('nome').value,
                preco: parseFloat(document.getElementById('preco').value),
                descricao: document.getElementById('descricao').value,
                imagem_url: reader.result // Aqui está a imagem convertida em texto (Base64)
            };
            
            produtos.push(novo);
            localStorage.setItem('fio_de_axe_db', JSON.stringify(produtos));
            
            alert('Guia publicada com sucesso no seu navegador!');
            window.location.href = 'index.html';
        };

        if (file) {
            reader.readAsDataURL(file); // Inicia a leitura do arquivo
        } else {
            alert("Por favor, selecione uma imagem.");
        }
    });
}

document.addEventListener('DOMContentLoaded', renderizarProdutos);