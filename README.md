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


 #### Пример использования:
 ```
# формат plain
gendiff --format plain path/to/file.yml another/path/file.json

Property 'common.follow' was added with value: false
Property 'group1.baz' was updated. From 'bas' to 'bars'
Property 'group2' was removed

# формат stylish
gendiff filepath1.json filepath2.json

{
  + follow: false
    setting1: Value 1
  - setting2: 200
  - setting3: true
  + setting3: {
        key: value
    }
  + setting4: blah blah
  + setting5: {
        key5: value5
    }
}
```