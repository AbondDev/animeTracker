const Anime = require('../models/Anime');

module.exports.getIndex = async (req,res) => {
  const shows = await Anime.find({});
  try{
    console.log(shows);
    res.status(200).render('index', {shows})
  } catch (error) {
    console.log(error)
  }
}

module.exports.getAnime = async (req,res) => {
  const animeId = req.params.animeId;
  console.log(animeId)
  const anime = await Anime.findById(animeId)
  try {
    console.log(anime);
    return res.status(200).render('anime', {anime})
  } catch (error) {
    console.log(error);
  }
}

module.exports.getAddAnime = (req,res) => {
  res.status(200).render('edit-anime');
}

module.exports.postAnime = (req,res) => {
  const {name, image, description} = req.body;
  const anime = new Anime({name: name, image: image, description: description});
  anime.save();
  console.log('anime added to the database')
  res.status(201).redirect('/');
}

module.exports.postDelete = async (req,res) => {
  const animeId = req.body.animeId;

  const anime = Anime.findByIdAndRemove({animeId});
  try {
    console.log(anime);
    console.log('Item Deleted');
    res.redirect('/');
  } catch (error) {
    console.log(error);
  }
}
