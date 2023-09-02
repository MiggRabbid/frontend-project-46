#### Hexlet-check, tests and linter status:
[![Actions Status](https://github.com/MiggRabbid/frontend-project-46/workflows/hexlet-check/badge.svg)](https://github.com/MiggRabbid/frontend-project-46/actions)
[![Test coverage](https://github.com/MiggRabbid/frontend-project-46/actions/workflows/tests.yml/badge.svg)](https://github.com/MiggRabbid/frontend-project-46/actions/workflows/tests.yml)
[![ESLint check](https://github.com/MiggRabbid/frontend-project-46/actions/workflows/linter.yml/badge.svg)](https://github.com/MiggRabbid/frontend-project-46/actions/workflows/linter.yml)

#### Maintainability and Test Coverage from Codeclimate.com:
[![Maintainability](https://api.codeclimate.com/v1/badges/62a34a4f7555c071a64d/maintainability)](https://codeclimate.com/github/MiggRabbid/frontend-project-46/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/62a34a4f7555c071a64d/test_coverage)](https://codeclimate.com/github/MiggRabbid/frontend-project-46/test_coverage)

---
# «Вычислитель отличий»
Вычислитель отличий – утилита командной строки (cli), определяющая разницу между двумя структурами данных.
Это популярная задача, для решения которой существует множество онлайн сервисов, например http://www.jsondiff.com/. Подобный механизм используется при выводе тестов или при автоматическом отслеживании изменений в конфигурационных файлах.

#### Возможности утилиты:
 - Поддержка разных входных форматов: yaml, json;
 - Генерация отчета в виде plain text, stylish и json.
 - По-умолчанию срабатывает встроенный форматтер "Stylish"

#### Поддерживаемые форматы вывода:
Утилита "Вычислитель" может выводить рузельтат в двух видах:
- форматтер "Stylish" - выводит результат в вид дерева, где отличия помечаются "-" и "+";
- форматтер "Plain" - выводит результат в строковом виде с описанием изменений;

## Пример использования
#### Вызов стправочной информации:
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

#### Запуск вычислителя отличий:
По-умолчанию используется форматтер "Stylish". Для Выбора конретного форматтера используйте опцию выбора форматтера: `-f` или `--format`, с аргументами: `stylish` для "Stylish", `plain` для "Plain"
```
gendiff ./data/file1.json ./data/file2.json
//or gendiff -f stylish ./data/file1.json ./data/file2.json

{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}
```
```
gendiff --format plain ./data/file5.json ./data/file6.json

Property 'follow' was removed
Property 'newObject.key1' was added with value: 'value1'
Property 'newObject.key2' was added with value: 'value2'
Property 'newObject.key3' was removed
Property 'proxy' was removed
Property 'timeout' was updated. From 50 to 20
Property 'verbose' was added with value: 'true'
```
[![asciicast](https://asciinema.org/a/605858.svg)](https://asciinema.org/a/605858)
---
## Порядок установки и системные требования
#### Порядок установки:
```
git clone git@github.com:MiggRabbid/frontend-project-46.git
cd frontend-project-46
make install
npm install
npm link
```

#### Системные требования:
- Node.js v20.2.0
- Commander.JS v11.0.0