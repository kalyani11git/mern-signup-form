const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://rcpitwork11:kalyanimali11@cluster0.liobdhs.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";



// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
    
  },
  ssl: true,
  connectTimeoutMS: 10000, // Increase connection timeout in milliseconds (default is 30000)
  socketTimeoutMS: 45000,
  maxPoolSize: 20,  // Maximum concurrent connections
  minPoolSize: 5,
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);
