import SQLite from 'react-native-sqlite-storage';

const QUIZZES_DATABASE = 'quizzes.db';
const QUIZZES_TABLE_NAME = 'Quizzes';
const SELECT_ALL_QUIZZES_QUERY = 'SELECT * FROM ' + QUIZZES_TABLE_NAME + ';';
const INSERT_QUIZ_QUERY =
  'INSERT OR REPLACE INTO ' +
  QUIZZES_TABLE_NAME +
  ' (id, name, description, tags, level, numberOfTasks) VALUES ';
const INSERT_QUIZ_QUERY_VALUES = '(?, ?, ?, ?, ?, ?), ';
const CREATE_QUIZZES_TABLE_QUERY =
  'CREATE TABLE IF NOT EXISTS ' +
  QUIZZES_TABLE_NAME +
  ' ( ' +
  'id text PRIMARY KEY NOT NULL, ' +
  'name text, ' +
  'description text, ' +
  'tags text, ' +
  'level text, ' +
  'numberOfTasks INTEGER' +
  ');';


SQLite.enablePromise(true);

let database;

export const loadQuizzesFromDatabase = () => {
  console.log('loadQuizzesFromDatabase called');
  return new Promise((resolve, reject) => {
    database
      .executeSql(SELECT_ALL_QUIZZES_QUERY)
      .then(([result]) => {
        const count = result.rows.length;
        console.log('loadQuizzesFromDatabase size ', count);
        if (count === 0) {
          resolve([]);
        }
        resolve(mapDataFromDatabase(result.rows));
      }).catch(error => {
        console.log('loadQuizzesFromDatabase error', error)
        reject(error);
      });
  })
};

const mapDataFromDatabase = (rows) => {
  const quizzes = [];
  for (let i = 0; i < rows.length; i++) {
    const row = rows.item(i);
    const { id, name, description, tags, level, numberOfTasks } = row;
    const parsedTags = JSON.parse(tags);
    quizzes.push({ id, name, description, tags: parsedTags, level, numberOfTasks });
  }
  return quizzes;
}

export const insertQuizzesIntoDatabase = quizzes => {
  console.log('insertQuizzesIntoDatabase called');
  let valuesQuery = '';
  let parameters = [];
  quizzes.forEach(quiz => {
    const { id, name, description, tags, level, numberOfTasks } = quiz;
    parameters.push(id, name, description, JSON.stringify(tags), level, numberOfTasks);
    valuesQuery += INSERT_QUIZ_QUERY_VALUES
  });
  valuesQuery = valuesQuery.substring(0, valuesQuery.length - 2);

  return new Promise((resolve, reject) => {
    database
      .executeSql(INSERT_QUIZ_QUERY + valuesQuery + ';', parameters)
      .then(([result]) => {
        console.log('insertQuizzesIntoDatabase rowsAffected: ', result.rowsAffected);
        resolve(result.rowsAffected);
      }).catch(error => {
        console.log('insertQuizzesIntoDatabase error', error);
        reject(error);
      });
  });
};

export const openDatabase = () => {
  console.log('openDatabase called');
  if (database) {
    return;
  }
  return new Promise((resolve, reject) => {
    SQLite.openDatabase({
      name: QUIZZES_DATABASE,
      location: 'default'
    }).then(db => {
      database = db;
      populateDatabase();
      resolve(true);
    }).catch(error => console.log('openDatabase error', error));
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
  database.executeSql(CREATE_QUIZZES_TABLE_QUERY);
};
