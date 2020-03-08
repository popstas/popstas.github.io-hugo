+++
title = "Перенос блога с Octopress на Hugo"
date = "2017-03-05T20:45:00"
slug = "migrate-from-octopress-to-hugo"
Tags = ["octopress", "hugo", "go", "ruby", "blog"]
+++

Эта статья первая на новом движке.

#### Зачем:
- Не зависеть от ruby
- быстрее
- просто интересно

{{< mainimg src="/images/2017-03/octopress-to-hugo.png" >}}
<!--more-->

## Подробнее о причинах

### Не зависеть от ruby
Это было главной причиной. Однажды я захотел написать статью, но `rake` в папке проекта перестал работать.
Оказалось, что Octopress не совместим с текущим ruby 2.4 (что намекает на то, что проект бросают).

Можно было сделать песочницу с ruby 2.3 для конеретного проекта, но я с руби сталкивался мало (Vagrant, Octopress)
и большого желания познавать его не было. Поэтому я просто переключал системную версию руби:
```
brew switch ruby 2.3.2
```
После этого начинал работать Octopress, но переставал работать Vim.

Пробовал скачать контейнер с Octopress, но тоже за 20 минут не разобрался, как с ним жить: внутри нет git для деплоя,
порт для `rake preview` не открыт... нафиг.

С Hugo такого безобразия не должно быть, т.к. он написан на Go и содержит один бинарник, ничего не требуя от системы.


### Быстрее
Так как я пишу 5 раз в год, меня это не очень волновало, но все-таки скорость впечетляет:
мой блог на данный момент состоит примерно из 85 страниц, Hugo генерирует их за 30 мс!

Самое приятное в этом то, что в Hugo есть live reload: страница в браузере обновляется сама при редактировании исходника.



