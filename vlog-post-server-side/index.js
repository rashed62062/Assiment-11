const express = require('express');
const cors = require('cors');
require('dotenv').config()
const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.hgopxu2.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

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

    const BlogCollection = client.db('BlogDB').collection('blog');
    app.get('/blogs', async (req, res) => {
      const page = parseInt(req.query.page) || 1; // Default to page 1
      const limit = parseInt(req.query.limit) || 10; // Default to 10 blogs per page
      const skip = (page - 1) * limit;

      try {
        const blogs = await BlogCollection
          .find()
          .skip(skip)
          .limit(limit)
          .toArray();

        const totalBlogs = await BlogCollection.countDocuments();
        const totalPages = Math.ceil(totalBlogs / limit);

        res.send({
          success: true,
          data: blogs,
          pagination: {
            page,
            limit,
            totalPages,
            totalBlogs,
          },
        });
      } catch (error) {
        res.status(500).send({
          success: false,
          message: 'Failed to fetch blogs',
          error: error.message,
        });
      }
    });
    // pagination
   

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.get('/', (req, res) =>{
    res.send('john is busy shopping')
})

app.listen(port, () =>{
    console.log(` vlog server is running on port: ${port}`);
})
