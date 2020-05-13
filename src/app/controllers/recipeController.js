const fs = require('fs')
const data = require('../../../data.json')


module.exports = {
  index(req, res) {
    return res.render('admin/index', { recipes: data.recipes })
  },
  create(req, res) {
    return res.render('admin/create')
  },
  post(req, res) {

    let id = 1
    const lastRecipe = data.recipes[data.recipes.length - 1]

    if (lastRecipe) {
      id = lastRecipe.id + 1
    }



    data.recipes.push({
      id,
      ...req.body,
      ingredients: req.body.ingredients.filter(function (valor) {
        return valor != ""
      }),
      preparation: req.body.preparation.filter(function (valor) {
        return valor != ""
      }),
    })

    fs.writeFile('data.json', JSON.stringify(data, null, 2), function (err) {
      if (err) return res.send("Write file error")
    })

    return res.redirect("/admin/recipes")
  },
  show(req, res) {
    const { id } = req.params

    const foundRecipe = data.recipes.find(function (recipe) {
      return recipe.id == id
    })

    if (!foundRecipe) return res.send("Recipe not found!")

    foundRecipe.ingredients = foundRecipe.ingredients.filter(function (valor) {
      return valor !== " "
    })

    const recipe = {
      ...foundRecipe,
    }


    return res.render('admin/show', { recipe })
  },
  edit(req, res) {
    const { id } = req.params

    const foundRecipe = data.recipes.find(function (recipe) {
      return recipe.id == id
    })

    if (!foundRecipe) return res.send("Recipe not found!")

    const recipe = {
      ...foundRecipe,
      // ingredients: foundRecipe.ingredients.split(","),
    }

    return res.render('admin/edit', { recipe })
  },
  put(req, res) {
    const { id } = req.body
    let index = 0

    const foundRecipe = data.recipes.find(function (recipe, foundIndex) {

      if (id == recipe.id) {
        index = foundIndex
        return true
      }

    })

    if (!foundRecipe) return res.send('Recipe not found!')

    const recipe = {
      ...foundRecipe,
      ...req.body,
      id: Number(req.body.id)
    }

    data.recipes[index] = recipe

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function (err) {
      if (err) return res.send('Write error')
    })

    return res.redirect(`/admin/recipes/${id}`)

  },
  delete(req, res) {
    const { id } = req.body

    const filteredRecipes = data.recipes.filter(function (recipe) {
      return recipe.id != id
    })

    data.recipes = filteredRecipes

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function (err) {
      if (err) return res.send('Write file error')
    })

    return res.redirect("/admin/recipes")

  },
}
