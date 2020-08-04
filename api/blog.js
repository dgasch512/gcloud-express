
const handleBlogGet = (req, res, db) => {
  db('stories')
    .returning('*')
    .then(stories => {
      res.json(stories)
    })
    .catch(err, (req, res) => {
      console.log('This is it')
    })
}



module.exports = {
  handleBlogGet: handleBlogGet
}