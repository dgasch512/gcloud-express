
const handleRequest = (req, res, db) => {
  const { firstname, lastname, phone, pickuplocation, dropofflocation, comments } = req.body;
  db('rides')
    .returning('*')
    .insert({
      firstname: firstname,
      lastname: lastname,
      phone: phone,
      pickuplocation: pickuplocation,
      dropofflocation: dropofflocation,
      comments: comments,
      ridetime: new Date()
    })
    .then(ride => {
      res.json(ride)
    })
    .catch(err => res.status(400).json('cannot request a ride')) 
}


module.exports = {
  handleRequest: handleRequest
}