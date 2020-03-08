+++
title = "Мой умный дом 2019: Sonoff, ESP8266, MQTT, Node-red, Алиса"
date = "2019-12-02T02:00:00+06:00"
slug = "smarthome-node-red-2019"
Tags = ["smart home", "js", "node-red", "sonoff", "yandex-dialogs"]
+++


В начале года начал делать так называемый умный дом, ниже описание того, что получилось и немного деталей.



<img itemprop="image" loading="lazy" src="/images/2019-12/smarthome.jpg" />
(Кадр из психоделического советского мультика на тему, "[Будет ласковый дождь](https://www.youtube.com/watch?v=WfI69DC_jaw)").

<!--more-->

Пост написан в рамках [подведения итогов 2019 года](/blog/2019/12/29/new-year-2019/).

## Простая часть
Началось всё с того, что я поставил лампочку в туалете, которая реагирует на присутствие. Идея отказаться от выключателей запала в душу. Установка заняла минуту. Она была неудобной, и выключалась когда не надо.

Через пару месяцев ванная и туалет оказались с автономными датчиками (не подключены к сети, просто реагируют на движение и включают свет на несколько минут).

Подключил остальной свет к сети: коридор, комната, кухня.
Подключил вытяжку и тёплый пол (маленький отрезок, ножной обогреватель).

Дом знает:

- Светло или темно
- Дома я или нет
- Сплю я или нет
- Есть ли дома гости

Эти основные состояния становятся условиями в сценариях управления.

### Как сделать свет управляемым по WiFi?
Между лампочкой и выключателем ставится умное реле. Ум его заключается в том, что оно умеет принимать сигналы на переключение по WiFi в центр управления. Монтируется за 10-20 минут.

### Датчики
Датчик открытия двери передаёт сигнал каждый раз, когда дверь открывается. Неизвестно при этом, кто и откуда идёт, тут уже приходится догадываться обходными путями.

Датчики движения дают инфу о том, есть ли дома гости, куда я иду по квартире и как долго нахожусь на одном месте. В зависимости от этого свет включается и выключается когда надо, в идеале этого должно хватать, чтобы не переключать свет вручную.

На кухне стоит датчик температуры и влажности, от него дом знает, когда надо включать вытяжку: от включенного газа температура повышается. В мирное время он просто даёт посмотреть температуру на кухне.

Датчик освещения даже не буду рассказывать что даёт.

### Выключатели
Накупил радиовыключателей, настроил их, чтобы дублировали обычные.

Есть пульт на 4 кнопки, с которого можно включать весь свет и тёплый пол.

Плюс радиокнопок в том, что с ними можно переключать в обе стороны. Если выключить обычным выключателем, то включить можно тоже только с него, а если через радио, то включить можно любым способом (см. ниже). Ещё их легко монтировать: просто положить или приклеить к стене на скотч.

### Способы управления
**1. Автоматика.** Лучший вариант, когда она сработала и сделала то, что ты хотел.

**2. Радиовыключатель**, он всегда где-то неподалёку.

**3. Голос**, позволяет включить свет, когда понял, что его мало, завязывая ботинки или перемывая посуду.

**4. Приложение** на телефоне. Это неудобно, нужно несколько секунд, чтобы его открыть.

**5. Обычные выключатели**. Они никуда не делись, при аварийном режиме весь свет работает так, как будто ничего нет.

### Пылесос
Пылесос идёт отдельной графой, он дороже, чем всё остальное вместе взятое ) Про него есть [отдельный обзор](/blog/2019/04/04/robot-vacuum-cleaner-ilife-a9s-test/).

Его я никак не интегрировал, просто поставил на смартфон официальную приложуху и настроил ежедневную уборку. Работает, жалоб нет, все, что есть - в комментах к Youtube обзору.

