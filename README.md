### Hexlet tests and linter status:
[![Actions Status](https://github.com/MiggRabbid/frontend-project-46/workflows/hexlet-check/badge.svg)](https://github.com/MiggRabbid/frontend-project-46/actions)

### Maintainability status from Codeclimate.com:
[![Maintainability](https://api.codeclimate.com/v1/badges/0da0ed323fc374f13973/maintainability)](https://codeclimate.com/github/MiggRabbid/frontend-project-46/maintainability)

## «Вычислитель отличий»
Вычислитель отличий – программа, определяющая разницу между двумя структурами данных.
Это популярная задача, для решения которой существует множество онлайн сервисов, например http://www.jsondiff.com/. Подобный механизм используется при выводе тестов или при автоматическом отслеживании изменений в конфигурационных файлах.

#### Возможности утилиты:
 - Поддержка разных входных форматов: yaml, json;
 - Генерация отчета в виде plain text, stylish и json.

 ## Пример использования
 ### Вызов стправочной информации:
 ```
gendiff -h

Usage: gendiff [options] <filepath1> <filepath2>

  Compares two configuration files and shows a
difference.

  Options:
    -V, --version        output the version number
    -f, --format <type>  output format
    -h, --help           output usage information
```
[![asciicast](https://asciinema.org/a/604451.svg)](https://asciinema.org/a/604451)

 ### запуск вычислителя отличий:
 ```
gendiff ./data/file1.json ./data/file2.json

{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}
```
[![asciicast](https://asciinema.org/a/604452.svg)](https://asciinema.org/a/604452)


## Порядок установки и системные требования
### Порядок установки:
```
git clone git@github.com:MiggRabbid/frontend-project-46.git
cd frontend-project-46
make install
npm install
npm link
```

### Системные требования:
Node.js v20.2.0