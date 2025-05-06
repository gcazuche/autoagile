// Dados de exemplo para simulação
const vendas = [
  { nome: 'Jan', valor: 12400 },
  { nome: 'Fev', valor: 15600 },
  { nome: 'Mar', valor: 18900 },
  { nome: 'Abr', valor: 17800 },
  { nome: 'Mai', valor: 20100 },
];

const servicosRealizados = [
  { nome: 'Revisão', quantidade: 145 },
  { nome: 'Reparos Motor', quantidade: 87 },
  { nome: 'Pintura', quantidade: 56 },
  { nome: 'Suspensão', quantidade: 78 },
  { nome: 'Ar-Condicionado', quantidade: 43 },
  { nome: 'Borracharia', quantidade: 91 },
];

const produtosMaisVendidos = [
  { nome: 'Óleo de Motor', valor: 8500 },
  { nome: 'Filtro de Ar', valor: 6200 },
  { nome: 'Pastilhas de Freio', valor: 7800 },
  { nome: 'Bateria', valor: 9400 },
  { nome: 'Pneus', valor: 15600 },
];

const estoqueAlerta = [
  { id: 1, produto: 'Filtro de Óleo', quantidade: 5, minimo: 10 },
  { id: 2, produto: 'Vela de Ignição', quantidade: 8, minimo: 15 },
  { id: 3, produto: 'Fluido de Freio', quantidade: 3, minimo: 8 },
  { id: 4, produto: 'Correia Dentada', quantidade: 4, minimo: 6 },
];

// Dados para estoque
const produtosEstoque = [
  { id: 1, codigo: 'P001', produto: 'Óleo de Motor 5W30', quantidade: 45, preco: 39.90, categoria: 'Lubrificantes' },
  { id: 2, codigo: 'P002', produto: 'Filtro de Ar HB20', quantidade: 32, preco: 29.90, categoria: 'Filtros' },
  { id: 3, codigo: 'P003', produto: 'Pastilha de Freio Gol G6', quantidade: 28, preco: 89.90, categoria: 'Freios' },
  { id: 4, codigo: 'P004', produto: 'Bateria 60Ah', quantidade: 15, preco: 349.90, categoria: 'Elétrica' },
  { id: 5, codigo: 'P005', produto: 'Pneu 185/65 R15', quantidade: 24, preco: 289.90, categoria: 'Pneus' },
  { id: 6, codigo: 'P006', produto: 'Filtro de Óleo Corolla', quantidade: 18, preco: 24.90, categoria: 'Filtros' },
  { id: 7, codigo: 'P007', produto: 'Fluido de Freio DOT4', quantidade: 12, preco: 28.90, categoria: 'Lubrificantes' },
  { id: 8, codigo: 'P008', produto: 'Vela de Ignição', quantidade: 8, preco: 19.90, categoria: 'Ignição' },
  { id: 9, codigo: 'P009', produto: 'Correia Dentada Uno', quantidade: 4, preco: 79.90, categoria: 'Correias' },
  { id: 10, codigo: 'P010', produto: 'Amortecedor Dianteiro Palio', quantidade: 10, preco: 189.90, categoria: 'Suspensão' },
];

// Dados para agendamentos
const agendamentos = [
  { id: 1, cliente: 'Carlos Silva', veiculo: 'Honda Civic 2018', servico: 'Revisão Completa', data: '05/05/2025', hora: '09:00', status: 'Confirmado' },
  { id: 2, cliente: 'Ana Oliveira', veiculo: 'Fiat Argo 2020', servico: 'Troca de Óleo', data: '05/05/2025', hora: '10:30', status: 'Confirmado' },
  { id: 3, cliente: 'Roberto Almeida', veiculo: 'VW Golf 2019', servico: 'Alinhamento e Balanceamento', data: '05/05/2025', hora: '14:00', status: 'Aguardando' },
  { id: 4, cliente: 'Juliana Costa', veiculo: 'Jeep Compass 2021', servico: 'Ar-Condicionado', data: '06/05/2025', hora: '11:00', status: 'Confirmado' },
  { id: 5, cliente: 'Marcos Pereira', veiculo: 'Toyota Corolla 2022', servico: 'Troca de Pastilhas', data: '06/05/2025', hora: '15:30', status: 'Aguardando' },
];

// Variáveis de estado
let activeTab = 'dashboard';
let searchTerm = '';
let filteredProdutos = [...produtosEstoque];
const usuario = {
  nome: 'João Maciel',
  cargo: 'CEO',
  avatar: 'https://placehold.co/40x40/3B82F6/FFF?text=JM'
};

