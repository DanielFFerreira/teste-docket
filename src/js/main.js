const URL = "http://localhost:3000/documentos";
const elemCont = document.querySelector("container");

// fetch(URL).then((res) => {
//   return res.json();
// })
// .then((data) => {
//   data.map(documents => {
//     const elemDiv = document.createElement("div");
//     elemDiv.innerHTML = documents.certidao_de_nascimento.nome_do_documento;
//     return elemCont.innerHTML = elemDiv;
//   });
// });

fetch(URL).then(res => {
  return res.json();
}).then(data => {
  document.querySelector("#nome-documento").innerHTML = data[0].nome_documento;
  console.log(data);
});

