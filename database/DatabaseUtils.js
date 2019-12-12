import SQLite from 'react-native-sqlite-storage';

const QUIZZES_DATABASE_VERSION = '1.0';
const QUIZZES_DATABASE_NAME = 'SQLite Quizzes Database';
const QUIZZES_DATABASE_SIZE = 200000;
const QUIZZES_DATABASE = 'quizzes.db';
const QUIZZES_TABLE_NAME = 'Quizzes';
const SELECT_ALL_QUIZZES_QUERY = 'SELECT * FROM ' + QUIZZES_TABLE_NAME + ';';
const INSERT_ALL_QUIZZES_QUERY =
  'INSERT INTO ' +
  QUIZZES_TABLE_NAME +
  ' (id, name, description, tags, level, numberOfTasks) VALUES (?, ?, ?, ?, ?, ?);';

let database;

SQLite.enablePromise(true);
SQLite.DEBUG(true);

export const loadQuizzesFromDatabase = () => {
  database
    .executeSql(SELECT_ALL_QUIZZES_QUERY)
    .then(result => {
      console.log('loadQuizzesFromDatabase END: ', result[0].rows);
    })
    .catch(error => console.error('loadQuizzesFromDatabase error', error));
};

export const insertQuizzesIntoDatabase = quizzes => {
  console.log('insertQuizzesIntoDatabase called');
  quizzes.forEach(quiz => {
    const {id, name, description, tags, level, numberOfTasks} = quiz;
    database
      .executeSql(INSERT_ALL_QUIZZES_QUERY, [
        id,
        name,
        description,
        tags,
        level,
        numberOfTasks,
      ])
      .then(result => {
        console.log('insertQuizzesIntoDatabase END: ', result);
      })
      .catch(() => console.error('insertQuizzesIntoDatabase error'));
  });
};

export const openDatabase = () => {
  console.log('openDatabase called');
  return new Promise((resolve, reject) => {
    SQLite.openDatabase(
      QUIZZES_DATABASE,
      QUIZZES_DATABASE_VERSION,
      QUIZZES_DATABASE_NAME,
      QUIZZES_DATABASE_SIZE,
    )
      .then(db => {
        database = db;
        populateDatabase();

        console.log('openDatabase resolve called');
        resolve(true);
      })
      .catch(error => console.error('openDatabase error', error));
  });
};

export const closeDatabase = () => {
  console.log('closeDatabase called', database);
  if (database) {
    database.close();
    database = undefined;
  }
};

const populateDatabase = () => {
  database
    .executeSql(
      'CREATE TABLE IF NOT EXISTS ' +
        QUIZZES_TABLE_NAME +
        ' ( ' +
        'id INTEGER PRIMARY KEY NOT NULL, ' +
        'name VARCHAR(100), ' +
        'description VARCHAR(500), ' +
        'tags VARCHAR(500), ' +
        'level VARCHAR(100), ' +
        'numberOfTasks INTEGER);',
    )
    .catch(error => {
      console.error('populateDatabase: ', error);
    });
};