// Funções para manipulação da interface
document.addEventListener('DOMContentLoaded', function() {
  // Configuração inicial da interface
  setupEventListeners();
  
  // Preencher os dados do usuário
  document.querySelector('.user-name').textContent = usuario.nome;
  document.querySelector('.user-role').textContent = usuario.cargo;
  
  // Corrigido: definição correta do avatar
  const avatarElement = document.querySelector('.avatar');
  if (avatarElement) {
    avatarElement.src = usuario.avatar;
  }
  
  // Inicializar a tab ativa
  setActiveTab('dashboard');
});

function setupEventListeners() {
  // Listeners para navegação entre abas
  const tabButtons = document.querySelectorAll('.tab-button');
  tabButtons.forEach(button => {
    button.addEventListener('click', function() {
      // Extrair o nome da tab do ID do botão (remover o sufixo -tab)
      const tabId = this.id;
      if (tabId) {
        const tabName = tabId.replace('-tab', '');
        setActiveTab(tabName);
      }
    });
  });


  // Listener para campo de busca
  const searchInput = document.getElementById('search-input');
  if (searchInput) {
    searchInput.addEventListener('input', function() {
      searchTerm = this.value;
      filterProducts();
    });
  }
}

function setActiveTab(tabName) {
  activeTab = tabName;
  
  // Atualizar classe ativa nos botões do menu
  const tabButtons = document.querySelectorAll('.tab-button');
  tabButtons.forEach(button => {
    if (button.id === tabName + '-tab') {
      button.classList.add('active');
    } else {
      button.classList.remove('active');
    }
  });
  
  // Atualizar título da página
  const pageTitle = document.getElementById('page-title');
  if (pageTitle) {
    if (tabName === 'dashboard') pageTitle.textContent = 'Dashboard';
    if (tabName === 'estoque') pageTitle.textContent = 'Controle de Estoque';
    if (tabName === 'agendamentos') pageTitle.textContent = 'Agendamentos de Serviços';
    if (tabName === 'clientes') pageTitle.textContent = 'Gerenciamento de Clientes';
    if (tabName === 'vendas') pageTitle.textContent = 'Registro de Vendas';
    if (tabName === 'fornecedores') pageTitle.textContent = 'Fornecedores';
  }
  
  // Mostrar a aba correta
  const tabContainers = document.querySelectorAll('.tab-content');
  tabContainers.forEach(container => {
    if (container.id === tabName + '-content') {
      container.classList.add('active');
    } else {
      container.classList.remove('active');
    }
  });
  
  // Renderizar o conteúdo apropriado
  if (tabName === 'dashboard') renderDashboard();
  if (tabName === 'estoque') renderEstoque();
  if (tabName === 'agendamentos') renderAgendamentos();
  
  // Configurar botões de ação específicos para cada aba
  setupActionButtons(tabName);
}

