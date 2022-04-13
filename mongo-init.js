db.createUser({
    // This are the credentials you have to call in the Backend @MONGODB_URI
    user: 'somerandomuser',
    pwd: 'a super secure password',
    roles: [{
        role: 'dbOwner', // Check Mongo docs if you want a specific role
        db: 'your db' // Use the same declared in @MONGO_INITDB_DATABASE
    }]
});

// This is for initialization only, once Docker-Compose setup is ready you can drop this collection
db.createCollection('somecollection');
db.somecollection.insertOne({
    foo: 'bar'
});