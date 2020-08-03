
const handleRegister = (req, res, db, bcrypt) => {
  const { email, name, password } = req.body;
  if (!email || !name || !password) {
    return res.status(400).json('incorrect form submission');
  };
  const hash = bcrypt.hashSync(password)
    db.transaction(trx => {
      trx.insert({
        hash: hash,
        email: email
      })
      .into('login')
      .returning('email')
      .then(loginEmail => {
        return trx('drivers')
          .returning('*')
          .insert({
            email: loginEmail[0],
            name: name,
            registered: new Date()
          })
          .then(driver => {
            res.json(driver[0])
          })
      })
      .then(trx.commit)
      .catch(trx.rollback)
    })
      .catch(err => res.status(404).json('unable to register'))    
  }


module.exports = {
  handleRegister: handleRegister
}