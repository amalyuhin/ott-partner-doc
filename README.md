# ott-partner-doc

###Установить CLI пакет для генерации документации

```
npm install -g api2swagger
```
### Пример для генерации
```
api2swagger -e "http://ott-partner.dev.roowix.com/_api/avia/getDealsDestination?query=RU&limit=10" -X "GET" -o "json/avia/getDealsDestination.json"

```
###Установка зависимостей для генерации yaml

```
npm install
```
###Установить CLI пакет для тестирования API
```
npm install -g dredd
```