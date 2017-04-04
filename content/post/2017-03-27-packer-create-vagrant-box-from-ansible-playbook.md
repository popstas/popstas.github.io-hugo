+++
title = "Packer: создаем свои vagrant box и docker image из одного конфига"
date = "2017-03-26T21:30:00"
slug = "packer-create-vagrant-box-from-ansible-playbook"
Tags = ["vagrant", "packer", "ansible", "ubuntu"]
+++

Проект [viasite-ansible/ansible-server](https://github.com/viasite-ansible/ansible-server) подошел к моменту,
когда нужно протестировать роль, которая зависит сразу от нескольких ролей (роль установки сайта).

Естественно, при тестировании этой роли я не хочу ждать по 10 минут каждый раз, 
поэтому ~~я потратил день~~ я вспомнил, что есть такой тул - [Packer](https://www.packer.io/)
и решил, что пришло его время.

Packer умеет брать чистую операционку, настраивать ее и упаковывать результат в образ системы для использования в других
программах или разворачивания на хостинге.

Для чего это может пригодиться:

- ускорение тестирования
- б**о**льшая повторяемость, по сравнению с ansible
- образы для продакшена для быстрого развертывания новых серверов
- образы идентичные продакшену для локальной разработки

Tl;dr: я буду собирать образы для Docker и Vagrant из Ubuntu, на которую накатили ansible плейбук.
Gist с результатами [здесь](https://gist.github.com/popstas/9a42d198fe7c5bee317d0bc4e2e2af9f).

<img src="/images/2017-03/ansible-packer-docker-vagrant.png" />
<!--more-->

За основу я взял [geerlingguy/packer-ubuntu-1604](https://github.com/geerlingguy/packer-ubuntu-1604).
Также смотрел на [chef/bento](https://github.com/chef/bento).



## Vagrant provision vs Packer build
Если брать конкретный момент времени и запустить одновременно `vagrant provision` и `packer build` с одним и тем же ansible плейбуком,
скорее всего результат будет одинаковым. Но:

#### Почему не vagrant provision:
- В packer время тратится только один раз, а в ansible - при создании каждой машины из образа.
- Со временем запуск ansible будет давать немного разные результаты (программы обновляются),
  рано или чуть позже это сломает образ, проблемы начнутся, когда это случится не у того, кто написал плейбук
  и кто просто хотел запустить систему.
- Можно сделать образы сразу для нескольких систем, за счет того, что сборка происходит параллельно, высоки шансы,
  что содержимое образов будет одинаковым.
- На Windows машинах есть проблемы с провиженингом ansible.



## Из чего состоит Packer
На самом деле там больше сущностей, перечислю то, с чем столкнулся я.

### [Provisioners](https://www.packer.io/docs/templates/provisioners.html)
Тут все как в Vagrant, provisioners - это то, что ставит все, что нужно, в ваш образ.
Я пользуюсь 
[shell](https://www.packer.io/docs/provisioners/shell.html) и
[ansible-local](https://www.packer.io/docs/provisioners/ansible-local.html).


### [Builders](https://www.packer.io/docs/templates/builders.html)
Builders определяют выходные форматы образов.
OpenStack, AWS, Digital Ocean и других хостингов.

А еще можно ~~грабить корованы~~ собирать Docker контейнеры. Это удобно тем,
что можно в одном конфиге описать сборку vagrant box и docker image и использовать то и другое по необходимости.

Необходимость у меня такая: docker образы меньше весят (спасибо слоям) и запускаются мгновенно (2 секунды против 1.5 минут в Vagrant).
С другой стороны, не все роли можно протестировать в Docker. А еще мне кажется, что в среднем программистам проще работать с Vagrant.

Я использую 
[virtualbox](https://www.packer.io/docs/builders/virtualbox.html) и 
[docker](https://www.packer.io/docs/builders/docker.html).


### [Post-rocessors](https://www.packer.io/docs/templates/post-processors.html)
Пост-процессоры запаковывают получившиеся артефакты в разные форматы, публикуют их.
Здесь можно протегировать образ, запушить образы в vagrant cloud и в docker hub.

Я использую 
[vagrant](https://www.packer.io/docs/post-processors/vagrant.html) и 
[docker tag](https://www.packer.io/docs/post-processors/docker-tag.html).



## packer build
Всю магию делает `packer build ubuntu1604.json`. Полезные аргументы:

- `--only=docker`, `--only=virtualbox-iso` - полезно для тестирования одного из builders
- `--on-error=ask` - позволяет перед убийством виртуалки залезть в нее и посмотреть, что пошло не так

Перед запуском нужно скачать дистрибутив Ubuntu и положить его туда, куда указывает `iso_urls` в настройках билдера.
Итак, запускаем...



## Грабли при packer build

### Warning: Authentication failure. Retrying...
После первой удачной сборки при `vagrant up` получил такую ошибку:
```
==> default: Waiting for machine to boot. This may take a few minutes...
    default: SSH address: 127.0.0.1:2200
    default: SSH username: vagrant
    default: SSH auth method: private key
    default: Warning: Authentication failure. Retrying...
    default: Warning: Authentication failure. Retrying...
    default: Warning: Authentication failure. Retrying...
```

При этом через `vagrant ssh` можно зайти с паролем `vagrant`.
Решение я позаимствовал у [chef/bento](https://github.com/chef/bento/blob/master/scripts/ubuntu/vagrant.sh),
нужно добавить insecure public key в authorized_keys юзера:
```
mkdir ~/.ssh
curl https://raw.githubusercontent.com/mitchellh/vagrant/master/keys/vagrant.pub >> ~/.ssh/authorized_keys
```

### Vagrant was unable to mount VirtualBox shared folders
После исправления прошлой проблемы появилась новая:
```
==> default: Mounting shared folders...
    default: /vagrant => /Users/popstas/projects/ansible/viasite-ansible/temp
Vagrant was unable to mount VirtualBox shared folders. This is usually
because the filesystem "vboxsf" is not available. This filesystem is
made available via the VirtualBox Guest Additions and kernel module.
Please verify that these guest additions are properly installed in the
guest. This is not a bug in Vagrant and is usually caused by a faulty
Vagrant box. For context, the command attempted was:

mount -t vboxsf -o uid=900,gid=900 vagrant /vagrant

The error output from the command was:

mount: unknown filesystem type 'vboxsf'
```

Понятно, что проблема в отсутствии VirtualBox Guest Additions внутри образа. Это странно, потому что в конфиге есть строчки:
``` json
{
  "builders": [
    {
      "type": "virtualbox-iso",
      "guest_additions_path": "VBoxGuestAdditions_{{.Version}}.iso"
    }
  ]
}
```

После чтения [доки](https://www.packer.io/docs/builders/virtualbox-iso.html#guest_additions_path) стало понятно,
что это просто закачивает в образ iso, но не ставит его. Не понял, как это работает у geerlingguy и bento, но для себя решил так:
```
sudo apt-get install virtualbox-guest-utils --no-install-recommends
```

Хотя чуть позже вычитал у Express 42
[как поставить из iso](https://github.com/express42-cookbooks/testo/blob/master/packer/scripts/postinstall.sh#L20-L24),
лично я не вижу ничего плохого в установке из пакетов.


### Can only tag from Docker builder artifacts, Unknown artifact type: mitchellh.virtualbox, Could not open lock file /var/lib/dpkg/lock
Причиной этих ошибок было то, что по умолчанию все provisioners и post-processors применяются ко всем builders.
Так как vagrant и docker отличаются, понадобилось внести изменения:

- внутри скриптов добавлены условия, например, `if [ -d /home/vagrant ]`
- в provisioners и post-processors были вписаны `"only": ["virtualbox-iso"]` и `"only": ["docker"]` куда надо
- в shell provisioners была дописана строчка с `override`, которая запускает скрипт от имени vagrant и не влияет на docker builder:

``` json
{
  "provisioners": [
    {
      "type": "shell",
      "script": "packer/scripts/ansible.sh",
      "override": {
        "virtualbox-iso": {
          "execute_command": "echo 'vagrant' | {{.Vars}} sudo -S -E bash '{{.Path}}'"
        }
      }
    },

```

### Сборка Docker застывала в конце
Не понял, с чем это связано, но заствала она на `apt autoremove`, не стал разбираться ради экономии 20 мб, просто убрал этот шаг.


## Итог
Я получил готовый vagrant box, из которого можно поднять виртуалку за 1.5 минуты или контейнер за секунду, вместо 10 минут. Profit!
