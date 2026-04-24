require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const Note = require('./models/Note');

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    await User.deleteMany({});
    await Note.deleteMany({});
    console.log('Cleared existing data');

    // Create demo user
    const demoUser = await User.create({
      username: 'ariv',
      email: 'ariv@noteshare.com',
      password: 'password123'
    });
    console.log('Created demo user: ariv / ariv@noteshare.com / password123');

    // Create a second user for demo
    const demoUser2 = await User.create({
      username: 'student_cu',
      email: 'student@cu.edu',
      password: 'password123'
    });
    console.log('Created demo user: student_cu / student@cu.edu / password123');

    // Sample notes
    const notes = [
      {
        title: 'DBMS Complete Study Guide — All 3 Units',
        content: `Database Management Systems — Complete Notes

UNIT 1: Introduction to Databases
- A database is an organized, persistent collection of logically related data
- DBMS is software that enables users to define, create, maintain, and control access to a database
- Three-Level Architecture: External (user views), Conceptual (logical structure), Internal (physical storage)
- Keys: Super Key, Candidate Key, Primary Key, Foreign Key, Composite Key
- Integrity Constraints: Entity Integrity (no NULL primary keys), Referential Integrity (foreign key references)

UNIT 2: Normalization & Security
- Functional Dependency: X → Y means X determines Y
- 1NF: Atomic values, no repeating groups
- 2NF: No partial dependencies
- 3NF: No transitive dependencies
- BCNF: Every determinant is a candidate key
- SQL Injection: Prevented by parameterized queries

UNIT 3: Transactions & Recovery
- ACID Properties: Atomicity, Consistency, Isolation, Durability
- Concurrency Control: Shared locks, Exclusive locks, Two-Phase Locking
- Recovery: Write-Ahead Logging (WAL), Checkpoints, UNDO/REDO operations
- Deadlock: Detected via wait-for graph cycles`,
        author: demoUser._id,
        tags: ['dbms', 'database', 'sql', 'normalization', 'study-guide'],
        isPublic: true,
        viewCount: 42
      },
      {
        title: 'Statistical Methods for AI — Key Formulas',
        content: `Statistical Methods for AI — Quick Reference

PROBABILITY:
- P(A∪B) = P(A) + P(B) - P(A∩B)
- Bayes' Theorem: P(A|B) = P(B|A)·P(A) / P(B)

DISTRIBUTIONS:
- Normal: f(x) = (1/σ√2π)·e^(-(x-μ)²/2σ²)
- Binomial: P(X=k) = C(n,k)·p^k·(1-p)^(n-k)
- Poisson: P(X=k) = λ^k·e^(-λ)/k!

REGRESSION:
- Simple Linear: Ŷ = β₀ + β₁X
- β₁ = Sxy/Sxx, β₀ = ȳ - β₁·x̄
- R² = 1 - SSres/SStot (coefficient of determination)

CONFIDENCE INTERVALS:
- CI = x̄ ± z*(σ/√n)
- 95% CI → z* = 1.96
- 99% CI → z* = 2.576

HYPOTHESIS TESTING:
- H₀: Null hypothesis (default assumption)
- Reject H₀ if p-value < α (usually 0.05)
- Type I Error: False positive (reject true H₀)
- Type II Error: False negative (fail to reject false H₀)`,
        author: demoUser._id,
        tags: ['statistics', 'ai', 'probability', 'regression', 'formulas'],
        isPublic: true,
        viewCount: 35
      },
      {
        title: 'JavaScript ES6+ Cheat Sheet',
        content: `Essential Modern JavaScript Features

VARIABLES:
- let: block-scoped, can be reassigned
- const: block-scoped, cannot be reassigned
- var: function-scoped (avoid using)

ARROW FUNCTIONS:
const add = (a, b) => a + b;
const greet = name => \`Hello \${name}\`;

DESTRUCTURING:
const { name, age } = person;
const [first, second] = array;

SPREAD OPERATOR:
const newArr = [...oldArr, newItem];
const newObj = { ...oldObj, newProp: value };

PROMISES & ASYNC/AWAIT:
const data = await fetch('/api/data');
const json = await data.json();

ARRAY METHODS:
.map() - transform each element
.filter() - keep matching elements
.reduce() - accumulate to single value
.find() - first matching element
.forEach() - iterate (no return)

TEMPLATE LITERALS:
\`Hello \${name}, you are \${age} years old\`

MODULES:
export default function() {}
import myFunction from './module';`,
        author: demoUser2._id,
        tags: ['javascript', 'es6', 'cheatsheet', 'web-development'],
        isPublic: true,
        viewCount: 67
      },
      {
        title: 'React.js Quick Start Guide',
        content: `React 18+ Essentials

COMPONENTS:
function MyComponent({ name }) {
  return <h1>Hello {name}</h1>;
}

STATE (useState):
const [count, setCount] = useState(0);
setCount(prev => prev + 1);

EFFECTS (useEffect):
useEffect(() => {
  // runs on mount and when deps change
  fetchData();
  return () => cleanup(); // cleanup function
}, [dependency]);

CONTEXT (useContext):
const ThemeContext = createContext('light');
const theme = useContext(ThemeContext);

CONDITIONAL RENDERING:
{isLoggedIn ? <Dashboard /> : <Login />}
{items.length > 0 && <ItemList items={items} />}

LISTS:
{items.map(item => <Item key={item.id} {...item} />)}

EVENT HANDLING:
<button onClick={() => handleClick(id)}>Click</button>
<input onChange={(e) => setName(e.target.value)} />

AXIOS WITH REACT:
const [data, setData] = useState([]);
useEffect(() => {
  axios.get('/api/items').then(res => setData(res.data));
}, []);`,
        author: demoUser2._id,
        tags: ['react', 'javascript', 'frontend', 'hooks', 'web-development'],
        isPublic: true,
        viewCount: 89
      },
      {
        title: 'Node.js & Express.js Backend Notes',
        content: `Building REST APIs with Node.js & Express

EXPRESS SETUP:
const express = require('express');
const app = express();
app.use(express.json());
app.listen(3000);

ROUTING:
app.get('/api/items', getItems);
app.post('/api/items', createItem);
app.put('/api/items/:id', updateItem);
app.delete('/api/items/:id', deleteItem);

MIDDLEWARE:
- Runs between request and response
- Must call next() to pass control
- app.use(cors()) — enable cross-origin
- app.use(express.json()) — parse JSON body

JWT AUTHENTICATION:
- Register: hash password with bcrypt, save user
- Login: compare password, generate JWT token
- Protect routes: verify JWT in middleware
- Token format: Bearer <token> in Authorization header

MONGOOSE:
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true }
});
const User = mongoose.model('User', userSchema);

ERROR HANDLING:
app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});`,
        author: demoUser._id,
        tags: ['nodejs', 'express', 'backend', 'rest-api', 'jwt'],
        isPublic: true,
        viewCount: 55
      },
      {
        title: 'MongoDB & Mongoose Study Notes',
        content: `MongoDB & Mongoose for Full Stack Development

MONGODB BASICS:
- NoSQL document database
- Stores data as BSON (Binary JSON)
- Collections → Documents → Fields
- No fixed schema (flexible structure)

CRUD OPERATIONS:
db.collection.insertOne({ name: "Alice" })
db.collection.find({ age: { $gt: 20 } })
db.collection.updateOne({ _id: id }, { $set: { name: "Bob" } })
db.collection.deleteOne({ _id: id })

MONGOOSE SCHEMA:
const noteSchema = new Schema({
  title: { type: String, required: true },
  author: { type: Schema.Types.ObjectId, ref: 'User' },
  tags: [String],
  createdAt: { type: Date, default: Date.now }
});

QUERY OPERATORS:
$eq, $ne, $gt, $gte, $lt, $lte
$in, $nin (in array / not in array)
$and, $or, $not
$text (full-text search)

AGGREGATION PIPELINE:
db.notes.aggregate([
  { $match: { isPublic: true } },
  { $group: { _id: "$author", count: { $sum: 1 } } },
  { $sort: { count: -1 } }
]);

INDEXING:
noteSchema.index({ title: 'text', content: 'text' });
// Enables: db.notes.find({ $text: { $search: "keyword" } })`,
        author: demoUser._id,
        tags: ['mongodb', 'mongoose', 'database', 'nosql', 'backend'],
        isPublic: true,
        viewCount: 38
      },
      {
        title: 'My Private Todo List',
        content: `Personal Tasks:
- Finish full stack project
- Submit before deadline
- Prepare for viva questions
- Review JWT authentication flow
- Practice MongoDB aggregation`,
        author: demoUser._id,
        tags: ['personal', 'todo'],
        isPublic: false,
        viewCount: 3
      },
      {
        title: 'CSS Flexbox & Grid Cheat Sheet',
        content: `CSS Layout — Flexbox & Grid Quick Reference

FLEXBOX (1D Layout):
display: flex;
flex-direction: row | column;
justify-content: center | space-between | space-around;
align-items: center | flex-start | flex-end | stretch;
gap: 1rem;

FLEX ITEMS:
flex: 1;          /* grow to fill space */
flex-shrink: 0;   /* don't shrink */
align-self: center;  /* override align-items */

CSS GRID (2D Layout):
display: grid;
grid-template-columns: repeat(3, 1fr);
grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
gap: 1rem;

GRID ITEMS:
grid-column: span 2;    /* span 2 columns */
grid-row: 1 / 3;        /* from row 1 to 3 */

RESPONSIVE PATTERNS:
/* Mobile first */
.container { display: flex; flex-direction: column; }
@media (min-width: 768px) {
  .container { flex-direction: row; }
}

/* Auto-responsive grid */
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
}`,
        author: demoUser2._id,
        tags: ['css', 'flexbox', 'grid', 'responsive', 'web-development'],
        isPublic: true,
        viewCount: 44
      }
    ];

    await Note.insertMany(notes);
    console.log(`Seeded ${notes.length} notes`);

    console.log('\n✅ Database seeded successfully!');
    console.log('\nDemo accounts:');
    console.log('  1. ariv@noteshare.com / password123');
    console.log('  2. student@cu.edu / password123\n');

    process.exit(0);
  } catch (error) {
    console.error('Seed error:', error);
    process.exit(1);
  }
};

seedData();
