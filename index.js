const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
app.use(express.json());

const port = process.env.PORT || 5000;
app.use(cors());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });

const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB conectado com sucesso!!");
});

const pokeRoutes = require('./controllers/pokeControl');

app.use('/pokemons', pokeRoutes);
app.use('/pokemons/add', pokeRoutes);
app.use('/pokemons/:id', pokeRoutes);

app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

// error handler middleware
app.use((error, req, res, next) => {
    res.status(error.status || 500).send({
      error: {
        status: error.status || 500,
        message: error.message || 'Internal Server Error',
      },
    });
  });

app.listen(port, () => console.log(`Servidor no ar, na porta: ${port}`));
