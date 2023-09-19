
function mostrarResultado(resultado) {

    console.log(resultado);
}
fetch('http://servicodados.ibge.gov.br/api/v3/noticias/?tipo=noticia')
  .then(res => {
    return res.json();
  })
  .then(data => {
    let resultado = data;
    console.log(resultado)
  })
  .catch(error => {
    console.error('Ocorreu um erro:', error);
  });
