+++
title = "Навык для Алисы \"Вторая память\": технические особенности"
date = "2020-04-13T23:55:00+06:00"
slug = "yandex-dialogs-whatis"
image = "/images/2020-04/yandex-dialogs-whatis.png"
tags = ["projects", "nodejs", "vue", "yandex-dialogs"]
+++

Как устроена "Вторая память" для Алисы: ~~кишки, кровь, расчленёнка~~ команды, матчеры, мидлвари.

![Навык Вторая память]({{< param image >}})
<!--more-->

По сути "Вторая память" - это [voice-whatis](https://github.com/popstas/voice-whatis), реализованный в виде навыка.

Пример использования:
>-- В красной бутылке налит арбуз  
>-- В красной бутылке налит арбуз, поняла

>-- Что в красной бутылке?  
>-- Арбуз

>-- Где арбуз?  
>-- В красной бутылке

Попробовать можно так: скажите Алисе "Запусти навык [Вторая память](https://dialogs.yandex.ru/store/skills/00203e6e-vtoraya-pamya)".

Сценарии использования описаны [на Github](https://github.com/popstas/yandex-dialogs-whatis#сценарии-использования).


## Технические особенности
Проект написан на Node.js поверх [yandex-dialogs-sdk](https://github.com/fletcherist/yandex-dialogs-sdk), который поверх Express.js.

Github - [yandex-dialogs-whatis](https://github.com/popstas/yandex-dialogs-whatis).

Начал писать 28.06.2018, первую версию запустил 08.07.2018, последнюю 10.03.2019.

- Используются commands, scenes, matchers, middlewares из SDK
- Выбор базы данных между MongoDB и Loki (локальное файловое хранилище) через драйвер БД
- Выбор сценария на основе простого морфологического разбора
- Система тестирования на основе [сценариев](https://blog.popstas.ru/blog/2020/04/14/yandex-dialogs/#yandex-dialogs-client---инструмент-для-тестирования-навыков)
- Модульность команд (подробнее в CONTRIBUTING.md), главный файл навыка состоит только из подключений middlewares и commands
- Метрики передаются в [chatbase](https://github.com/popstas/yandex-dialogs-sdk-chatbase), с полной разметкой intents и в Яндекс.Метрику
- Лог запросов и ответов с id юзеров, номером визита и номером сообщения в визите
- Корректировка типичных неправильных ударений
- Строка очищается от ненужных слов с учетом контекста запроса
- Упрощенное указание эффектов: `[megaphone]говорите громче!` вместо `<speaker effect="megaphone">говорите громче!`
- Возможность указывать некоторую фонетическую разметку в text, а не в tts


## Структура навыка:

### commands
Главная сущность, команда юзера. Команды расширены, по сравнению с SDK. Можно сказать, что это интенты. Команда состоит из mather'а (то, что определяет, сработает эта команда или нет) и handler'а (что собственно команда делает).

Пример простой команды:

``` js
module.exports = {
  intent: 'thankyou',
  matcher: 'спасибо',

  handler(ctx) {
    return ctx.replyRandom([
      'Всегда пожалуйста',
      'Не за что',
      'Обращайся!',
      'Пожалуйста',
    ]);
  }
};
```

Команд **много**. Когда я начинал писать навык, который умеет делать не так уж много, я не думал, что команд будет больше 50.

Команды разбиты на группы:

- `core` - общие команды, типа реакции на оскорбления, похвалы, привет, пока, номер версии, посещаемость за последние 2 дня
- `help` - справка о разных функциях навыка
- `items` - действия непосредственно с данными, основной функционал

### matchers
Отделённые от команд матчеры, которые я посчитал пригодятся в других проектах. Например, во всех диалогах юзеры говорят "нет", но говорят по-разному. Матчер "no" содержит в себе логику определения "нет": `/^(не|да не|нет спасибо|спасибо не надо)/i` (на самом деле чуть длиннее).

Матчеры могут быть как строками, регулярками или функциями.


### middlewares
Тут по сути лежат модули навыка. Мидлвари - сущности SDK и совместимы с ним без всего остального. Они делятся на группы:

#### Обработчики - меняют текст
- `cleaner` убирает из фразы слова, которые не влияют на смысл: "ну", "Алиса" и т.п.
- `corrector` исправляет типичные опечатки

Обработчики срабатывают перед основным кодом, чтобы упростить анализ текста.

#### Анализаторы - извлекают информацию
- [`chatbase`](https://github.com/popstas/yandex-dialogs-sdk-chatbase) (вынесен в отдельный репозиторий) отправляет данные в Google Chatbase (спец. сервис статистики для переписок)
- `counter` собирает данные о сессии пользователя: кол-во сообщений за сессию, время последнего сообщения, кол-во визитов
- `logMessage` записывает сообщение в лог
- `store` извлекает данные о юзере из базы в память
- `yametrika` отправляет данные о реплике в Яндекс.Метрику

#### Функции - после подключения можно их использовать в навыке
- `auth` выдаёт пользователю код, который можно сказать на другом устройстве, чтобы сделать единую базу знаний у 2 и более устройств
- `az` подключает морфологический анализатор az, он может определять части речи
- `comfirm` запускает процесс, когда от юзера ожидается ответ "да" или "нет"
- `reply` главная функция, через которую отправляется ответ пользователю
- `replyRandom` отвечает случайным сообщением из переданного массива

Поясню про `confirm`: он есть как в мидлварях, так и в командах. Мидлварь устанавливает `ctx.session.confirm`, типа входит в scene, но это не сцена, т.к. сцена может быть только одна в один момент времени.

Команда матчится всегда, когда установлен `ctx.session.confirm`, таким образом, пока юзер не ответит "да" или "нет", его не выпустят из этого круга.

### entities
Последняя сущность структуры - это сущность, в сущности... которая выделяет сущности из текста.

Можно сказать, что это NLU (Natural Language Understanding). При успешном нахождении в `ctx.entities` появляются дополнительные данные. У меня сущность была одна: `shop`, то есть распознавались покупки и действия с ними. Например, `{ action: 'delete', products: 'колбаса' }`

### Собираем всё вместе
Само приложение состоит из подключение всех этих составляющих, вот по сути весь его код ([полная версия app.js](https://github.com/popstas/yandex-dialogs-whatis/blob/master/src/app.js)):

``` js
async init() {
  // добавляют функции в ctx
  alice.use(middlewares.reply());
  alice.use(middlewares.replyRandom());
  alice.use(middlewares.az());
  alice.use(middlewares.logMessage());
  alice.use(middlewares.yametrika(this.config.YAMETRIKA_ID));
  alice.use(middlewares.chatbase(this.config.CHATBASE_KEY, packageJson.version));

  // изменяют ctx во время запроса
  alice.use(middlewares.store());
  alice.use(middlewares.cleaner());
  alice.use(middlewares.counter());

  alice.use(middlewares.confirm());

  alice.use(entities.shop());

  await utils.initMorph();

  // подключение всех команд
  commands.utils.useCommands(alice, commands.core);
  commands.utils.useCommands(alice, commands.items);
  commands.utils.useCommands(alice, commands.help);

  alice.any(commands.core.any.handler);
}
```

#### Обход CORS
Чтобы мой навык принимал запросы в браузере с любых доменов, я запускаю SDK не обычным `alice.listen()`, а своим хэндлером, который добавляет заголовки CORS после этого вызывает функцию SDK `alice.handleRequest()`:

``` js
handlerExpress() {
  const app = express();
  app.use(bodyParser.json());
  app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
  });
  app.use(express.static('static'));
  app.post(this.config.API_ENDPOINT, async (req, res) => {
    const jsonAnswer = await alice.handleRequest(req.body);
    res.json(jsonAnswer);
  });
  return app;
}
```

#### Запуск в продакшене
Навык в бою крутится в docker контейнере, при пуше в git прогоняются тесты на Travis CI и собирается контейнер на Docker Hub, по `npm version` автоматически прогоняется весь процесс деплоя: установка версии, обновление Changelog (который генерируется из коммитов, благодаря [Conventional Changelog](/blog/2016/03/06/changelog-dot-md-generate-from-git-conventions/)). Вся эта магия в [`package.json`](https://github.com/popstas/yandex-dialogs-whatis/blob/master/package.json).

---

Надеюсь, эта статья поможет тем, кто захочет написать свой навык на этом SDK. Можно некоторые команды и мидлвари прямо себе копировать. За кажущейся простотой скрываются часы чтения логов того, что же там юзеры говорят, такое не придумать в вакууме.