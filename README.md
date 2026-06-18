[![Maintainability](https://qlty.sh/gh/klerok/projects/Game-of-Life/maintainability.svg)](https://qlty.sh/gh/klerok/projects/Game-of-Life)

# Game of Life

<img width="1920" height="1080" alt="demo" src="https://github.com/user-attachments/assets/922ea62b-552e-42f4-a886-f724fa805092" />

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

🔗 [Деплой проекта](https://game-of-life-five-phi.vercel.app/)
