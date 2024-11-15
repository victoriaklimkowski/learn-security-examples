import express, { Request, Response } from "express";
import session from "express-session";

const app = express();

// Enter session secret key as an argument
const secret: string = process.argv[2];

app.use(express.urlencoded({ extended: false }));

// Extend the SessionData interface to include custom session properties
declare module 'express-session' {
  interface SessionData {
    user?: string;
    sensitive?: string;
  }
}

app.use(
  session({
    secret: `${secret}`,
    cookie: {
        httpOnly: true,
        sameSite: 'strict', // Updated for stricter security
    },
    resave: false,
    saveUninitialized: false,
  })
);

app.post("/sensitive", (req: Request, res: Response) => {
  // Tamerping vulnarability: Input data here is not sanitized
  if (req.session.user === 'Admin') {
    req.session.sensitive = 'supersecret';
    res.send({ message: 'Operation successful' });
  } else {
    res.send({ message: 'Unauthorized Access' });
  }
});

app.get("/", (req: Request, res: Response) => {
  let name = "Guest";
  // Safe because we are reading from the session
  // Which we are assuming in this case it is ok
  if (req.session.user) name = req.session.user;

  // Name here is executed as code and was not sanitized!!!
  res.send(`
  <h1>Welcome, ${name}</h1>
  <form action="/register" method="POST">
    <input type="text" name="name" placeholder="Your name">
    <button>Submit</button>
  </form>
  <form action="/forget" method="POST">
    <button>Logout</button>
  </form>
  `);
});

app.post("/register", (req: Request, res: Response) => {
  // Tampering vulnarabilty: Input data here is not sanitized
  // and is read from req.body which is direct from user
  req.session.user = req.body.name.trim();
  res.send(`<p>Thank you</p> <a href="/">Back home</a>`);
});

app.post("/forget", (req: Request, res: Response) => {
  req.session.destroy(err => {
    res.redirect("/");
  });
});

app.listen(8000, () => {
  console.log("Server is running on port 8000");
});
