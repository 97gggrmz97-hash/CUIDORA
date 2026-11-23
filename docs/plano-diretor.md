# Plano Diretor CUIDORA — revisão consolidada

Escopo aprovado de planejamento, não declaração de funcionalidades prontas. Referências: planejamento original, PDF Ecossistema Dudi, Clube Focus (conteúdo interno não verificado), Jogoteca (catálogo não verificado). Inclui opções 01,02,04,06,03,07,08,09 do parecer; exclui check-in e CAA nesta revisão.

## Arquitetura
Projeto exclusivo CUIDORA. Monólito modular inicialmente: cada motor tem domínio, contratos de API, validação, permissões, testes e migrações próprios; dados segregados por organização e paciente, autorização no servidor, sem acesso direto às tabelas de outro motor. Eventos versionados e idempotentes, filas quando necessárias, falhas isoladas, flags de funcionalidades, ambientes separados e segredos exclusivos. Sem duplicar dados clínicos desnecessariamente. Evoluir para serviços separados apenas quando necessário. Nenhum dado real até validação de segurança e clínica. Repositório atualmente público: não inserir segredos ou dados; tornar privado antes de uso clínico.

## Ordem de implementação
### 01 — Infraestrutura e recuperação
Banco próprio, armazenamento privado, criptografia, backup agendado, restauração isolada, retenção, monitoramento, recuperação de banco e anexos. Validar primeiro com dados fictícios; repetir com banco real antes de produção clínica.
Critério de saída: testes do motor, contratos, permissões e integração aprovados; evidência registrada; sem anunciar disponibilidade antes da validação.

### 02 — Identidade e segurança
Cadastro, login, recuperação de acesso, MFA, sessões, perfis, autorização por organização e paciente, auditoria, LGPD, retenção, testes de isolamento.
Critério de saída: testes do motor, contratos, permissões e integração aprovados; evidência registrada; sem anunciar disponibilidade antes da validação.

### 03 — Motor de IA
Claude no servidor, adaptador substituível, contexto autorizado por paciente, fontes verificáveis, rascunhos, revisão humana, limites de custo, testes de segurança e qualidade.
Critério de saída: testes do motor, contratos, permissões e integração aprovados; evidência registrada; sem anunciar disponibilidade antes da validação.

### 04 — Pacientes e prontuários
Cadastro, responsáveis, anamnese, histórico, linha do tempo, situação, registros versionados, autoria, permissões e exportação autorizada.
Critério de saída: testes do motor, contratos, permissões e integração aprovados; evidência registrada; sem anunciar disponibilidade antes da validação.

### 05 — Fonoaudiologia
Linguagem, TEA, amamentação, linguinha, orelhinha, audiologia, audiometria, BERA, voz, motricidade orofacial, deglutição; formulários e validação profissional.
Critério de saída: testes do motor, contratos, permissões e integração aprovados; evidência registrada; sem anunciar disponibilidade antes da validação.

### 06 — Protocolos
Criador de formulários, importação autorizada de PDF, regras de pontuação versionadas, revisão, comparação e gráficos; licenças verificadas.
Critério de saída: testes do motor, contratos, permissões e integração aprovados; evidência registrada; sem anunciar disponibilidade antes da validação.

### 07 — Planos e evolução
Metas, plano terapêutico, próxima sessão, plano domiciliar, registros e comparação, aprovação profissional.
Critério de saída: testes do motor, contratos, permissões e integração aprovados; evidência registrada; sem anunciar disponibilidade antes da validação.

### 08 — Voz
Ditado profissional, transcrição, rascunho de evolução, revisão, consentimento quando aplicável, retenção mínima de áudio.
Critério de saída: testes do motor, contratos, permissões e integração aprovados; evidência registrada; sem anunciar disponibilidade antes da validação.

### 09 — Educação
Avaliação pedagógica, potencialidades e dificuldades observadas, reforço individualizado, intervenção, atividades graduadas e lúdicas, recursos imprimíveis, metas, evolução, orientações família/escola; sem diagnóstico automático.
Critério de saída: testes do motor, contratos, permissões e integração aprovados; evidência registrada; sem anunciar disponibilidade antes da validação.

