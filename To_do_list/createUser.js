const User = require('./models/User');

const newUser = {
    username: 'quentin',
    password: 'Esilv123!',
    role: 'user',
    lastname: 'Leveque',
    firstname: 'Quentin',
    dob: new Date('2004-02-21'),
};

User.create(newUser)
    .then((createdUser) => {
        console.log('User créé avec succès:', createdUser);
    })
    .catch((error) => {
        console.error('Erreur à la création de l\'user:', error);
    });