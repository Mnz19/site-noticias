
function mostrarResultado(resultado) {

    console.log(resultado);
}
fetch('http://servicodados.ibge.gov.br/api/v3/noticias/?tipo=noticia/?qtd=3')
  .then(res => {
    return res.json();
  })
  .then(data => {
    const dados = data;
    const containerLeft = document.getElementById('noticia')
    for (const item of dados.items){
      const h1 = document.createElement("h1")
      const img = document.createElement("img")
      const span = document.createElement("span")
      const link = document.createElement("a")
      const p = document.createElement("p")
      h1.textContent = item.titulo
      img.src = item.imagens.url
      span.textContent = item.data_publicacao
      p.textContent = item.introducao
      link.href = item.link
      link.textContent = "Ler Mais"
      link.target = "_blank"

      containerLeft.appendChild(h1)
      containerLeft.appendChild(img)
      containerLeft.appendChild(span)
      containerLeft.appendChild(p)
      containerLeft.appendChild(link)
      
    }
  })
  .catch(error => {
    console.error('Ocorreu um erro:', error);
  });
