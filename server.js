// server.js

const express = require('express');
const path = require('path');
const supabase = require('./supabase');
const bodyParser = require('body-parser');


const app = express();
const PORT = process.env.PORT || 3000; // Utilisez le port défini dans les variables d'environnement ou utilisez le port 3000 par défaut
app.use(bodyParser.json());
// Définissez le dossier de fichiers statiques
app.use('/static', express.static(__dirname + '/public'));

// Définissez une route pour servir votre page HTML
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'pages/login_page.html'));
});

app.get('/home', (req, res) => {
    res.sendFile(path.join(__dirname, 'pages/blog_page.html'));
});



// Route pour récupérer les articles
app.get('/api/articles', async (req, res) => {
    try {
        const articles = await supabase.getArticles();
        res.json(articles);
    } catch (error) {
        console.error('Erreur lors de la récupération des articles:', error.message);
        res.status(500).json({ error: 'Erreur lors de la récupération des articles' });
    }
});

// Route pour récupérer les utilisateurs
app.get('/api/users', async (req, res) => {
    try {
        const users = await supabase.getUsers();
        res.json(users);
    } catch (error) {
        console.error('Erreur lors de la récupération des utilisateurs:', error.message);
        res.status(500).json({ error: 'Erreur lors de la récupération des utilisateurs' });
    }
});

// Route pour récupérer les commentaires
app.get('/api/comments', async (req, res) => {
    try {
        const comments = await supabase.getComments();
        res.json(comments);
    } catch (error) {
        console.error('Erreur lors de la récupération des commentaires:', error.message);
        res.status(500).json({ error: 'Erreur lors de la récupération des commentaires' });
    }
});

app.post('/api/validateUser', async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ error: 'Username or password is missing' });
        }

        const users = await supabase.validateUser(username, password);

        if (!users) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json(users);
    } catch (error) {
        console.error('Erreur lors de la validation de l\'utilisateur:', error.message);
        res.status(500).json({ error: 'Erreur lors de la validation de l\'utilisateur' });
    }
});

app.post('/api/createUser', async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({ error: 'Username, email, or password is missing' });
        }

        const user = await supabase.createUser(username, email, password);
        console.log(user);
        // if (!user) {
        //     return res.status(500).json({ error: 'Failed to create user' });
        // }

        res.json(user);
    } catch (error) {
        console.error('Erreur lors de la création de l\'utilisateur:', error.message);
        res.status(500).json({ error: 'Erreur lors de la création de l\'utilisateur' });
    }
});



// Vérification de la connexion à la base de données Supabase au démarrage du serveur
(async () => {
    try {
        // Vérifier la connexion à Supabase en récupérant les articles
        const articles = await supabase.getArticles();

        if (!articles) {
            console.error('Impossible de se connecter à Supabase: Erreur lors de la récupération des articles');
            process.exit(1); // Quitter le processus du serveur en cas d'erreur de connexion à Supabase
        } else {
            console.log('Connexion à Supabase réussie.');
        }
    } catch (error) {
        console.error('Erreur lors de la connexion à Supabase:', error.message);
        process.exit(1); // Quitter le processus du serveur en cas d'erreur de connexion à Supabase
    }
})();

// Démarrez le serveur
app.listen(PORT, () => {
    console.log(`Le serveur est en cours d'exécution sur le port ${PORT}`);
});
