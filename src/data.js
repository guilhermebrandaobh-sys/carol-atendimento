// ─────────────────────────────────────────────
// FLUXO BASE — lógica comum a todos os públicos
// Cada público sobrescreve apenas o que é diferente
// ─────────────────────────────────────────────

export const BASE_FLOW = {
  enderecoExterno: {
    id: 'end_externo',
    label: 'Se optar por domicílio — solicitar endereço',
    text: `Para a Taís levar toda a estrutura de beleza e iluminação até você, preciso do seu *endereço completo* (rua, número, bairro e cidade) para calcular o valor do deslocamento, combinado?

Assim que você me enviar, já monto o orçamento completo.`,
    tip: 'Deslocamento a partir de R$ 60. Nunca informar o valor antes de ter o endereço.'
  },
  followUp1: {
    id: 'fu1',
    label: 'Follow-up 1 — 24h (sem resposta à proposta)',
    text: `Oi, [Nome]! Passando para saber se você conseguiu ver a proposta e se ficou com alguma dúvida. 😊

Qual opção mais combinou com o que você imaginava?`
  },
  followUp2: {
    id: 'fu2',
    label: 'Follow-up 2 — 48h (escassez) · usar apenas 1x',
    badge: 'escassez',
    text: `[Nome], como tivemos outras consultas para o dia [Data] após o nosso contato, quis te avisar antes de liberar essa vaga.

Ainda faz sentido garantirmos a sua reserva? 🌸`,
    tip: 'Usar uma única vez por conversa. Escassez repetida perde credibilidade.'
  },
  semResposta24: {
    id: 'sr24',
    label: 'Sem resposta — 24h',
    text: `Oi, [Nome]! 😊 Fiquei na dúvida se surgiu algum detalhe ou dificuldade. Como a agenda da Taís tem bastante procura, queria garantir que você tenha prioridade. Qualquer coisa, estou por aqui!`
  },
  encerramento: {
    id: 'enc',
    label: 'Encerramento — 72h sem retorno',
    text: `Oi, [Nome]! Como não tivemos mais retorno, vou encerrar o atendimento por aqui — mas ficamos à disposição sempre que precisar. Será um prazer te atender! ✨`
  },
  fechouComOutro: {
    id: 'fco',
    label: 'Fechou com outro profissional',
    badge: 'alternativa',
    text: `Entendo perfeitamente, [Nome]! O mais importante é que você esteja segura e feliz com a sua escolha. 🤍

Desejamos que seja um dia absolutamente incrível. Estamos na torcida!

Vou deixar nosso contato salvo. Se precisar de produção para outro evento, será um prazer. ✨

Só para eu entender melhor: o que pesou mais na sua escolha? Orçamento, localização ou algum detalhe técnico? Esse retorno me ajuda muito. 😊`,
    tip: 'Coletar o motivo da perda é tão importante quanto fechar. Alimenta a melhoria contínua do funil.'
  }
}

// ─────────────────────────────────────────────
// SERVIÇOS
// ─────────────────────────────────────────────

export const SERVICES = {
  maquiagem: [
    { name: 'Maquiagem Social', price: 220, time: '60 min', highlight: true },
    { name: 'Maquiagem Express', price: 175, time: '30 min', highlight: true },
    { name: 'Maquiagem Noiva Civil', price: 250, time: '60 min' }
  ],
  cabelo: [
    { name: 'Finalização', price: 120, time: '60 min' },
    { name: 'Penteado Social', price: 190, time: '60 min' },
    { name: 'Escova', price: 100, time: '45 min' },
    { name: 'Ondas', price: 115, time: '50 min' },
    { name: 'Ondas Cacheado', price: 145, time: '55 min' },
    { name: 'Penteado Especial', price: 230, time: '75 min' }
  ],
  outros: [
    { name: 'Sobrancelhas', price: 80, time: '30 min' },
    { name: 'Produção Infantil (Make + Penteado)', price: 330, time: '60 min' },
    { name: 'Atendimento Externo (deslocamento)', price: null, priceText: 'A partir de R$ 60', time: 'por endereço', special: true }
  ],
  combos: [
    { name: 'Maquiagem Social + Penteado Social', price: 380, time: '120 min', highlight: true },
    { name: 'Maquiagem Social e Ondas', price: 310, time: '60 min', highlight: true },
    { name: 'Produção Noiva Civil (Make + Penteado)', price: 420, time: '60 min' },
    { name: 'Plano Noiva Experience', price: 1850, time: '300 min' }
  ],
  planos: [
    { name: 'Plano Essencial', price: 1300, time: '180 min', desc: 'Make + penteado. Sem teste ou assessoria.' },
    { name: 'Plano Noiva Experience', price: 1850, time: '240 min', desc: 'Inclui teste, assessoria para o "sim" e 2 reuniões.' },
    { name: 'Plano Royal', price: 3200, time: '360 min', desc: 'Tudo do Experience + domicílio + retoque + produção da mãe.', full: true }
  ]
}