### 10 — Jogos
Biblioteca original, memória, associação, sequência, rimas, quiz, fonemas, leitura, matemática, atenção; modelos parametrizáveis, IA sugere estímulos, revisão, favoritos, impressão, resultados, acessibilidade, sem anúncios ou ranking público infantil.
Critério de saída: testes do motor, contratos, permissões e integração aprovados; evidência registrada; sem anunciar disponibilidade antes da validação.

### 11 — Agenda
Dia/semana/mês, recorrência, confirmação, faltas, reagendamento, conflitos, lembretes autorizados. Não incluir check-in nesta revisão.
Critério de saída: testes do motor, contratos, permissões e integração aprovados; evidência registrada; sem anunciar disponibilidade antes da validação.

### 12 — Arquivos
Anexos privados, exames, laudos, fotos, validação de formatos, verificação de malware, acesso e descarte controlados.
Critério de saída: testes do motor, contratos, permissões e integração aprovados; evidência registrada; sem anunciar disponibilidade antes da validação.

### 13 — Indicadores
Metas, séries históricas, desempenho com e sem ajuda, gráficos, origem dos dados, sem inferência diagnóstica automática.
Critério de saída: testes do motor, contratos, permissões e integração aprovados; evidência registrada; sem anunciar disponibilidade antes da validação.

### 14 — Financeiro
Receitas, despesas, pagamentos, pendências, relatórios, integração agenda, permissões próprias; convênios e glosas fora do escopo inicial.
Critério de saída: testes do motor, contratos, permissões e integração aprovados; evidência registrada; sem anunciar disponibilidade antes da validação.

### 15 — Família
Portal separado, responsáveis verificados, orientações e atividades aprovadas, agenda e devolutivas, acesso revogável.
Critério de saída: testes do motor, contratos, permissões e integração aprovados; evidência registrada; sem anunciar disponibilidade antes da validação.

### 16 — Comunicação
Mensagens internas, canais autorizados, notificações, histórico, horários, anexos protegidos; não é canal de emergência.
Critério de saída: testes do motor, contratos, permissões e integração aprovados; evidência registrada; sem anunciar disponibilidade antes da validação.

### 17 — Academia
Tutoriais, biblioteca original/licenciada, fontes científicas, treinamento por perfil, cursos futuros.
Critério de saída: testes do motor, contratos, permissões e integração aprovados; evidência registrada; sem anunciar disponibilidade antes da validação.

### 18 — Offline
Cache mínimo criptografado, fila de sincronização, conflitos, expiração, revogação e testes de perda do aparelho.
Critério de saída: testes do motor, contratos, permissões e integração aprovados; evidência registrada; sem anunciar disponibilidade antes da validação.

### 19 — Portal público e área profissional
Landing page, especialidades, cadastro/login, dashboard, menus por perfil, onboarding, acessibilidade e responsividade; publicar apenas funções verificadas como disponíveis.
Critério de saída: testes do motor, contratos, permissões e integração aprovados; evidência registrada; sem anunciar disponibilidade antes da validação.

### 20 — Administração
Usuários, permissões, módulos, suporte, indicadores, auditoria, mapa agregado por cidade/estado sem rastreamento oculto, planos futuros.
Critério de saída: testes do motor, contratos, permissões e integração aprovados; evidência registrada; sem anunciar disponibilidade antes da validação.

### 21 — Validação e lançamento
Testes unitários, integração, E2E, isolamento, acessibilidade, segurança, restauração completa, revisão clínica/pedagógica, piloto fictício e autorização antes de dados reais.
Critério de saída: testes do motor, contratos, permissões e integração aprovados; evidência registrada; sem anunciar disponibilidade antes da validação.

## Estado atual
Hospedagem inicial publicada conforme painel do usuário; código de homologação de backup e agendamento gravados. Execução hospedada, restauração e configuração de segredos ainda não comprovadas. Banco clínico não implantado. Prioridade: concluir teste de infraestrutura e repetir restauração completa após criação do banco. Demais módulos são planejamento. Não usar dados reais.