function filterProducts() {
  filteredProdutos = produtosEstoque.filter(produto => 
    produto.produto.toLowerCase().includes(searchTerm.toLowerCase()) ||
    produto.codigo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    produto.categoria.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  if (activeTab === 'estoque') {
    renderEstoque();
  }
}

function setupActionButtons(tabName) {
  // Remover eventos antigos
  const allActionButtons = document.querySelectorAll('.action-button');
  allActionButtons.forEach(button => {
    // Clone e substitui o elemento para remover todos os event listeners
    const newButton = button.cloneNode(true);
    if (button.parentNode) {
      button.parentNode.replaceChild(newButton, button);
    }
  });
  
  // Configurar botões de acordo com a aba ativa
  if (tabName === 'estoque') {
    const addProdutoBtn = document.querySelector('.content-card .action-button.add');
    if (addProdutoBtn) {
      addProdutoBtn.addEventListener('click', function() {
        alert('Funcionalidade de adicionar produto em desenvolvimento');
      });
    }
    
    const gerarRelatorioBtn = document.querySelector('.content-card .action-button.report');
    if (gerarRelatorioBtn) {
      gerarRelatorioBtn.addEventListener('click', function() {
        alert('Funcionalidade de gerar relatório em desenvolvimento');
      });
    }
  }
  
  if (tabName === 'agendamentos') {
    const addAgendamentoBtn = document.querySelector('.content-card .action-button.add');
    if (addAgendamentoBtn) {
      addAgendamentoBtn.addEventListener('click', function() {
        alert('Funcionalidade de adicionar agendamento em desenvolvimento');
      });
    }
    
    const verCalendarioBtn = document.querySelector('.content-card .action-button.calendar');
    if (verCalendarioBtn) {
      verCalendarioBtn.addEventListener('click', function() {
        alert('Funcionalidade de visualizar calendário em desenvolvimento');
      });
    }
  }
}

// Funções para renderizar conteúdo
function renderDashboard() {
  // Renderizar gráficos
  renderVendasChart();
  renderProdutosChart();
  renderServicosChart();
  
  // Renderizar tabela de estoque em alerta
  renderEstoqueAlertaTable();
}

function renderEstoque() {
  const estoqueTable = document.getElementById('estoque-table');
  if (!estoqueTable) return;
  
  const tableBody = estoqueTable.querySelector('tbody');
  if (!tableBody) return;
  
  // Limpar tabela
  tableBody.innerHTML = '';
  
  // Preencher com produtos filtrados
  filteredProdutos.forEach(produto => {
    const row = document.createElement('tr');
    
    // Definir classe para indicador de quantidade
    let quantidadeClass = 'status-ok';
    if (produto.quantidade <= 5) {
      quantidadeClass = 'status-critical';
    } else if (produto.quantidade <= 10) {
      quantidadeClass = 'status-warning';
    }
    
    row.innerHTML = `
      <td>${produto.codigo}</td>
      <td>${produto.produto}</td>
      <td>${produto.categoria}</td>
      <td class="quantity-cell">
        <span class="status-tag ${quantidadeClass}">
          ${produto.quantidade}
        </span>
      </td>
      <td class="price-cell">R$ ${produto.preco.toFixed(2)}</td>
      <td class="actions-cell">
        <div class="action-links">
          <a class="action-link action-edit" data-id="${produto.id}">
            Editar
          </a>
          <a class="action-link action-delete" data-id="${produto.id}">
            Excluir
          </a>
        </div>
      </td>
    `;
    
    tableBody.appendChild(row);
  });
  
  // Adicionar listeners para botões de ação
  setupTableActionButtons();
}

function renderAgendamentos() {
  const agendamentosTable = document.getElementById('agendamentos-table');
  if (!agendamentosTable) return;
  
  const tableBody = agendamentosTable.querySelector('tbody');
  if (!tableBody) return;
  
  // Limpar tabela
  tableBody.innerHTML = '';
  
  // Preencher com agendamentos
  agendamentos.forEach(agendamento => {
    const row = document.createElement('tr');
    
    // Definir classe para indicador de status
    let statusClass = 'status-confirmed';
    if (agendamento.status === 'Aguardando') {
      statusClass = 'status-waiting';
    } else if (agendamento.status === 'Cancelado') {
      statusClass = 'status-critical';
    }
    
    row.innerHTML = `
      <td>${agendamento.cliente}</td>
      <td>${agendamento.veiculo}</td>
      <td>${agendamento.servico}</td>
      <td class="quantity-cell">${agendamento.data}</td>
      <td class="quantity-cell">${agendamento.hora}</td>
      <td class="quantity-cell">
        <span class="status-tag ${statusClass}">
          ${agendamento.status}
        </span>
      </td>
      <td class="actions-cell">
        <div class="action-links">
          <a class="action-link action-edit" data-id="${agendamento.id}">
            Editar
          </a>
          <a class="action-link action-cancel" data-id="${agendamento.id}">
            Cancelar
          </a>
        </div>
      </td>
    `;
    
    tableBody.appendChild(row);
  });
  
  // Adicionar listeners para botões de ação
  setupTableActionButtons();
}

function setupTableActionButtons() {
  // Adicionar listeners para botões de ação nas tabelas
  const editButtons = document.querySelectorAll('.action-edit');
  editButtons.forEach(button => {
    button.addEventListener('click', function() {
      const id = this.getAttribute('data-id');
      if (activeTab === 'estoque') {
        alert(`Editar produto ID: ${id}`);
      } else if (activeTab === 'agendamentos') {
        alert(`Editar agendamento ID: ${id}`);
      }
    });
  });
  
  const deleteButtons = document.querySelectorAll('.action-delete');
  deleteButtons.forEach(button => {
    button.addEventListener('click', function() {
      const id = this.getAttribute('data-id');
      alert(`Excluir produto ID: ${id}`);
    });
  });
  
  const cancelButtons = document.querySelectorAll('.action-cancel');
  cancelButtons.forEach(button => {
    button.addEventListener('click', function() {
      const id = this.getAttribute('data-id');
      alert(`Cancelar agendamento ID: ${id}`);
    });
  });
}

function renderEstoqueAlertaTable() {
  const tableBody = document.querySelector('#low-stock-table tbody');
  if (!tableBody) return;
  
  // Limpar tabela
  tableBody.innerHTML = '';
  
  // Preencher com produtos em alerta
  estoqueAlerta.forEach(item => {
    const row = document.createElement('tr');
    
    row.innerHTML = `
      <td>${item.produto}</td>
      <td class="quantity-cell">${item.quantidade}</td>
      <td class="quantity-cell">${item.minimo}</td>
      <td class="price-cell">
        <span class="status-tag status-critical">
          Estoque Crítico
        </span>
      </td>
    `;
    
    tableBody.appendChild(row);
  });
}

// Funções para renderizar gráficos
function renderVendasChart() {
  const chartContainer = document.getElementById('sales-chart');
  if (!chartContainer) return;
  
  // Verificar se a biblioteca Chart.js está disponível
  if (typeof Chart === 'undefined') {
    console.error('Chart.js não está disponível');
    return;
  }
  
  // Garantir que o canvas tenha um contexto 2D
  if (!chartContainer.getContext) {
    // Criar um novo canvas se o elemento não for um canvas
    const canvas = document.createElement('canvas');
    canvas.id = 'sales-chart-canvas';
    chartContainer.innerHTML = '';
    chartContainer.appendChild(canvas);
    chartContainer = canvas;
  }
  
  const ctx = chartContainer.getContext('2d');
  
  // Verificar se já existe um gráfico
  if (window.vendasChart) {
    window.vendasChart.destroy();
  }
  
  window.vendasChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: vendas.map(item => item.nome),
      datasets: [{
        label: 'Vendas',
        data: vendas.map(item => item.valor),
        borderColor: '#3B82F6',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        borderWidth: 2,
        tension: 0.1
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        tooltip: {
          callbacks: {
            label: function(context) {
              return `R$ ${context.raw.toFixed(2)}`;
            }
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            callback: function(value) {
              return 'R$ ' + value;
            }
          }
        }
      }
    }
  });
}

