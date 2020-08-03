
const handleAdminID = (req,res, db) => {
  const { id } = req.params;
    db.select('*').from('drivers').where({id})
    .then(driver => {
      if (driver.length) {
        res.json(driver[0]) 
      } else {
        res.status(400).json('Not found')
      }
    })
    .catch(err => res.status(400).json('error getting user'))
}


module.exports = {
  handleAdminID: handleAdminID
}