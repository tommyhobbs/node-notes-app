const fs = require('fs');

const yargs = require('yargs');
const notes = require('./notes');

yargs.version('1.1.0');

yargs.command({
  command: 'add',
  describe: 'Add a new note',
  builder: {
    title: {
      describe: 'Note title',
      demand: true,
      type: 'string'
    },
    body: {
      describe: 'Note body',
      demand: true,
      type: 'string'
    }
  },
  handler: argv => {
    notes.addNote(argv.title, argv.body);
  }
});

yargs.command({
  command: 'remove',
  describe: 'Remove a note',
  handler: ({ title }) => {
    notes.removeNote(title);
  }
});

yargs.command({
  command: 'list',
  describe: 'List the notes',
  handler: () => {
    notes.listNotes();
  }
});

yargs.command({
  command: 'read',
  describe: 'Read a note',
  builder: {
    title: {
      describe: 'Note title',
      demand: true,
      type: 'string'
    }
  },
  handler: ({ title }) => {
    notes.readNote(title);
  }
});

yargs.parse();
