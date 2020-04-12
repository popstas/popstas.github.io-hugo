+++
title = "Настройка времени в Ubuntu 18.04 так, чтобы при перезагрузке в Windows часы не слетали"
date = "2018-05-01T03:45:00+06:00"
slug = "time-zone-ubuntu-windows-reboot"
tags = ["ubuntu desktop", "18.04"]
+++

При перезагрузке из Ubuntu в Windows часы прыгают на разницу между Гринвичем и вашим часовым поясом. Нетрудно догадаться до причины: Ubuntu предполагает, что в BIOS часы настроены по UTC+0, а Windows считает, что там указано местное время.

Не знаю, как это исправляется в Windows, но нетрудно найти [решение в Ubuntu](https://help.ubuntu.com/community/UbuntuTime#Make_Linux_use_.27Local.27_time):

```
timedatectl set-local-rtc 1
```

<!--more-->

Не знаю точно, когда применяются настройки, может быть сразу или после перезагрузки. Если не помогло, проверьте, что у вас работает ntp:

```
ntpq -p
```

В результате команда timedatectl должна выдать все “yes” и local time == RTC time:

```
$ timedatectl
                      Local time: Вт 2018-05-01 03:41:45 +05
                  Universal time: Пн 2018-04-30 22:41:45 UTC
                        RTC time: Вт 2018-05-01 03:41:45
                       Time zone: Asia/Yekaterinburg (+05, +0500)
       System clock synchronized: yes
systemd-timesyncd.service active: yes
                 RTC in local TZ: yes
```

Статья из [цикла "Переезд на Ubuntu 18.04"](/blog/2018/04/30/windows-ubuntu-18.04-migrate/).
