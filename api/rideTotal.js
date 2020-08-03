
const rideTotal = (req, res, db) => {
  const { id } = req.body;
  db('drivers').where('id', '=', id)
  .increment('ridesTot', 1)
  .returning('ridesTot')
  .then(ridesTot => {
    res.json(ridesTot[0])
  })
  .catch(err => res.status(400).json('unable to get count of rides'))
}




module.exports = {
  rideTotal: rideTotal
}