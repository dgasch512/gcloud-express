
const handleBlogGet = (req, res, db) => {
  db('stories')
    .returning('*')
    .then(story => {
      res.json(story)
    })
}


module.exports = {
  handleBlogGet: handleBlogGet
}