// ─────────────────────────────────────────────
// SCRIPTS POR PÚBLICO
// ─────────────────────────────────────────────

export const PUBLICOS = [
  {
    id: 'noiva',
    label: 'Noiva',
    icon: '💍',
    color: 'rose',
    desc: 'Premium. Ciclo longo. Vínculo emocional antes do preço. Solicitar endereço se optar por domicílio.',
    steps: [
      {
        num: 1, title: 'Acolhimento inicial', sub: 'Data, local e horário',
        badges: ['abertura'],
        msgs: [
          {
            label: 'Mensagem',
            id: 'n1',
            text: `Olá, [Nome]! Que alegria receber seu contato. ✨

Sou a Carol e cuido do atendimento das noivas da *Taís Madureira*. É um prazer saber que você considera a nossa assinatura para um momento tão íntimo e especial.

Para verificar a disponibilidade e preparar uma proposta que respeite sua essência, me conta:

> Qual a *data* do casamento?
> Onde você pretende se arrumar (local do evento, hotel ou em casa)?
> Que *horário* precisa estar pronta e impecável?`
          }
        ]
      },
      {
        num: 2, title: 'Confirmar disponibilidade', sub: 'Espaço ou domicílio — endereço se externo',
        badges: ['dados'],
        msgs: [
          {
            label: 'Se optar pelo Espaço Tupi',
            id: 'n2a',
            text: `Ótimo, [Nome]! Tenho disponibilidade para essa data. 🌟

O trabalho da Taís vai muito além da maquiagem: é construir uma beleza que reflita sua essência e te deixe segura do primeiro brinde até o final da festa. A técnica de *Beleza Blindada* garante que você não precise se preocupar com nada — apenas viver cada momento sabendo que estará impecável. ✨

Vou te enviar nossa proposta completa agora!`
          },
          { ...BASE_FLOW.enderecoExterno }
        ]
      },
      {
        num: 3, title: 'Envio da proposta', sub: 'Planos Essencial / Experience / Royal',
        badges: ['proposta'],
        msgs: [
          {
            label: 'Mensagem',
            id: 'n3',
            text: `Conforme prometido, segue a nossa proposta, [Nome]. 💍

👉 [Link da Proposta personalizado]

Lá você encontra os 3 planos disponíveis e o que está incluso em cada experiência.

Dá uma olhadinha com calma e me conta: qual dos planos mais combinou com o que você imaginou para o seu dia? 🌸`
          }
        ]
      },
      {
        num: 4, title: 'Follow-up 1 — 24h', sub: 'Tirar dúvida, não cobrar',
        badges: ['follow-up'],
        msgs: [{ ...BASE_FLOW.followUp1, id: 'n4' }]
      },
      {
        num: 5, title: 'Follow-up 2 — 48h (escassez)', sub: 'Usar apenas uma vez',
        badges: ['escassez'],
        msgs: [{ ...BASE_FLOW.followUp2, id: 'n5' }]
      },
      {
        num: 6, title: 'Fechou com outro', sub: 'Saída elegante + coletar motivo',
        badges: ['alternativa'],
        msgs: [{ ...BASE_FLOW.fechouComOutro, id: 'n6' }]
      }
    ]
  },

  {
    id: 'civil',
    label: 'Noiva Civil',
    icon: '🤍',
    color: 'pink',
    desc: 'Evento íntimo, decisão rápida. Combo R$ 420 é o produto certo. Endereço antes do orçamento se domicílio.',
    steps: [
      {
        num: 1, title: 'Acolhimento + dados', sub: 'Data, horário e preferência de local',
        badges: ['abertura'],
        msgs: [
          {
            label: 'Mensagem',
            id: 'c1',
            text: `Olá, [Nome]! Que alegria receber seu contato. ✨

Sou a Carol, assistente da Taís Madureira. Um casamento civil é um momento lindo e merece uma produção à altura — mesmo que seja mais intimista!

Para verificar a disponibilidade:
> Qual a *data* do civil e que *horário* você precisa estar pronta?
> Você prefere vir ao nosso *Espaço* (bairro Tupi) ou prefere o atendimento *em domicílio*?`
          },
          { ...BASE_FLOW.enderecoExterno, id: 'c1b', label: 'Se domicílio — solicitar endereço' }
        ]
      },
      {
        num: 2, title: 'Proposta', sub: 'Combo civil R$ 420 como ancoragem principal',
        badges: ['proposta'],
        msgs: [
          {
            label: 'Espaço Tupi',
            id: 'c2a',
            text: `Tenho disponibilidade para a sua data. 😊

Para um casamento civil, o nosso combo mais completo é:

💄 *Produção Noiva Civil* (Maquiagem + Penteado)
Valor: *R$ 420,00*
💳 Sinal de reserva (30%): R$ 126,00

Garante a Beleza Blindada completa para você chegar impecável em cada foto. ✨

Ficou alguma dúvida ou posso já reservar o seu horário?`
          },
          {
            label: 'Domicílio — após receber endereço',
            id: 'c2b',
            text: `Perfeito! Calculei aqui o deslocamento até você.

*Resumo:*
💄 Produção Noiva Civil (Make + Penteado): R$ 420,00
🚗 Deslocamento: R$ [valor calculado]
Total: R$ [soma]
💳 Sinal (30%): R$ [valor do sinal]

Posso já reservar o seu horário? 🌸`
          }
        ]
      },
      {
        num: 3, title: 'Follow-up — 24h', sub: 'Verificar se viu, resolver objeção',
        badges: ['follow-up'],
        msgs: [
          {
            label: 'Mensagem',
            id: 'c3',
            text: `Oi, [Nome]! Passando para saber se você conseguiu ver a proposta. 😊

Como a agenda tem bastante procura, queria garantir que você tenha prioridade antes de a data ficar indisponível.

Ficou com alguma dúvida ou posso já reservar o seu horário?`
          }
        ]
      }
    ]
  },

  {
    id: 'debutante',
    label: 'Debutante',
    icon: '🎀',
    color: 'purple',
    desc: 'Decisão compartilhada mãe + filha. Festa longa — durabilidade é o argumento central. Perguntar sobre acompanhantes.',
    steps: [
      {
        num: 1, title: 'Acolhimento + dados', sub: 'Data, quantas pessoas e local',
        badges: ['abertura'],
        msgs: [
          {
            label: 'Mensagem',
            id: 'd1',
            text: `Olá! Que alegria receber o seu contato. Sou a Carol, assistente da Taís Madureira. 😊

Para verificar a disponibilidade e montar uma proposta certinha:

> Qual a *data* da festa e o *horário* que a debutante precisa estar pronta?
> O atendimento seria no nosso *Espaço* (bairro Tupi) ou em *domicílio*?
> *Quantas pessoas* seriam produzidas além da debutante?`
          },
          { ...BASE_FLOW.enderecoExterno, id: 'd1b', label: 'Se domicílio — solicitar endereço' }
        ]
      },
      {
        num: 2, title: 'Proposta + argumento de durabilidade', sub: 'Da valsa até o último brinde',
        badges: ['proposta', 'valor'],
        msgs: [
          {
            label: 'Mensagem',
            id: 'd2',
            text: `Obrigada pelas informações! Para o dia [Data] ainda temos disponibilidade. 🎉

A Taís trabalha com a técnica de *Beleza Blindada* — durabilidade de até 12h, sem retoques, resistente a fotos e às emoções da valsa até o último brinde. Ideal para festas longas!

👉 [Link da proposta]

Dá uma olhadinha e me diz qual formato faz mais sentido para o que vocês imaginaram para essa festa! ✨`
          }
        ]
      },
      {
        num: 3, title: 'Follow-up 1 — 24h', sub: 'Verificar dúvida sobre planos',
        badges: ['follow-up'],
        msgs: [{ ...BASE_FLOW.followUp1, id: 'd3' }]
      },
      {
        num: 4, title: 'Follow-up 2 — escassez', sub: 'Outras consultas para a data',
        badges: ['escassez'],
        msgs: [{ ...BASE_FLOW.followUp2, id: 'd4' }]
      },
      {
        num: 5, title: 'Pós-não-fechamento', sub: 'Desconto de 5% válido por 90 dias',
        badges: ['recuperação'],
        msgs: [
          {
            label: 'Mensagem',
            id: 'd5',
            text: `Compreendo perfeitamente, [Nome]! Desejo que a festa seja maravilhosa. 🌟

Vou deixar o contato salvo e quero te dar um presente: como você teve interesse no nosso trabalho, se precisar de qualquer produção nos próximos 90 dias você já tem *5% de desconto* garantido no Espaço Tupi.

(5% em serviços — válido 90 dias, não cumulativo) 🎁 Felicidades!`,
            tip: 'O desconto com prazo cria urgência futura sem custo imediato.'
          }
        ]
      }
    ]
  },

  {
    id: 'social',
    label: 'Social',
    icon: '✨',
    color: 'blue',
    desc: 'Ciclo curto. Combo R$ 380 é o carro-chefe. Perguntar sobre acompanhantes. Endereço antes do orçamento se externo.',
    steps: [
      {
        num: 1, title: 'Primeiro contato', sub: 'Data, horário e ocasião',
        badges: ['abertura'],
        msgs: [
          {
            label: 'Mensagem',
            id: 's1',
            text: `Olá, [Nome]! Seja muito bem-vinda. ☺

Sou a Carol, assistente da Taís Madureira. Se você chegou até aqui, é porque vem um evento incrível por aí! Nossa missão é simples: fazer você se olhar no espelho e amar o que vê — sem parecer que está de máscara.

Para verificar a disponibilidade:
1️⃣ Qual a *data* e o *horário* que você precisa estar pronta?
2️⃣ Para qual *ocasião* é a produção?`
          }
        ]
      },
      {
        num: 2, title: 'Confirmar + local + acompanhantes', sub: 'Endereço se externo · upsell de acompanhantes',
        badges: ['dados', 'upsell'],
        msgs: [
          {
            label: 'Mensagem',
            id: 's2',
            text: `Ótimo, [Nome]! Tenho disponibilidade para essa data. 🌟

Para eu já planejar o atendimento:
✔ A produção seria *apenas para você* ou você trará *acompanhantes*?
✔ Você prefere vir ao nosso *Espaço* (bairro Tupi) ou o atendimento *em domicílio*? 🏡`
          },
          { ...BASE_FLOW.enderecoExterno, id: 's2b', label: 'Se domicílio' }
        ]
      },
      {
        num: 3, title: 'Orçamento com combo como âncora', sub: 'Sempre apresentar combo junto com avulso',
        badges: ['proposta'],
        msgs: [
          {
            label: 'Apenas maquiagem — sugerir combo',
            id: 's3a',
            text: `Segue o valor:

💄 Maquiagem Social: *R$ 220,00*
💳 Sinal (30%): R$ 66,00

Muitas clientes aproveitam para incluir o *Penteado Social* (+ R$ 160) e ficam com a produção completa por *R$ 380* no combo. Vale muito a pena para um evento especial! 😊

O que você prefere?`,
            tip: 'A ancoragem do combo funciona melhor quando apresentada junto, não depois.'
          },
          {
            label: 'Combo Make + Penteado',
            id: 's3b',
            text: `Segue o valor do atendimento completo:

💄 Maquiagem Social + Penteado Social: *R$ 380,00*
🚗 Deslocamento: R$ [valor] _(se externo)_
Total: R$ [soma]
💳 Sinal (30%): R$ [valor do sinal]

As informações estão corretas? Posso reservar o seu horário?`
          }
        ]
      },
      {
        num: 4, title: 'Fechamento com escassez suave', sub: 'Final de semana lota — urgência real',
        badges: ['fechamento'],
        msgs: [
          {
            label: 'Mensagem',
            id: 's4',
            text: `Vai ser um prazer te atender nesse evento, [Nome]! 🥂

Como nossa agenda de final de semana costuma lotar rápido, quer que eu já reserve seu horário agora ou prefere confirmar algum detalhe antes?`
          }
        ]
      },
      {
        num: 5, title: 'Follow-up sem resposta', sub: '24h · encerramento em 72h',
        badges: ['follow-up'],
        msgs: [
          { ...BASE_FLOW.semResposta24, id: 's5a' },
          { ...BASE_FLOW.encerramento, id: 's5b' }
        ]
      }
    ]
  },

  {
    id: 'express',
    label: 'Express',
    icon: '⚡',
    color: 'amber',
    desc: 'R$ 175 · 30 min. Upsell para Social apenas quando o evento justifica. Endereço antes do orçamento se externo.',
    steps: [
      {
        num: 1, title: 'Contato + qualificação da ocasião', sub: 'Entender o evento para decidir se oferece upsell',
        badges: ['abertura'],
        msgs: [
          {
            label: 'Mensagem',
            id: 'e1',
            text: `Olá, [Nome]! Seja bem-vinda. ☺

Sou a Carol, assistente da Taís Madureira. Para verificar a disponibilidade:

1️⃣ Qual a *data* e o *horário* que você precisa estar pronta?
2️⃣ Para qual *ocasião* é a produção? (trabalho, evento, ensaio...)
3️⃣ Prefere vir ao nosso *Espaço* ou atendimento *em domicílio*?`
          }
        ]
      },
      {
        num: 2, title: 'Proposta + upsell condicional', sub: 'Só elevar para Social quando o evento justifica',
        badges: ['proposta'],
        msgs: [
          {
            label: 'Evento importante — oferecer upsell',
            id: 'e2a',
            text: `Tenho disponibilidade! 😊

Para um [tipo de evento], quero te dar uma informação importante:

💄 *Express* — R$ 175 · 30 min · ideal para o dia a dia
💄 *Social* — R$ 220 · 60 min · Beleza Blindada, até 12h, visagismo personalizado

Para um evento como o seu, o Social garantiria muito mais segurança. Mas se a prioridade é agilidade, o Express atende muito bem!

Qual faz mais sentido para você?`,
            tip: 'Não forçar o upsell. Apresentar as duas opções e deixar ela escolher.'
          },
          {
            label: 'Uso do dia a dia — sem upsell',
            id: 'e2b',
            text: `Tenho disponibilidade! 😊

💄 Maquiagem Express: *R$ 175,00*
💳 Sinal (30%): R$ 52,50

Quer que eu já reserve o seu horário?`
          }
        ]
      }
    ]
  },

  {
    id: 'formanda',
    label: 'Formanda',
    icon: '🎓',
    color: 'green',
    desc: 'Público jovem. Escassez real em temporada. Decisão compartilhada com a mãe. Oportunidade de produções em grupo.',
    steps: [
      {
        num: 1, title: 'Acolhimento + grupo de colegas', sub: 'Plantar semente para produções em grupo',
        badges: ['abertura'],
        msgs: [
          {
            label: 'Mensagem',
            id: 'fo1',
            text: `Oiee, [Nome]! Que alegria receber seu contato! 🎓✨

Sou a Carol, assistente da Taís Madureira. Formatura é um momento inesquecível e a gente adora fazer parte dessa data tão especial!

Para verificar a disponibilidade:
1️⃣ Qual a *data* e que *horário* você precisa estar pronta?
2️⃣ Alguma *colega* também vai precisar de produção? (A gente organiza tudo junto!)
3️⃣ Prefere vir ao nosso *Espaço* ou quer o atendimento *em domicílio*?`
          },
          { ...BASE_FLOW.enderecoExterno, id: 'fo1b', label: 'Se domicílio' }
        ]
      },
      {
        num: 2, title: 'Proposta + escassez de temporada', sub: 'Agenda fechando rápido em época de formatura',
        badges: ['proposta', 'escassez'],
        msgs: [
          {
            label: 'Mensagem',
            id: 'fo2',
            text: `Que data incrível, [Nome]! Tenho disponibilidade para o seu horário. 🎉

Para uma formatura, a *Beleza Blindada* da Taís garante até 12h de durabilidade — sem retoques, resistente ao flash e às emoções do palco!

*Valores:*
💄 Maquiagem Social: R$ 220
💄 Make + Penteado Social: *R$ 380* (combo)
🚗 Deslocamento: R$ [valor] _(se domicílio)_

A temporada de formatura é uma das mais concorridas do ano — nossa agenda costuma fechar com bastante antecedência. Recomendo garantir o horário o quanto antes! 🎓`
          }
        ]
      },
      {
        num: 3, title: 'Follow-up com conteúdo de valor', sub: 'Guia de pele como gancho — maior taxa de resposta',
        badges: ['follow-up'],
        msgs: [
          {
            label: '24-48h sem resposta',
            id: 'fo3',
            text: `Oi, [Nome]! 🌸

Estava aqui organizando os atendimentos e lembrei da sua formatura. Independente de fecharmos ou não, a gente preza muito para que você se sinta linda no dia!

Separei 3 dicas para preparar a pele 24h antes da produção — hidratação e sono que fazem qualquer maquiagem ficar ainda mais impecável.

Posso te enviar? 😊`,
            tip: 'A mensagem mais estratégica do sistema. Oferece valor antes de pedir — aumenta muito a taxa de resposta.'
          }
        ]
      }
    ]
  },

  {
    id: 'automaquiagem',
    label: 'Automaquiagem',
    icon: '🎨',
    color: 'teal',
    desc: 'Consultoria individual de 3h. R$ 297 (promoção) ou R$ 400. Identificar o maior desafio antes de apresentar o produto.',
    steps: [
      {
        num: 1, title: 'Primeiro contato + identificar desafio', sub: 'Nunca entregar o produto antes de entender o problema',
        badges: ['abertura'],
        msgs: [
          {
            label: 'Mensagem',
            id: 'am1',
            text: `Oi, [Nome]! Tudo bem?

Sou a Carol, assistente da Taís Madureira. Que prazer saber do seu interesse! ✨

A Taís ama ministrar o curso de automaquiagem porque é o momento onde ela ensina todos os 'pulos do gato' para você se sentir maravilhosa sozinha.

Mas antes de te passar os detalhes, me conta: o que é o seu maior desafio hoje na hora de se maquiar? É acertar a base, fazer o delineado ou aquela make que dure o dia todo?`,
            tip: 'A pergunta do desafio é a mais importante do fluxo. A resposta dela personaliza todo o argumento de venda seguinte.'
          }
        ]
      },
      {
        num: 2, title: 'Validar o desafio + apresentar a solução', sub: 'Espelhar o problema dela na proposta',
        badges: ['valor'],
        msgs: [
          {
            label: 'Após ela responder o desafio',
            id: 'am2',
            text: `Te entendo perfeitamente, [Nome]! 😊

Acredite: a maioria das alunas da Taís chega exatamente com esse sentimento. O mercado tem tanta informação e tantos produtos que a gente acaba ficando confusa mesmo!

O lado bom é que, por ser uma consultoria *individual*, a Taís consegue desmistificar tudo isso para você — de um jeito muito prático e direcionado para o seu rosto, rotina e objetivos.

Veja como funciona a experiência:`
          },
          {
            label: 'Apresentação do curso',
            id: 'am2b',
            text: `✨ *Consultoria Individual de Automaquiagem — 3 horas com a Taís*

O que torna essa experiência única:

• *Diagnóstico Pré-Aula:* formulário antes para a Taís já chegar preparada para o seu perfil
• *Curadoria de Necessaire:* aprende a usar o que já tem, de forma consciente
• *Técnica Sob Medida:* nada de receita de bolo — o que valoriza o SEU formato de rosto
• *Momento VIP:* coffee break especial e mini ensaio fotográfico da produção final

🗓 *Investimento:*
De R$ 400 por *R$ 297* _(oferta por tempo limitado)_

Como os horários são individuais e a agenda costuma fechar rápido, quer que eu te envie as datas disponíveis?`,
            tip: 'O preço tachado (R$ 400 → R$ 297) só funciona se a promoção for real. Verificar validade antes de enviar.'
          }
        ]
      },
      {
        num: 3, title: 'Enviar datas + fechar', sub: 'Após confirmação de interesse',
        badges: ['fechamento'],
        msgs: [
          {
            label: 'Mensagem',
            id: 'am3',
            text: `As datas disponíveis para esse mês são:

📅 [data 1] — [horário]
📅 [data 2] — [horário]
📅 [data 3] — [horário]

Qual funciona melhor para você? Assim que confirmar, já reservo o seu horário e te envio os detalhes do pagamento. 🌸`
          }
        ]
      },
      {
        num: 4, title: 'Follow-up sem resposta', sub: '24h após enviar as datas',
        badges: ['follow-up'],
        msgs: [
          {
            label: 'Mensagem',
            id: 'am4',
            text: `Oi, [Nome]! Passando para saber se você conseguiu ver as datas disponíveis. 😊

Alguma funcionou para você ou prefere que eu verifique outras opções?`
          },
          { ...BASE_FLOW.encerramento, id: 'am5' }
        ]
      }
    ]
  }
]

