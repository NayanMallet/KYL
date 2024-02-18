// supabase.js

require('dotenv').config();

const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

async function getArticles() {
    const { data: articles, error } = await supabase
        .from('articles')
        .select('*');

    if (error) {
        console.error('Erreur lors de la récupération des articles:', error.message);
        return null;
    }

    return articles;
}

async function getUsers() {
    const { data: users, error } = await supabase
        .from('users')
        .select('*');

    if (error) {
        console.error('Erreur lors de la récupération des utilisateurs:', error.message);
        return null;
    }

    return users;
}

async function validateUser(username, password) {
    const { data: users, error } = await supabase
        .from('users')
        .select('*')
        .eq('username', username)
        .eq('password', password);

    if (error) {
        console.error('Erreur lors de la validation de l\'utilisateur:', error.message);
        return null;
    }

    return users;
}

async function createUser(username, email, password) {
    console.log(username, email, password);
    const { data: user, error } = await supabase
        .from('users')
        .insert([
            { username, email, password }
        ]);

    if (error) {
        console.error('Erreur lors de la création de l\'utilisateur:', error.message);
        return null;
    }

    return user;
}



async function getComments() {
    const { data: comments, error } = await supabase
        .from('comments')
        .select('*');

    if (error) {
        console.error('Erreur lors de la récupération des commentaires:', error.message);
        return null;
    }

    return comments;
}

module.exports = {
    getArticles,
    getUsers,
    getComments,
    validateUser,
    createUser
};