import React, { useState } from 'react';

function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [languageLevel, setLanguageLevel] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    // Проверка валидности данных
    if (!email) {
      alert('Введите адрес электронной почты');
      return;
    }

    if (!password) {
      alert('Введите пароль');
      return;
    }

    if (confirmPassword !== password) {
      setPasswordError('Пароли не совпадают');
      return;
    }

    if (!languageLevel) {
      alert('Выберите уровень языка');
      return;
    }

    // Отправка данных в API
    console.log('Отправка запроса API...');
    fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
        languageLevel,
      }),
    })

        .then((response) => response.json())
        .then((data) => {
          console.log('Ответ API:', data);
          alert('Регистрация прошла успешно!');
        })
        .catch((error) => {
          console.error('Ошибка API:', error);
          alert('Ошибка при регистрации. Пожалуйста, попробуйте позже.');
        });
  };

  return (
      <div>
        <h1>Регистрация</h1>
        <form onSubmit={handleSubmit}>
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />

          <label>Пароль:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

          <label>Подтверждение пароля:</label>
          <input type="password" value={confirmPassword} onChange={(e) => {
            setConfirmPassword(e.target.value);

            // Проверка совпадения паролей
            if (e.target.value !== password) {
              setPasswordError('Пароли не совпадают');
            } else {
              setPasswordError('');
            }
          }} />

          {passwordError && <p style={{ color: 'red' }}>{passwordError}</p>}

          <label>Уровень языка:</label>
          <select value={languageLevel} onChange={(e) => setLanguageLevel(e.target.value)}>
            <option value="">Выберите уровень</option>
            <option value="beginner">Начинающий</option>
            <option value="intermediate">Средний</option>
            <option value="advanced">Продвинутый</option>
          </select>

          <button type="submit">Зарегистрироваться</button>
        </form>
      </div>
  );
}

export default App;
