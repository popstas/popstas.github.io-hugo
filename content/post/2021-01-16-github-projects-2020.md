+++
title = "Мои проекты 2020: умный дом, сканер сайтов, Тинькофф API, Яндекс.Метрика, аккорды, Планфикс"
date = "2021-01-16T23:50:00+06:00"
slug = "github-projects-2020"
image = "/images/2020/github/popstas-github.svg"
time = 10
tags = ["github", "projects", "nodejs", "mqtt", "tinkoff", "planfix", "javascript", "vue"]
+++

![Дом, поделенный на зоны]({{< param image >}})

<!--more-->

{{< contents header="h2" >}}

{{< spoiler text="Немного статистики" >}}
Этот год был активным, 1204 контрибьюта, круче было только [в 2018](/blog/2018/12/30/my-github-2018/).

![popstas's github stats](/images/2020/github/popstas-github.svg)

Закрыл почти все issues, некоторые висели дольше 2 лет.

По языкам: становится всё больше JavaScript.

#### Звёзды
Появился второй проект с 100+ звезд - [zsh-command-time](https://github.com/popstas/zsh-command-time). Он показывает время выполнения команд в терминале zsh. Проект для меня интересен тем, что звёзд у него больше, чем строк кода.

[ansible-role-zsh](https://github.com/viasite-ansible/ansible-role-zsh) остаётся №1 по запросу "[ansible zsh](https://www.google.ru/search?q=ansible+zsh)", поддерживаю его.

#### 5 месяцев коммитил каждый день
В апреле случайно начал череду ежедневных коммитов, когда заметил, было уже около 2 недель. Продолжил этот челлендж, получился непрерывный период с 9 апреля по 12 сентября (5 месяцев).

На меня такие штуки влияют, естественно, активность от этого повышается, причём не только в коде: блог и аккорды тоже лежат на Github, так что добавить новую песню или статью тоже считается за активность :)

![github-commits-2020](/images/2020/github-commits-2020.png)

Wakatime 2020:
![Wakatime 2020](/images/2020/wakatime-2020.png)
{{< /spoiler >}}

## Умный дом
Вынес в отдельный пост - [Мой умный дом 2020](/blog/2021/01/10/smarthome-2020/).

Там описаны проекты:

- [mqtt2tts](https://github.com/popstas/mqtt2tts) - озвучка сообщений, пришедших по MQTT (Windows, Linux)
- [windows-mqtt](https://github.com/popstas/windows-mqtt) - управление Windows компом по MQTT
- [strava-mqtt](https://github.com/popstas/strava-mqtt) - передача инфы о тренировках в MQTT
- [mongoose-redmond-rcm-1512-mqtt](https://github.com/popstas/mongoose-redmond-rcm-1512-mqtt) - управление кофеваркой Redmond RCM-1512
- [mongoose-mqtt-ssd1306](https://github.com/popstas/mongoose-mqtt-ssd1306) - вывод инфы на экранчик
- [mongoose-mlx90614](https://github.com/popstas/mongoose-mlx90614) - бесконтактный термометр (для очень горячего)
- [mongoose-button](https://github.com/popstas/mongoose-button) - разные датчики (в частности освещение)
- [yandex-dialogs-smarthome-mqtt](https://github.com/popstas/yandex-dialogs-smarthome-mqtt) - управление MQTT устройствами через Алису


### Новые проекты:
- [windows-mqtt](https://github.com/popstas/windows-mqtt)
- [strava-mqtt](https://github.com/popstas/strava-mqtt)
- [mongoose-redmond-rcm-1512-mqtt](https://github.com/popstas/mongoose-redmond-rcm-1512-mqtt)
- [mongoose-mqtt-ssd1306](https://github.com/popstas/mongoose-mqtt-ssd1306)
- [mongoose-mlx90614](https://github.com/popstas/mongoose-mlx90614)
- [tinkoff-invest-stats](https://github.com/popstas/tinkoff-invest-stats)
- [viasite/site-audit-seo](https://github.com/viasite/site-audit-seo)
- [viasite/site-audit-seo-viewer](https://github.com/viasite/site-audit-seo-viewer)
- [viasite/planfix-tools](https://github.com/viasite/planfix-tools)
- [viasite/tinkoff-openapi-payments-to-planfix](https://github.com/viasite/tinkoff-openapi-payments-to-planfix)
- [viasite/yandex-metrika](https://github.com/viasite/yandex-metrika)

Ниже подробнее о каждом проекте.

## Сканер сайтов, site-audit-seo
[viasite/site-audit-seo](https://github.com/viasite/site-audit-seo), [viasite/site-audit-seo-viewer](https://github.com/viasite/site-audit-seo-viewer)

![site-audit-seo](https://github-readme-stats.vercel.app/api/pin/?username=viasite&show_owner=true&repo=site-audit-seo)

- Язык: JavaScript (NodeJS + Vue)
- Особенности: Websockets, CLI + Web

Если взять все проекты за год, то примерно половина трудозатрат пришлась на site-audit-seo.

Я несколько лет хотел написать более лучшую версию [Xenu](http://home.snafu.de/tilman/xenulink.html). Результаты превзошли мои ожидания :)

Получился сервис, похожий на [Semrush](https://ru.semrush.com/).

Посмотреть можно здесь - [Site-audit-seo: Scan](https://viasite.github.io/site-audit-seo-viewer/scan/).

В конце года нашёлся чувак из инета, который подключился к проекту и прислал несколько крутых фич: выделение главного контента, анализ ключевиков, объёма страницы.

Планирую дальше развивать этот проект.

{{< spoiler text="История появления site-audit-seo" >}}
### 0.1 - Первая рабочая версия окупилась сразу

В марте пришла задача: нужно было проверить 25 сайтов и посчитать, сколько на них страниц и документов для скачивания. Я решил превратить рутинную задачу в интересную и написал скрипт для этого.

[Первая версия](https://github.com/viasite/site-audit-seo/tree/de18f1eb16f4e55c3b89559b86fe0eec9ee0a2af) содержала чуть больше 100 строк и умела создават CSV таблицу с данными всех страниц сайта.

По времени это заняло чуть больше времени, чем проверить 25 сайтов вручную, зато я получил основу инструмента.

### 1.0 - Обгоняем Xenu
Через неделю у меня был скрипт, который был лучше Xenu:

- Учитывал специфику наших сайтов
- Выдавал больше данных о страницах

### 2.0 - CLI утилита (command line interface)
Через месяц превратил скрипт в программу, которая запускается из терминала, параметрами указываются условия сканирования.

Появились новые данные о страницах, подсмотренные в другом сканере [Frog SEO Spider](https://www.screamingfrog.co.uk/seo-spider/).

### Подсветка ошибок
После этого сделал сохранение в Excel и стал раскрашивать таблицу, чтобы можно было посмотреть на неё и быстро увидеть проблемные страницы.

### Данные Lighthouse
Добавил возможность анализировать каждую страницу через Lighthouse (технология, на которой работает Google PageSpeed). Это позволило отслеживать изменения скорости глобально по сайту, а не только по паре страниц.

### 3.0 - Веб интерфейс просмотра результатов
Через полгода произошёл переход от Excel к веб-смотрелке результатов. Теперь данные сохраняются в JSON и выводятся в интерактивной таблице с фильтрами, сортировками и т.д.

Интерактивная смотрелка JSON у меня уже была, но она выводила более глобальные данные: 1 ряд = 1 сайт.

Я унифицировал смотрелку и выложил её отдельным проектом [viasite/site-audit-seo-viewer](https://github.com/viasite/site-audit-seo-viewer). С этого момента ценность смотрелки выросла, она стала приносить пользу сразу двум проектам.

Появилась возможность собирать много данных: если в Excel смотреть 100 колонок неудобно, то в веб-смотрелке были наборы полей, стало можно собирать 100 колонок, а выводить только 5-10 нужных в данный момент.

Появились прямые ссылки на результаты анализа.

В таком виде она потихоньку улучшалась до декабря.

### 4.0 - Веб-сервис для сканирования
В декабре на Github пришёл чувак и [спросил](https://github.com/viasite/site-audit-seo/issues/6), нельзя ли сделать запуск по HTTP запросу. Через час была готова первая версия, через неделю первая веб-сканилка:

![web interface MVP](https://user-images.githubusercontent.com/3027126/102402181-3817d700-4006-11eb-952c-75e962aa0d28.gif)

И за последние 2 недели год проект полностью переехал из командной строки в браузер и обрёл человеческий вид:

![site-audit-seo-scan](/images/2020/site-audit-seo-scan.gif)
{{< /spoiler >}}


## Графики портфеля акций в Тинькофф
[tinkoff-invest-stats](https://github.com/popstas/tinkoff-invest-stats)

- Язык: JavaScript (NodeJS)
- Особенности: отправка данных в MQTT или в InfluxDB

Сделал вывод данных портфеля на графики, чтобы пореже заглядывать в приложение и чтобы получить больше данных.

Корреляция рублёвых (жёлтый) и долларовых (зелёный) акций:

![tinkoff-correlation](/images/2020/tinkoff-correlation.png)

Портфель по бумагам, каждый цвет - отдельная бумага:

![tinkoff-portfolio](/images/2020/tinkoff-portfolio.png)

Изменение стоимости бумаг в портфеле, можно навести мышку и посмотреть, почему именно вырос/упал портфель:

![tinkoff-diff](/images/2020/tinkoff-diff.png)

Технически это скрипт, который раз в час получает данные портфеля и отправляет в MQTT.

Проект также позволяет получать котировки выбранных акций, я использую это, чтобы выводить интересующие в данный момент акции на экранчик:

{{< imglazy title="Экранчик про биржу" src="https://lh3.googleusercontent.com/pw/ACtC-3eJBCeD0jCts-lb7trE5BiQTP9C2sjB3Xu1B5WSAHgztusi57HMw1TxErP7kI7CB9IsVmeVVuF5Z2q3_NZpsyuhjl6BtqXyDIH7GWB2wYJ2sCSHOX7zGwrpvfO43860nQH4uy90uz-qHp6OwBc3R36Exw=w1424-h1068-no?authuser=0" >}}






## Платежи Тинькофф в Планфикс
[viasite/tinkoff-openapi-payments-to-planfix](https://github.com/viasite/tinkoff-openapi-payments-to-planfix)

- Язык: JavaScript (NodeJS)
- Особенности: кеширует данные прошлых поступлений в lowDB (раньше использовал LokiJS)

Тинькофф не умеет отправлять уведомления о поступлениях на почту (этого хватило бы, чтобы сделать интеграцию). Пришлось написать этот проект, он перекладывает новые данные из банка в систему задач.


## Инструменты для Планфикса
[viasite/planfix-tools](https://github.com/viasite/planfix-tools)

- Язык: JavaScript (NodeJS)
- Особенности: содержит код для работы с Планфикс API на NodeJS, в инете не нашёл такого

Проект умеет:

- Вписывать данные в контрагентов (для ежемесячного обновления инфы о клиентах)
- Формировать прайс в json из справочника цен
- Массово обновлять цены в прайсе
- Отправлять в MQTT количество активных/закрытых задач (для личного Планфикса)


## Быстрые ссылки для Яндекс.Метрики
[viasite/yandex-metrika](https://github.com/viasite/yandex-metrika)

- Язык: PHP
- Особенности: использует API Яндекс.Метрики

Я часто смотрю Метрику наших клиентов. Для ускорения сделал отдельную страничку, где можно в 2 клика открыть нужный отчёт по нужному клиенту или перейти в его Яндекс.Вебмастер.

Выглядит так:

![viasite/yandex-metrika](/images/2020/yandex-metrika.png)

Умеет формировать данные по сайту для формирования сводного отчёта (данные вставляются в Google Sheets, на выходе PDF).

## Обновления в старых проектах

### Коллекция аккордов
[popstas/chords-viewer](https://github.com/popstas/chords-viewer)

В [сборнике аккордов](https://chords.popstas.ru/) появились новые фичи:

- Быстрый переход к жанру или исполнителю
- Счётчик просмотров (у каждого свой)
- Появилась авторизация (через неё сохраняются просмотры)
- Сортировка по просмотрам
- Появился вывод аппликатур аккордов без наведения
- Добавилось жанров
- Убрались лишние элементы

В июле сделал авторизацию, получилось красиво: вход через Google, хранение данных о просмотрах в Google Firebase, приложение по-прежнему без серверной части и может работать без интернета.


### Интеграция Планфикса и Toggl
[viasite/planfix-toggl-server](https://github.com/viasite/planfix-toggl-server)

Интеграцию Планфикса и Toggl довёл до состояния, когда ей можно пользоваться любому человеку. Снял видеоинструкцию по установке и настройке.

### Дополнение для Планфикса
[viasite/userscript-planfixfix](https://github.com/viasite/userscript-planfixfix)

Расширение (юзерскрипт) получило новые фичи:

- Формирование письма со сметой из аналитик
- Быстрая вставка шаблонов в письма
- Убирание сворачивания комментов в планфиксе
- Отправка данных о непрочитанных в хронике для вывода на график
- Всегда показывать аватарки адресатов в новом интерфейсе Планфикса