const express = require('express');
const router = express.Router();
const mongodb = require('mongodb');

// Get Posts
router.get('/', async (req, res) => {
    const posts = await loadPostsCollection();
    res.send(await posts.find({}).toArray());
});

// Add Post
router.post('/', async (req, res) => {
    const posts = await loadPostsCollection();
    await posts.insertOne({
        text: req.body.text,
        createdAt: new Date()
    });
    res.status(201).send();
});

router.delete('/:id', async (req, res) => {
    const posts = await loadPostsCollection();
    await posts.deleteOne({_id: new mongodb.ObjectID(req.params.id) });
    res.status(200).send();
});



async function loadPostsCollection() {
    const client = await mongodb.MongoClient.connect(
        'mongodb+srv://haohao:phuhao1999@cluster0-uwwmn.mongodb.net/test?retryWrites=true&w=majority',
        {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
    );
    return client.db('traversy_vue').collection('first');
}

module.exports = router;
