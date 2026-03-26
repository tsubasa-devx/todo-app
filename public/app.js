// <ul>をとる
const input = document.getElementById('task-input');
const btn = document.getElementById('add-btn');
const list = document.getElementById('todo-list');

const fetchTodos = async () => {
  // fetchでサーバーから一覧取得
  const res = await fetch('/api/todos');
  // res(箱)からJSON(中身)を取り出す
  const todos = await res.json();

  // いったん中身を空にする、前のデータを消す
  list.innerHTML = '';

  // 配列を1個ずつ表示
  todos.forEach((todo, index) => {
    // <li>をjsで作成
    const li = document.createElement('li');
    li.textContent = todo;

    // <button>をjsで作成
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = '削除';

    deleteBtn.addEventListener('click', async () => {
      await fetch(`/api/todos/${index}`, { method: 'DELETE' });
      fetchTodos();
    });

    li.appendChild(deleteBtn);
    list.appendChild(li);
  });
};

btn.addEventListener('click', async () => {
  // 入力欄の文字を取得
  const task = input.value;

  // サーバーに送る
  await fetch('/api/todos', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ task }),
  });

  // 入力欄を空にする
  input.value = '';

  // 最新のTodoを取得して画面更新
  fetchTodos();
});

fetchTodos();
