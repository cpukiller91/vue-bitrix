#Webpack шаблон

```
yarn // (или npm install) Устанавливает завсимости
npm run start // Смотрит за файлами с hot-reload'ом
npm run build // Билдит для прода
```
>Файл подключения скриптов геренируется в папку dist/index.php, шаблон находится в src/index.php

#Конфиг
webpack.common.js - Базовый конфиг вебпака

webpack.dev.js - Конфиг для разработки

webpack.prod.js - Конфиг для продакшена

#dist
dist/bundle.js - главный бандл содержащий js и css

#src
src/js/ - папка c js

src/scss/ - папка со стилями

src/vue/ - папка с компонентами vue