// ─────────────────────────────────────────────
// FECHAMENTO (padrão para todos os públicos)
// ─────────────────────────────────────────────

export const FECHAMENTO_STEPS = [
  {
    num: '✓', title: 'Mensagem de fechamento padrão', sub: 'Após confirmação verbal da cliente',
    badges: ['confirmação'], special: true,
    msgs: [
      {
        label: 'Mensagem completa',
        id: 'fec1',
        text: `Ficamos muito felizes com a sua escolha e será um prazer enorme cuidar da sua beleza. Muito obrigada pela confiança! 🥰

Para deixarmos tudo certinho e garantir a sua vaga na agenda da Taís, seguem os dados para a reserva:

*Resumo do pagamento:*
[serviços contratados]
🚗 Deslocamento: R$ [valor] _(remover esta linha se for no Espaço)_
Total: R$ [valor total]
💳 Sinal de Reserva (30%): R$ [valor do sinal]

Você pode efetuar o pagamento do sinal ao final dos termos. Acesse por este link seguro:
🔗 https://taismadureira.lovable.app/termos

_Assim que realizar o pagamento, me envia o comprovante por aqui para eu formalizar e travar o seu horário, combinado? Qualquer dúvida, é só me chamar! 💖_`,
        tip: 'Remover a linha de deslocamento se for atendimento no Espaço Tupi.'
      }
    ]
  },
  {
    num: 2, title: 'Confirmação após receber o comprovante', sub: 'Espaço Tupi ou domicílio',
    badges: ['confirmado'],
    msgs: [
      {
        label: 'Espaço Tupi',
        id: 'fec2a',
        text: `Recebemos o seu sinal, [Nome]! Muito obrigada. ✨

Seu atendimento está *confirmado e reservado* na agenda da Taís.

📅 Data: [data]
⏱ Horário: [hora]
💄 Serviços: [lista]
📍 Rua João Camilo de Oliveira Torres, 26 — Tupi
(Próximo ao Hospital Sofia Feldman)
https://maps.app.goo.gl/T3z1ppssxhPgfAj36
⚠️ Atenção: existe uma rua com o mesmo nome no bairro Mangabeiras.

Sinta-se à vontade para nos enviar referências de maquiagem e cabelo — isso ajuda a Taís a planejar o seu olhar exclusivo. 🌸`
      },
      {
        label: 'Domicílio',
        id: 'fec2b',
        text: `Recebemos o seu sinal, [Nome]! Muito obrigada. ✨

Seu atendimento está *confirmado*. A Taís estará no seu endereço com toda a estrutura de beleza e iluminação!

📅 Data: [data]
⏱ Horário: [hora]
💄 Serviços: [lista]
📍 Local: [endereço da cliente]

Próximo à data, entrarei em contato para combinarmos os detalhes finais. 🤍✨`
      }
    ]
  },
  {
    num: 3, title: 'Lembrete no dia anterior', sub: 'Confirmação + instruções de preparo',
    badges: ['lembrete'],
    msgs: [
      {
        label: 'Mensagem',
        id: 'fec3',
        text: `Oi, [Nome]! Bom dia, tudo bem? 🤍

Aqui é a Carol — assistente da Taís. Passando para confirmar o seu atendimento amanhã:

📅 Data: [data]
⏱ Horário: [hora]
📍 [local]

*Serviços:*
[lista com valores]
Sinal dado: R$ [valor]
Valor restante: R$ [valor] _(a ser pago no dia)_

Guia de preparo de cabelo para amanhã:
https://taismadureira.lovable.app/instrucoes

Está tudo certinho para você? 😊`
      }
    ]
  },
  {
    num: 4, title: 'Pós-atendimento — feedback e avaliação', sub: 'Google review + Instagram',
    badges: ['pós-venda'],
    msgs: [
      {
        label: 'Mensagem',
        id: 'fec4',
        text: `Oi, [Nome]! 🥰

Passando para saber como você se sentiu com a produção da Taís. Ficou do jeitinho que você imaginava?

Se tiver um minutinho, adoraríamos que escrevesse sobre sua experiência:
⭐ https://g.page/r/CUD1tjeJuIR3EAE/review

Se tiver fotos e quiser nos marcar no Instagram (@taismadureiramakeup), vamos adorar ver o resultado final! 🤍`
      }
    ]
  }
]
