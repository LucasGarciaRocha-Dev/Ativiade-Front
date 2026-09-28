const alunos = [];

    const app = document.querySelector("#app");
    const botoesMenu = document.querySelectorAll("nav button");

    function marcarMenuAtivo(rota) {
      botoesMenu.forEach(botao => {
        botao.classList.toggle("ativo", botao.dataset.rota === rota);
      });
    }

    function irPara(rota) {
      marcarMenuAtivo(rota);

      if (rota === "inicio") mostrarInicio();
      if (rota === "cadastro de eventos") mostrarCadastro();
      if (rota === "lista de eventos") mostrarLista();
      if (rota === "sobre os eventos") mostrarSobre();
    }

    function mostrarInicio() {
      app.innerHTML = `
        <h1>Sistema de Gerenciamento de Eventos</h1>
        <p>
          Este é um exemplo simples de SPA feita com HTML, CSS e JavaScript.
          A navegação acontece sem recarregar a página.
        </p>

        <p>
          Os eventos cadastrados ficam temporariamente guardados em um array JavaScript.
        </p>

        <div class="contador">
          Eventos cadastrados nesta sessão: <strong>${alunos.length}</strong>
        </div>

        <div class="acoes">
          <button class="botao" id="btnCadastrar">Cadastrar Evento</button>
          <button class="botao secundario" id="btnVerAlunos">Ver Eventos</button>
        </div>
      `;

      document.querySelector("#btnCadastrar")
        .addEventListener("click", () => irPara("cadastro de eventos"));

      document.querySelector("#btnVerAlunos")
        .addEventListener("click", () => irPara("lista de eventos"));
    }

    function mostrarCadastro() {
      app.innerHTML = `
        <h1>Cadastrar Evento</h1>

        <form id="formAluno">
          <div class="campo">
            <label for="nome">Nome</label>
            <input id="nome" type="text" placeholder="Digite o nome do evento" required />
          </div>

          <div class="campo">
            <label for="descricao">Descrição</label>
            <input id="descricao" type="text" placeholder="Digite a descrição do evento" required />
          </div>

          <div class="campo">
            <label for="data">Data do Evento</label>
            <input id="data" type="date" required />
          </div>

          <button class="botao" type="submit">Salvar evento</button>
          <div id="mensagem"></div>
        </form>
      `;

      document.querySelector("#formAluno").addEventListener("submit", function(e) {
  e.preventDefault();

        const nome = document.querySelector("#nome").value.trim();
        const evento = document.querySelector("#descricao").value.trim();
        const data = document.querySelector("#data").value;

        alunos.push({
          nome,
          evento,
          data
        });

        document.querySelector("#mensagem").innerHTML =
          `<div class="mensagem">Evento cadastrado com sucesso.</div>`;

        document.querySelector("#formAluno").reset();
      });
    }

    function mostrarLista() {
      app.innerHTML = `
        <h1>Lista de Eventos</h1>
        <p>Esta tabela é criada dinamicamente pelo JavaScript a partir do array de eventos.</p>
        <div id="conteudoLista"></div>
      `;

      renderizarTabela();
    }

    function renderizarTabela() {
      const conteudo = document.querySelector("#conteudoLista");

      if (alunos.length === 0) {
        conteudo.innerHTML = `
          <div class="vazio">
            Nenhum evento cadastrado ainda.
          </div>
        `;
        return;
      }

      let linhas = "";

      alunos.forEach((aluno, indice) => {
        linhas += `
          <tr>
            <td>${aluno.nome}</td>
            <td>${aluno.evento}</td>
            <td>${aluno.data}</td>
            <td>
              <button class="excluir" data-indice="${indice}">Excluir</button>
            </td>
          </tr>
        `;
      });

      conteudo.innerHTML = `
        <table>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Evento</th>
              <th>Data do Evento</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            ${linhas}
          </tbody>
        </table>
      `;

      document.querySelectorAll(".excluir").forEach(botao => {
        botao.addEventListener("click", function() {
          const indice = Number(this.dataset.indice);
          alunos.splice(indice, 1);
          renderizarTabela();
        });
      });
    }

    function mostrarSobre() {
      app.innerHTML = `
        <h1>Nossa empresa</h1>
        <p>
          Nosso sistema de gerenciamento de eventos, é feita com HTML, CSS e JavaScript.
        </p>
        <p>
          Com intuito de organizar e facilitar o gerenciamento de eventos, a nossa empresa
            <strong>Garcia eventos</strong> foi criada, para atender às necessidades dos nossos clientes.
        </p>
      `;
    }

    botoesMenu.forEach(botao => {
      botao.addEventListener("click", () => {
        irPara(botao.dataset.rota);
      });
    });

    mostrarInicio();