### Голос
Голос у дома то появлялся, то исчезал, в конце года сделал проектик [mqtt2tts](https://github.com/popstas/mqtt2tts), который решил эту проблему.

У меня в обеих комнатах стоят компы на Windows, которые почти всегда включены. Поэтому я написал программку, которая:

- Принимает строку на озвучку через MQTT
- Если её ещё не озвучивали, запрашивает mp3 у Google
- Воспроизводит на колонки

Работает неплохо, особенно для повторяющихся строк, компы произносят почти всегда синхронно.


### Примеры автоматики

Что произошло | Что сделал дом
--------|------
Я пришёл домой     | Датчик двери передал сигнал. Дом проверил, нет ли меня дома, если не было, значит я пришёл (меняет состояние "Дома"). Если при этом темно, включает свет.
Кастрюля поставлена на газ   | Через минуту, когда воздух нагреется, включится вытяжка.
Я был в коридоре, а стал в комнате | Включится свет в комнате, если темно и если я не сплю.
Я открыл входную дверь, хотя я дома | Включится свет в коридоре на 5 минут, т.к. пришли гости.
Я открыл входную дверь и ушёл | Выключается режим "Дом": свет, вытяжка, тёплый пол отключаются.
Я ставлю телефон на зарядку, находясь дома, вечером | Телефон отправит сигнал на переключение режима "Сон" (весь свет выключается, датчики движения перестают включать свет).
Стемнело | Если я дома, свет начинает включаться в комнате или кухне, когда я туда захожу. Если я долго нахожусь на кухне, свет в комнате выключится.
Включен прибор, который обычно не нужен надолго | Свет в коридоре, вытяжка и тёплый пол включаются на определённое время (5-15 минут), независимо от способа включения.

### Надёжность
Работает это всё нестабильно:

- Сигналы от радиокнопок иногда не долетают, надо нажать кнопку хотя бы полсекунды чтобы она сработала
- Датчик движения может не сработать (у меня от этого может неправильно определиться направление движения)
- Датчик температуры и освещения иногда зависает и перестаёт что-либо передавать
- Иногда процесс выхода из дома не определяется, свет не выключается и горит весь день
- Бывают ошибки в скриптах
- Бывает, что глючит роутер и всё перестаёт работать
- Батарейки в любом из устройств могут сесть, (у меня пока такого не было)


## Подробности про внутреннее устройство и фото

### Туалет и ванная
Автономные датчики движения в радио диапазоне. Ставится между выключателем и лампочкой, на установку нужно 15 минут работы, 3 клеммы и минимальные знания в электрике, чтобы не соединить фазу с землёй.

Датчики чувствительные, есть регулировки чувствительности и времени срабатывания. Один датчик даже на минимальной чувствительности видел меня, когда я проходил мимо на кухню, пришлось обмотать его фольгой от пачки сигарет, это помогло.

Датчик в туалете хорошо ловит электрическую зубную щётку и включается на неё )

Это самая надёжная часть умного дома, т.к. самая тупая, поэтому она не отключается.

<img loading="lazy" title="Обмотанное изолентой - датчик движения в туалете" src="https://lh3.googleusercontent.com/juM-SqT922pd_56BnL0Se4kb5FMg6s9X2PBTJYtHPUaFEkv5gz3vPXZrkY07DFFCj9Rj4SW8eOHTigoyek7EEAtubiH-Fcph5l05xT7SdThLgMMGUDhKYNASUL_ALHeBOGGTYrQlX1M9T4z_9DC697_-OO5STKgsKYEfQYqEMHQ1ujfNjYWDjvJdOn0yFebrLrLoIlDvfpVXrq9SLrF2nQ-mRO-5qVRMiW59cQT_TLhdVpPc--rx8iZMYq7ma3XtywQHutbGjdF7VXvbhEvOvpqMH5PJA58PAgxCc4lYc5vcOnr1m2k-tyR1EALihVMEVVj4bKEVgpwDj7XzmugBauJoTasGP02s-5OQh54HveTi9NUZGI2h2SWzOfJPx5KoNTtkRnfMUdgjv2nYXIGVjUGynsj88zb3DEk-ItwXnI1mOAeAxHC6_XTR_ecj11Y7pgOTZn7XfpMkl5bAegH7zDe89A_BExKesUn4GrAuL1zCMU1EenSc_Mi7Ar7iz7nbSXJzy_xE99YwDunwNo6ToEpEKT0ho2rI2xISwDAx8WR-HuJ-XPATw19OLqCmyMFl3Wfv254fm2pouk85umOkaDLpJfC0mzANz65BFflZtmaXYlo54_mpl1i6zxZVZVxMQAWUBgAxD-y34oRf6yD98QpPRbYDkBkhZkNXrBzYsRGwlDblUCNNrzNMKZ9CLEs5dMK4LQCtwfmcuEa00PDNMchdJTATfHln2wqXHW48-ED2V2_b=w1364-h1024-no" />
<img loading="lazy" title="Коробочка справа - датчик движения в ванной" src="https://lh3.googleusercontent.com/W_qTodwanho0GMOxtDEMy2E1_emSaAgObo7p4AS_WIsAsBg_bYdsyV6R0LpFTX4M1Y9fHA5ph6Vr1BAq24o5cM9UoGgi2SsYMgq5GGyh6lvjoxx6GJgw3LJKitXU9W60ZusqSKy1s1hxTvy4nrUi4x5DgD6gVI5ywalK0ihLNKIedV1EGOZSv-IET0T9R0tYoFpWd8UjY-pRMtB4PW1lmoA8CFxg4-Pwo8-2fDlPOVzA5OaEfbSd491F6T-Te3qdWoZ7JQE5L3bHN4vo_t-BpVOfX5K4iJ7SiGiudge1GB-qfLK0wXU0Pud3jwW-STG72_9yB12HRllKSm-mIbimr_s8DFvhI6-fndYKxNL7xjulzOQ8zycGBhqvvuS5nVP7h31j1hBH-7JN62ngg6rdl8BHHa_vN24vTlJT5voJ6gHkPEfbbx7EFQQUGBIDc8-MeDlDERs41w0MXtrOC8ZnZSWTcQ5OMkbTTEjjdfdDoN2E_mUylNDmMHwc0EQlx23WgnUnreeKEcZ9ycocL3SNnOdJS4pgjT2qTUskGqxSrBBwb2jpcvpyxXQxldea2KQGSQMnGtV6knBnyJRY-YU8-CZyqrb5_97EF4EvFgqnK9VTH9z7gjVyAwXTZCON8CztaWLbzS4plBHa-akwBQWptbwcP4_7sjKQ58fOw49vVXh-zRg2nM17eBFrDsbeQ7DflP1iYlt7RFPBC9Dp9xV5n-WsZ0mc9hxTqcGcar6EvqUn_Ia3=w1364-h1024-no" />

