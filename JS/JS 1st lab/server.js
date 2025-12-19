const express = require('express');
const fs = require('fs');
const app=express();
const DATA_FILE = './inventory.json';

// this is the middleware to parse the JSON body

app.use(express.json());

// this intercepts the incoming raw text
    // it reads the raw json string from the request body
    // it parses the json string into a javascript object
    // it assigns the javascript object to req.body


// making a helper function so that we dont have to repeat the code

// this is to read the data
const readData = () =>{
    const data = fs.readFileSync(DATA_FILE);
    return JSON.parse(data);
    // converting the text to JS array
};

// this is to write the data

const writeData = (data) => {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
    // this converts the array back to the text
};


// creating endpoints here

// for all entries in the inventory
app.get('/inventory', (req, res) => {
    const inventory = readData();
    res.json(inventory);        // this is does two things...sets the header to application/json and sends the response ( stringifies it automatically )
});


// for a specific entity

app.get('/inventory/:id', (req, res) => {
    const inventory = readData();
    const item = inventory.find(i => i.id === parseInt(req.params.id));
    if(item){
        res.json(item);  
    } else {
        res.status(404).send({message: 'Item not found'});
    }   
    
});


// to add a new item to the inventory

app.post('/inventory' , (req , res ) => {
    const inventory= readData() ; 

        const newItem = {
            id: inventory.length > 0 ? inventory[inventory.length - 1].id + 1 : 1,
            name:req.body.name,
            category:req.body.category,
            quantity:req.body.quantity,
            price:req.body.price
        };

    inventory.push(newItem);        // add new item to array
    writeData(inventory);           // write updated array back to file

    res.status(201).send('the new item is added');   // send back the newly created item with 201 status code


}
);


// startig the server 

app.listen(3000 , () => {
    console.log("the server has started to run on localhost:3000");
});











