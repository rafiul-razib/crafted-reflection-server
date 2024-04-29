const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
const port = process.env.PORT || 3000;

// middleware
app.use(cors());
app.use(express.json());


const uri = "mongodb+srv://rafiulrazib:nWQTNeNjH4eZ5cqi@cluster0.gplglww.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const database = client.db("craftsDb");
    const craftsCollection = database.collection("crafts");


    app.get("/crafts", async(req, res)=>{
        const cursor = craftsCollection.find();
        const result = await cursor.toArray();
        res.send(result);
    })

    app.get("/crafts/:id", async(req, res)=>{
      const id = req.params.id
      const query = {_id : new ObjectId(id)}
      const result = await craftsCollection.findOne(query)
      res.send(result);
    })

    app.post("/crafts", async(req, res)=>{
        const product = req.body;
        const result = await craftsCollection.insertOne(product);
        res.send(result);
    })
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.log);

// rafiulrazib
// 22WBTpb1X6uF0rEW

app.get("/", (req, res)=>{
    res.send("Crafted reflection server is running")
})

app.listen(port, ()=>{
    console.log(`Listening to the port ${port}`)
})