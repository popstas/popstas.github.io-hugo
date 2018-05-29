+++
title = "Настройка Nvidia Geforce 1050Ti на Ubuntu 18.04"
date = "2018-04-30T19:46:00+06:00"
slug = "nvidia-ubuntu-18.04"
Tags = ["ubuntu desktop", "nvidia", "drivers", "18.04"]
+++

Видяшка из коробки работала погано: томоза, видео глючило, 4к монитор работал на 30 герц. Это было из коробки, с драйверами nouveau. Помогла [эта статья](https://linuxconfig.org/how-to-install-the-nvidia-drivers-on-ubuntu-18-04-bionic-beaver-linux), вот краткое содержание:

```
apt install ubuntu-drivers-common
ubuntu-drivers devices
ubuntu-drivers autoinstall
```

Звук по HDMI работал нормально на обоих драйверах.

#### Другие проблемы с видео:
- [Черная полоса в яндекс браузере на Ubuntu 18.04, GPU ускорение](/blog/2018/04/30/ubuntu-yandex-browser-black-line/)
- Черный экран после загрузки - https://bugs.launchpad.net/ubuntu/+source/nvidia-graphics-drivers-390/+bug/1752053

<!--more-->

Статья из [цикла "Переезд на Ubuntu 18.04"](/blog/2018/04/30/windows-ubuntu-18.04-migrate/).
