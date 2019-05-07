const fs = require('fs');
const chalk = require('chalk');

const addNote = (title, body) => {
  const notes = loadNotes();
  const duplicateNote = notes.find(note => note.tile === title);

  if (!duplicateNote) {
    notes.push({ title, body });
    saveNotes(notes);
    console.log(chalk.green.inverse('New note added'));
  } else {
    console.log(chalk.red.inverse('Note title taken'));
  }
};

const removeNote = title => {
  const notes = loadNotes();
  const reducedNotes = notes.filter(note => note.title !== title);

  if (reducedNotes.length === notes.length) {
    console.log(chalk.red.inverse('No note with the provided title found'));
  } else {
    saveNotes(reducedNotes);
    console.log(chalk.green.inverse(`Note with Title "${title}" removed`));
  }
};

const listNotes = () => {
  const notes = loadNotes();
  console.log(chalk.yellow.inverse('Notes:'));
  notes.forEach((note, i) => {
    console.log(`${i + 1}. ${note.title}`);
  });
};

const readNote = title => {
  const notes = loadNotes();
  const note = notes.find(note => note.title === title);

  if (note) {
    console.log(chalk.bold.cyan(note.title));
    console.log(note.body);
  } else {
    chalk.red.inverse('No note with the provided title found');
  }
};

const loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync('notes.json');
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (e) {
    return [];
  }
};

const saveNotes = notes => {
  const dataJSON = JSON.stringify(notes);
  fs.writeFileSync('notes.json', dataJSON);
};

module.exports = {
  listNotes,
  addNote,
  removeNote,
  readNote
};
