#### Hexlet-check, tests and linter status:
[![Actions Status](https://github.com/MiggRabbid/frontend-project-46/workflows/hexlet-check/badge.svg)](https://github.com/MiggRabbid/frontend-project-46/actions)
[![Test coverage](https://github.com/MiggRabbid/frontend-project-46/actions/workflows/tests.yml/badge.svg)](https://github.com/MiggRabbid/frontend-project-46/actions/workflows/tests.yml)
[![ESLint check](https://github.com/MiggRabbid/frontend-project-46/actions/workflows/linter.yml/badge.svg)](https://github.com/MiggRabbid/frontend-project-46/actions/workflows/linter.yml)

#### Maintainability and Test Coverage from Codeclimate.com:
[![Maintainability](https://api.codeclimate.com/v1/badges/62a34a4f7555c071a64d/maintainability)](https://codeclimate.com/github/MiggRabbid/frontend-project-46/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/62a34a4f7555c071a64d/test_coverage)](https://codeclimate.com/github/MiggRabbid/frontend-project-46/test_coverage)

---
# «Вычислитель отличий»
Вычислитель отличий – утилита командной строки (cli), определяющая разницу между двумя структурами данных. Это популярная задача, для решения которой существует множество онлайн сервисов, например http://www.jsondiff.com/. Подобный механизм используется при выводе тестов или при автоматическом отслеживании изменений в конфигурационных файлах.

#### Возможности утилиты:
 - Поддержка разных входных форматов: yaml, json;
 - Генерация отчета в виде "Plain text", "stylish" и "json".
 - По-умолчанию используется встроенный форматтер "Stylish"

#### Поддерживаемые форматы вывода:
Утилита "Вычислитель" может выводить рузельтат в двух видах:
- форматтер "Stylish" - выводит результат в вид дерева, где отличия помечаются "-" и "+";
- форматтер "Plain" - выводит результат в строковом виде с описанием изменений;
- форматтер "Json" - выводит результат в строковом JSON файле с описанием изменений;

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
По-умолчанию используется форматтер "Stylish". Для Выбора конретного форматтера используйте опцию выбора форматтера: `-f` или `--format`, с аргументами:
- `stylish` для "Stylish";
- `plain` для "Plain";
- `json` для "Json"

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
```
gendiff --format json ./data/file3.json ./data/file4.json

[{"file1":[{"name":"file3.json"},{"extName":".json"},{"path":"data/file3.json"}],"file2":[{"name":"file4.json"},{"extName":".json"},{"path":"data/file4.json"}],"changedLines":[{"remote":2},{"added":5},{"changed":4},{"unchanged":3}],"diffTree":[{"common":{"value":{"follow":{"value":false,"status":"added"},"setting1":{"value":"Value1","status":"unchanged"},"setting2":{"value":200,"status":"remote"},"setting3":{"value1":true,"value2":null,"status":"changed"},"setting4":{"value":"blahblah","status":"added"},"setting5":{"value":{"key5":{"value":"value5","status":"unchanged"}},"status":"added"},"setting6":{"value":{"doge":{"value":{"wow":{"value1":"","value2":"somuch","status":"changed"}},"status":"unchanged"},"key":{"value":"value","status":"unchanged"},"ops":{"value":"vops","status":"added"}},"status":"unchanged"}},"status":"unchanged"},"group1":{"value":{"baz":{"value1":"bas","value2":"bars","status":"changed"},"foo":{"value":"bar","status":"unchanged"},"nest":{"value1":{"key":{"value":"value","status":"unchanged"}},"value2":"str","status":"changed"}},"status":"unchanged"},"group2":{"value":{"abc":{"value":12345,"status":"unchanged"},"deep":{"value":{"id":{"value":45,"status":"unchanged"}},"status":"unchanged"}},"status":"remote"},"group3":{"value":{"deep":{"value":{"id":{"value":{"number":{"value":45,"status":"unchanged"}},"status":"unchanged"}},"status":"unchanged"},"fee":{"value":100500,"status":"unchanged"}},"status":"added"}}]}]
```
[![asciicast](https://asciinema.org/a/606310.svg)](https://asciinema.org/a/606310)
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