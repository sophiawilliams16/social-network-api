const connection = require("../config/connection");
const { User, Thought } = require("../models");
const { userData, thoughtData } = require("./data");

connection.on("error", (err) => err);

connection.once("open", async () => {
    console.log("connected");
    // Delete the collections if they exist
    let thoughtCheck = await connection.db
        .listCollections({ name: "thoughts" })
        .toArray();
    if (thoughtCheck.length) {
        await connection.dropCollection("thoughts");
    }

    let userCheck = await connection.db
        .listCollections({ name: "users" })
        .toArray();
    if (userCheck.length) {
        await connection.dropCollection("users");
    }

    // const users = [userData];
    // const thoughts = [thoughtData];

    // for (let i = 0; i < 20; i++) {
    //     const fullName = getRandomName();
    //     const username = fullName.split(" ")[0];
    //     const last = fullName.split(" ")[1];

    //     users.push({
    //         first,
    //         last,
    //         age: Math.floor(Math.random() * (99 - 18 + 1) + 18),
    //     });
    // }

    await User.collection.insertMany(userData);
    await Thought.collection.insertMany(thoughtData);

    // loop through the saved applications, for each application we need to generate a application response and insert the application responses
    // console.table(users);
    // console.table(thoughts);
    console.info("Seeding complete! 🌱");
    process.exit(0);
});
