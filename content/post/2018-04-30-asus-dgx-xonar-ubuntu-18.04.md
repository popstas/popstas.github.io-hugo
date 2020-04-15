+++
title = "Настройка звука Asus DGX Xonar 5.1 на Ubuntu 18.04"
date = "2018-04-30T19:53:00+06:00"
slug = "asus-dgx-xonar-ubuntu-18.04"
image = "/images/2018-04/asus-dgx-alsamixer.jpg"
tags = ["ubuntu desktop", "asus-dgx", "drivers", "18.04"]
+++

Драйвера поставились сами. Звук определился, но не играл. Помог [этот пост](https://askubuntu.com/questions/598759/asus-xonar-dgx-recognized-but-no-sound):

alsa-utils у меня уже были установлены, запустил alsamixer, переключил выход с Headphones на Multichannel, заработало.

Примечательно, что таким же способом я чинил звук на Redhat и Creative Live 5.1 в 2003-м, прошло 15 лет, а глюки всё те же, печально.

![alsamixer]({{< param image >}})
<!--more-->

Статья из [цикла "Переезд на Ubuntu 18.04"](/blog/2018/04/30/windows-ubuntu-18.04-migrate/).
