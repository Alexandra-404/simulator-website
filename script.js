// Открытие или создание базы данных
const dbFactory = window.indexedDB;

const request = indexedDB.open('myDB', 1);

let db;

request.onerror = function(event) {
  console.log('Ошибка при открытии базы данных');
};

request.onsuccess = function(event) {
  db = event.target.result;
  console.log('База данных открыта успешно');
};

request.onupgradeneeded = function(event) { 
  db = event.target.result;

  // Создание объекта хранилища для результатов
  const resultsStore = db.createObjectStore('results', { keyPath: 'result_id', autoIncrement: true });
  resultsStore.createIndex('topic_name', 'topic_name', { unique: false });
  resultsStore.createIndex('correct_tasks', 'correct_tasks', { unique: false });
  resultsStore.createIndex('wrong_tasks', 'wrong_tasks', { unique: false });
  resultsStore.createIndex('test_id', 'test_id', { unique: true });

  // Создание объекта хранилища для тестов
  const testsStore = db.createObjectStore('tests', { keyPath: 'test_id', autoIncrement: true });
  testsStore.createIndex('quantity', 'quantity', { unique: false });
  testsStore.createIndex('topic_name', 'topic_name', { unique: false });

  // Создание объекта хранилища для заданий
  const tasksStore = db.createObjectStore('tasks', { keyPath: 'task_id', autoIncrement: true });
  tasksStore.createIndex('task_number', 'task_number', { unique: false });
  tasksStore.createIndex('task_description', 'task_description', { unique: false });
  tasksStore.createIndex('test_id', 'test_id', { unique: false });
};

