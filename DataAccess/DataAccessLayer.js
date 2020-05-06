const { MongoClient, ObjectId } = require('mongodb');
const uri = process.env.ATLAS_CONNECTION;

const getConnectedClient = async () => {
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    return await client.connect()
}

const getAllBreedsCollection = async () => {
    return await client.db("dog-breeds").collection("all-breeds")
}

const getAllBreeds = async () => {
    const client = await getConnectedClient()

    try {
        const collection = await getAllBreedsCollection(client)
        return await collection.find().toArray()
    } finally {
        client.close()
    }
}

const createDogBreed = async (dogBreed) => {
    const client = await getConnectedClient()

    try {
        const collection = await getAllBreedsCollection(client)
        return await collection.insertOne(dogBreed)
    } finally {
       client.close()
    }
}


const editDogBreed = async (dogBreed) => {
    const client = await getConnectedClient()
    const { _id, ...dogBreedToUpdate } = dogBreed

    try {
        const collection = await getAllBreedsCollection(client)
        await collection.updateOne({ _id: ObjectId(_id) }, {
            $set: dogBreedToUpdate
        })
    } finally {
        client.close()
    }
}

const deleteDogBreed = async (dogBreedId) => {
    const client = await getConnectedClient()

    try {
        const collection = await getAllBreedsCollection(client)
        await collection.deleteOne({ _id: ObjectId(dogBreedId)})
    } finally {
        client.close()
    }
} 

module.exports = {
    getAllBreeds,
    createDogBreed,
    editDogBreed,
    deleteDogBreed
}
