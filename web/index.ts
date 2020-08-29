import express from 'express';
import path from 'path';

const PORT = process.env.PORT || 3000;
const app = express();

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
    res.render('pages/index.ejs', { page: 'Home' });
});

app.get('/env/:env', (req, res) => {
    res.render('pages/environment.ejs', { envName: req.params.env, model: `/models/model2/model.json` });
});

app.get('/gallery', (req, res) => {
    res.render('pages/gallery.ejs', { page: 'Gallery' });
});

app.get('/research', (req, res) => {
    res.render('pages/research.ejs', { page: 'Research' });
});

app.get('/about', (req, res) => {
    res.render('pages/about.ejs', { page: 'About' });
});

app.listen(PORT, () => console.log(`Deep Physics running on port ${PORT}.`));