### Кухня
На входе датчик движения Sonoff PIR2.

<img loading="lazy" title="Датчик движения Sonoff PIR2 на кухне" src="https://lh3.googleusercontent.com/5p5vgXLt7AGG5X8jqM40OseKNigb4FZ6bez-3htkhtLumuRMx-jNjNJ5KHRmRANyesIkBzbWY18OchEkPR9oLwJdxtIwknh-uBTFiH3U9CrN0aoFRERLEn686u1M3F1sgQQLfQ4E7EVkpdKiJEInGN8QMx5_15QwBXiD7ssejncy1bxFr5HOS9FTBM9D2roeP22xlQfWEen7zBFZKAgSFy8OtW9pqHScuG_-g-YBTVpUcJThoanfMR7EiTJTqBGamGm9I7DwxxAJ683TjlyBlo-_9EvBdLzX0mJ7iuxtSuAzXEjDth675bFR9nSc63DPkzZ913Q0mrqn5R3zuVNU7ZlnZSMEcUAZSAnrYd55xEJnAb-xIFiJRZfoFi3Z22xJZlLKOecrffAD9JWvyubCeZoomoowxZY2h86kKcofA64xnjjQcHmgYZHcXAMhfiMKpPpSh7d_Dn9pZTWWPMwlf7Ub_FG-v00Y3i2B1Yoyp1Ftkq4gfQ_4WMYoEDs8gGQKyEjDwut2GB2zSJd5At5eyGAU8FiSwbNr3KqIcje504WU2-WnzX2ApBE4nf9Afv0iNR4IZyvQEnGF9Mo1cxaRYROzcUIy_JvIlHaIMpO2M-huD47U4ll0fLps7JCv8qIWuJMhhKisWYg46YvKo595dlAY0g886QCOAFaBFdFVtUFIMoA6ov84JLc-hWMGT8cr4ZzYS0OwViaHZWkgXZBG_i7LKi_yl4kVIL9_ZUh9IWkx1Krx=w1364-h1024-no" />

