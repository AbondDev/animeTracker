const Anime = require('../models/Anime');

module.exports.getIndex = async (req,res) => {
  const animes = await Anime.find({});
  try{
    console.log(animes);
    // res.status(200).render('index', {animes})
    res.json(anime);
  } catch (error) {
    console.log(error)
  }
}

module.exports.getAnime = async (req,res) => {
  const animeId = req.params.animeId;

  const anime = await Anime.findById(animeId)

  try {
    console.log(anime);
    res.status(200).render('anime', {anime})
  } catch (error) {
    console.log(error);
  }
}

module.exports.getAddAnime = (req,res) => {
  res.status(200).render('edit-anime',{editing: false});
}

module.exports.getEditAnime = async (req,res) => {
  const {animeId} = req.params;

  const editMode = req.query.edit;

  if(!editMode) {
    return res.redirect('/')
  }

  const anime = await Anime.findById(animeId);

  try {
    if(!animeId) {
      return res.redirect('/');
    }
    console.log(anime);
    res.status(200).render('edit-anime', {anime:anime, editing: editMode})
  } catch (err) {
    console.log(err);
  }
}

module.exports.postAnime = (req,res) => {
  const {name, image, description} = req.body;
  const anime = new Anime({name: name, image: image, description: description});
  anime.save();
  console.log('anime added to the database')
  res.status(201).redirect('http://localhost:3000/');
}

module.exports.postEditAnime = (req,res) => {
  const {name,image,description, animeId} = req.body;
  Anime.findById(animeId)
    .then((anime) => {
      anime.name = name;
      anime.image = image;
      anime.description = description;

      return anime.save();
    })
    .then(() => {
      console.log('item updated');
      res.status(201).redirect('/');
    })
    .catch((err) => {
      console.log(err)
    })
}

module.exports.postDelete = async (req,res) => {
  const animeId = req.body.animeId;

  const anime = Anime.findByIdAndRemove(animeId);
  try {
    console.log(anime);
    console.log('Item Deleted');
    res.redirect('/');
  } catch (error) {
    console.log(error);
  }
}
