## Dependencies
Detta projekt kräver att `node`, `npm` och `gulp` alla finns tillgängliga i din PATH. Övriga dependencies installeras genom `npm` och finns alltså specificerade i `package.json`.

### 1) Installera Gulp
Om du inte har `gulp` tillgängligt i din PATH, behöver du installera det. Alltså...

`$ npm install -g gulp`

Dokumentation för `gulp` hittar du på deras webbplats [gulp](http://gulpjs.com/).

### 2) Hämta övriga dependencies
Använd `npm` för att installera projektets övriga dependencies. Alltså...

`$ npm install`

## Tasks
När alla dependencies är installerade är det bara att börja köra tasks. Du kan kolla i `gulpfile.js` för att närmare undersöka vilka tasks som finns och vad de gör. Men de som du oftast kommer behöva köra är följande.


- `$ gulp compile` Kompilerar allt i mappen `src` och placerar resultatet i `dist`. Notera att även filen `index.html` genereras. Detta eftersom `Github Pages` (som används för publicering) kräver en index-fil i roten av projektet. Läs mer om `Github Pages` [här](http://pages.github.com/).

- `$gulp server` Startar en server som serverar webbsidan på `localhost:4000`.

- `$ gulp watch` Startar en server, en livereload-server och lyssnar sedan på filförändringar. Vid förändring i `src`-mappen kompileras projektet om och webbläsaren livereload:ar. Servern hittas under `localhost:4000`.



## Skapa kapitel
För att skapa ett kapitel räcker det med att du skapar en fil under `src/chapters/*.jade` som följer namngivningskonventionen:
```
[part_number]-[chapter_number]-[part_name]-[chapter_name].jade
```
Exempelvis:
```
02-02-html-kommentarer.jade
```

Sen är det bara att skriva på. Resten genereras. Kolla in något annat kapitel för att vara säker på att du följer konventionerna.

### Viktigt
- Ett kapitel får endast innehålla antingen `<h1>` eller en `<h2>`. Endast **en** gång på fil.
- `<h1>`-instanser får endast förekomma i första kapitlet för en ny del ("part"). Använd i alla andra fall `<h2>`.
