import "reflect-metadata";
import express from "express";
import { DataSource, getRepository } from "typeorm";
import { User } from "./entity/User";
import { Post } from "./entity/Post";

const app = express();
app.use(express.json());

const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST || "localhost",
  port: 3306,
  username: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "password",
  database: process.env.DB_NAME || "test_db",
  entities: [User, Post],
  synchronize: true,
});

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const initializeDatabase = async () => {
  await wait(20000);
  try {
    await AppDataSource.initialize();
    console.log("Data Source has been initialized!");
  } catch (err) {
    console.error("Error during Data Source initialization:", err);
    process.exit(1);
  }
};

initializeDatabase();

app.post("/users", async (req, res) => {
  // Crie o endpoint de users
  try {
    const newUser = new User();
    newUser.firstName = req.body.firstName;
    newUser.lastName = req.body.lastName;
    newUser.email = req.body.email;

    const userRepository = getRepository(User);
    await userRepository.save(newUser);

    res.status(201).json({ message: "User created successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating user" });
  }
});

app.post("/posts", async (req, res) => {
  // Crie o endpoint de posts
  try {
    const newPost = new Post();
    newPost.title = req.body.title;
    newPost.description = req.body.description;

    const userRepository = getRepository(Post);
    await userRepository.save(newPost);

    res.status(201).json({ message: "Post created successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating post" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
