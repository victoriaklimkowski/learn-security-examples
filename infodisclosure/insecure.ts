import express, { Request, Response } from 'express';
import mongoose, { Schema, Document, Model } from 'mongoose';

const app = express();
const port = 3000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/infodisclosure')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

// Define an interface for the User document
interface IUser extends Document {
  username: string;
  password: string;
}

// Define a Mongoose schema
const userSchema: Schema<IUser> = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
});

// Create a Mongoose model based on the schema
const User: Model<IUser> = mongoose.model<IUser>('User', userSchema);

// Route to authenticate user (VULNERABLE TO NOSQL INJECTION)
app.get('/userinfo', async (req: Request, res: Response) => {
  // req.query comes from the user
  const { username } = req.query;
  // Also a threat, could associate with other logs to get more info
  console.log(username); 
  // Vulnerable code: Directly using user-provided values in the query
  // without sanitization so also tampering vulnerability
  // So could have SQL injection like SELECT * FROM users to get all un and passwords
  // findOne is slightly more secure than find because they can only return one result
  // but still problematic for the other reasons
  // So this is a information disclosure vulnarability carried out by tampering
  const user = await User.findOne({ username: username as string }).exec();

  if (user) {
    res.send(`User: ${user}`);
  } else {
    res.status(401).send('Invalid username or password');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
