
const handleBlogGet = (req, res, db) => {
  db.select('*').from('stories')
    .then(data => {
      if (data.length) {
       res.json(data) 
      } else {
        res.status(400).json('Not found')
      }
    })
    .catch(err => (req, res) => {
      console.log('This is it')
    })
}



module.exports = {
  handleBlogGet: handleBlogGet
}