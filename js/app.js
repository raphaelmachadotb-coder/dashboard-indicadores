
const vendasMensais = {
  labels: ['Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set'],
  valores: [118000, 132500, 127800, 141200, 148900, 152000]
};


const vendasPorCanal = {
  labels: ['Loja Física', 'E-commerce', 'Marketplace', 'Atacado'],
  valores: [285000, 198400, 121600, 64500]
};


const brl = valor =>
  valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

function calcularKPIs() {
  const total = vendasMensais.valores.reduce((a, b) => a + b, 0);
  const meses = vendasMensais.valores.length;
  const media = total / meses;
  const ultimo = vendasMensais.valores[meses - 1];
  const anterior = vendasMensais.valores[meses - 2];
  const variacao = ((ultimo - anterior) / anterior) * 100;

  const kpis = [
    { titulo: 'Vendas Totais (6 meses)', valor: brl(total) },
    { titulo: 'Média Mensal', valor: brl(media) },
    {
      titulo: 'Último Mês',
      valor: brl(ultimo),
      variacao: `${variacao >= 0 ? '▲' : '▼'} ${Math.abs(variacao).toFixed(1)}% vs. mês anterior`,
      positiva: variacao >= 0
    },
    { titulo: 'Canal Líder', valor: 'Loja Física' }
  ];

  const container = document.getElementById('kpis');
  container.innerHTML = kpis.map(k => `
    <div class="kpi">
      <h3>${k.titulo}</h3>
      <div class="valor">${k.valor}</div>
      ${k.variacao ? `<div class="variacao ${k.positiva ? 'positiva' : 'negativa'}">${k.variacao}</div>` : ''}
    </div>
  `).join('');
}


function criarGraficoVendas() {
  new Chart(document.getElementById('graficoVendas'), {
    type: 'line',
    data: {
      labels: vendasMensais.labels,
      datasets: [{
        label: 'Vendas (R$)',
        data: vendasMensais.valores,
        borderColor: '#38bdf8',
        backgroundColor: 'rgba(56, 189, 248, 0.15)',
        fill: true,
        tension: 0.3
      }]
    },
    options: {
      plugins: { legend: { labels: { color: '#94a3b8' } } },
      scales: {
        x: { ticks: { color: '#94a3b8' }, grid: { color: '#1e293b' } },
        y: { ticks: { color: '#94a3b8' }, grid: { color: '#1e293b' } }
      }
    }
  });
}


function criarGraficoCanais() {
  new Chart(document.getElementById('graficoCanais'), {
    type: 'doughnut',
    data: {
      labels: vendasPorCanal.labels,
      datasets: [{
        data: vendasPorCanal.valores,
        backgroundColor: ['#38bdf8', '#4ade80', '#fbbf24', '#f87171']
      }]
    },
    options: {
      plugins: { legend: { labels: { color: '#94a3b8' } } }
    }
  });
}

calcularKPIs();
criarGraficoVendas();
criarGraficoCanais();
