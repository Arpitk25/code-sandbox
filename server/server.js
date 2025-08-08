// const express = require('express');
// const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const dotenv = require('dotenv');
// const cors = require('cors');

// // Load environment variables
// dotenv.config();

// const app = express();
// const PORT = process.env.PORT || 5000;

// // Middleware
// app.use(bodyParser.json());
// app.use(cors());

// // MongoDB connection
// mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log('MongoDB connected'))
//   .catch(err => console.error('MongoDB connection error:', err));

// // User model
// const UserSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   username: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
//   email: { type: String, required: true },
//   occupation: { type: String, enum: ['student', 'employee'], required: true },
//   age: { type: Number, required: true },
// });

// const User = mongoose.model('User', UserSchema);

// // Routes
// app.post('/signup', async (req, res) => {
//   const { name, username, password, email, occupation, age } = req.body;

//   try {
//     let user = await User.findOne({ username });
//     if (user) {
//       return res.status(400).json({ msg: 'User already exists' });
//     }

//     user = new User({ name, username, password, email, occupation, age });

//     const salt = await bcrypt.genSalt(10);
//     user.password = await bcrypt.hash(password, salt);

//     await user.save();
//     res.status(201).json({ msg: 'User created successfully' });
//   } catch (err) {
//     console.error('Error creating user:', err.message);
//     res.status(500).send('Server error');
//   }
// });

// app.post('/login', async (req, res) => {
//   const { username, password } = req.body;

//   try {
//     let user = await User.findOne({ username });
//     if (!user) {
//       return res.status(400).json({ msg: 'Invalid credentials' });
//     }

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(400).json({ msg: 'Invalid credentials' });
//     }

//     const payload = { userId: user._id };
//     const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

//     res.json({ token });
//   } catch (err) {
//     console.error('Error logging in:', err.message);
//     res.status(500).send('Server error');
//   }
// });

// // Admin route to fetch all users
// app.get('/admin', async (_, res) => {
//   try {
//     const users = await User.find({}, 'name username email occupation age'); // Include additional fields
//     res.json(users);
//   } catch (err) {
//     console.error('Error fetching users:', err.message);
//     res.status(500).send('Server error');
//   }
// });

// app.delete('/admin/:userId', async (req, res) => {
//   const userId = req.params.userId;
//   try {
//     await User.findByIdAndDelete(userId);
//     res.status(200).json({ msg: 'User deleted successfully' });
//   } catch (err) {
//     console.error('Error deleting user:', err.message);
//     res.status(500).send('Server error');
//   }
// });


// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));



require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');

// Ensure JWT secret exists
if (!process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET not set in environment variables");
}

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// User model
const UserSchema = new mongoose.Schema({
  name: String,
  username: { type: String, unique: true },
  password: String,
  email: String,
  occupation: { type: String, enum: ['student', 'employee'] },
  age: Number
});
const User = mongoose.model('User', UserSchema);

// Auth middleware
function authMiddleware(req, res, next) {
  const token = req.header('x-auth-token');
  if (!token) return res.status(401).json({ msg: 'No token, authorization denied' });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.userId;
    next();
  } catch {
    res.status(401).json({ msg: 'Token is not valid' });
  }
}

// Signup
app.post('/signup', async (req, res) => {
  const { name, username, password, email, occupation, age } = req.body;
  try {
    let user = await User.findOne({ username });
    if (user) return res.status(400).json({ msg: 'User already exists' });

    user = new User({ name, username, password, email, occupation, age });
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();
    res.status(201).json({ msg: 'User created successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Login
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    let user = await User.findOne({ username });
    if (!user) return res.status(400).json({ msg: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

    const payload = { userId: user._id };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Admin routes (protected)
app.get('/admin', authMiddleware, async (_, res) => {
  try {
    const users = await User.find({}, 'name username email occupation age');
    res.json(users);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

app.delete('/admin/:userId', authMiddleware, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.userId);
    res.status(200).json({ msg: 'User deleted successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
