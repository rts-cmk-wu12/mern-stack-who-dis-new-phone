import express from 'express'
import { MongoClient, ObjectId } from 'mongodb';
import ViteExpress from 'vite-express'

const CONNECTION_STRING = 'mongodb+srv://tofterweb:eoCUAU7bP6GHuvYk@clusterblockpost.ul840.mongodb.net/?retryWrites=true&w=majority&appName=ClusterBlockPost'

const client = new MongoClient(CONNECTION_STRING);
const database = client.db('blogposts');

const PORT = 3000
const app = express()

app.use(express.json())

app.get('/api/posts', async (_, response) => {
    const LIMIT = 10
    const data = database.collection('posts').find().sort({_id: -1}).limit(LIMIT)
    response.json(await data.toArray())
})

app.post('/api/posts', (request, response) => {
    const data = request.body
    database.collection('posts').insertOne(data)
    console.log(data)
})

app.delete('/api/posts/:id', async (request, response) => {
    const {id} = request.params
    database.collection('posts').deleteOne({_id: new ObjectId(id)})
})

ViteExpress.listen(app, PORT, () => console.log(`Server is running at http://localhost:${PORT}/`));