## Установка
[Устанавливаем](https://github.com/codebrane/octohug) в систему, я сделал так:
```
brew install hugo
```

Для подсветки кода ему нужен `pygments`, ставим его:
```
pip install pygments
```

Если вы любите [Solarized Dark](http://ethanschoonover.com/solarized) как люблю его я, ставим тему для pygments:
```
git clone https://github.com/john2x/solarized-pygment.git
cd solarized-pygment
./setup.py install
cd ..
rm -rf solarized-pygment
```

Переходим в папку, где будет новый проект. У меня блог лежал в `~/projects/site/blog.popstas.ru`,
я заранее переименовал старый проект в `~/projects/site/blog.popstas.ru_octopress`.

Создаем новый сайт:
```
hugo new site blog.popstas.ru
```

Получаем следующее:
```
$ tree blog.popstas.ru

blog.popstas.ru
├── archetypes
├── config.toml
├── content
├── data
├── layouts
├── static
```

Переходим в папку нового блога.

Добавляем тему. Я искал порт своей темы Octopress на Hugo и [нашел](https://github.com/parsiya/Hugo-Octopress):
```
mkdir themes
git clone https://github.com/parsiya/Hugo-Octopress octopress
```

Вносим первые правки в `config.toml`:
```
baseURL = "http://blog.popstas.ru/"
languageCode = "ru-ru"
title = "Popstas"
theme = "octopress"

[params]
    # Keep it as false please, the css file contains the code for highlighting
    pygmentsuseclasses = false
    
    # If nothing is set, then solarized_light is used
    # Other styles can be viewed in [http://pygments.org/](http://pygments.org/)
    pygmentsstyle = "solarized_dark"
    
    # Highlight shortcode and code fences (```) will be treated similarly
    pygmentscodefences = true

```

## Перенос контента

Определим список задач:

- Перенести md файлы
- Сохранить урлы статей
- Перенести тему, чтобы внешне были минимальные изменения
- Перенести правки css темы
- Сохранить форматирование статей
- Перенести картинки
- Перенести фавиконку и CNAME (для привязки домена к github pages)
- Сохранить Disqus комменты и Google Analytics
- Сохранить RSS ленту
- Перенести содержимое боковой колонки (последние статьи, лента твиттера, проекты на github)
- Перенести соц. панель AddToAny
- Русифицировать



### Перенос md файлов
В hugo есть только миграция с Jekyl, поэтому идем на github, ищем "octopress hugo" и находим [octohug](https://github.com/codebrane/octohug).
Его нужно скачать, скомпилировать, скопировать в папку старого блога и запустить.

После этого в корне старого блога появится папка `content`, ее нужно перенести в новый блог:
```
go get github.com/codebrane/octohug
cd "$GOPATH/src/github.com/codebrane/octohug"
go build
cp octohug ~/projects/site/blog.popstas.ru_octopress

cd ~/projects/site/blog.popstas.ru_octopress
./octohug

mv content ../blog.popstas.ru
```

Пора посмотреть, что получается. Переходим в папку нового блога и запускаем генератор:
```
cd ~/projects/site/blog.popstas.ru
hugo serve
```

Лично мне результат не понравился :) Статьи перенеслись, но с кривыми датами, заголовками и форматированием.
Открываем оба блога в вашем редакторе и на следующие пару часов превращаемся в контентщика. Вот что правил я:

- `<!-- more -->` заменить на `<!--more-->`
- перекопировать титлы (обратите внимание, из `title: "title"` надо делать `title = "title"`)
- убрать из `slug` даты
- поправить все даты
- заменить все `{[процентик]img` на `<img src` (заменил `%` на `[процентик]`, Github ругался)
- перекопировать теги, где они не перенеслись. Также я заменил `Categories = ` на `Tags = `, это сломало старые урлы категорий,
  но зато сделало теги тегами
- пройтись по каждой статье и глазами найти остальные несоответствия

Вносим правки в `config.toml`:
```
disablePathToLower = false
paginate = 10

# Make tags and categories work
[indexes]
    tag = "tags"
    category = "categories"

[params]
    # If false, all of the post will appear on front page (and in pagination)
    truncate = true
    
    # Author's name (this will appear in metadata and under posts)
    author = "Stanislav Popov"
    
    # This text appears in the site header under website title
    subtitle = "Записки о Linux"
    
    # Website's default description
    defaultDescription = ""

    # Used in the search engine
    searchEngineURL = "https://www.google.com/search"

[blackfriday]
    hrefTargetBlank = true # open the external links in a new window
    fractions = false
```


### Урлы
Урлы зависят не от имени файла (оно может быть любым), а от шаблона урлов, в моем случае от даты и алиаса (slug).

`config.toml`:
```
[permalinks]
    post = "/blog/:year/:month/:day/:slug/"
```


### Правки CSS темы
К сожалению препроцессора не будет.

`config.toml`:
```
[params]
    customCSS = ["css/custom.css"]
```


### Картинки и прочая статика
Копируем все, что должно быть в корне сайта из `sources` в `static`.


### Discus
`config.toml`:
```
[params]
    # Disqus shortcode
    # Disable comments for a specific post by adding "comments: false" in its frontmatter
    disqusShortname = "popstas"
```

Комменты появятся только при деплое, на localhost они отключены по каким-то причинам.


### Google Analytics
`config.toml`:
```
[params]
    # Google analytics account id
    googleAnalytics = "UA-70438594-1"
```


### RSS
`config.toml`:
```
[params]
    rss = true  # switch to true to enable RSS icon link

    # Set to true to use a text label for RSS instead of an icon
    # This is overwritten by the `rss` setting
    textrss = false
```


### Боковая колонка: последние посты
`config.toml`:
```
[params]
	# Number of recent posts that will be shown in the sidebar - set to 0 or remove to hide this section
	sidebarRecentLimit = 5
```

### Боковая колонка: Twitter лента, проекты на Github
Кастомные виджеты sidebar не предусматривает, поэтому правим шаблон, дописываем в конец, перед `</aside>`:
`/themes/octopress/layouts/partials/sidebar.html`:
``` html
    {{ partial "custom/twitterfeed.html" . }}
    
    {{ partial "custom/github.html" . }}
</aside>
```

После чего создаем в `themes/octopress/layouts/partials/custom` соответствующие файлы и копируем туда шаблоны из Octopress.
При этом нужно заменить переменные с `{{ site.var_name }}` на `{{ .Site.Params.varName }}` и добавить в `config.toml` нужные переменные:
```
[params]
    # Twitter feed
    twitterUsername = "popstas"
    # http://raisedadead.com/octopress-twitter-aside/
    twitterWidgetId = 691684611357806592

    # Github repos
    githubUser = "popstas"
    githubRepoCount = 10
```

Код виджетов здесь: 
[Twitter](https://github.com/popstas/popstas.github.io-hugo/blob/master/themes/octopress/layouts/partials/custom/twitterfeed.html)
и
[Github](https://github.com/popstas/popstas.github.io-hugo/blob/master/themes/octopress/layouts/partials/custom/github.html)


### Соц. панель AddToAny
С соц. панелью поступил так же, как и с виджетами боковой колонки: шаблон в `partials/custom`, вставил в `/themes/octopress/layouts/partials/post_footer.html:18`,
там есть специальное место для соц. панели.



## Русификация
Поменял формат дат в `themes/octopress/layouts/partials/post_header.html` и `themes/octopress/layouts/partials/post_footer.html`,
было: `{{ .Date.Format "Jan 2, 2006" }}`, стало: `{{ .Date.Format "2 Jan 2006, 15:04" }}`,
подробности [тут](https://golang.org/pkg/time/#Time.Format).

Насчет остального не стал париться и тупо нашел и заменил строчки в шаблонах.