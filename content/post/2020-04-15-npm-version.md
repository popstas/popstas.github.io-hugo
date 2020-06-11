+++
title = "NPM version: версионирование, история изменений, деплой проекта"
date = "2020-04-15T20:58:00+06:00"
slug = "npm-version"
image = "/images/2020-04/npm-version.png"
tags = ["changelog", "github", "javascript", "ci"]
+++

Как я веду красивую историю изменений в своих проектах и деплою одной командой после коммита (нет, это не git hooks).

Если вы не пишете на JavaScript, пусть вас не смущает слово "NPM", это подходит для любого языка.

![npm version]({{< param image >}})
<!--more-->

`npm version` - классный механизм версионирования, встроенный в NPM.

### Версионирование
Главная, казалось бы, цель команды: отмечать версии.

Из коробки это значит, что вы можете написать `npm version <version>` и запустить цепочку задач по подготовке новой версии. Варианта собственно три:

- `npm version patch` - 0.0.1 -> 0.0.2
- `npm version minor` - 0.0.2 -> 0.1.0
- `npm version major` - 0.1.0 -> 1.0.0

Но можно и принудительно версию вписать, но только по semver.

**Что произойдёт:**

1. Выполнится `scripts.preversion` из package.json, если он есть
2. В package.json изменится версия
3. Выполнится `scripts.version` из package.json, если он есть
4. Создастся коммит с package.json и версией в названии
5. На этот коммит поставится тег версии
6. Запустится `scripts.postversion` из package.json, если он есть

Это уже немало:

- Не надо высчитывать версию, просто выбираете `patch`, `minor` или `major` в зависимости от содержания изменений
- Не надо ставить тег
- Вы не забудете изменить номер версии в package.json
- В `postversion` вы можете вписать дальшейшие шаги (релиз, деплой). По-хорошему надо релизить после прохождения CI, но кого это волнует

Команда не сработает, если Git грязный, но можно обойти это с `--force`, я часто обхожу.

Минус в том, что создаются коммиты на каждую версию, кого-то это может раздражать, меня наоборот раздражает, что просматривая список коммитов на Github не видно версий, коммиты версий исправляют это.

