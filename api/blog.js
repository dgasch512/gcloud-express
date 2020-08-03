
const handleBlogGet = (req, res, db) => {
  db('stories')
    .returning('*')
    .then(stories => {
      res.json(stories)
    })
}



module.exports = {
  handleBlogGet: handleBlogGet
}