const recepies = document.querySelectorAll('.receita')

//mostrando as receitas e os criadores com base nos objetos criados no arquivo data.js
for (let receita of recepies) {
  const imgId = receita.getAttribute("id")
  const recepieName = receita.children[1].innerHTML
  const recepieBy = receita.children[2].innerHTML
  receita.addEventListener("click", function () {
    window.location.href = `/recipeInfo?id=${imgId}`


  })
}

const blocoIngredientes = document.querySelector('.block__ingredients')
const blocoPreparacao = document.querySelector('.block__preparation')
const blocoInformacoes = document.querySelector('.block__information')
const titleInformacoes = document.querySelector('.title__information')

//função de mostrar/esconder informações com os botões na frente dos tópicos da página
function showInformation(informationToShow, buttonClicked) {
  informationToShow.style.display != "flex" ? (informationToShow.style.display = "flex", buttonClicked.innerHTML = "ESCONDER") : (informationToShow.style.display = "none", buttonClicked.innerHTML = "MOSTRAR")
}

const paragrafoInformacao = document.getElementById('infoP')

window.onload = function verifyInfo() {

  if (paragrafoInformacao.innerHTML == "") {
    titleInformacoes.style.display = 'none';
  }
}


// ADICIONAR NOVO CAMPO COM BOTÃO 

const btnAddIngredient = document.getElementById('add-ingredient')
const ingredientsForm = document.querySelector('.ingredients')

btnAddIngredient.addEventListener("click", function (event) {
  let newIngredient = document.createElement('input')
  newIngredient.name = "ingredients[]"
  newIngredient.placeholder = "Novo ingrediente"
  ingredientsForm.appendChild(newIngredient)
  this.parentElement.insertBefore(newIngredient, this.parentElement.children[2])

})

const btnAddStep = document.getElementById('add-step')
const preparationForm = document.querySelector('.preparation')

btnAddStep.addEventListener("click", function () {
  let newStep = document.createElement('input')
  newStep.name = "preparation[]"
  newStep.placeholder = "Novo passo"
  preparationForm.appendChild(newStep)
  this.parentElement.insertBefore(newStep, this.parentElement.children[2])
})
