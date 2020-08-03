
const handlePostArt = (req, res, db) => {
  const { name, image, article } = req.body;
  db('stories')
    .returning('*')
    .insert({
      name: name,
      image: image,
      article: article,
      artpost: new Date()
    })
    .then(story => {
      res.json(story)
    })
    .catch(err => res.status(400).json('cannot post article')) 
}

module.exports = {
  handlePostArt: handlePostArt
}