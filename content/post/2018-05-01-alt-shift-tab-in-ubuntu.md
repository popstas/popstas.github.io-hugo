+++
title = "Переключение окон назад по Alt+Shift+Tab в Ubuntu 18.04"
date = "2018-05-01T05:55:00+06:00"
slug = "alt-shift-tab-in-ubuntu"
tags = ["ubuntu desktop", "gnome", "18.04"]
+++

Я был очень удивлен, что такой базовый функционал сломан из коробки. К счастью, это чинится легко, если вам не нужно переключение языка по Alt+Shift, т.к. именно оно мешает хоткею. Решение нашел случайно, настраивая [gxneur](/blog/2018/05/01/gxneur-punto-switcher-ubuntu/), нужно сменить комбинацию в gconf на Super+Space:

```
gsettings set org.gnome.desktop.input-sources xkb-options "['grp:super_space_toggle,grp_led:scroll']"
```

Кстати, это же мешало ставить хоткеи Alt+Ctrl+Shift, определялось только Ctrl+Shift.

<!--more-->

Статья из [цикла "Переезд на Ubuntu 18.04"](/blog/2018/04/30/windows-ubuntu-18.04-migrate/).