Свет сделан через [Slampher](https://www.itead.cc/slampher.html), ничего не надо монтировать, нужно только вкрутить слампер в патрон, а лампочку в него. Сам девайс толстый и некрасивый, смотрите, чтобы подошёл к вашему плафону, в мой шарообразный вошёл еле-еле.

<img loading="lazy" title="Круглый плафон, в который входит Sonoff Slampher" src="https://lh3.googleusercontent.com/mlrNOg1rPhDtEHE6EC50q5t-xh4Bx3qTfnxcaFwXsd8VrvgRJdBvO0t_DxM2OMEq47lc5I8NNOX-o9XiuraxIP0JzzD1fIB1KzCHEF3CXrjJ_0kjVK6yb1QXn9m4nEkJ_IRp_Oa5rOLCVPLB3rOlkZpWUSus7Bdlywsr7mN0H3Ib6F8OutthgOrlodgfogE2x-aQrU0YNJze-VZsr58a_RRVhLa_6mpMDQByjpqORZcCA_v9qpR9WSdNdSUYo1Bhc8HNXZ_6Q-rjzl20mhfcgnKkSh6Je-HEy_RlVm7QahvFh1xny3ajRjYJoxiVv5Vax_KeJ7luzvEvFM_MH8hHk5OCadPR2JhyhRRLPMujrDhO1iSFjmyNfhM8JqPRVWvRo_HYPEIgCOydxcoJzIfF5h-IWrmA5ReoSg6-rt-PCePeVK03-DICLUlQgAmjCAwDh0vXamasQcvl0GeDG9w8Y0DXscWiExqSWrM0d8nJ-w9e2Lhx6x8mnbM7kMFZWatxlz8dAl8VDl2DsnpywVllOkDar8AlOrqQ-p_jsKeSeO4arKBn6OKh4O1aYmf7HKEEZXxLn2cdcscFoGZqHwAhZRYewOBXBLJWhMR5D7kXnebd4oY08LM6A6Xd3FM9W2rsj7c-stF3PhdLj37Jwm46-pUYIf6Ow5jifxN3MeZlRquQuyXYaDRfeILj2ZcckM8rNAspr1imIQuA-yhHFyF6S2jkK4HjE-zHVm40LkEwCB_Hlzv2=w1364-h1024-no" />

На столе радиовыключатель от кухни.

В районе плиты стоит колонка Irbis A1 с Алисой, через которую можно управлять светом.

Там же вытяжка, подключена через Sonoff S26, у неё есть свой радиовыключатель, т.к. до розетки тянуться далеко.

<img loading="lazy" title="Блок плиты: датчик температуры, освещения, вытяжка, кнопка от неё, Алиса" src="https://lh3.googleusercontent.com/ftY_msnB3A_-VuQp37RUmDg8lmu_0LW914uLyiIsaP6mpx-ZHo58V5nIM01p9Jbf0pCjtze-Eq-bMBfKh0eSt5n7HfhWKqnJlG3nootSNzhrali9jSSu28Tf937Sn5CXRdqF0Wtf9Mxf7l7Is1FapfjiN1omodTJePoR0jpSokDIXZJeG76EkLj1X2L7KZmpnRZwyg-Aw8TbG68QkkP-70m4hY15upsAN6c9xgcusy6fmNPoxGHOWGSNzjNToeVP8jYlg19Sv-s5GOWLBxJiGoi7cOcDbrONaegK7n1F8Zy2ew4OJUz1sgQDVNjP2xggvUxGGtY_5dFyZGwbAPQ80dP8ELs3VYMQMcoJoYgFrAYUm8NLkOLIf2CWndLyaIkLwZ1Jq96JVppJFcaHjWX4pySizxIIi_GFaJIcrX3XR-o5Esn-oxzuMnk5Qm0VvBVqVWrtXrZbs4GgK1LTHuF_Ao_NaCztkkJjvyzesYBNvItq2iyZDM4jsLu840_h7GOKq36KUgN56_5U3Y0hP995EqncezirZKNcpqoTBwari499ERjiGSXkaGprniva-q-vdX9FPLMTrOjU1FW-2TXqtEmnXzxjCl0f8HHYa19_7DxjeyTJc10wamr-uJuPmR4LT_82uior0i4q3M3diSHS_8-x3tS9_ztrodjYkk12IsEECcK615RzFSejuGfqBTdPatAASTUFnq10RIvBMnUs4lL-LPUSjUBUfXjQb2QlY6i4yPl6=w1364-h1024-no" />

Датчик температуры-влажности собран на ESP8266 + BME280 + фоторезистора на делителе, воткнутого в аналоговый вход. Вмонтирован в вытяжку, питается по USB длинным удлинителем от USB зарядки. Кстати, открыл для себя Mongoose OS, прошивку для ESP чипов, позволяющую писать на JS, мне так больше нравится, чем на Lua или C.

<img loading="lazy" title="Температура, освещение" src="https://lh3.googleusercontent.com/EEpQJ79GRoufgqnM3n67C7yV4NcdNx7YQ6BhgNN3zMNOBvc1NrqId3VT9ensZxI6yPUyZATfZFVYsF7pykzFFIFCYbdP4MkcSuOQTsjIrcQMJKuXQNqH8GCMLvbaPpwaK9fXHoGyYv--iFNlyMv7f4-2TxEefsbNaZD6kWzz9i3-b9aJOXaKqDNDZDdOysS0yV35E_zZM0lO6970iZtlcLQNtcwLrOVZZ5RMAfUZlfOJI4_w7uxSMw6jNke5jvlb-KKwOS5Z3NtEf0LAAvtQo4qtyWD7jwVGynQtCgHOKF2fMPCmKJ5-xTSP4Hy2pk9txr7A4-MVPDtHbHP0tzGqtMFi1mkZDJLtKjHQa-9sIjp0vpiey81BHW6TnWxrDUoCyEKAGsCgp7zluBlDKyfPQOmXc-U3PLztbVCoGXcrUAyUFgZt3iNF4vid5oOTl3_4YnDI12gfCZQVjcIb21LVPaXMKLF9ButH69R_o_T9b-0igrJaSJJ2o2tfT5eyhWhUBwji6nGFWUQuKrJLkqXnlItsReflAm7rKMEo1uKI3TOVB5OO_b9VX7nM3xSqsP7jq2j2P666FqmSVhgqT3QtRfZr3v-iH8KC5YDl_4y94aEsmhZ_VZHkFtJb8JYgLdXMZy0cQcsNU3-qZGlEq6j9rcy4gdAcKD1Cgv3IQstf3RaCUGkIqlfi5QLd0JD9LfmOABPNfQ-TO5OFxNY4guFI-9iHIXWfD1Epiy3mWldf89q264cN=w1364-h1024-no" />

В районе компа есть управляемая розетка с измерением мощности на Sonoff POW, в неё включается мини-комп или 3д-принтер.

Здесь же лежит мост Sonoff Bridge, который умеет принимать сигналы от радио кнопок и датчиков, транслируя его в MQTT.

<img loading="lazy" title="Мост Sonoff Bridge, передаёт данные радиокнопок и датчиков в систему" src="https://lh3.googleusercontent.com/tmwsXLL-kHfvV9W7gOA8tY0lBUPsa2ryNc7NjhbX3kJf4JRmzv0rbiSgo6E7Z9mGSOfAlqP6HS1dVsD8Tt1ks80WZVHDulh8fPvaVJJyn-TaRgItd64uzdmy5ufQO5oOn5VQVY0c7JD2NQtys9vIKnzunCTfm8-lUI6zY9xZpuZvINGdQxmzRDKdTdpQn5Mt3sz4LRjRMQG2Gc2RwAkQlkvv3CkLBiB-5uMwnzTJL1pKWy_4XFpM-FcP5fqzieUsUywZC0URpxfiktUePLc7UohFMkCYl5LuY3iF9DOSzuhCsUH0e5DYO0i6gTJsg7VUF3EHG1-Q5qQgILuk_mzPtvJQHvgFEAV1E6EJLHVFAd5MTVsEf8d6MC34Br9s3hT-4CqiazS4AFRiiJrW_L_5KtbOqS-LDg2-vU7uTVQajAKtzVxIfNjxIV9HOurU3vSuWdrIKpxwmlvF_5E58oHkBq1_9dek3t22g6izRhwt6s4BABOX7tyyvKtlHnxXcdHkZIFrokOjoDjZn0GNg_XtB5G4nea9lDSKKQwD-j5JD0o5bNBfMzd4XOD2Z0ztAdulIk8GuWqrz-TLB-TDmZ8C2ZWePnmWoJr9JGE0F2gc3sugySSJ2rwm6uIt12v2zjGs6DQs_cCosV8QJRQ78ltvMvQbITAKFVi15ZMniZrE3Lw2_Z1KM7tfNbo2ByYYZs3deO-NMmIE9VLHA_Mu-aoNWVsv3GNndfXJJNSWRDB14H0omswl=w1364-h1024-no" />

### Коридор
Sonoff Basic в светильнике, тройной выключатель от всего света на стене, датчик движения.

<img loading="lazy" title="Выключатель и датчик движения" src="https://lh3.googleusercontent.com/C67HBqggozQ4sFClH3G7rFdJdGxx31LL_lZXRcLVuiK_samysZ21UUToZpnDSTrwYrny5gs8alqNxxvz-a2CSdGql8tiD5VYRI6P3Hv-qfgRxaiLYHMPlrydzpnlNi2n5Cee1T57UVmB1qKE0yvUEye-1tC8u_4ZmcAKV_F5b4e58VoA1ZQ7kzCY0yJlKiOekVlap8CWOp-4lPKddd1-os4JhL_CjSQ4ukLZUDSztr86wr7qj04LgIV7wLNlwnBkc5SSo6j97yYixaKwVI_3MCslFITxKzCRUSZBV6GnrgtIosyxEr05BUtqEX9LrfFSxEW9Sgz4Szg9lxU9lxLpjYBPBRBeKkALvn7X1nKHf-b-ze3a2LxN-yvnjrKRGPxh5QBb54dyGc46o0yFigauA9MVSQzr5EynUpzmOaOjMm2Y25ogX7l9zArIsYN72ctiNQQWuD9LRK_1keFvuSJSSicGperlq09coSnU_OwDAp3ZZQ4VRdfRexugCWRhiN_8QaxLfYw5TBr-q8hNwswdVj2O_Co1JwLxSBE48oIGPIh_UsCOWRw4KhAMcPxWmeNAkI-wEXQFhmqAzDExkCqAu_Z5VBlIrUxTlQPrKqprZnf9HtfdYg0hK75q0Cy0MFubrk93ZAiql50G7SSP9jbrP09UeRDQpFu25LjNtQRMQMN3CrjR8_88y4NkyRjB7WR-f_5Ux--8abiFi7w3hDG47Svp3boLI48gnxzXdvwkQlyjUNf4=w1364-h1024-no" />

На входной двери датчик открытия.

<img loading="lazy" title="Датчик открытия входной двери" src="https://lh3.googleusercontent.com/nmtYVbBFlVcLxq4_AU2cviOqG5U2cMY7Wm87BJ-7oBVT9BvtBU9p9tdMKxy5V3o0njuh22dv3F55Yk2Q7e9rhPh5SQdZRZuv9i7eqqC-8cFHPbsYlK0Ncvn6vjSfqiN9jr1ANO1IsO3zMfUWL-_EHYpJLDGjmNHzL_X0xkyCJAk-9rK5wHWLastSI2dxP4ZPCl_MsfV2xYfbxhuHF2jLMJO5ofCUshz-9dAIo6cE3VzgbSvrGrjkJCBZ9c18Ok9vD-lAb8DTJfh0ugl8J4iWT1lWCDkGMsbgozu-EPpDD59eKhu3G1nEOmu1lx-6EqRUZXh5QUW225gz64qKQfMtToeJLIt4wAQLOUnyyhSuVbWNT830AmV4bqJKx8aPeVXF68W5qfh4R9DrO4elu06-xJ2K6LGick6ULSvBtrvt9yUZO2mG2uZETZyLmLycB5yQSSNwvmyL4cIXkjJYQWHSDRgbTtKiSKZs8tU5UWguvyaVAaReEHsbtd1l5jwE929iSS94Rhtn2VU_AaPdnh7Xy-eL1_7jPzlC-wGLNSrflvnUUHcgf_ZQHGpOp3zdWVo_Y6etIvzSiJN_WQO003kTuA_gkHVXqIlC0j05o-scslZkxkSyEQOeHEPimgvyHbow7w-INp8FVy7p6NCD4AHrj0AsjcsnBpBBp4uCpO-QynMtkPQLYClDQDdTbC8q6cCX6TyM1vRSBeY4mTUc59rNE3FsHvRhrVAZo1rgY7554uCxtKIf=w1364-h1024-no" />

### Комната
Внутри светильника Sonoff Basic. Датчик движения. Пульт от дома обычно где-то здесь.

<img loading="lazy" title="Карманный пульт от света и тепла" src="https://lh3.googleusercontent.com/-tmKrWtkLC7pUWx9M2Ix8-6hx5ufjc60Nx6dyUIkHc-yYuwImbwyDQM0W7frMjwHJOmjY7Ugir0NtDEVbbKltgqaY_I3sR4qL3gF07lMHPFDS9xFrlBp8bEDrHdAayhRJJvRPQ_vjRsN5To2UK-dbxkvJbW4G0Y_TvEi_SKsqNMqIxQSm3hmVMibjRS9qhx98o34o05eFebhJXDZ1Hhboh4IalwxIc4lGK7fzUig3DoW_xXIGATOXF2HU9y8VZolAOPisXCkM-9ASEnM3kzWfiV4hxzt6X0PbMvd6OreFkAheplLwj4m2TEEyLH9FiVggw6WBScSv7ToNA3ixJoJ9RyjHHP_WSYjY67XbNaXjiCjC_DvnJIrIvcZqK5weCTyRiaqRyJGCsA3sK4mZ0TxHFVpEwom-6ER2xupg49o6GBQZY92RZIYbNiZqMY_h1tn3-saNUDyDjXN1op4Nb0MkdLbei-J6EcW3VtyW257JyhhPJ2lCJ0scIhANWy-wAw6JDFUG67Lz6bHFLObW5Bk3HbRR7rmD27axym8sYUv8B3rC8pcbsbk32giFs3BOiceDKW5YnXy24v8DI3qqSHKqRx96yISDBENIGzL2i4bquCQ9Bb3_P97hJZiMOwUL7_65VDyrGGCxXSX87y-kcXWO80V0kqTWToJ2Yfyz-HE6D1q2br03waLZSUDG2T-SQefi4fTvCpJJDJAIj9FGj-a2Eh6sRHSy2EiH_lrBsV8WK8K_ATA=w1364-h1024-no" />

Под компом расстелен тёплый пол (в осеннее-весеннее время он переезжает на балкон) на Sonoff POW.

<img loading="lazy" title="Провод от Sonoff POW уходит в тёплый пол под ковром" src="https://lh3.googleusercontent.com/eU7Ti0r9904FLF0nMrrboa1pKO3z3PD-hFuJkmE66sp9cyvSt1pdRngnqWb6yvnALY1XhShzTOomEyAX5OeazpMG097ddTlUIhqQMgDYfkrQJk6a4mmQIx953AO57APVrshUnbCqACOKAa2xGqqPOPvnHsBinHRcxwqlEdhqLsprfYtFMuOtUlGlTJ6PqxgpEdEFTwQ93HpEiO-4_3Tl3rF5kiXm9sZzaAYDSyySOfsgLFrzHwylEzn0t46cJyay_m-l8KyaQbmIhgmz1Yt6VTKvQgLhGRwPlb2MNHqUzNW5UIZ9Dw_big5H0_07yrKEtQRhhMJsyq_qtBQzRV38wtmZURtQEDYUNMal59bpPNFjoxHpg67Kz2J5J5G7dMMVd78uupt9fhsyQeSDwVsp8ULRRPTXN4O8MrOen8yHiM9K-E96bM8BcDNl8YEYg5fvffT-vzXBsgqcDrptr6d6RcB_rx22zDR9s0swA3xfqDkNNQ2WPxMaCsglmsZnfRlAEf0J300GPmBNd_R9Psv43NdEgRkueM88M536qYXARW8axncEyYDBSKB6MXsuREVmzq6HGseDVIfx8enWUa9lE6qNicFEcF8Z4cFUd7grA1jddJgMf0uPKs8P_cSBuX7UnEW7X2-lo0goj-ezHMlZUso-G_3PXgIRYXJDSERGw6PxxS2zlktyZDT6uojxB3lIDjTqTr23OuZfzQ144OFKa3xYv3xsAcpknBiat-5Mn_3tmodJ=w1364-h1024-no" />

В середине комнаты стоит колонка Станция Мини, слышит тихий разговор из любого угла.

<img loading="lazy" title="Алиса в комнате внутри Станции Мини" src="https://lh3.googleusercontent.com/-0aHjL9D_zKu6DVhAdiGjf5o6CJa-xvCdAogPb17nOR62toKOuslJRa0JHks0fOgvfHAW4aH-Z7z8n73kf-gaEPfBjQskNBqSAtU3gEv07TpBrputAj92FG7bAdwwAY-aS_bIg8Mg39I_Yz10QE-FyPblWy1i4gqn0qOyMIDe6hHoxE4WDM9zn0X69Dy4ZSB9lWqKb16XkJHihz-iGvZ1wjTgRTGvreCxx9Yc1AuBJmvSz5kPdEKjCoq0r6zsYImawQj58NkC_xdfBHzZNiCnYXFR0Yv-ctNN61jbq9yw_anxJ8828oo1R813tNJjLtnkZG1_fVR9X3QaKde_eKlf8gaC9nVe9_-vphZH9ABOcTr10muvq5ldsIaM57adpbxTQmDmGwgciK9cW2HuRxd4iL578c-UtB-5-oTvJMl8XNq-moA_jl9RWQYJ88MtuS4yz3Nf0fwqOYHmYt1dIEUfVqRZFrl2qUV1B5u37il0fb0YtYT7PHwIWvFTnpIci_R1fNlOnLEq_Sj1nEJbqB7wVItM8jD-92QaO8QpJZPy4MOKFKplNu0-4acYfX8wzOrOOrJ4Txkh3uD5mgudt-rjrf8ou1tGZtH5mv5zZnIK89jpZJdJM7ZYwfOxS5GDKdPRQFkh2m7l4XbvdF0FhX5OGo2eRojkeXIistb1LK0xQ3NWbBMXcQ-jRnpxUMzIjBvxWSjJ2JrgXJCIYVrBpW8zwchoW_pGv_xNkUi-MPlUIHCh0yP=w1364-h1024-no" />

Пылесос живёт здесь:

<img loading="lazy" title="Пылесос ILIFE A9s по соседству с обычным (который его дополняет)" src="https://lh3.googleusercontent.com/D2B3F0SnBhx5rZCKnixficfKF6W-HjDAJOb1hT6SzeWfuBA2jaI8fjMzCAAOXkMA9XkHHjzL7I4YDSXyOGChdwzN8YKVAHhXU-6ePCi6gsjkKUdmlXB8Nu_LHYVt7meMSh4gGkA7MTz-Q-9jjE0hiAKVS8BADGF7jLEWqOnYGzc3ds88Zl1xe7rx7ZNTyb1xM2GN7aNVLtXC2UcYyaKfequpHiXZ6_VDl1vWjFz8372RAph3BIKjIXelFYxdiyXmeCtzXbRorC47dPcACjqS3Ncw1qBRvUSpEFBHoXtnXM4km27PNKgeGRXmIWAXy6KIgODuZdCbhyTKobDVGX3AV321fMNGBOxyMSnfuc6OoYhQnEQ_LbJLpZDcfKmz0DLp5z3SMov6rMLbEUw9mYOVXdtc4_gVdDlCBEvDT0P-TXclASApEfDwwnFBvi98rTqyO_hZTGXtyfyK9n_9xjsdOQAg0EGL0-cmtY_mInSetb77ZpvfUehPQ0fFAL-EZF8_R-6dWdx1EzFVfPYuEAO3gilQBk4dbTtEtRHIF2ouoxHn1zy4rkwOsrvqmEfYRVGgvar9KIHtiACiSAQxFV2oRajim4znUb9GLFTdJHWH1lhBZ3KBhGLr3k-vvmfCUhCAl-c1jCGy4Q451wbtiUbfdkxwMFQxvDF_LWDUUu9Qus5XQyg_6MrvDDeC1f9Bul1-R9rUAVIZlPsgSkDzE47o-dcP_qVb_TVcxJyC6jPGvFGdSYHI=w1364-h1024-no" />

### Прошивка
Все устройства Sonoff я перепрошивал (датчики движения и открытия слишком тупы, чтобы в них была прошивка). Прошивка [Tasmota](https://github.com/arendst/Tasmota) решила мою задачу: отказаться от китайских официальных приложух, которые работают на облаке Amazon AWS и иногда лежат, вместо этого управлять всем по MQTT.

### Node-red
Подключил всё это к одному центру, Node-Red, где можно во-первых накликать мышкой приложение для телефона с нужными мне кнопками, а во-вторых выстраивать разные условия и зависимости, используя таскание логических блоков мышкой в браузере и немного javascript.

Вся система работает по локалке (MQTT и Node-red), поэтому перебои с инетом ей не страшны.

Node-red - один из центров управления умным домом, придуман в IBM, написан на NodeJS. Отличается тем, что позволяет через блок-схемы и плагины делать большинство нужных задач. Если не хватает готовых блоков, можно наполнять пустой блок JS кодом. Если заморочиться, можно оформить свой блок в виде плагина (я так не делал).

Он принимает все MQTT сигналы, можно делать с ними что хочешь: связать данные с датчика температуры и вытяжки:

<img loading="lazy" title="Цепочка в Node-red" src="/images/2019-12/node-red-temp-stove-fan.png">

Также он даёт возможность собирать простой GUI, который можно запускать на смартфоне или на десктопе, это PWA:

<img loading="lazy" title="Node-red Dashboard UI" src="/images/2019-12/node-red-dashboard.png">

Не буду много про него рассказывать, в общем мне нравится, пока не заблудился в этих блоках, хотя выглядит уже устрашающе (это примерно 25% от всех блоков):

<img loading="lazy" title="Блоки управления светом в Node-red" src="/images/2019-12/node-red-many-blocks.png">


### Интеграция с Алисой
В конце мая, Яндекс запустил управление умным домом через Алису. Через пару дней все мои установленные переключатели научились переключаться голосом. Штука довольно бесполезная для меня, т.к. план был в том, чтобы всё работало без действий человека. Делал через проект [yandex-dialogs-smarthome-mqtt](https://github.com/popstas/yandex-dialogs-smarthome-mqtt), по ссылке подробности настройки (кодить вам не надо, только конфиг написать).

В начале ноября купил вторую колонку с Алисой, Станцию Мини, поставил в комнате. Теперь я могу из любой части квартиры переключать свет.

Технически тут заморочено: пишется навык для Алисы, который должен понимать специальное API на команды включения-выключения и передавать их по MQTT в шину, откуда Node-red их прочитает и сделает как надо.

Скажу так: надо много желания, чтобы повторить это у себя, желающие находились, но вряд ли это вы )

Для тех, кто хочет недорогих розеток от Sonoff с интеграцией с Алисой: подождите, Яндекс с Sonoff уже начали обсуждать официальную интеграцию (о чём официально заявили в канале Telegram "Около Яндекс Станции").


## Цены
- Пылесос ILife A9s, не взаимодействует с другими, но сам по себе автоматизирует - 17000 рублей
- Колонка Irbis A1, на кухню - 3000 рублей
- Колонка Яндекс.Станция мини, в комнату - 4000 рублей
- Sonoff POW (WiFi розетки с измерением мощности), тёплый пол, розетка для разных целей - 2 x [650 рублей](https://www.itead.cc/sonoff-pow.html) = 1300 рублей
- Sonoff Basic, свет в комнате и коридоре - 2 x 350 рублей = 700 рублей
- Sonoff Slampher, свет на кухне - [780 рублей](https://www.itead.cc/slampher.html)
- Sonoff S26, ставится между вилкой и розеткой вытяжки - 700 рублей
- Sonoff Bridge, комплект из моста, датчика движения, открытия двери - 1400 рублей
- Выключатель 1-кнопочный, для вытяжки - 380 рублей
- Выключатель 1-кнопочный, для кухни - 470 рублей
- Выключатель 3-кнопочный, комната-корридор-кухня - 420 рублей
- Радиопульт 4-кнопочный - 110 рублей
- Датчики движения Sonoff PIR2 - 2 x 570 рублей = 1140 рублей
- Тёплый пол 100x80см - 500 рублей
- Датчики движения, не подключенные к системе (тупые, но автономные), для туалета и ванной - 2 x 130 рублей = 260 рублей
- Датчик CO2, он ни на что не влияет, просто есть - 1000 рублей (не помню точно)
- Соединительные клеммы типа Wago - 10 x 10 рублей = 100 рублей

Итого 33300 рублей. Если вычесть пылесос и колонки, получаются уже скромные 9100 рублей.

Кроме того, есть ещё косвенные траты, не входящие в итоговую версию:

- Автономная лампочка с датчиком движения (с неё всё началось) - 250 рублей
- 2 радиопульта потерялись при доставке - 180 рублей
- Bluetooth-маячок (хотел на себя повесить, чтобы дом знал, где я, не доделал) - 650 рублей
- Микрофон с умом, который прямо wav вещает по I2C (не знаю даже, что с ним сделать) - 230 рублей
- Микрофон без ума (хотел заменить встроенный микрофон в Irbis, не дошли руки) - 120 рублей
- Куча разных датчиков (жесты, температура, влажность, освещение, звук, расстояние) ~ 1500 рублей
- Россыпь из ESP8266, версия WeMos D1 Mini - 5 x 200 рублей = 1000 рублей
- Датчик пыли PMS7003 - 950 рублей

Итого 4900 рублей. Того, что можно было не покупать.

Это всё я купил примерно за 2 года.

## Выводы
Не скажу, что это всё изменило мою жизнь, конечно, по большому счёту это баловство, очередной домашний проект (домашнее некуда) с большой тратой времени и небольшой пользой. Но я ни о чём не жалею, прикольно же )

Фотоальбом - https://photos.app.goo.gl/q152jf1WTgyEYGN16