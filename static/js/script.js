// script.js
let texto;

function capturarTexto() {
  texto = document.getElementById("meuTexto").value;
  usarTexto();

  // Limpar o campo de pesquisa
  document.getElementById("meuTexto").value = "";
}

function usarTexto() {
  const apiUrl = `https://api.jikan.moe/v4/anime?q=${texto}&sfw`;

  // Fazendo a requisição usando fetch
  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      // Processa os dados recebidos
      exibirJSON(data["data"]);
    })
    .catch(error => {
      console.error('Erro ao fazer a requisição:', error);
    });
}

function exibirJSON(data) {
  // Obtém o elemento onde o JSON será exibido
  const container = document.getElementById("jsonContainer");

  // Limpa o conteúdo do contêiner
  container.innerHTML = "";

  // Converte o objeto JSON para uma string formatada
  const formattedJSON = JSON.stringify(data, null, 2);

  // Cria um elemento <pre> para exibir o JSON
  const preElement = document.createElement("pre");
  preElement.textContent = formattedJSON;

  let lista = JSON.parse(formattedJSON);

  // Itera sobre os elementos do array e adiciona ao contêiner
  lista.forEach(item => {
    // Cria elementos HTML
    const headElement = document.createElement("h2");
    const paragraphElement = document.createElement("p");
    const linkElement = document.createElement("a");
    const animeImageElement = document.createElement("img");

    // Configura título
    headElement.textContent = item["title"];

    // Configura a imagem
    animeImageElement.src = item["images"]["jpg"]["image_url"];
    animeImageElement.alt = item["title"];

    // Configura o link
    linkElement.href = item["url"];
    linkElement.textContent = "Ver mais sobre o anime!!";

    // Configura Score
    paragraphElement.textContent = `Score: ${item["score"]}`;

    // Adiciona os elementos ao contêiner
    container.appendChild(headElement);
    container.appendChild(animeImageElement);
    container.appendChild(linkElement);
    container.appendChild(paragraphElement);
  });
}


/*function exibirJSON(data) {
  // Obtém o elemento onde o JSON será exibido
  const container = document.getElementById("jsonContainer");

  // Converte o objeto JSON para uma string formatada
  const formattedJSON = JSON.stringify(data, null, 2);

  // Cria um elemento <pre> para exibir o JSON
  const preElement = document.createElement("pre");
  preElement.textContent = formattedJSON;

  let lista = JSON.parse(formattedJSON);

  // Itera sobre os elementos do array e adiciona ao contêiner
  lista.forEach(item => {
    // Cria um elemento de parágrafo
    const paragraphElement = document.createElement("p");
    const linkElement = document.createElement("a");
    const anime_image = document.createElement("img");

    anime_image.src = item["images"]["jpg"]["image_url"];

    linkElement.href = item["url"];
    linkElement.textContent = JSON.stringify(item["url"], null, 2)

    // Adiciona o texto do item ao parágrafo
    let item_da_lista = JSON.stringify(item["title"], null, 2);
    paragraphElement.textContent = item_da_lista;
    
    // Adiciona o parágrafo ao contêiner
    container.appendChild(paragraphElement);
    container.appendChild(anime_image);
    container.appendChild(linkElement);
  });

}*/
