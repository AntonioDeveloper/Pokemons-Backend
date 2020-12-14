const express = require('express');
const router = express.Router();
let Pokemons = require('../models/Pokemons');
//const ObjectId = require('mongoose').Types.ObjectId;

router.get('/', (req, res) => {
  Pokemons.find()
  .then(pokemon => res.json(pokemon))
  .catch(err => res.status(404).json('Nada feito :('));
});

router.post('/add', (req, res) => {
  const name = req.body.name;
  const img = req.body.img;
  const hp = req.body.hp;
  const attack = req.body.attack;
  const defense = req.body.defense;
  const speed = req.body.speed;
  const active = req.body.active;

  const novoPokemon = new Pokemons ({
    name,
    img,
    hp,
    attack,
    defense,
    speed,
    active,
  });

  novoPokemon.save() 
  .then(() => res.json('Pokemon adicionado!'))
  .catch(err => res.status(404).json('Pokemon NÃO adicionado :('));
});

router.get('/:id', (res, req) => {
  Pokemons.findById()
  .then(pokemon => res.json(pokemon))
  .catch(err => res.status(400).json('Pokemon não encontrado'));
})

router.put('/:id', (req, res) => {
  if(!ObjectId.isValid(req.params.id)){
    return res.status(400).send('Nenhum Pokemón com esse id: ' + req.params.id);
  } 

  let atualizarPokemon = {
    img: req.body.img,
    hp: req.body.hp,
    attack: req.body.attack,
    defense: req.body.defense,
    speed: req.body.speed,
    active: req.body.active,
  }

  PokeSchema.findByIdAndUpdate(req.params.id, {$set: atualizarPokemon}, (err, docs) => {
    if(!err){
      res.send(docs);
    } else {
      console.log('Erro ao atualizar.');
    }
  })
});

// router.delete('/:id', (req, res) => {
//   if(!ObjectId.isValid(req.params.id)){
//     return res.status(400).send('Nenhum Pokemón com esse id: ' + req.params.id);
//   }; 

//   PokeSchema.findByIdAndRemove(req.params.id, (err, docs) => {
//     if(!err){
//       res.send(JSON.parse(docs));
//     } else {
//       console.log('Erro ao atualizar.');
//     }
//   });

// })

module.exports = router;