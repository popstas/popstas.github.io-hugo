+++
title = "Конспекты курса Deep Learning на пальцах 2019: таймкоды"
date = "2020-04-12T22:51:00+06:00"
slug = "deep-learning-ngu-2019"
image = "/images/2020-04/deep-learning-2019.jpg"
tags = ["ML", "tensorflow", "pytorch"]
+++

[Курс "Deep learning на пальцах - 2019" от sim0nsays](https://www.youtube.com/playlist?list=PL5FkQ0AF9O_o2Eb5Qn8pwCDg7TniyV1Wb)

Хорошие обзорные теоретические курсы по нейросетям. У них есть недостаток: отсутствие таймкодов.

Этот пост по сути список таймкодов.

На данный момент я посмотрел 10 лекций.

![]({{< param image >}})
<!--more-->

## [1. Введение](https://www.youtube.com/watch?v=_q46x0tq2FQ&list=PL5FkQ0AF9O_o2Eb5Qn8pwCDg7TniyV1Wb&index=1)
[8:00](https://www.youtube.com/watch?v=_q46x0tq2FQ&list=PL5FkQ0AF9O_o2Eb5Qn8pwCDg7TniyV1Wb&t=8m0s) - определение ИИ. Часто под ИИ подразумеваются задачи, которые человечество только недавно научились решать. Например OCR. Ключевая задача - распознавание: картинок, звука, текста.

[15:52](https://www.youtube.com/watch?v=_q46x0tq2FQ&list=PL5FkQ0AF9O_o2Eb5Qn8pwCDg7TniyV1Wb&t=15m52s) - прогресс распознавания картинок и речи с 2011 года. Про разные домены: машинный перевод, поиск, NLP.

[28:35](https://www.youtube.com/watch?v=_q46x0tq2FQ&list=PL5FkQ0AF9O_o2Eb5Qn8pwCDg7TniyV1Wb&t=28m35s) - опрелеление ML.

[32:35](https://www.youtube.com/watch?v=_q46x0tq2FQ&list=PL5FkQ0AF9O_o2Eb5Qn8pwCDg7TniyV1Wb&t=32m35s) - как работает ML-алгоритм на распознавании рукописных чисел на датасете MNIST.

[37:44](https://www.youtube.com/watch?v=_q46x0tq2FQ&list=PL5FkQ0AF9O_o2Eb5Qn8pwCDg7TniyV1Wb&t=37m44s) - описание Deep Learning.

[46:28](https://www.youtube.com/watch?v=_q46x0tq2FQ&list=PL5FkQ0AF9O_o2Eb5Qn8pwCDg7TniyV1Wb&t=46m28s) - Computer vision features - SIFT.

[50:55](https://www.youtube.com/watch?v=_q46x0tq2FQ&list=PL5FkQ0AF9O_o2Eb5Qn8pwCDg7TniyV1Wb&t=50m55s) - об AlexNet.

[57:18](https://www.youtube.com/watch?v=_q46x0tq2FQ&list=PL5FkQ0AF9O_o2Eb5Qn8pwCDg7TniyV1Wb&t=57m18s) - краткое содержание курса и прохождение заданий для студентов.

[1:01:27](https://www.youtube.com/watch?v=_q46x0tq2FQ&list=PL5FkQ0AF9O_o2Eb5Qn8pwCDg7TniyV1Wb&t=1h01m27s) - другие онлайн-курсы, книги, сообщества.


## [2. Элементы машинного обучения](https://www.youtube.com/watch?v=1BUuB28FDOc&list=PL5FkQ0AF9O_o2Eb5Qn8pwCDg7TniyV1Wb)
[4:15](https://www.youtube.com/watch?v=1BUuB28FDOc&list=PL5FkQ0AF9O_o2Eb5Qn8pwCDg7TniyV1Wb&t=4m15s) - supervised learning (обучение с учителем), способ обучения, когда данные размечаются и после этого скармливаются в алгоритм, который выдаст модель - кусок кода, который может делать prediction для подобных новых (не размеченных) данных.

[6:25](https://www.youtube.com/watch?v=1BUuB28FDOc&list=PL5FkQ0AF9O_o2Eb5Qn8pwCDg7TniyV1Wb&t=6m25s) - как распознавать цифры номеров домов из датасета Street View House Numbers.

[10:05](https://www.youtube.com/watch?v=1BUuB28FDOc&list=PL5FkQ0AF9O_o2Eb5Qn8pwCDg7TniyV1Wb&t=10m05s) - метод ближайших соседей Nearest neighbor.

[12:21](https://www.youtube.com/watch?v=1BUuB28FDOc&list=PL5FkQ0AF9O_o2Eb5Qn8pwCDg7TniyV1Wb&t=12m21s) - nearest neighbor выдаст точность предсказаний на тренировочных данных 100%, но это не значит, что модель хорошо будет работать на новых данных.

[15:25](https://www.youtube.com/watch?v=1BUuB28FDOc&list=PL5FkQ0AF9O_o2Eb5Qn8pwCDg7TniyV1Wb&t=15m25s) - это исправляет метод k-ближайших соседей K-nearest neighbors.

[19:58](https://www.youtube.com/watch?v=1BUuB28FDOc&list=PL5FkQ0AF9O_o2Eb5Qn8pwCDg7TniyV1Wb&t=19m58s) - K - это гиперпараметр, то есть подбирается не во время тренировки, а перед этим.

[20:43](https://www.youtube.com/watch?v=1BUuB28FDOc&list=PL5FkQ0AF9O_o2Eb5Qn8pwCDg7TniyV1Wb&t=20m43s) - переобучение и недообучение, overfitting vs underfitting.

[24:58](https://www.youtube.com/watch?v=1BUuB28FDOc&list=PL5FkQ0AF9O_o2Eb5Qn8pwCDg7TniyV1Wb&t=24m58s) - про разделение датасета на train, val и test.

[28:11](https://www.youtube.com/watch?v=1BUuB28FDOc&list=PL5FkQ0AF9O_o2Eb5Qn8pwCDg7TniyV1Wb&t=28m11s) - кросс-валидация, cross-validation, когда весь датасет используется для тренировки, а val-данные каждый раз выбираются разные.

[36:32](https://www.youtube.com/watch?v=1BUuB28FDOc&list=PL5FkQ0AF9O_o2Eb5Qn8pwCDg7TniyV1Wb&t=36m32s) - бинарная классификация, binary classification, когда классов всего 2.

[37:25](https://www.youtube.com/watch?v=1BUuB28FDOc&list=PL5FkQ0AF9O_o2Eb5Qn8pwCDg7TniyV1Wb&t=37m25s) - о несбалансированных датасетов, когда класс A в датасете 99%, а класс B 1%, тогда модель, которая всегда называет класс A даёт точность 99%, борьба дальше идёт за доли процента.

[39:35](https://www.youtube.com/watch?v=1BUuB28FDOc&list=PL5FkQ0AF9O_o2Eb5Qn8pwCDg7TniyV1Wb&t=39m35s) - про precision и recall. Отражает процент false positive и false negative.

[45:34](https://www.youtube.com/watch?v=1BUuB28FDOc&list=PL5FkQ0AF9O_o2Eb5Qn8pwCDg7TniyV1Wb&t=45m34s) - многоклассовая классификация, multi-class classification.

[51:10](https://www.youtube.com/watch?v=1BUuB28FDOc&list=PL5FkQ0AF9O_o2Eb5Qn8pwCDg7TniyV1Wb&t=51m10s) - как определять недообучение и переобучение. Если ошибка на train большая - недообучение. Если ошибка на val большая - переобучение. Ошибка на test показывает реальную точность.


## [3. Нейронные сети](https://www.youtube.com/watch?v=kWTC1NvL894&list=PL5FkQ0AF9O_o2Eb5Qn8pwCDg7TniyV1Wb&index=3)
[2:44](https://www.youtube.com/watch?v=kWTC1NvL894&list=PL5FkQ0AF9O_o2Eb5Qn8pwCDg7TniyV1Wb&t=2m44s) - откуда взялась идея нейросетей, как они в общем работают.

[9:41](https://www.youtube.com/watch?v=kWTC1NvL894&list=PL5FkQ0AF9O_o2Eb5Qn8pwCDg7TniyV1Wb&t=9m41s) - линейный классификатор, linear classifier, система перемножения матриц, эквивалентна простой нейросети.

[14:55](https://www.youtube.com/watch?v=kWTC1NvL894&list=PL5FkQ0AF9O_o2Eb5Qn8pwCDg7TniyV1Wb&t=14m55s) - разделяющие плоскости в n-мерном пространстве.

[16:11](https://www.youtube.com/watch?v=kWTC1NvL894&list=PL5FkQ0AF9O_o2Eb5Qn8pwCDg7TniyV1Wb&t=16m11s) - цель всех вычислений: найти лучшие w и b, которые будут лучше всего приближать данные, лучшим образом разделять плоскостями разные классы.

[21:12](https://www.youtube.com/watch?v=kWTC1NvL894&list=PL5FkQ0AF9O_o2Eb5Qn8pwCDg7TniyV1Wb&t=21m12s) - метод градиентного спуска, gradient descent. Градиент - многомерная производная, которая говорит, в каком направлении надо двигаться, чтобы оптимальнее всего уменьшить или увеличить функцию. В итоге вычислений скатываемся в локальный минимум.

[28:02](https://www.youtube.com/watch?v=kWTC1NvL894&list=PL5FkQ0AF9O_o2Eb5Qn8pwCDg7TniyV1Wb&t=28m02s) - softmax - функция оптимизации, которая приводит все числа весов (от минус бесконечности до бесконечности) к числам от 0 до 1, которые будут отражать вероятность.

[35:11](https://www.youtube.com/watch?v=kWTC1NvL894&list=PL5FkQ0AF9O_o2Eb5Qn8pwCDg7TniyV1Wb&t=35m11s) - принцип максимального правдоподобия, maximum likelihood: у модели должны быть такие w и b, которые определяют максимальную сумму вероятностей (чтобы все классы определялись).

[38:51](https://www.youtube.com/watch?v=kWTC1NvL894&list=PL5FkQ0AF9O_o2Eb5Qn8pwCDg7TniyV1Wb&t=38m51s) - функция Cross-Entropy loss - функция оптимизации, которая отражает, насколько мала ошибка.

[41:39](https://www.youtube.com/watch?v=kWTC1NvL894&list=PL5FkQ0AF9O_o2Eb5Qn8pwCDg7TniyV1Wb&t=41m39s) - регуляризация, regularization. Техника, которая усложняет задачу оптимизации, но при этом сковывают её.

[46:17](https://www.youtube.com/watch?v=kWTC1NvL894&list=PL5FkQ0AF9O_o2Eb5Qn8pwCDg7TniyV1Wb&t=46m17s) - как посчитать градиентный спуск (теория).

[53:52](https://www.youtube.com/watch?v=kWTC1NvL894&list=PL5FkQ0AF9O_o2Eb5Qn8pwCDg7TniyV1Wb&t=53m52s) - стохастический (случайный) градиентный спуск, stochastic gradiend descent (SGD). Это когда вместо всего датасета на каждый шаг выбирают случайное кол-во данных и расчёт идёт только по ним.

Batch size - размер выборки данных для одного прохода, чтобы не перемножать весь датасет (обычно это невозможно).

[1:03:41](https://www.youtube.com/watch?v=kWTC1NvL894&list=PL5FkQ0AF9O_o2Eb5Qn8pwCDg7TniyV1Wb&t=1h03m41s) - слои нейронных сетей.

[1:04:36](https://www.youtube.com/watch?v=kWTC1NvL894&list=PL5FkQ0AF9O_o2Eb5Qn8pwCDg7TniyV1Wb&t=1h04m36s) - функция акцивации, non-linear function. ReLu - дефолтный выбор функции активации.

[1:10:03](https://www.youtube.com/watch?v=kWTC1NvL894&list=PL5FkQ0AF9O_o2Eb5Qn8pwCDg7TniyV1Wb&t=1h10m03s) - как посчитать градиентный спуск (практика). Обратное распространение ошибки, backpropogation.

[1:23:00](https://www.youtube.com/watch?v=kWTC1NvL894&list=PL5FkQ0AF9O_o2Eb5Qn8pwCDg7TniyV1Wb&t=1h23m00s) - общая схема вычисления градиента.


## [4. PyTorch и подробности](https://www.youtube.com/watch?v=tnrbx7V9RbA&list=PL5FkQ0AF9O_o2Eb5Qn8pwCDg7TniyV1Wb&index=4)
[8:23](https://www.youtube.com/watch?v=tnrbx7V9RbA&list=PL5FkQ0AF9O_o2Eb5Qn8pwCDg7TniyV1Wb&t=8m23s) - вычисление градиента с матрицами.

[23:13](https://www.youtube.com/watch?v=tnrbx7V9RbA&list=PL5FkQ0AF9O_o2Eb5Qn8pwCDg7TniyV1Wb&t=23m13s) - интерфейс слоя, layer interface в PyTorch.

[25:27](https://www.youtube.com/watch?v=tnrbx7V9RbA&list=PL5FkQ0AF9O_o2Eb5Qn8pwCDg7TniyV1Wb&t=25m27s) - общая схема тренировки.

[27:56](https://www.youtube.com/watch?v=tnrbx7V9RbA&list=PL5FkQ0AF9O_o2Eb5Qn8pwCDg7TniyV1Wb&t=27m56s) - пример решения многоклассовой классификации, multi-class classification.

[29:06](https://www.youtube.com/watch?v=tnrbx7V9RbA&list=PL5FkQ0AF9O_o2Eb5Qn8pwCDg7TniyV1Wb&t=29m06s) - multi-class labeling, когда на картинке может быть более одного объекта, softmax не подходит, используется другая функция вероятности sigmoid и loss-функция binary cross-entropy loss.

[33:02](https://www.youtube.com/watch?v=tnrbx7V9RbA&list=PL5FkQ0AF9O_o2Eb5Qn8pwCDg7TniyV1Wb&t=33m02s) - regression, нахождение носов, носов и глаз.

[37:48](https://www.youtube.com/watch?v=tnrbx7V9RbA&list=PL5FkQ0AF9O_o2Eb5Qn8pwCDg7TniyV1Wb&t=37m48s) - библиотеки для глубокого обучения, описание возможностей, пример на PyTorch.

[51:45](https://www.youtube.com/watch?v=tnrbx7V9RbA&list=PL5FkQ0AF9O_o2Eb5Qn8pwCDg7TniyV1Wb&t=51m45s) - подготовка данных, data preprocessing.

[55:47](https://www.youtube.com/watch?v=tnrbx7V9RbA&list=PL5FkQ0AF9O_o2Eb5Qn8pwCDg7TniyV1Wb&t=55m47s) - выбор функции активации. rectifier linear unit (ReLU).

[1:02:56](https://www.youtube.com/watch?v=tnrbx7V9RbA&list=PL5FkQ0AF9O_o2Eb5Qn8pwCDg7TniyV1Wb&t=1h02m56s) - инициализация весов, weight initialization. Xavier initialization. He initialization.

[1:10:06](https://www.youtube.com/watch?v=tnrbx7V9RbA&list=PL5FkQ0AF9O_o2Eb5Qn8pwCDg7TniyV1Wb&t=1h10m06s) - обновление параметров, update rules. Модификации SGD: Momentum, Adagrad, Adadelta, Rmsprop. Adam - дефолтный выбор градиентного спуска.


## [5. Нейросети на практике](https://www.youtube.com/watch?v=2gIn9cVn9cA&list=PL5FkQ0AF9O_o2Eb5Qn8pwCDg7TniyV1Wb&index=5)
[8:49](https://www.youtube.com/watch?v=2gIn9cVn9cA&list=PL5FkQ0AF9O_o2Eb5Qn8pwCDg7TniyV1Wb&t=8m49s) - сравнение процессора и GPU по TFlops

[18:00](https://www.youtube.com/watch?v=2gIn9cVn9cA&list=PL5FkQ0AF9O_o2Eb5Qn8pwCDg7TniyV1Wb&t=18m00s) - последствия ошибок на train, validate, test

TensorBoard - визуальное отображение loss & accuracy.

Annealing - гиперпараметр про уменьшение learning rate с течением эпох. В PyTorch это `torch.optim.lr_scheduler`. Применяется при недообучении (underfitting).

[27:55](https://www.youtube.com/watch?v=2gIn9cVn9cA&list=PL5FkQ0AF9O_o2Eb5Qn8pwCDg7TniyV1Wb&t=27m55s) - про переобучение. Лечится регуляризацией.

L2 regularization - самое простое.

Dropout - рандомное убирание частей данных во время или после тренировки. Обычно вставляют в конце сети.

Batch normalization - слой после весов, делает поток предсказуемого масштаба: среднее 0, std 1 (стандартное отклонение). Убирает выбросы в датасете. Чаще ставят после слоя активации (ReLu). Обычно ставят после каждого слоя весов.

Если собрать ансамбль моделей, предсказывать всеми и выдавать среднее, то результаты должны быть чуть лучше.

Learning rate можно подбирать либо линейно, потом смотреть лучший, либо пилой (больше-меньше), это даёт возможность скатившейся в локальный минимум точке выпрыгнуть оттуда и скатиться в более оптимальный минимум. Из разных минимумов можно собрать ансамбль.

[1:17:27](https://www.youtube.com/watch?v=2gIn9cVn9cA&list=PL5FkQ0AF9O_o2Eb5Qn8pwCDg7TniyV1Wb&t=1h17m27s) - про инженерный подбор гиперпараметров.

ONNX - стандарт экспорта моделей.


## [6. Convolutional Neural Networks](https://www.youtube.com/watch?v=tOgBz8lFz8Q&list=PL5FkQ0AF9O_o2Eb5Qn8pwCDg7TniyV1Wb&index=6)
[14:47](https://www.youtube.com/watch?v=tOgBz8lFz8Q&list=PL5FkQ0AF9O_o2Eb5Qn8pwCDg7TniyV1Wb&t=14m47s) - паттерны (или фильтры) свёртки для обработки изображений

[31:15](https://www.youtube.com/watch?v=tOgBz8lFz8Q&list=PL5FkQ0AF9O_o2Eb5Qn8pwCDg7TniyV1Wb&t=31m15s) - padding и stride. Padding - заполнение (обычно нулями) частей, которые выходят за пределы матрицы. Stride - шаг, с которым скачем по матрице.

[35:25](https://www.youtube.com/watch?v=tOgBz8lFz8Q&list=PL5FkQ0AF9O_o2Eb5Qn8pwCDg7TniyV1Wb&t=35m25s) - pooling layer - слой, меняющий разрешение по формуле Max pool (берёт максимум из объединяемых пикселей). При обратном проходе градиент отдаётся максимальному пикселю, остальным отдаёт ноль. Ставится после слоя активации.

Архитектура CNN с Max pooling хорошо работает со сдвигами изображений.

[45:30](https://www.youtube.com/watch?v=tOgBz8lFz8Q&list=PL5FkQ0AF9O_o2Eb5Qn8pwCDg7TniyV1Wb&t=45m30s) - рецептивное поле (receptive field) - то, какого размера поле в исходном изображении влияет на конкретный нейрон.

[50:15](https://www.youtube.com/watch?v=tOgBz8lFz8Q&list=PL5FkQ0AF9O_o2Eb5Qn8pwCDg7TniyV1Wb&t=50m15s) - примеры архитектур CNN.

LeNet'98 - сеть для распознавания цифр в почтовых индексах.

ImageNet - датасет из 1М картин, размечено 1000 классов.

AlexNet'12 - 15.4% ошибок, 16М параметров.

VGG'14 - 6.8% ошибок, 140М параметров.

ResNet'15 - 3.57% ошибок, решение проблемы тренировки сети с большим кол-вом слоёв (> 50). Чтобы один из слоёв не ломал все вычисления, стали передавать вход сразу на выход, а слой может только подправить, `f(x)+x`. Вход передаётся на выход через 2 слоя + ReLu.

[1:07:55](https://www.youtube.com/watch?v=tOgBz8lFz8Q&list=PL5FkQ0AF9O_o2Eb5Qn8pwCDg7TniyV1Wb&t=1h07m55s) - transfer learning, переобучение чужой сети. Если у нас всего 10-100 картинок, то замораживаются все слои сети, кроме последнего (не тренируются), в последнем меняем классы.

Если картинок около 1000, то можно заморозить не все слои, а часть, оставшиеся тренировать с разным learning rate, чем глубже, тем медленнее.

[1:17:40](https://www.youtube.com/watch?v=tOgBz8lFz8Q&list=PL5FkQ0AF9O_o2Eb5Qn8pwCDg7TniyV1Wb&t=1h17m40s) - аугментация - создание картинок из картинок. Например, можно отразить картинку и увеличить датасет в 2 раза. Потом можно делать смещения, изменения цвета, повороты, наклоны и т.д.
Аугментацию вставляют после выбора минибатча. Есть готовая либа [Albumentations](https://github.com/albumentations-team/albumentations). Встроенные либы тоже есть. Эффект как у ансамбля моделей.


## [7. Segmentation и Object Detection (Владимир Игловиков)](https://www.youtube.com/watch?v=r2KA99ThEH4&list=PL5FkQ0AF9O_o2Eb5Qn8pwCDg7TniyV1Wb&index=7)
Сегментация - это попиксельная классификация, когда на выходе получается картинка того же разрешения, но у каждого пикселя есть инфа, к какому классу он относится.

FCN (fully convolutional network) - сеть без dense слоёв, только из convolution слоёв.

Dense слои - fully connected слои.

U-Net - сеть, условно состоящая из 2 частей: encoder (распознаёт картинку, уменьшая разрешение) и decoder (разворачивает распознанную картинку в первоначальное разрешение).


[42:25](https://www.youtube.com/watch?v=r2KA99ThEH4&list=PL5FkQ0AF9O_o2Eb5Qn8pwCDg7TniyV1Wb&t=42m25s) - FPN (feature pyramid network). Решает проблему масштаба. Делается несколько параллельных слоёв, которые работают с разными размерами картинок.

[44:50](https://www.youtube.com/watch?v=r2KA99ThEH4&list=PL5FkQ0AF9O_o2Eb5Qn8pwCDg7TniyV1Wb&t=44m50s) - U-Net + FPN. Разные слои (уровни пирамиды) работают с картинками разного разрешения, потом верхние слои с большим разрешением подаются на вход нижнего слоя и на вход следующего слоя.

[49:55](https://www.youtube.com/watch?v=r2KA99ThEH4&list=PL5FkQ0AF9O_o2Eb5Qn8pwCDg7TniyV1Wb&t=49m55s) - Segmentation loss function. Тут ничего не понял...

[56:00](https://www.youtube.com/watch?v=r2KA99ThEH4&list=PL5FkQ0AF9O_o2Eb5Qn8pwCDg7TniyV1Wb&t=56m00s) - вторая часть.

Детекция - определение габаритов объектов: координаты, класс, аттрибуты.

Делятся на One-shot и Two-shot, вторые точнее, но дольше.

One-shot детекторы: YOLO (You only look once) (делит картинку на квадраты, боксы рисует по контурам квадратов, менее точно, но быстрее).

One-shot detector + FPN = SSD.

Как я понял, из two-shot надо брать Faster-RCNN.


## [8. Metric Learning, Autoencoders, GANs](https://www.youtube.com/watch?v=ajEQ10s8XRg&list=PL5FkQ0AF9O_o2Eb5Qn8pwCDg7TniyV1Wb&index=8)

Embedding - внутреннее представление картинки нейросетью перед классификацией (на предпоследнем слое). Набор внеторов, отражающих все знания сети о картинке.

По векторам можно сравнивать картинки и находить похожие по заданному признаку, это может быть как поза любого человека, так и один и тот же человек в разных позах.

Тренируется такая модель через triplet loss. Каждый элемент в батче - 3 фото, 2 похожих, 3-я непохожая. Нужно найти такой loss, чтобы вектора похожих были ближе друг к другу, чем непохожая.

[29:30](https://www.youtube.com/watch?v=ajEQ10s8XRg&list=PL5FkQ0AF9O_o2Eb5Qn8pwCDg7TniyV1Wb&t=29m30s) - Unsupervised learning (обучение без учителя) - обучение на неразмеченных данных.

Вместо предсказывания алгоритм находит общее:

- выявление схожих характеристик (clustering)
- выявление аномалий (outlier detection)
- выучить фичу, которая пригодится в другой модели (learning features)
- создание нового (generation)

Чтобы обучить сеть созданию, нужно на выходе генерировать такую же картинку, как на входе. Надо построить её так, чтобы в середине сети было недостаточно ёмкости, чтобы сохранить всю информацию о пикселях. Для этого сети нужно будет понять высокоуровневые параметры картинки. Сеть делится на encoder и decoder (который делает upsampling).

Автоэнкодеры быстро приходят к overfitting. Чтобы это обойти, прибумали variational autoencoder (VAE). Энкодер вместо предсказания пикселя выдаёт среднее и сигму, дисперсию (грубо говоря, центр и радиус). А декодеру мы будем передавать случайную точку из области этого круга. Чтобы шарики не схлопнулись в точку, добавляют дополнительный loss, который заставляет сеть делать сигму как можно больше.

Сеть можно научить определённому вектору, например, наличию улыбки, наличию очков. Когда вектор получен, мы можем добавлять или вычитать его в других картинках.

[1:00:00](https://www.youtube.com/watch?v=ajEQ10s8XRg&list=PL5FkQ0AF9O_o2Eb5Qn8pwCDg7TniyV1Wb&t=1h00m00s) - Generative adversarial networks (GANs) или генеративно-состязательные сети. Состоят из 2 сетей. Геренатор должен из точки (случайный шум) дать картинку. Дискриминатор видит картинки генератора и картинки из датасета, он должен определять, реальная картинка или сгенерированная. Цели у сетей противоположные. Генератор должен научиться делать такие картинки, которые дискриминатор не распознает. Генератор имеет доступ к весам дискриминатора, поэтому он смотрит изнутри, как картинку определили.

[GAN Zoo](https://github.com/hindupuravinash/the-gan-zoo) - сотни ГАНов.

Современные: StyleGAN'18

- [Welcome to the Simulation](https://blog.inten.to/welcome-to-the-simulation-dd0d8cb6534d)
- [StarGAN](https://github.com/clovaai/stargan-v2)
- [SC-FEGAN](https://github.com/run-youngjoo/SC-FEGAN)
- [generated.photos](https://generated.photos/faces)
- [StyleGAN](https://github.com/NVlabs/stylegan2)


## [9. Введение в NLP, word2vec](https://www.youtube.com/watch?v=MBQdMQUZMQM&list=PL5FkQ0AF9O_o2Eb5Qn8pwCDg7TniyV1Wb&index=9)
NLP сложно из-за того, что естественный язык сильно зависит от контекста. "Он видел их семью своими глазами".

[9:45](https://www.youtube.com/watch?v=MBQdMQUZMQM&list=PL5FkQ0AF9O_o2Eb5Qn8pwCDg7TniyV1Wb&t=9m45s) - NLP pipleline

`Вход` (текст, распознавание речи, OCR) -> `Морфология` (проверка текста, поиск по словам) -> `Синтаксис` (крутая проверка текста, парсинг) -> `Семантика` (положительное/отрицательное, sentiment analysis, машинный перевод) -> `Контекст` (связывание предложений).

Чем дальше по пайплайну, тем труднее составить список правил, чтобы формализовать обработку.

[22:00](https://www.youtube.com/watch?v=MBQdMQUZMQM&list=PL5FkQ0AF9O_o2Eb5Qn8pwCDg7TniyV1Wb&t=22m00s) - чтобы выразить задачу для нейросети, нужно перевести данные из символьного представления в непрерывное, то есть векторизовать. Как и в 8 уроке, в autoencoders, слова со схожим смыслом должны при этом оказаться ближе друг к другу и разбиться по кластерам.

[30:30](https://www.youtube.com/watch?v=MBQdMQUZMQM&list=PL5FkQ0AF9O_o2Eb5Qn8pwCDg7TniyV1Wb&t=30m30s) - word2vec - одно из первых успешных решений. Использует подход skip-gram: берёт соседние слова у каждого слова в датасете предложений, для каждого определяет вероятность использования соседних слов. Контекст вокруг слова - n-gram.

В архитектуре такой сети нет нелинейности (ReLu). Размеры матриц в слоях пропорциональны длине словаря. 

[51:10](https://www.youtube.com/watch?v=MBQdMQUZMQM&list=PL5FkQ0AF9O_o2Eb5Qn8pwCDg7TniyV1Wb&t=51m10s) - Проблема с этим наступает на softmax, где система должна умножить каждое слово в словаре, а их могут быть миллионы. Чтобы это обойти, придумали negative sampling. При тренировке выбирают несколько случайных слов и выводят по ним бинарное предсказание вместо softmax.

[1:08:00](https://www.youtube.com/watch?v=MBQdMQUZMQM&list=PL5FkQ0AF9O_o2Eb5Qn8pwCDg7TniyV1Wb&t=1h08m00s) - FastText от Facebook, умеет определять вектора для новых слов: раскладывает слово на n-граммы, каждое векторизует, для новых слов берёт среднее из них, стоит брать эту модель для начала.


## [10. Recurrent Neural Networks, Рекуррентные нейронные сети](https://www.youtube.com/watch?v=tlj-CMibdMI&list=PL5FkQ0AF9O_o2Eb5Qn8pwCDg7TniyV1Wb&index=10)
У обычных сетей 1 вход и 1 выход. Бывают другие варианты: 

- 1 вход, много выходов
- много входов, 1 выход (sentiment analysis)
- переменные входы, переменные выходы (перевод текста)
- много входов, столько же выходов

Рекуррентная сеть умеет запоминать выход на слое и на следующем шаге передавать самой себе в будущее это значение на вход, вместе с инпутом. Внутри слоя вычисляется `h`: вход умножается на веса + предыдущий выход умножается на веса и берётся среднее (грубо говоря). На следующем шаге `h` переиспользуется.

[15:20](https://www.youtube.com/watch?v=tlj-CMibdMI&list=PL5FkQ0AF9O_o2Eb5Qn8pwCDg7TniyV1Wb&t=15m20s) - Пример: генерация текста. Модель принимает символы по одному (+ "символы" BOS, EOS, начало и конец), учим её предсказывать следующий символ. Размер вектора - кол-во символов в языке.

[34:50](https://www.youtube.com/watch?v=tlj-CMibdMI&list=PL5FkQ0AF9O_o2Eb5Qn8pwCDg7TniyV1Wb&t=34m50s) - Как тренируется RNN. Сеть "разматывается", как будто один слой на разных шагах - разные слои.

Есть проблема: любой сигнал, умножаясь за 100 шагов на одну и ту же матрицу, становится очень большим. tanh его убьёт либо в 0, либо в 1, ReLu вообще нельзя использовать, т.к. значения уходят в небеса. Решают через long short-term memory (LSTM), в отличие от Vanilla RNN. Вместо 1 входа `h` делается 2 входа. `c` меняется по минимуму, чтобы градиенты протекали через него без экспоненциального изменения. В `h` добавляется несколько гейтов. Все гейты получают на вход конкатенацию векторов из `h` и `x`. Forget gate выдаёт вектор, равный размерности `c`, который говорит, сколько в `c` следует забыть. Input gate говорит, что нужно добавить (через tanh). Cell update говорит, что нужно передать на выход `c`. Output gate говорит, как нужно изменить значение `c`, чтобы выдать `h`. Это похоже на ResNet из 6 урока, где данные передавались без изменений через несколько слоёв.

[59:10](https://www.youtube.com/watch?v=tlj-CMibdMI&list=PL5FkQ0AF9O_o2Eb5Qn8pwCDg7TniyV1Wb&t=59m10s) - Bidirectional RNN

[1:04:35](https://www.youtube.com/watch?v=tlj-CMibdMI&list=PL5FkQ0AF9O_o2Eb5Qn8pwCDg7TniyV1Wb&t=1h04m35s) - Пример разбора частей речи (part of speech tagging) с зависимостью от контекста. Решение: many to many, Bidirectional LSTM с дополнением (CRF models).

[1:05:50](https://www.youtube.com/watch?v=tlj-CMibdMI&list=PL5FkQ0AF9O_o2Eb5Qn8pwCDg7TniyV1Wb&t=1h05m50s) - Нахождение именованных сущностей (named entity recognition, NER). Решение: many to many, Bidirectional LSTM CNN.

[1:06:50](https://www.youtube.com/watch?v=tlj-CMibdMI&list=PL5FkQ0AF9O_o2Eb5Qn8pwCDg7TniyV1Wb&t=1h06m50s) - Анализ тональности (sentiment analysis). Решение: many to one, LSTM.

[1:07:15](https://www.youtube.com/watch?v=tlj-CMibdMI&list=PL5FkQ0AF9O_o2Eb5Qn8pwCDg7TniyV1Wb&t=1h07m15s) - Машинный перевод (machine translation). Решение: many to many, LSTM.

[1:08:35](https://www.youtube.com/watch?v=tlj-CMibdMI&list=PL5FkQ0AF9O_o2Eb5Qn8pwCDg7TniyV1Wb&t=1h08m35s) - Использование в PyTorch.

[1:12:05](https://www.youtube.com/watch?v=tlj-CMibdMI&list=PL5FkQ0AF9O_o2Eb5Qn8pwCDg7TniyV1Wb&t=1h12m05s) - Разбор частей речи подробнее.


## Ссылки

https://supervise.ly/ - сервис для разметки данных

> Чтобы заменять часы и минуты на ссылку с таймкодом, заменял в vscode `((\d+):(\d+)) -` на `[$1](https://www.youtube.com/watch?v=1BUuB28FDOc&list=PL5FkQ0AF9O_o2Eb5Qn8pwCDg7TniyV1Wb&t=$2m$3s) -`