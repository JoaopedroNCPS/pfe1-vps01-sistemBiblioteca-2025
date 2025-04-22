const livros = [
        {
        "id": 1,
        "titulo": "Dom Quixote",
        "autor": "Miguel de Cervantes",
        "ano": 1605,
        "editora": "Editora Clássicos",
        "genero": "Romance",
        "descricao": "Um romance satírico sobre um fidalgo que acredita ser um cavaleiro andante."
        },
        {
        "id": 2,
        "titulo": "1984",
        "autor": "George Orwell",
        "ano": 1949,
        "editora": "Companhia das Letras",
        "genero": "Distopia",
        "descricao": "Um retrato sombrio de um futuro totalitário."
        },
        {
        "id": 3,
        "titulo": "A Revolução dos Bichos",
        "autor": "George Orwell",
        "ano": 1945,
        "editora": "Editora B",
        "genero": "Fábula política",
        "descricao": "Uma alegoria sobre o totalitarismo disfarçado de fábula animal."
        },
        {
        "id": 4,
        "titulo": "O Pequeno Príncipe",
        "autor": "Antoine de Saint-Exupéry",
        "ano": 1943,
        "editora": "Agir",
        "genero": "Infantil/Filosófico",
        "descricao": "Um conto filosófico com críticas sociais sutis."
        },
        {
        "id": 5,
        "titulo": "Orgulho e Preconceito",
        "autor": "Jane Austen",
        "ano": 1813,
        "editora": "Penguin",
        "genero": "Romance",
        "descricao": "A história de Elizabeth Bennet enquanto lida com questões de classe e amor."
        },
        {
        "id": 6,
        "titulo": "O Hobbit",
        "autor": "J.R.R. Tolkien",
        "ano": 1937,
        "editora": "HarperCollins",
        "genero": "Fantasia",
        "descricao": "A jornada de Bilbo Bolseiro em uma aventura pela Terra Média."
        },
        {
        "id": 7,
        "titulo": "Moby Dick",
        "autor": "Herman Melville",
        "ano": 1851,
        "editora": "Nova Fronteira",
        "genero": "Aventura",
        "descricao": "A obsessiva caçada do capitão Ahab pela baleia branca."
        },
        {
        "id": 8,
        "titulo": "A Metamorfose",
        "autor": "Franz Kafka",
        "ano": 1915,
        "editora": "L&PM",
        "genero": "Ficção filosófica",
        "descricao": "Um homem acorda transformado em um inseto gigante."
        },
        {
        "id": 9,
        "titulo": "Grande Sertão: Veredas",
        "autor": "João Guimarães Rosa",
        "ano": 1956,
        "editora": "Nova Aguilar",
        "genero": "Romance",
        "descricao": "Um clássico da literatura brasileira sobre o sertão e seus conflitos."
        },
        {
        "id": 10,
        "titulo": "Harry Potter e a Pedra Filosofal",
        "autor": "J.K. Rowling",
        "ano": 1997,
        "editora": "Rocco",
        "genero": "Fantasia",
        "descricao": "O começo da jornada de um jovem bruxo em Hogwarts."
        }
  ];
  
  const bookList = document.getElementById("book-list");
  const modal = document.getElementById("modal");
  const bookDetails = document.getElementById("book-details");
  const closeButton = document.querySelector(".close-button");
  const bookSelect = document.getElementById("book-select");
  
  function exibirLivros(lista) {
    bookList.innerHTML = "";
    lista.forEach(livro => {
      const div = document.createElement("div");
      div.className = "book";
      div.id = `book-${livro.id}`;
      div.innerHTML = `
        <strong>${livro.titulo}</strong><br>
        ${livro.autor}<br>
        ${livro.ano}<br>
        <button onclick="verDetalhes(${livro.id})">Ver Detalhes</button>
      `;
      bookList.appendChild(div);
  
      const option = document.createElement("option");
      option.value = livro.id;
      option.textContent = livro.titulo;
      bookSelect.appendChild(option);
    });
  }
  
  
  function verDetalhes(id) {
    const livro = livros.find(l => l.id === id);
    const corQuadrado = gerarCorAleatoria();
    const corBotao = gerarCorAleatoria();
  
    const selectedBook = document.querySelector(`#book-${id}`);
    selectedBook.style.backgroundColor = corQuadrado;

    const button = selectedBook.querySelector("button");
    button.style.backgroundColor = corBotao;
  
    bookDetails.innerHTML = `
      <strong>Título:</strong> ${livro.titulo}<br>
      <strong>Autor:</strong> ${livro.autor}<br>
      <strong>Ano:</strong> ${livro.ano}<br>
      <strong>Editora:</strong> ${livro.editora}<br>
      <strong>Gênero:</strong> ${livro.genero}<br>
      <p>${livro.descricao}</p>
    `;
    modal.style.display = "flex";
  }
  
  function gerarCorAleatoria() {
    const letras = '0123456789ABCDEF';
    let cor = '#';
    for (let i = 0; i < 6; i++) {
      cor += letras[Math.floor(Math.random() * 16)];
    }
    return cor;
  }

  closeButton.onclick = function () {
    modal.style.display = "none";
  };
  
  window.onclick = function (event) {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  };
  
  const form = document.getElementById("rental-form");
  form.onsubmit = function (e) {
    e.preventDefault();
    const livroId = parseInt(bookSelect.value);
    const locacao = {
      livroId,
      leitor: document.getElementById("leitor").value,
      cpf: document.getElementById("cpf").value,
      dataLocacao: document.getElementById("data-locacao").value,
      dataDevolucao: document.getElementById("data-devolucao").value
    };
    if (locacao.cpf.length !== 11 || isNaN(locacao.cpf)) {
      alert("CPF deve ter 11 dígitos e conter apenas números.");
      return;
    }
    let registros = JSON.parse(localStorage.getItem("locacoes")) || [];
    registros.push(locacao);
    localStorage.setItem("locacoes", JSON.stringify(registros));
  
    const livro = livros.find(l => l.id === livroId);
    if (livro && !livro.titulo.endsWith(" - Alugado")) {
      livro.titulo = `${livro.titulo} - Alugado`;
    }
    exibirLivros(livros);
  
    alert("Locação registrada com sucesso!");
    form.reset();
  };
  
  const searchInput = document.getElementById("search");
  searchInput.addEventListener("input", function () {
    const termo = this.value.toLowerCase();
    const filtrados = livros.filter(livro => livro.titulo.toLowerCase().includes(termo));
    exibirLivros(filtrados);
  });
  
  exibirLivros(livros);

  function exibirLocacoes() {
    let locacoes = JSON.parse(localStorage.getItem("locacoes")) || [];
  
    const tabelaBody = document.querySelector("#tabela-locacoes tbody");
  
    tabelaBody.innerHTML = "";
    locacoes.forEach(locacao => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${locacao.livroId}</td>
        <td>${locacao.leitor}</td>
        <td>${locacao.cpf}</td>
        <td>${locacao.dataLocacao}</td>
        <td>${locacao.dataDevolucao}</td>
      `;
      tabelaBody.appendChild(row);
    });
  }

  const botaoReset = document.getElementById("reset-locacoes");

botaoReset.onclick = function () {
  const confirmar = confirm("Tem certeza que deseja apagar todas as locações?");
  if (confirmar) {
    localStorage.removeItem("locacoes");
    exibirLocacoes();
    alert("Locações apagadas com sucesso.");
  }
};

form.onsubmit = function (e) {
  e.preventDefault();
  const locacao = {
    livroId: bookSelect.value,
    leitor: document.getElementById("leitor").value,
    cpf: document.getElementById("cpf").value,
    dataLocacao: document.getElementById("data-locacao").value,
    dataDevolucao: document.getElementById("data-devolucao").value
  };
  if (locacao.cpf.length !== 11 || isNaN(locacao.cpf)) {
    alert("CPF deve ter 11 dígitos e conter apenas números.");
    return;
  }
  let registros = JSON.parse(localStorage.getItem("locacoes")) || [];
  registros.push(locacao);
  localStorage.setItem("locacoes", JSON.stringify(registros));

  exibirLocacoes(); 

  alert("Locação registrada com sucesso!");
  form.reset();
};
  

  window.onload = exibirLocacoes;
  exibirLocacoes();


