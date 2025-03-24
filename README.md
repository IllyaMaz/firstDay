# FirstDay

## Запуск проекта локально

### 1. Установка зависимостей

Клонируйте репозиторий и установите зависимости:
```sh
git clone https://github.com/IllyaMaz/firstDay.git
cd firstDay
npm install
```

### 2. Настройка Supabase

1. Создайте аккаунт на [Supabase](https://supabase.com/).
2. Создайте новый проект и получите `SUPABASE_URL` и `SUPABASE_ANON_KEY`.
3. В корне проекта создайте файл `.env` и добавьте:
   ```sh
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

### 3. Запуск сервера

Для запуска серверной части выполните:
```sh
node backend/index.js
```

Проект будет доступен по адресу: `http://localhost:3000`

---

## Тестирование регистрации и логина

### 1. Регистрация
1. Перейдите на `/register`.
2. Введите email, пароль и имя.
3. После успешной регистрации проверьте почту для подтверждения.

### 2. Вход
1. Перейдите на `/login`.
2. Введите email и пароль.
3. После входа вас должно перенаправить на `/profile`.

### 3. Сброс пароля
1. Перейдите на `/resetPassword`.
2. Введите email, получите ссылку для сброса пароля и следуйте инструкциям.

---

## Доступ к API через Postman

### 1. Регистрация пользователя
**POST** `http://localhost:3000/api/register`
```json
{
  "email": "test@example.com",
  "password": "password123",
  "name": "Test User"
}
```

### 2. Авторизация пользователя
**POST** `http://localhost:3000/api/login`
```json
{
  "email": "test@example.com",
  "password": "password123"
}
```

### 3. Получение профиля
**GET** `http://localhost:3000/api/profile`
Добавьте `Authorization: Bearer <TOKEN>` в заголовки.

### 4. Сброс пароля
**POST** `http://localhost:3000/api/reset-password`
```json
{
  "email": "test@example.com"
}
```

---

Теперь ваш проект готов к использованию!

