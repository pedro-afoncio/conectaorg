function inicializarDados() {
  if (localStorage.getItem("necessidades") === null) {
    localStorage.setItem("necessidades", JSON.stringify([
      { id: 1, item: "Alimentos não perecíveis", categoria: "Alimentação", quantidade: 50, unidade: "kg", urgencia: "alta" },
      { id: 2, item: "Agasalhos e cobertores", categoria: "Vestuário", quantidade: 100, unidade: "peças", urgencia: "alta" },
      { id: 3, item: "Cadernos e lápis", categoria: "Material escolar", quantidade: 30, unidade: "unidades", urgencia: "media" },
      { id: 4, item: "Kits de higiene pessoal", categoria: "Higiene", quantidade: 80, unidade: "kits", urgencia: "alta" },
      { id: 5, item: "Água potável mineral", categoria: "Alimentação", quantidade: 200, unidade: "fardos", urgencia: "alta" }
    ]));
  }

  if (localStorage.getItem("campanhas") === null) {
    localStorage.setItem("campanhas", JSON.stringify([
      { id: 1, titulo: "SOS Enchentes e Inundações", tipo: "Calamidade / Emergência", orgao: "Defesa Civil", descricao: "Socorro emergencial às famílias desabrigadas por temporais e inundações. Necessidade urgente de água potável, colchões e alimentos.", regiao: "Vale do Taquari, RS", urgencia: "alta", status: "Ativa", meta: "5.000 kits", arrecadado: "3.420 kits", dt_criacao: "2026-10-01", dt_limite: "2026-12-31" },
      { id: 2, titulo: "Socorro Deslizamentos de Encostas", tipo: "Calamidade / Emergência", orgao: "Defesa Civil", descricao: "Acolhimento de moradores evacuados de áreas de alto risco de encostas e deslizamentos de terra.", regiao: "Litoral Norte, SP", urgencia: "alta", status: "Ativa", meta: "2.500 cestas", arrecadado: "1.890 cestas", dt_criacao: "2026-10-10", dt_limite: "2026-12-20" },
      { id: 3, titulo: "Campanha do Agasalho e Inverno Solidário", tipo: "Comunitária", orgao: "ONG Mãos Solidárias", descricao: "Arrecadação de agasalhos, cobertores e calçados quentes para pessoas em situação de rua.", regiao: "Curitiba, PR", urgencia: "media", status: "Ativa", meta: "1.200 peças", arrecadado: "850 peças", dt_criacao: "2026-09-15", dt_limite: "2026-12-31" },
      { id: 4, titulo: "Apoio a Vítimas de Estiagem e Seca", tipo: "Calamidade / Emergência", orgao: "Defesa Civil", descricao: "Envio emergencial de reservatórios e caminhões-pipa para comunidades atingidas pela seca severa.", regiao: "Semiárido, BA", urgencia: "alta", status: "Ativa", meta: "10.000 galões", arrecadado: "6.700 galões", dt_criacao: "2026-10-05", dt_limite: "2026-12-15" }
    ]));
  }

  if (localStorage.getItem("doacoes") === null) {
    localStorage.setItem("doacoes", JSON.stringify([
      { id: 101, doador: "João Silva", email: "joao.silva@email.com", ong: "ONG Mãos Solidárias", itens: "Alimentos não perecíveis (15 kg), Cobertores (3 unidades)", ponto: "Rua das Flores, 123 · Centro · Curitiba, PR", dt_doacao: "20/10/2026", status: "Pendente de entrega", observacao: "Entrega agendada para sábado de manhã." },
      { id: 102, doador: "Maria Oliveira", email: "maria.oliveira@email.com", ong: "Defesa Civil - SOS Enchentes", itens: "Água potável (10 fardos), Kits de higiene (5 unidades)", ponto: "Centro Esportivo Comunitário · Vale do Taquari, RS", dt_doacao: "19/10/2026", status: "Pendente de entrega", observacao: "Kits embalados com sabonetes e escovas." },
      { id: 103, doador: "Pedro Souza", email: "pedro.souza@email.com", ong: "Instituto de Educação Infantil", itens: "Cadernos (20 unidades), Lápis de cor (10 caixas)", ponto: "Av. Brasil, 450 · Rio de Janeiro, RJ", dt_doacao: "18/10/2026", status: "Recebida pela ONG", observacao: "Entregue diretamente na secretaria." },
      { id: 104, doador: "João Silva", email: "joao.silva@email.com", ong: "ONG Esperança", itens: "Agasalhos de inverno (8 peças)", ponto: "Rua da Paz, 88 · Recife, PE", dt_doacao: "10/10/2026", status: "Recebida pela ONG", observacao: "Peças higienizadas e dobradas." }
    ]));
  }

  if (localStorage.getItem("alertas") === null) {
    localStorage.setItem("alertas", JSON.stringify([
      { id: 1, regiao: "Vale do Taquari, RS", tipo: "Enchente e Inundação Gradual", nivel: "vermelho", urgenciaTexto: "Alerta Máximo", familias: 1800, data: "23/11/2026", medida: "Evacuação das margens do rio e acolhimento nos ginásios municipais." },
      { id: 2, regiao: "Litoral Norte, SP", tipo: "Risco Alto de Deslizamento de Encosta", nivel: "vermelho", urgenciaTexto: "Alerta Máximo", familias: 950, data: "22/11/2026", medida: "Monitoramento por pluviômetros e interdição preventiva de moradias." },
      { id: 3, regiao: "Semiárido, BA", tipo: "Estiagem e Seca Severa", nivel: "laranja", urgenciaTexto: "Alerta Alto", familias: 3200, data: "20/11/2026", medida: "Abastecimento emergencial por caminhões-pipa e reservatórios comunitários." },
      { id: 4, regiao: "Pantanal, MS", tipo: "Incêndio Florestal em Vegetação", nivel: "laranja", urgenciaTexto: "Alerta Alto", familias: 420, data: "18/11/2026", medida: "Brigadas em campo e distribuição de máscaras de proteção respiratória." }
    ]));
  }

  if (localStorage.getItem("organizacoes") === null) {
    localStorage.setItem("organizacoes", JSON.stringify([
      { id: 1, razao_social: "ONG Esperança", tipo: "ONG", cnpj: "12.345.678/0001-90", endereco: "Rua da Paz, 88 · Recife, PE", telefone: "(81) 98765-4321", email: "contato@ongesperanca.org", descricao: "Apoio humanitário a crianças e comunidades em vulnerabilidade.", verificada: false },
      { id: 2, razao_social: "ONG Amigos dos Animais", tipo: "ONG", cnpj: "98.765.432/0001-10", endereco: "Rua dos Bichos, 200 · São Paulo, SP", telefone: "(11) 97777-8888", email: "resgate@amigosanimais.org", descricao: "Resgate e acolhimento de animais abandonados.", verificada: true },
      { id: 3, razao_social: "ONG Mãos Solidárias", tipo: "ONG", cnpj: "45.678.912/0001-33", endereco: "Rua das Flores, 123 · Curitiba, PR", telefone: "(41) 99123-4567", email: "contato@maossolidarias.org.br", descricao: "Distribuição de alimentos e roupas para famílias em vulnerabilidade.", verificada: true }
    ]));
  }

  if (localStorage.getItem("usuariosLista") === null) {
    localStorage.setItem("usuariosLista", JSON.stringify([
      { id: 1, nome: "Coordenação Regional de Proteção e Defesa Civil", email: "defesacivil@defesacivil.gov.br", perfil: "Defesa Civil", dt_cadastro: "15/08/2026", status: "Ativo" },
      { id: 2, nome: "João Silva", email: "joao.silva@email.com", perfil: "Doador", dt_cadastro: "02/06/2026", status: "Ativo" },
      { id: 3, nome: "Maria Oliveira", email: "maria.oliveira@email.com", perfil: "Doador", dt_cadastro: "14/07/2026", status: "Ativo" },
      { id: 4, nome: "Equipe ONG Mãos Solidárias", email: "contato@maossolidarias.org.br", perfil: "ONG", dt_cadastro: "03/08/2026", status: "Ativo" },
      { id: 5, nome: "Carlos Pereira", email: "carlos.pereira@email.com", perfil: "Doador", dt_cadastro: "09/10/2026", status: "Pendente" }
    ]));
  }
}

inicializarDados();
