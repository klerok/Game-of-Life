# Game of Life

## Описание

Интерактивный симулятор **Conway's Game of Life** в браузере. Можно рисовать клетки на поле, запускать симуляцию, делать шаги по одному поколению и наблюдать динамику популяции на графике. Поддерживаются пресеты (glider, blinker и др.), несколько наборов правил и режимы сетки bounded / toroidal. Состояние игры сохраняется в `localStorage`.

## Стек

| Слой         | Технологии                    |
| ------------ | ----------------------------- |
| **Frontend** | React 19, Canvas API, CSS     |
| **Backend**  | — (клиентское приложение)     |
| **DB**       | — (`localStorage` в браузере) |

## Запуск локально

```bash
npm install
npm start
```

Приложение откроется на [http://localhost:3000](http://localhost:3000).

Сборка для production:

```bash
npm run build
```

## Деплой

🔗 [Деплой проекта](game-of-life-five-phi.vercel.app)