#### Как делать теги 1.2.3 вместо v1.2.3 (убрать `v` из тега версии):
Добавьте файл `.npmrc`, добавьте в него пустой [tag-version-prefix](https://docs.npmjs.com/misc/config#tag-version-prefix):
``` bash
tag-version-prefix=""
```

Дальше - интереснее.


### Автоматический Changelog
CHANGELOG.md генерится утилитой [conventional-changelog](https://github.com/conventional-changelog/conventional-changelog).

Об этом я уже [писал](/blog/2016/03/06/changelog-dot-md-generate-from-git-conventions/) 4 года назад. Там я описывал свои поиски, здесь опишу, к чему я пришёл.

С тех пор я все коммиты называю по [Angular Conventions](https://docs.google.com/document/d/1QrDFcIiPjSLDn3EL15IJygNPiHORgU1_OOAqWjiDU5Y/edit#). Не пугайтесь "Angular" в названии, никакой привязки там нет.

В 2 словах о соглашениях:

Пишите `feat: новая фича` или `fix: исправлен баг такой-то`. Этого уже достаточно, чтобы генерить красивые истории изменений.

Подробнее, насколько я пользуюсь:

Сообщение имеет структуру:
``` bash
type(scope): subject

body

footer
```

Я обычно ограничиваюсь:
``` bash
type: subject

body
```

#### Типы, в порядке, как я использую:
- `feat` - новый функционал
- `fix` - исправления ошибок
- `chore` - правки скриптов деплоя и т.п.
- `refactor` - правки кода без изменения функциональности
- `docs` - правки текстов
- `style` - правки отступов
- `test` - добавление тестов

В changelog попадают только `feat` и `fix`.

В футере принято перечислять ссылки на связанные задачи.

Если в футер добавить `BREAKING CHANGE: что-то ломающее обратную совместимость`, то это также попадёт в changelog. По semver принято менять мажорную версию, если случился BREAKING CHANGE, но я не придерживаюсь строго.

В `package.json`:
``` json
{
  "scripts": {
    "version": "npm run changelog && git add CHANGELOG.md",
    "changelog": "conventional-changelog -p angular -i CHANGELOG.md -s -r 0"
  }
}
```

CHANGELOG.md при таком конфиге попадёт в коммит версии, что удобно, да и коммиты версий становятся не такими уж бесполезными.

Можно поставить [`standard-changelog`](https://github.com/conventional-changelog/conventional-changelog/tree/master/packages/standard-changelog) чисто под ангуларовский формат, я по историческим причинам его не использую.

[Пример CHANGELOG.md](https://github.com/popstas/chords-viewer/blob/master/CHANGELOG.md)



### Красивые releases на Github
[conventional-github-releaser](https://github.com/conventional-changelog/releaser-tools) использует тот же механизм извлечения описания из коммитов, но пишет не в файл, а в релиз на Github.

В `package.json`:
``` json
{
  "scripts": {
    "postversion": "git push && npm run release",
    "release": "conventional-github-releaser -p angular"
  }
}
```

Вы можете не хотеть автоматом запускать `release` при версионировании, тогда думаю вы знаете, что делать.

Не помню, обязательно ли пушить перед запуском `conventional-github-releaser`, скорее да, чем нет, я всегда пушу.


### Подмена версий в коде
Что если нужно поменять версию не только в `package.json`? Тогда нужно писать скрипты.

У меня случаи несложные, такие:

#### Поменять версию в README.md
[Отсюда](https://github.com/viasite/planfix-toggl-server/blob/master/package.json) (это кстати проект на Go)

Универсальный вариант на JavaScript из 2 файлов: первый меняет в README.md версию на токен на этапе `preversion` (на нём в package.json ещё старая версия), второй на этапе `version` меняет токен на новую версию. Регулярка получается универсальной, не надо подгонять под каждый файл.

version-replace-pre.js:
``` js
// заменяет старую версию в README.md на строку "{{version}}"
const fs = require('fs');
const packageJson = require('../package.json');

const str = fs.readFileSync('README.md', 'utf8');
const regex = new RegExp(packageJson.version.replace(/\./g, '\\.'), 'g');
const replaced = str.replace(regex, '{{version}}');
fs.writeFileSync('README.md', replaced, 'utf8');
```

version-replace.js:
``` js
// заменяет строку "{{version}}" в README.md на новую версию
const fs = require('fs');
const packageJson = require('../package.json');

const str = fs.readFileSync('README.md', 'utf8');
const replaced = str.replace(/\{\{version\}\}/g, packageJson.version);
fs.writeFileSync('README.md', replaced, 'utf8');
```

package.json:
``` js
{
  "scripts": {
    "preversion": "node scripts/version-replace-pre.js",
    "replace-version": "node scripts/version-replace.js",
    "version": "npm run replace-version && npm run changelog && git add CHANGELOG.md README.md"
  }
}
```

#### Поменять версию в docker-compose.yml
[Отсюда](https://github.com/popstas/yandex-dialogs-products-shop-list/blob/master/scripts/docker-version.sh):
``` bash
#!/bin/bash
set -eu
version="$(cat package.json | grep '"version": "[0-9]' | cut -d':' -f2  | cut -d'"' -f2)"
echo "$version"
sed -i 's/shop-list:.*/shop-list:v'"${version}"'/g' docker-compose.yml
```

#### Поменять версию в userscript
[Отсюда](https://github.com/viasite/userscript-planfixfix/blob/master/scripts/version-update.sh):
``` bash
#!/bin/bash
set -eu
version="$(cat package.json | grep '"version": "[0-9]' | cut -d':' -f2  | cut -d'"' -f2)"
echo "$version"
sed -i 's/@version.*/@version        '"${version}"'/g' planfixfix.user.js
```

`sed -i` на MacOS из коробки не работает, чтобы исправить, поставьте `brew install gnu-sed` и добавьте `alias sed=gsed` (это неточно, пишу по памяти).

Скрипт надо добавить в секцию `scripts.version` вашего `package.json`, добавить изменённый файл в Git, чтобы он попал в коммит версии:
``` json
{
  "scripts": {
    "version": "bash scripts/version-update.sh && git add changed-file.js",
  }
}
```


### Публикация в NPM
Это нужно только js проектам и то далеко не всем. Тут всё просто: добавьте `npm publish` в секцию `scripts.release` вашего `package.json`.

В `package.json`:
``` json
{
  "scripts": {
    "postversion": "npm run release",
    "release": "npm publish"
  }
}
```

### Деплой куда угодно
В секцию `release` можно вписать любой скрипт, который будет деплоить.

Например, в одном моём проекте по `npm version` генерится статическое приложение и деплоится на Github Pages скриптом [`deploy.sh`](https://github.com/popstas/chords-viewer/blob/master/scripts/deploy.sh).

В `package.json`:
``` json
{
  "scripts": {
    "postversion": "npm run release",
    "release": "npm run deploy",
    "deploy": "bash scripts/deploy.sh"
  }
}
```


### Не только JavaScript
Это неочевидно, но `npm version` можно использовать для проектов на любом языке, единственное условие: наличие `package.json`.

Я, например, использовал такой способ для ведения CHANGELOG.md для некоторых сайтов на PHP.

### Пример package.json
Типичный пример для моих новых проектов:

``` json
{
  "name": "packagename",
  "version": "0.0.1",
  "description": "Description",
  "scripts": {
    "version": "npm run changelog && git add CHANGELOG.md",
    "postversion": "git push && npm run release",
    "changelog": "conventional-changelog -p angular -i CHANGELOG.md -s -r 0",
    "release": "conventional-github-releaser -p angular"
  },
  "author": "Stanislav Popov",
  "license": "ISC"
}
```

### Установка пакетов
Чтобы всё работало, нужно скачать эти утилиты:
``` bash
npm install -g conventional-changelog-cli conventional-github-releaser
```

Не вижу смысла добавлять эти пакеты в зависимости, хотя раньше так делал.

### Если в процессе npm version что-то пошло не так
При отладке этих процессов вы неизбежно где-то ошибётесь и окажетесь в ситуации, когда сценарий не прошёл полностью, а коммит версии уже есть.

Тогда надо откатывать:

1. Удалите тег: `git tag v0.1.2 -d`.
2. Удалите коммит: `git reset --hard HEAD~`. Если кроме автоматических изменений в коммите было что-то ещё, аккуратнее тут, лучше тогда без `--hard`.
3. Если коммит уже запушился и никто не успел заметить (аккуратнее в команде), удалите коммит оттуда: `git push --force` и тег отдельно удалите: `git push origin :v0.1.2` (он не удалится по push).
4. Руками удалите релиз с Github, сначала переведите его в draft, потом можно будет удалить.