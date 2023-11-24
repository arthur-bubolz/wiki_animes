// script.js

let texto;
let currentIndex;
let resultChunks;


document.addEventListener('DOMContentLoaded', function () {
  const slider = document.getElementById('slider');
  const sliderValue = document.getElementById('slider-value');

  // Atualiza o valor exibido quando o slider é ajustado
  slider.addEventListener('input', function () {
      sliderValue.textContent = slider.value;
  });
});

function capturarTexto() {
  texto = document.getElementById("meuTexto").value;
  usarTexto();

  // Limpar o campo de pesquisa
  document.getElementById("meuTexto").value = "";
  currentIndex = 0;
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
  // Converte o objeto JSON para uma string formatada
  const formattedJSON = JSON.stringify(data, null, 2);

  // Cria um elemento <pre> para exibir o JSON
  const preElement = document.createElement("pre");
  preElement.textContent = formattedJSON;

  let lista = JSON.parse(formattedJSON);
  
  resultChunks = arrayPagination(lista);

  displayCurrentChunk();
}


function arrayPagination(arr) {
  let chunkSize = Number(document.querySelector("#slider").value);
  console.log(chunkSize);
  const chunks = [];
  for (let i = 0; i < arr.length; i += chunkSize) {
    const chunk = arr.slice(i, i + chunkSize);
    chunks.push(chunk);
  }

  return chunks;
}


function displayCurrentChunk() {
  const container = document.getElementById("jsonContainer");
  
  container.innerHTML = "";
  // Exiba o conteúdo da parte atual
  resultChunks[currentIndex].forEach(item => {
   
    // Cria elementos HTML
    const divElement = document.createElement("div");
    const headElement = document.createElement("h2");
    const paragraphElement = document.createElement("p");
    const linkElement = document.createElement("a");
    const animeImageElement = document.createElement("img");

    //Adiciona o id da Div
    divElement.className = "animeDiv";
    // Configura título
    headElement.textContent = item["title"];

    // Configura a imagem
    animeImageElement.src = item["images"]["jpg"]["image_url"];
    animeImageElement.alt = item["title"];

    // Configura o link
    linkElement.href = item["url"];
    linkElement.textContent = "Ver mais sobre o anime!!";
    linkElement.target = "_blank"

    // Configura Score
    paragraphElement.textContent = `Score: ${item["score"]}`;

    // Adiciona os elementos a div
    divElement.appendChild(headElement);
    divElement.appendChild(animeImageElement);
    divElement.appendChild(paragraphElement);
    divElement.appendChild(linkElement);

    //fechamento da div
    container.appendChild(divElement);
  });
  
  if (resultChunks.length>0) {
    // Torna os botões visíveis
    document.getElementById("prevButton").style.display = "inline-block";
    document.getElementById("nextButton").style.display = "inline-block";
  }
}


function prev() {
  if (currentIndex > 0) {
    currentIndex--;
    displayCurrentChunk();
  }
}

function next() {
  if (currentIndex < resultChunks.length - 1) {
    currentIndex++;
    displayCurrentChunk();
  }
}