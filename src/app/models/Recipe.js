const db = require('../../config/db')
const { date } = require('../../lib/utils')

module.exports = {
  all(callback) {
    db.query(`SELECT recipes.*, chefs.name AS chef_name 
    FROM recipes 
    LEFT JOIN chefs ON (recipes.chef_id = chefs.id)
    `, function (err, results) {
      if (err) throw `Database error ${err}`

      callback(results.rows)
    })
  },
  create(data, callback) {


    const query = `INSERT INTO recipes(
    chef_id,
    title,
    ingredients,
    preparation,
    information,
    created_at
    )VALUES ($1, $2, $3, $4, $5, $6) 
    RETURNING id
    `

    const values = [
      data.chef_id,
      data.title,
      data.ingredients,
      data.preparation,
      data.information,
      date(Date.now()).iso,
    ]

     db.query(query, values, function (err, results) {
      if (err) throw `Database error ${err}`

      return callback(results.rows[0].id)
    })
  },
  find(id, callback) {

    db.query(`SELECT recipes.*, chefs.name AS chef_name
    FROM recipes
    LEFT JOIN chefs ON (recipes.chef_id = chefs.id)
    WHERE recipes.id = $1`, [id], function (err, results) {
      if (err) throw `Database error ${err}`

      callback(results.rows[0])
    })
  },
  update(data, callback) {

    const query = `
    UPDATE recipes SET
    chef_id=($1),
    title=($2),
    ingredients=($3),
    preparation=($4),
    information=($5)
    WHERE id = $6`


    const values = [
      data.chef_id,
      data.title,
      data.ingredients,
      data.preparation,
      data.information,
      data.id
    ]

    db.query(query, values, function (err, results) {
      if (err) throw `Database error ${err}`

      callback()
    })

  },
  delete(id, callback) {
    db.query(`DELETE FROM recipes WHERE id = $1`, [id], function (err, results) {
      if (err) throw `Database error ${err}`

      return callback()
    })
  },
  chefOptions(callback) {
    db.query(`SELECT name, id FROM chefs`, function (err, results) {
      if (err) throw `Database error ${err}`

      callback(results.rows)
    })
  },
}