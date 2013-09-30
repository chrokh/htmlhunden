# README

## Dependencies
Detta projekt kräver `node`, `npm` och `grunt-cli`.

### Installera Grunt
`$ npm install -g grunt-cli --save dev`

### Hämta övriga dependencies
`$ npm install`

## Tasks
- `$ grunt` Lyssnar på filförändringar, kompilerar jade-filer, och kör en server på `localhost:9001`

## För att skapa ett nytt kapitel
Den här processen behöver automatiseras, men för nu krävs tre steg ifall man vill lägga till ett nytt kapitel.

1. Skapa en ny .jade-fil i `src/chapters/**/*.jade` och se till att den innehåller ett html-ankare med samma namn som filnamnet.

1. Inkludera den nya filen i `src/index.jade` (var noga med att filerna hamnar i rätt ordning)

1. Lägg till en länk som pekar på ankaret i filen `src/table-of-contents.jade`