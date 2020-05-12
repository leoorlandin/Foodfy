const blocoIngredientes = document.querySelector('.block__ingredients')
const blocoPreparacao = document.querySelector('.block__preparation')
const blocoInformacoes = document.querySelector('.block__information')
const titleInformacoes = document.querySelector('.title__information')

function showInformation(informationToShow, buttonClicked) {
  informationToShow.style.display != "flex" ? (informationToShow.style.display = "flex", buttonClicked.innerHTML = "ESCONDER") : (informationToShow.style.display = "none", buttonClicked.innerHTML = "MOSTRAR")
}

const paragrafoInformacao = document.getElementById('infoP')

window.onload = function verifyInfo() {

  if (paragrafoInformacao.innerHTML == "") {
    titleInformacoes.style.display = 'none';
  }
}

/////////////////////////////

function addInput(mainDiv, inputDiv) {

  const newField = mainDiv[mainDiv.length - 1].cloneNode(true);

  if (newField.children[0].value == "") return false;

  newField.children[0].value = "";
  inputDiv.appendChild(newField);
}

const ingredients = document.querySelector("#ingredients");
const fieldContainer = document.querySelectorAll(".ingredient");

document
  .querySelector("#add-ingredient")
  .addEventListener("click", () => {
    addInput(fieldContainer, ingredients)
  })

const preparation = document.querySelector('#preparation')
const steps = document.querySelectorAll('.steps')


document
  .querySelector("#add-step")
  .addEventListener("click", () => {
    addInput(steps, preparation)
  })