function renderProdutosChart() {
  const chartContainer = document.getElementById('products-chart');
  if (!chartContainer) return;
  
  // Verificar se a biblioteca Chart.js está disponível
  if (typeof Chart === 'undefined') {
    console.error('Chart.js não está disponível');
    return;
  }
  
  // Garantir que o canvas tenha um contexto 2D
  if (!chartContainer.getContext) {
    // Criar um novo canvas se o elemento não for um canvas
    const canvas = document.createElement('canvas');
    canvas.id = 'products-chart-canvas';
    chartContainer.innerHTML = '';
    chartContainer.appendChild(canvas);
    chartContainer = canvas;
  }
  
  const ctx = chartContainer.getContext('2d');
  
  // Verificar se já existe um gráfico
  if (window.produtosChart) {
    window.produtosChart.destroy();
  }
  
  window.produtosChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: produtosMaisVendidos.map(item => item.nome),
      datasets: [{
        label: 'Valor',
        data: produtosMaisVendidos.map(item => item.valor),
        backgroundColor: '#10B981',
        borderWidth: 0
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        tooltip: {
          callbacks: {
            label: function(context) {
              return `R$ ${context.raw.toFixed(2)}`;
            }
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            callback: function(value) {
              return 'R$ ' + value;
            }
          }
        }
      }
    }
  });
}

function renderServicosChart() {
  const chartContainer = document.getElementById('services-chart');
  if (!chartContainer) return;
  
  // Verificar se a biblioteca Chart.js está disponível
  if (typeof Chart === 'undefined') {
    console.error('Chart.js não está disponível');
    return;
  }
  
  // Garantir que o canvas tenha um contexto 2D
  if (!chartContainer.getContext) {
    // Criar um novo canvas se o elemento não for um canvas
    const canvas = document.createElement('canvas');
    canvas.id = 'services-chart-canvas';
    chartContainer.innerHTML = '';
    chartContainer.appendChild(canvas);
    chartContainer = canvas;
  }
  
  const ctx = chartContainer.getContext('2d');
  
  // Verificar se já existe um gráfico
  if (window.servicosChart) {
    window.servicosChart.destroy();
  }
  
  // Cores para diferentes serviços
  const backgroundColors = [
    '#3B82F6', '#10B981', '#F59E0B', '#8B5CF6', '#EC4899', '#EF4444'
  ];
  
  window.servicosChart = new Chart(ctx, {
    type: 'pie',
    data: {
      labels: servicosRealizados.map(item => item.nome),
      datasets: [{
        data: servicosRealizados.map(item => item.quantidade),
        backgroundColor: backgroundColors
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        tooltip: {
          callbacks: {
            label: function(context) {
              return `${context.label}: ${context.raw} serviços`;
            }
          }
        }
      }
    }
  });
}