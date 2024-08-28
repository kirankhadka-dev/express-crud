import express from 'express';

const app = express();
const port = 3001;

app.use(express.json());

let teaData = [];
let nextID = 1;

// Add Tea
app.post('/teas', (req, res) => {
    const { name, price } = req.body;

    if (!name || !price) {
        return res.status(400).send("Name and price are required.");
    }

    const newTea = { id: nextID++, name, price };
    teaData.push(newTea);

    res.status(201).json(newTea);
});

// Get All Teas
app.get('/teas', (req, res) => {
    res.status(200).json(teaData);
});

// Get Tea by ID
app.get('/teas/:id', (req, res) => {
    const tea = teaData.find(tea => tea.id === parseInt(req.params.id));
    
    if (!tea) {
        return res.status(404).send("Tea Not Found");
    }

    res.status(200).json(tea);
});

// Update Tea
app.put('/teas/:id', (req, res) => {
    const tea = teaData.find(tea => tea.id === parseInt(req.params.id));

    if (!tea) {
        return res.status(404).send("Tea Not Found");
    }

    const { name, price } = req.body;

    if (!name || !price) {
        return res.status(400).send("Name and price are required.");
    }

    tea.name = name;
    tea.price = price;

    res.status(200).json(tea);
});

// Delete Tea
app.delete('/teas/:id', (req, res) => {
    const index = teaData.findIndex(tea => tea.id === parseInt(req.params.id));

    if (index === -1) {
        return res.status(404).send("Tea Not Found");
    }

    teaData.splice(index, 1);

    res.status(204).send(); // No content response
});

app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`);
});

export default app; // For testing purposes
