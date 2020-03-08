+++
title = "Обнаружение объектов на камере на Keras"
date = "2020-01-12T14:20:00+06:00"
slug = "human-detection-tensorflow-keras"
Tags = ["ML", "tensorflow", "keras", "smart home"]
draft = true
+++

О том, как я написал нейросеть для обнаружения себя с нуля за неделю.

Что я задумал: поставить камеру в коридоре, чтобы она видела кухню и комнату и сообщала дому, где именно есть люди.

<img src="" />
<!--more-->

## Камера
В январе заказал камеру Xiaomi Dafang, чтобы приделать компьютерное зрение к своей системе.

Сразу прошил [кастомной прошивкой cfw](https://github.com/EliasKotlyar/Xiaomi-Dafang-Hacks), чтобы не отдавать картинку наружу и отвязать от Mi Home, которым я не пользуюсь.

Из коробки настроил датчик движения на область картинки, 10 минут - и сигнал движения с камеры стал событием "движение в комнате" в моей системе. Поискал способ разметить 2 зоны на камере - не нашёл.

Настроил сбор фоток с камеры при любом движении, фотки пересылаются по FTP в папку, которая доступна на моём компе.

Эх, "придётся" использовать нейросети )


## Разметка изображений
О нейросетях я к этому времени знал по вступительным статьям, знал слова Tensorflow и Keras. "Надо разметить картинки" - подумал я.

Нашёл на хабре [статью про распознавание птиц](https://habr.com/ru/company/microsoft/blog/342056/). В ней нашёл то, что надо: [Visual Object Tagging Tool (VOTT)](https://github.com/microsoft/VoTT). 

За 2 дня разметил 1000 фоток через VOTT, отмечал теги human, stand, kitchen, sleep, vacuum (пылесос).


## Введение в нейросети
Когда у меня было 100 размеченных фоток, хотелось уже засунуть их в нейросеть, обучить и использовать на практике. Ничего не вышло.

Туман начал рассеиваться после пары часов просмотра [курса "Нейросети на Python" Андрея Сазонова](https://www.youtube.com/playlist?list=PLtPJ9lKvJ4oiz9aaL_xcZd-x0qd8G0VN_). Советую начать с него, как посоветовали мне.

## Настройка окружения на Windows
Я недооценил сложность проблемы, из-за этого потратил немного времени на установку просто через `pip install tensorflow keras`, это не сработало.

[Установка Tensorflow и Keras на Windows](https://github.com/antoniosehk/keras-tensorflow-windows-installation) - пошаговая инструкция, с которой я смог. Как ставил я:

- Удалил все версии Python (чтобы не мешались, необязательный шаг и единственный, который не описан в инструкции)
- Поставил [Anaconda Python 3.7](https://www.anaconda.com/distribution/)
- Обновил пакеты Anaconda (ставится сразу старое)
- Поставил CUDA
- Скачал cuDNN и прописал в PATH
- Поставил keras-gpu через Anaconda

В инструкции тестовый скрипт приведён для Tensorflow 1, его надо исправить, [issue](https://github.com/keras-team/keras/issues/12379).

Заменить блок:

``` python
import keras
from keras.datasets import mnist
from keras.models import Sequential
from keras.layers import Dense, Dropout
from keras.optimizers import RMSprop
```

На этот:

``` python
from tensorflow import keras
from tensorflow.keras.datasets import mnist
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense, Dropout
from tensorflow.keras.optimizers import RMSprop
```

Фишка в том, что в tf2 уже включён Keras, надо использовать его.


## Ссылки:

- [Custom object detection using Tensorflow Object Detection API](https://liupeirong.github.io/tfObjectDetection/)
- [Перевод введения в Keras](https://habr.com/ru/post/482126/)
- [Делаем нейронную сеть: как не сломать мозг](https://habr.com/ru/post/439038/)
- [Нейронная сеть с использованием TensorFlow: классификация изображений](https://habr.com/ru/post/426797/)
- [Обзор Keras для TensorFlow](https://habr.com/ru/post/482126/)
- [Установка Tensorflow и Keras на Windows](https://github.com/antoniosehk/keras-tensorflow-windows-installation)
- [Complete Guide to TensorFlow-GPU Installation on Windows 10](https://medium.com/@soumyadipmajumder/complete-guide-to-tensorflow-gpu-installation-on-windows-10-36e5858640e9)

### Видео:

- [Курс "Нейросети на Python" Андрея Сазонова](https://www.youtube.com/playlist?list=PLtPJ9lKvJ4oiz9aaL_xcZd-x0qd8G0VN_)
- [Курс "Нейросети для анализа изображений" Андрея Сазонова](https://www.youtube.com/playlist?list=PLtPJ9lKvJ4oi5ATzKmmp6FznCHmnhVoey)
- [Курс "Deep learning на пальцах - 2019" от sim0nsays](https://www.youtube.com/playlist?list=PL5FkQ0AF9O_o2Eb5Qn8pwCDg7TniyV1Wb)

- [https://www.customvision.ai/](Custom Vision - сервис для обучения модели на своих размеченных картинках)
