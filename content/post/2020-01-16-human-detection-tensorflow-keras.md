+++
title = "Обнаружение объектов на камере на Keras"
date = "2020-03-19T14:20:00+06:00"
slug = "human-detection-tensorflow-keras"
tags = ["ML", "tensorflow", "keras", "smart home"]
draft = true
+++

О том, как я написал нейросеть для обнаружения себя с нуля за неделю.

Что я задумал: поставить камеру в коридоре, чтобы она видела кухню и комнату и сообщала дому, где именно есть люди.

{{< mainimg src="" >}}

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
- Поставил [Anaconda Python 3.7](https://www.anaconda.com/distribution/) (пришлось переставлять, чтобы добавить переменные окружения в PATH)
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

Фишка в том, что в tf2 уже включён Keras, надо использовать его. [Отличия отдельного Keras и встроенного в tf2](https://www.pyimagesearch.com/2019/10/21/keras-vs-tf-keras-whats-the-difference-in-tensorflow-2-0/).

Это не вышло, было слишком много ошибок. В итоге переустановил на tensorflow==1.13.2 (по этой рекомендации - https://github.com/tensorflow/models/issues/7522, tf 1.14.0 вылетал с Windows fatal exception: access violation).



### Сборка tfrecords из датасета Pascal

Датасет, сохранённый в VOTT, надо положить в `data` проекта. У меня в xml файлах были написаны не те пути, что по факту, возможно, это был временный глюк. Например, в xml:

``` xml
<annotation verified="yes">
    <folder>Annotation</folder>
    <filename>11-01-2020_23.39.19.jpg</filename>
</annotation>
```

Скрипт конвертации искал папку `Annotation`, для него создал `data/Annotation`, туда положил xml'ы, в ту же папку скопировал папку `JPEGImages`.

Скачал https://github.com/tensorflow/models, положил папку `object_detection` в корень своего проекта, потом нужные скрипты переносил в корень и запускал оттуда. Только так у меня работали `from object_detection import *`. Чтобы работали импорты Protobuf (что бы это ни значило), надо в начале запустить их компиляцию:

```
protoc object_detection/protos/*.proto --python_out=.
```

Кое-как переписал create_pascal_tf_record.py, подгоняя код под данные с обеих сторон, прошёл Step 3 - Prepare the labeled images as Tensorflow input, получил tfrecords (2 файла). Из 5000+ файлов и 275 файлов получилось 2 файла на 170 Мб. У меня были такие команды для запуска конвертации:

```
python create_human_tf_record.py --set=train --data_dir=data --output_path=tfrecords/human_train.record
python create_human_tf_record.py --set=val --data_dir=data --output_path=tfrecords/human_val.record
```

Это падало с Segmentation fault.

Создал новый environment в conda:
conda create -n model python=3.6
pip install tensorflow-gpu==1.13.2

Проверить версию tf можно так:

```
python -c 'import tensorflow as tf; print(tf.__version__)'
```

При этом у меня пока сохранился только один класс объекта, хотя у меня их 5.

Не исключаю, что этот шаг можно пропустить и сразу экспортировать датасет в tfrecords, но пока слишком много неизвестных для меня, чтобы так отклоняться от инструкций.



### Переобучение модели zoo

Официальный туториал почти хорош - https://github.com/tensorflow/models/blob/master/research/object_detection/g3doc/installation.md

Сразу [пролистайте ниже](#установка-pycocotools-на-windows-10) и начинайте качать MS VS++ 2015 Build Tools для компиляции pycocotools, у меня стоял 2017, он не сработал. Это займёт примерно 1 час.

Скачал модель ssd_mobilenet_v1_coco из [Tensorflow Detection Model Zoo](https://github.com/tensorflow/models/blob/master/research/object_detection/g3doc/detection_model_zoo.md). Сохранил в `models/ssd_mobilenet_v1_coco`.

Отредактировал там `pipeline.config`, пути к моделям, вот мой кусочек:

```
train_config {
  ...
  fine_tune_checkpoint: "C:/projects/tensorflow/room-object-detection/models/ssd_mobilenet_v1_coco/model.ckpt"
  from_detection_checkpoint: true
  num_steps: 200000
}
train_input_reader {
  label_map_path: "C:/projects/tensorflow/room-object-detection/tfrecords/tf_label_map.pbtxt"
  tf_record_input_reader {
    input_path: "C:/projects/tensorflow/room-object-detection/tfrecords//mscoco_train.record"
  }
}
```


```
pip install "git+https://github.com/philferriere/cocoapi.git#egg=pycocotools&subdirectory=PythonAPI"
```

На Ubuntu можно просто `pip install pycocotools`.

Скопировал `model_main.py` из `object_detection`, запустил:
```
python model_main.py --pipeline_config_path=models/ssd_mobilenet_v1_coco/pipeline.config --model_dir=models/ssd_mobilenet_v1_coco/train --alsologtostderr
```

Конечно, команда не запустилась сразу. Выдавало ошибку: No module named 'nets'. [Решение](https://github.com/tensorflow/models/issues/1842): скопировать `slim` из репозитория `tensorflow/models` (из `research`), потом добавить это в PYTHONPATH:

```
export PYTHONPATH=$PYTHONPATH:$PWD:$PWD/slim
```

Для Windows cmd проще открыть окно "Переменные среды" и добавить туда, у меня так:

```
C:/projects/tensorflow/room-object-detection;C:/projects/tensorflow/room-object-detection/slim
```

Были проблемы с настройками в `pipeline.config`, поправил. Теперь вылето с переполнением памяти:

```
2020-03-20 01:28:17.463412: W tensorflow/core/framework/op_kernel.cc:1401] OP_REQUIRES failed at cast_op.cc:109 : Resource exhausted: OOM when allocating tensor with shape[720,1280,3] and type float on /job:localhost/replica:0/task:0/device:CPU:0 by allocator cpu
```

Вздохнул, перезапустил... сработало!

Запустил tensorboard:

```
tensorboard --logdir=models/ssd_mobilenet_v1_coco/train
```

Он что-то показал, какой-никакой прогресс.


#### Установка pycocotools на Windows 10
No module named 'pycocotools' - pip install pycocotools не компилирует, не мог пройти этот шаг.

Помогли советы отсюда - https://www.kaggle.com/c/tgs-salt-identification-challenge/discussion/62381

1. Install Visual C++ 2015 Build Tools from https://go.microsoft.com/fwlink/?LinkId=691126 with default selection.
2. Go to C:\Program Files (x86)\Microsoft Visual C++ Build Tools and run vcbuildtools_msbuild.bat
3. In Anaconda, run


### Запуск model_main.py

TypeError: 'numpy.float64' object cannot be interpreted as an integer

https://github.com/rbgirshick/py-faster-rcnn/issues/481

Пробовал ставить numpy, начиная с 1.11, все падали, на 1.16 запустилось:

```
pip install -U numpy==1.16
```

Итак, эта балалайка запустилась и не вылетела через 10 минут. В процессе я узнал, что в конфиге было задано 200 000 эпох. Прошло 36 часов. Я получил заветные данные.

### Экспорт графа
Экспорт делается командой вроде этой, с заменой путей и номера чекпойнта (посмотрите в папке):

```
ckpt_num=63205; python object_detection/export_inference_graph.py --input_type image_tensor --pipeline_config_path models/ssd_mobilenet_v1_coco/pipeline.config --trained_checkpoint_prefix model.ckpt-${ckpt_num} --output_directory model/exported-graphs-${ckpt_num}
```

Получаю:

```
ValueError: The passed save_path is not a valid checkpoint
```



conda install tensorflow-gpu=1.12 для 3.0
https://stackoverflow.com/questions/39023581/tensorflow-cuda-compute-capability-3-0-the-minimum-required-cuda-capability-is

Nvidia 650 не тянет этот конфиг:
```
fixed_shape_resizer {
  height: 300
  width: 300
}
```

200x200 тоже не тянет, 150x150 входит.










## Ссылки:

- [Custom object detection using Tensorflow Object Detection API](https://liupeirong.github.io/tfObjectDetection/)
- [Перевод введения в Keras](https://habr.com/ru/post/482126/)
- [Делаем нейронную сеть: как не сломать мозг](https://habr.com/ru/post/439038/)
- [Нейронная сеть с использованием TensorFlow: классификация изображений](https://habr.com/ru/post/426797/)
- [Обзор Keras для TensorFlow](https://habr.com/ru/post/482126/)
- [Установка Tensorflow и Keras на Windows](https://github.com/antoniosehk/keras-tensorflow-windows-installation)
- [Complete Guide to TensorFlow-GPU Installation on Windows 10](https://medium.com/@soumyadipmajumder/complete-guide-to-tensorflow-gpu-installation-on-windows-10-36e5858640e9)
- [Keras vs. tf.keras: What’s the difference in TensorFlow 2.0?](https://www.pyimagesearch.com/2019/10/21/keras-vs-tf-keras-whats-the-difference-in-tensorflow-2-0/)

### Видео:

- [Курс "Нейросети на Python" Андрея Сазонова](https://www.youtube.com/playlist?list=PLtPJ9lKvJ4oiz9aaL_xcZd-x0qd8G0VN_)
- [Курс "Нейросети для анализа изображений" Андрея Сазонова](https://www.youtube.com/playlist?list=PLtPJ9lKvJ4oi5ATzKmmp6FznCHmnhVoey)
- [Курс "Deep learning на пальцах - 2019" от sim0nsays](https://www.youtube.com/playlist?list=PL5FkQ0AF9O_o2Eb5Qn8pwCDg7TniyV1Wb)

- [https://www.customvision.ai/](Custom Vision - сервис для обучения модели на своих размеченных картинках)
