import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

// Expressサーバーを作る
const app = express();

// __dirnameを作る
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let todos = [];

// ミドルウェア
// publicフォルダに__dirnameで絶対pathを作る
app.use(express.static(path.join(__dirname, 'public')));

// ミドルウェア
// req.bodyを使えるようにする
app.use(express.json());

//表示用のAPI
app.get('/api/todos', (req, res) => {
  res.json(todos);
});

// 新しいTodoをサーバーに追加するAPI
app.post('/api/todos', (req, res) => {
  const { task } = req.body;
  if (task) {
    todos.push(task);
  }
  res.json({ message: 'OK' });
});

app.delete('/api/todos/:index', (req, res) => {
  // indexを取り出す
  const index = req.params.index;
  // index番目の◯個を削除
  todos.splice(index, 1);
  res.json({ message: 'deleted' });
});

// サーバー起動
app.listen(3000, () => {
  console.log(`Server is running on http://localhost:3000`);
});
