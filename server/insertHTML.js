// Script to insert the HTML study guide files as HTML notes in the database
require('dotenv').config();
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const Note = require('./models/Note');
const User = require('./models/User');

async function insertHTMLNotes() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log('Connected to MongoDB');

  // Find ariv (admin user)
  const ariv = await User.findOne({ username: 'ariv' });
  if (!ariv) {
    console.error('❌ ariv user not found!');
    process.exit(1);
  }
  console.log(`Found admin user: ${ariv.username} (${ariv._id})`);

  // Read HTML files
  const dbmsHTML = fs.readFileSync(path.join(__dirname, '../DBMS_Complete_Study_Guide.html'), 'utf-8');
  const statsHTML = fs.readFileSync(path.join(__dirname, '../StatisticalMethodsAI_StudyGuide.html'), 'utf-8');

  // Delete old plain-text versions of these notes (if they exist)
  await Note.deleteMany({ 
    title: { $in: [
      'DBMS Complete Study Guide — All 3 Units',
      'Statistical Methods for AI — Key Formulas'
    ]}
  });
  console.log('Removed old plain-text versions');

  // Insert HTML notes
  const notes = await Note.insertMany([
    {
      title: 'DBMS Complete Study Guide — All 3 Units',
      content: dbmsHTML,
      author: ariv._id,
      tags: ['dbms', 'database', 'sql', 'normalization', 'study-guide'],
      isPublic: true,
      isHTML: true,
      viewCount: 42
    },
    {
      title: 'Statistical Methods for AI — Complete Study Guide',
      content: statsHTML,
      author: ariv._id,
      tags: ['statistics', 'ai', 'probability', 'regression', 'formulas'],
      isPublic: true,
      isHTML: true,
      viewCount: 35
    }
  ]);

  console.log(`✅ Inserted ${notes.length} HTML notes:`);
  notes.forEach(n => console.log(`   📝 "${n.title}" (isHTML: ${n.isHTML})`));

  process.exit(0);
}

insertHTMLNotes().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
