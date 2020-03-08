+++
title = "ansible-role-zsh: zsh терминал с autosuggestions, fzf и красивым удобным prompt"
date = "2017-03-09T08:00:00"
slug = "ansible-role-zsh-powerlevel9k-fzf-syntax-autosuggestions"
Tags = ["bash", "zsh", "oh-my-zsh", "powerlevel9k", "ansible-role", "zsh-autosuggestions", "zsh-syntax-highlighting", "fzf", "zsh-command-time", "percol", "powerline"]
+++

Репост [моей статьи с хабра](https://habrahabr.ru/post/323496/).

Я провожу в терминале много времени, поэтому хочется, чтобы все было красиво, быстро и удобно.
Из этого рождается постоянное желание его настраивать, пробовать разные плагины.
Шеллом я выбрал для себя zsh лет 5 назад, пару лет назад нашел oh-my-zsh для его удобной настройки.
Со временем к этому конфигу добавились некоторые сбоку торчащие части в виде powerline и percol.

Недавно я решил пересобрать все так, чтобы избавиться от ненужных плагинов, добавить нужные, сделать легкую установку
и обновление. В итоге появилась роль [ansible-role-zsh](https://github.com/viasite-ansible/ansible-role-zsh),
которая полностью настраивает терминалы на локалке и на моих серверах.



### Особенности:
- устанавливается одной командой (кроме шрифта и темы вашего терминального клиента)
- быстро загружается, быстро работает
- полностью настраивается через ansible, `~/.zshrc`
- полностью локальная (в систему ничего не ставится, все хранится в `~/.oh-my-zsh`)
- оставляет возможность юзеру вносить свои настройки через `~/.zshrc.local`
- ~~одинаково~~ работает на macOS, старом Debian, Ubuntu, CentOS
- нормально выглядит на разных цветовых схемах (но лучше всего на Solarized Dark)
- встроенная подсветка синтаксиса (помогает реже ошибаться и лучше читать длинные команды)
- автодополнение по истории команд (помогает реже нажимать `Ctrl+R`)
- отображение времени для долго выполняемых команд (помогает реже использовать `time`)

Демонстрация фич за 1 минуту:
{{< mainimg src="/images/2017-03/ansible-role-zsh-demo.gif" >}}

<!--more-->

Раньше я пользовался [powerline](https://github.com/powerline/powerline), который отвечал за command prompt (строку состояния)
и [percol](https://github.com/mooz/percol#zsh-history-search) для интерактивного поиска. Обе утилиты написаны на python.
Они хороши, когда я нашел percol, скорость работы в терминале сразу выросла, 
я радовался этому [в блоге](http://blog.popstas.ru/blog/2015/12/10/interactive-bash-history-with-search/),
но ставилось это все не очень красиво (bash инсталлером), имело некоторые проблемы при работе нескольких юзеров
с красивыми терминалами на одном сервере.

Также в некоторых случаях проявлялись недостатки утилит:
терминал грузился с небольшой задержкой (около 1 секунды), percol тупил на больших объемах текста.

Питоновские утилиты хотели, чтобы я их настраивал через отдельные конфиги. Мне отдельные конфиги поддерживать не хотелось,
поэтому я пользовался ими с настройками по умолчанию, не скажу, что они были плохие, но можно было и получше.

По этим причинам я поискал, чем их можно заменить и нашел.



## fzf, замена Percol
[Fuzzy finder](https://github.com/junegunn/fzf) написан на Go, имеет кучу звездочек, судя по описанию, заточен на работу в Vim, 
но и в других местах работает.

При выборе смотрел еще на [peco](https://github.com/peco/peco), они похожи, оба написаны какими-то японцами на Go,
я выбрал fzf по следующим критериям:

- больше контрибьюторов, вообще пульс проекта бьется примерно в 2 раза чаще
- заточен под vim и tmux, при этом хорошо работает и в обычном терминале
- настраивается через параметры командной строки и переменные окружения, а не через отдельный конфиг
- короче на одну букву :)

У fzf есть некая [крутая фича](https://github.com/junegunn/fzf#fuzzy-completion-for-bash-and-zsh) автодополнения разного через `**<Tab>`,
я не проверял, но автор плагина [fzf-zsh](https://github.com/Treri/fzf-zsh) пишет, что он конфликтует с `zsh-autosuggestions`,
я ему верю.



## Powerlevel9k, замена Powerline
Тему [powerlevel9k](https://github.com/bhilburn/powerlevel9k) я нашел случайно, потом проверил, по запросу на Github `powerline zsh`
он второй (после самого powerline).

Тема навороченная, позволяет много всего, я воспользовался некоторыми из фич:

- настройка всего через переменные окружения (сегменты, их расположение, цвета)
- добавление кастомных сегментов через те же переменные

Как и powerline, тема требует установки патченных шрифтов [powerline fonts](https://github.com/powerline/fonts),
я использую шрифт Droid Sans Mono, 12pt. Шрифт и цветовая схема - две вещи, которые нужно установить вручную.



## zsh-autosuggestions
Открытие [этого плагина](https://github.com/zsh-users/zsh-autosuggestions) для меня сравнимо с открытием percol: скорость набора команд увеличилась.
Часто бывает нужно набрать команду с теми же параметрами, что и в прошлый раз, или немного с другими параметрами.
Плагин выручает в обоих случаях.

Работает это так: при вводе команды плагин читает историю и дописывает серым последнюю команду из истории, начинающуюся так же.
Если нажать Enter, выполнится ваша команда, а не из автодополнения (это хорошо, случайно вызвать не ту команду будет сложно,
хотя у некоторых автодополнений бывают такие проблемы). Чтобы подставить дополненную команду, нужно нажать кнопку, забинденную
на действие `autosuggest-accept`, по умолчанию это &rarr;.

Но до стрелочки вправо постоянно тянуться неудобно, поэтому я сначала забиндил автодополнение на `backtick` (обратную кавычку,
которая слева от единицы). Это было очень удобно: прямо рядом с `Tab` и работает похоже на `Tab`. Но позже выяснилось,
что это ломает работу Midnight Commander: на одних системах он перестал переключать путь во внутреннем шелле (что полезно:
через mc переходим в нужную папку, нажимаем `Ctrl+O`, вводим команду, выходим из внутреннего шелла, или наоборот бывает
удобнее перейти в папку через шелл, а потом произвести действия в mc), на других системах mc вообще зависал через пару
переходов по папкам. Я погуглил проблему, в трекере mc есть такой глюк, в последней версии `4.8.18` зависания убрались, 
но путь так и не стал меняться, поэтому я стал пробовать другие хоткеи: `Ctrl+Space`, `Ctrl+I`, все они так или иначе глючили.

В итоге пришел к такому: я сам mc пользуюсь редко, поэтому на всех системах, где бываю не только я, я забиндился на `Ctrl+U`,
а на личных - еще и на кавычку. В плейбуке забиндено только на стрелочку.

Еще в ansible-role-zsh работа плагина ограничена 15 символами, то есть через 15 символов он перестает предлагать команды.
Это сделано для того, чтобы убрать задержки при копипасте команд в терминал (при вводе самостоятельно я задержек не ощущаю,
но при вставке из буфера больших команд это заметно, похоже на то, как будто вставка не сработала).



## zsh-syntax-highlighting
Про [этот плагин](https://github.com/zsh-users/zsh-syntax-highlighting) можно сказать не особо много:
подсвечивает текущую введенную команду, раскрашивая на лету.
Главный плюс в том, что вы видите, что опечатались по красному цвету слова. Не скажу, что это must have, но удобнее становится.

В то же время у плагина есть сразу несколько косяков.

На системах, где `zsh < 4.3.17`, вызывает крах терминальной сессии, 
поэтому в плейбуке есть защита от активации плагина на таких системах . Случай редкий, я сделал это ради Debian Squeeze.

Плагин должен подключаться последним, а не то не знаю что будет и знать не хочу.

Конфликтует с zsh-autosuggestions, проявляется в вылетании сессии при попытке повторно применить конфиг `.zshrc`.
Про это есть соответствующий [issue](https://github.com/zsh-users/zsh-autosuggestions/issues/126#issuecomment-280826224)
и автор zsh-autosuggestions 
[говорит](https://github.com/zsh-users/zsh-autosuggestions/issues/126#issuecomment-280826224),
что исправление уже в `devel` ветке, я не проверял, но если это так, после релиза `v0.3.4` должно все исправиться.
В плейбуке для этого есть фикс, так что конфликт устранен.



## zsh-command-time
Пока наводил порядок в этом проекте, [реализовал](https://github.com/popstas/zsh-command-time) одну из своих давних хотелок: вывод времени выполнения для команд,
которые выполняются долго. До этого я либо смотрел на часы в правом углу терминала и сравнивал с часами в предыдущей команде,
либо сразу запускал команду с `time`. Теперь этого делать не надо.



## Внешний вид темы в разных цветовых схемах
Я использую цветовую схему Solarized Dark, но чтобы не огорчать коллег, которые заходят на настроенные мной сервера,
я проверил, как выглядит терминал на стандартной палитре Putty, на стандартной палитре Ubuntu, на встроенных темах iTerm:

{{< imglazy src="/images/2017-03/ansible-role-zsh-colors.gif" >}}



## Установка
Итак, если вам понравилось, предлагаю сначала посмотреть работу вживую, в Vagrant:
```
git clone https://github.com/viasite-ansible/ansible-role-zsh.git
vagrant up
```

Перед установкой на рабочую систему внимательно прочитайте это:

- Роль не установится, если у вас уже есть директория `~/.oh-my-zsh`, переименуйте ее, если она у вас есть.
- Роль затрет ваш `~/.zshrc`, сделайте бекап!
- После применения роли, если хотите и дальше управлять терминалом через ansible, нужно писать свои настройки либо в переменные плейбука,
  либо в `~/.zshrc.local`, этот файл инклюдится в конце `~/.zshrc` и ansible его не трогает.

Если все устраивает, можно установить роль через `ansible-galaxy`:
```
ansible-galaxy install viasite-ansible.zsh
```

Потом создать плейбук вроде такого:
``` yaml
hosts: all
vars:
  zsh_autosuggestions_bind_key: "^U"
roles:
  - viasite-ansible.zsh
```

Сохранить, например, в `zsh.yml`. После этого роль можно применить к локальному юзеру:
```
ansible-playbook -i "localhost," -c local zsh.yml
```

Как применить к другим юзерам и серверам пользователи ansible думаю разберутся.

Проверено на Debian 6, Ubuntu 14.04, Ubuntu 16.04, macOS 10.12, CentOS 7.

Все доступные переменные не стал выносить в README.md, их можно посмотреть
в [defaults/main.yml](https://github.com/viasite-ansible/ansible-role-zsh/blob/master/defaults/main.yml)



## Выводы
Я понимаю, что конфиг терминала - очень личная вещь, не уверен, что будет много желающих воспользоваться именно моей ansible
ролью, поэтому я постарался сделать ее максимально настраиваемой. Если будут желающие использовать, пожалуйста,
оставляйте issues.

Конечно, это не последний конфиг, например, пока я писал эту статью, я нашел [antigen](https://github.com/zsh-users/antigen),
менеджер плагинов для zsh, который написан по аналогии с Vundle для Vim, заточен на работу в паре с oh-my-zsh
и избавляет от ручной установки плагинов. Это как раз одна из проблем, которую я решал написанием роли. Поделитесь, кто пользовался.

В комментах хотелось бы найти новых вкусных плагинов, пожалуйста, напишите, какие плагины вызвали у вас чувство "как я жил без этого раньше?"

UPD: добавилась поддержка CentOS, спасибо, [BeeVee](https://habrahabr.ru/users/beevee/)!