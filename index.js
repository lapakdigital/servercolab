const express = require('express');
const fs = require('fs');
const bp = require('body-parser');
const app = express();
const mongoose = require('mongoose');
const Post = require('./Post')
// mongoose.connect('mongodb://localhost:27017/email', {
mongoose.connect(`mongodb+srv://nother:@Tambang123@cluster0.me0po.mongodb.net/email?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, () => {
    console.log('connected to DB!')
});

app.use(bp.json());
app.use(bp.urlencoded({
    extended: true
}));

// app.post('/upload/', async (req, res) => {
//     // console.log(req.body)
//     // const data = req.params.data
//     const post = new Post({
//         email: req.body.email
//     })
//     try {
//         const savedPost = await post.save()
//         res.json(savedPost)
//     } catch (e) {
//         res.json({
//             message: err
//         })
//     }

//     // try {
//     //     fs.appendFileSync('email_database.txt', data + '\n')
//     //     console.log('Data Addded : ' + data)
//     //     res.sendStatus(200)
//     // } catch (e) {
//     //     res.sendStatus(404)
//     // }
// })

app.post('/upload', async (req, res) => {
    const post = new Post({
        email: req.body.email
    })
    try {
        const savedPost = await post.save()
        res.json(savedPost)
    } catch (e) {
        console.log(e)
        res.json({
            message: e.message
        })
    }
})

app.get('/email', async (req, res) => {
    try {
        const post = (await Post.find())[0]
        const id = post.id
        await Post.deleteOne({
            _id: id
        })
        res.json({
            email: post.email
        })
    } catch (e) {
        res.sendStatus(404)
    }
})

// app.get('/email', (req, res) => {
//     try {
//         fs.readFile('email_database.txt', 'utf-8', (err, data) => {
//             const hasil = data.split(/\r?\n/).filter(Boolean)
//             hasil.shift()
//             const result = {
//                 email: hasil[0],
//                 shifted: hasil
//             }
//             const newEmail = result.shifted.join('\n')
//             fs.writeFileSync('email_database.txt', newEmail)
//             if (!result.email) {
//                 res.send({
//                     status: 'Email Habis'
//                 })
//             } else {
//                 console.log('Email Remove : ' + result.email)
//                 res.send({
//                     email: result.email,
//                     status: 'OK'
//                 })
//             }
//         })
//     } catch (e) {
//         console.log(e)
//         res.sendStatus(404)
//     }
// })

app.listen(process.env.PORT)
