+++
title = "Быстрое обновление PhpStorm EAP на Mac OS через bash"
date = "2016-01-17T07:50:17"
slug = "automacic-update-phpstorm-eap-on-mac-os"
image = "https://blog.jetbrains.com/phpstorm/files/2016/01/PhpStorm11EAP_splash_2@2x.png"
tags = ["bash", "macos", "phpstorm", "jetbrains", "fast"]
+++

Надоело постоянно обновлять PhpStorm руками. На Ubuntu последнее время делал это с помощью ansible,
под Mac этот плейбук не расчитан, к тому же версию ему надо было указвать вручную.
Поэтому написал скрипт, не совместимый с Ubuntu :)

UPD: 06.06.2016
Сегодня вышла EAP 2016.1.1, так вот, теперь app ставится не в PhpStormEAP, как раньше, а с версией, поэтому мой скрипт перестал работать.

UPD: 30.03.2018
JetBrains выпустил официальный инструмент для автообновления всего: [Toolbox App](https://www.jetbrains.com/toolbox-app/)

![phpstorm]({{< param image >}})
<!--more-->

Что он делает:

- идет на страницу EAP, находит там версию
- проверяет, что на компе стоит другая версия EAP
- качает dmg в папку Загрузки
- монтирует образ
- завершает PhpStorm, если он открыт
- удаляет текущую версию и копирует новую в папку /Applications
- запускает новую версию

Поставить можно так:
```
curl -s "https://gist.githubusercontent.com/popstas/613a72a34576b85caec4/raw/644f457ed0187ab0d1207576e925c06260451131/phpstorm-eap-update.sh" > /usr/local/bin/phpstorm-eap-update
chmod +x /usr/local/bin/phpstorm-eap-update
```

После чего можно обновлять просто запуском `phpstorm-eap-update`.
По идее можно даже в cron его засунуть, чтобы совсем автомат, но я и так узнаю о новой версии из rss.

Код лежит здесь - https://gist.github.com/popstas/613a72a34576b85caec4

В PhpStorm 11 из фич ничего особенного не нашел, зато с этой версии он перешел на использование Java 8,
не знаю, в этом ли дело, но у меня он вроде перестал тормозить.
