const express = require('express');
const path = require('path');
const mongoose =require( 'mongoose');
const dotenv=require('dotenv');

const app = express();

const Product = require('./models/product');
const Contact = require('./models/contact');
const Category = require('./models/category');
const Featured = require('./models/feature-product');


dotenv.config();

// middleware 
// app.use works for every "request" as it has no path 
// req is the object that is created for every HTTP request

app.use(express.static('public'));
app.use(express.urlencoded({extended:true}));

// Parse URL-encoded form data (from HTML forms) into req.body
// 'extended: true' allows nested objects in forms

app.use(express.json());
// Parse incoming JSON payloads into req.body


//middleware for authorization


// this is to simulate that who is making the request 
// this is where the entire "verification occurs"
app.use((req,res,next) => {
    //simulate the logged-in user
    //req.user is not in-built...it was developed by me
    req.user = {
        role:"admin"
    };
    next();
});

// this is the "authorization" middleware not "authentication"

function allowRoles(...roles){          // ...roles is the rest operator...allowRoles("admin")....allowRoles("admin","registered") etc....inside this function role becomes like ["admin", "registered"]
    return (req,res,next) =>{
        if(!req.user || !roles.includes(req.user.role)){
            return res.status(403).send("Access denied!...Not your jurisdiction!");
        }
        next();  // this is to pass the control to the next middlware
    };
}

// ...roles here is called a "closure"...the inner function remembers roles even after the allowRoles has finished executing
// a 403 error shows "forbidden"



//-----------------------mongoose connection----------------

mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log('Atlas connected !'))
.catch(err => console.log(err));

// ----------------------------------------------------------

// the post request for the contacts
app.post('/submit-contact',allowRoles("users","registered", "admin") ,async (req,res) => {
    try{
        const newEntry = new Contact(req.body);


        res.send("form submitted successfully ! ");

        //saving it to atlas
        await newEntry.save();
        
    }catch(err){
        res.status(500).send("Error: " + err.message);
    }
});

// the get request for the contacts 

app.get("/api/contacts" ,allowRoles("admin") ,async(req,res) => {
    const contacts = await Contact.find().sort({submittedAt:-1});
    res.json(contacts);
})


// the update request for the contacts

app.post("/api/contacts/update/:id" ,allowRoles("users","registered", "admin"),async (req , res) => {
    await Contact.findByIdAndUpdate(req.params.id,req.body);
    res.send("Contact udpated");
});

// the delete request for the contacts

app.delete("/api/contacts/delete/:id",allowRoles("users","registered", "admin") ,async (req,res) => {
    await Contact.findByIdAndDelete(req.params.id);
    res.send("Contact deleted")
});

// the get query for the products entity
app.get('/api/products',allowRoles("users", "registered", "admin"),async (req,res)=>{
try{
    
    const query = {};

    if(req.query.category){
        query.category = req.query.category;
    }

    const limit = req.query.limit ? parseInt(req.query.limit):0;

    const products = await Product.find(query)
    .sort({name:1})
    .limit(limit);

    res.json(products);

}catch(err){
    res.status(500).json({error: err.message});
}
});

// the post query for the products entity
app.post("/api/products/add", allowRoles("admin") ,async (req,res) => {
    const product = new Product(req.body);
    await product.save();
    res.send("Product added");
})

// the update query for the products entity
app.post("/api/products/update/:id",allowRoles("admin"),async (req,res) => {
    await Product.findByIdAndUpdate(req.params.id , req.body);
    res.send("Product updated");
})

// the update query for products entity
app.delete("/api/products/delete/:id" ,allowRoles("admin") ,async (req,res)=> {
    await Product.findByIdAndDelete(req.params.id);
    res.send("Product deleted");
});

// getting using slug..this is for click later
app.get("/api/products/:slug", allowRoles("users", "registered", "admin"), async (req, res) => {
  try {
    const item = await Product.findOne({ slug: req.params.slug });

    if (!item) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



// the get query for the categories entity
app.get("/api/categories",allowRoles("users", "registered", "admin"),async(req,res) => {
    try{
        const categories=await Category.find().sort({name:1});
        res.json(categories);

    }catch(err){
        res.status(500).json({error:err.message});
    }
})

// the post query for the categories entity
app.post("/api/categories/add" ,allowRoles("admin") ,async(req,res)=>{
    const category = Category(req.body);
    await category.save();
    res.send("category added");
});

// the update query for the categories entity
app.post("/api/categories/update/:id" ,allowRoles("admin") ,async (req,res)=>{
    await Category.findByIdAndUpdate(req.params.id , req.body);
    res.send("Category updated");
});

// the delete query for the categories entity
app.delete("/api/categories/delete/:id" ,allowRoles("admin") ,async(req,res)=>{
    await Category.findByIdAndDelete(req.params.id);
    res.send("Category deleted");
});


// the get query for the featured entity
app.get("/api/featured", allowRoles("users", "registered", "admin"), async (req, res) => {
  try {
    const query = {};

    // optional: /api/featured?isFeatured=true
    if (req.query.isFeatured) {
      query.isFeatured = req.query.isFeatured === "true";
    }

    const limit = req.query.limit ? parseInt(req.query.limit) : 0;

    const featured = await Featured.find(query)
      .sort({ name: 1 })
      .limit(limit);

    res.json(featured);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



// the post query for the features 
app.post("/api/featured/add", allowRoles("admin"), async (req, res) => {
  try {
    const featured = new Featured(req.body);
    await featured.save();
    res.send("Featured product added");
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// the update query for the features
app.post("/api/featured/update/:id", allowRoles("admin"), async (req, res) => {
  try {
    await Featured.findByIdAndUpdate(req.params.id, req.body);
    res.send("Featured product updated");
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// the delete query for the features
app.delete("/api/featured/delete/:id", allowRoles("admin"), async (req, res) => {
  try {
    await Featured.findByIdAndDelete(req.params.id);
    res.send("Featured product deleted");
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// getting using slug...this is for click later
app.get("/api/featured/:slug", allowRoles("users", "registered", "admin"), async (req, res) => {
  try {
    const item = await Featured.findOne({ slug: req.params.slug });

    if (!item) {
      return res.status(404).json({ error: "Featured product not found" });
    }

    res.json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});




app.listen(3000, () => console.log('Server running at http://localhost:3000'));


