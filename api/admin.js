
const handleRidesGet = (req, res, db) => {
  db('rides')
    .returning('*')
    .then(ride => {
      res.json(ride)
    })
}

module.exports = {
  handleRidesGet: handleRidesGet
}