import express from "express";
import bcrypt from "bcrypt";

const app = express();
const port = 3000;

// In-memory
const users = [
  {
    email: 'farid@gmail.com',
    password: '$2b$10$BNWWIk1gDEAhqneCdwHfGuSmTaP2xsDn/C.dqoqVtAv3yKq6CSg0K',
    role: "admin"
  },
  {
    email: "sohieb@gmail.com", password: "$2b$10$BNWWIk1gDEAhqneCdwHfGuSmTaP2xsDn/C.dqoqVtAv3yKq6CSg0K", 
    role: "student"
  },
  {
    email: "mohanned@gmail.com", 
    password: "$2b$10$BNWWIk1gDEAhqneCdwHfGuSmTaP2xsDn/C.dqoqVtAv3yKq6CSg0K", 
    role: "teacher"
  }
];

app.use(express.json());
/* 
app.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;
    // Find user
    const findUser = users.find((data) => email == data.email);
    if (findUser) {
      res.status(400).send("Wrong email or password !");
    }
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    users.push({ email, password: hashedPassword });
    console.log(users)
    res.status(201).send("Registered successfully!");
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
}); */

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    // Find user
    const findUser = users.find((data) => email == data.email);
    if (!findUser) {
      res.status(400).send("Wrong email or password !");
    }
    const passwordMatch = await bcrypt.compare(password, findUser.password);
    if(passwordMatch) {
        res.status(200).send("Logged in successfully!")
    } else {
        res.status(400).send("Wrong email or password !");
    }
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
  switch(user.role) {
    case 'admin':
      res.redirect("/admin");
      break;
    case 'teacher':
      res.redirect('/teacher');
      break;
    case 'student':
      res.redirect('/student');
      break;
    default:
      res.status(500).json({ message: 'Invalid role' });
  }
});

app.listen(port, () => {
  console.log("Server is started on port 3000");
});