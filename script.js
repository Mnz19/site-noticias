let currentPage = 1;
const itemsPerPage = 1;
async function cards(pagina) {
  try{
    const response = await fetch(`https://servicodados.ibge.gov.br/api/v3/noticias/?tipo=noticia&qtd=${itemsPerPage + 3}&page=${pagina}`);
    if (!response.ok) {
      throw new Error('Erro na solicitação da API');
    }
    const data = await response.json();
    const noticias = data.items;

    const cards = document.getElementById('cards');
    cards.innerHTML = '';

    const h2 = document.createElement("h2")
    cards.appendChild(h2);
    h2.textContent = "Outras Notícias"

    for (const noticia of noticias) {
      const p = document.createElement("p")
      const a = document.createElement("a")

      p.textContent = noticia.titulo
      a.textContent = "Ver notícia"
      a.href = noticia.link
      a.target = "_blank"

      cards.appendChild(p);
      cards.appendChild(a);
    }}catch (error) {
      console.error('Ocorreu um erro:', error);
    }}

async function carregarPagina(pagina) {
  try {
    const response = await fetch(`https://servicodados.ibge.gov.br/api/v3/noticias/?tipo=noticia&qtd=${itemsPerPage}&page=${pagina}`);
    if (!response.ok) {
      throw new Error('Erro na solicitação da API');
    }
    const data = await response.json();
    const noticias = data.items;

    const containerLeft = document.getElementById('noticia');
    containerLeft.innerHTML = '';

    for (const noticia of noticias) {
      const h1 = document.createElement("h1");
      const img = document.createElement("img");
      const span = document.createElement("span");
      const p = document.createElement("p");
      const link = document.createElement("a")

      h1.textContent = noticia.titulo
      img.src = noticia.imagens.url
      span.textContent = noticia.data_publicacao
      p.textContent = noticia.introducao
      link.href = noticia.link
      link.textContent = "Ler Mais ..."
      link.target = "_blank"

      containerLeft.appendChild(h1);
      containerLeft.appendChild(img);
      containerLeft.appendChild(span);
      containerLeft.appendChild(p);
      containerLeft.appendChild(link)
    }

    const nextButton = document.getElementById("next-button");
    const prevButton = document.getElementById("prev-button");

    nextButton.disabled = noticias.length < itemsPerPage;
    prevButton.disabled = currentPage === 1;
  } catch (error) {
    console.error('Ocorreu um erro:', error);
  }
}
document.getElementById("next-button").addEventListener("click", () => {
  currentPage++;
  carregarPagina(currentPage);
  cards(currentPage);
});

document.getElementById("prev-button").addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;
    carregarPagina(currentPage);
    cards(currentPage);
  }
});

carregarPagina(currentPage);
cards(currentPage);
