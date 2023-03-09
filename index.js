const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const uri = 'mongodb+srv://qwerty:<password>@cluster0.ttpvrlo.mongodb.net/?retryWrites=true&w=majority';

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Database connected successfully'))
  .catch(err => console.log(err));

const inventorySchema = new mongoose.Schema({
  name: String,
  quantity: Number,
  imageUrl: String,
});

const Inventory = mongoose.model('Inventory', inventorySchema);

app.post('/api/inventory', (req, res) => {
  const { name, quantity, imageUrl } = req.body;
  const inventory = new Inventory({ name, quantity, imageUrl });
  inventory.save()
    .then(() => res.status(200).json({ message: 'Inventory item saved successfully' }))
    .catch(err => res.status(500).json({ message: err.message }));
});

app.get('/api/inventory', (req, res) => {
  Inventory.find()
    .then(items => res.status(200).json(items))
    .catch(err => res.status(500).json({ message: err.message }));
});

app.put('/api/inventory/:id', (req, res) => {
  const { name, quantity } = req.body;
  Inventory.findByIdAndUpdate(req.params.id, { name, quantity }, { new: true })
    .then(item => res.status(200).json(item))
    .catch(err => res.status(500).json({ message: err.message }));
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
