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
Den här processen behöver automatiseras ytterligare men för nu

1. Skapa en ny .jade-fil i `src/chapters/**/*.jade` och se till att den innehåller ett html-ankare med samma namn som filnamnet. Algoritmen som används för att förvandla titlar till ankare är följande, (1) lowercase, (2) ersätt " " med "-", (3) ta bort alla tecken utom 0-9 och a-z. Alltså: `Hali hallå!` blir `hali-hall`.

1. Inkludera den nya filen i `src/index.jade` där du vill.