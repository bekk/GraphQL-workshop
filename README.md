# GraphQL-workshop

# Installere på forhånd
* node / yarn + npm

## Backend:

`cd server`

`npm install` / `yarn`

`node graphqlServer.js `

Vipps, du har en server kjørende på [localhost:4000](http://localhost:4000/)

## Frontend:
                                   
`cd client`

`npm install && npm start` / `yarn && yarn start`

Dobbelvipps, du har en klient kjørende på [localhost:3000](http://localhost:3000)

## Intro video:
[GraphQL Tutorial #1 - Introduction to GraphQL](https://www.youtube.com/watch?v=Y0lDGjwRYKw)


## Oppgaver

I koden som er utlevert har vi satt opp en enkel GraphQL-server basert på Apollo-rammeverket. Denne serveren tilbyr et GraphQL-grensesnitt hvor du kan hente ut tv-programmer med følgende spørring:
```
query {
  shows{
    id
  }
}
```

Om du limer inn denne spørringen i GraphiQL-serveren som kjører på [localhost:4000](http://localhost:4000/)
vil du få et resultatsett som viser id-en til tv-seriene som ligger i datasettet.

Om du klikker `ctrl + space` etter id vil du merke at det finnes et felt til tilgjengelig, 
du kan også hente navnet på tv-serien.


Vi har også laget et enkelt frontend-skall som gjør spørringer mot GraphQL-serveren. Denne kjører på [localhost:3000](http://localhost:3000).
Her ser du at det vises en liste med tvserier og deres navn.

***

##### La oss starte litt på server-siden. typedef.js henter bare ut id og navn på tvseriene

*Oppgave 1:* Utvid typedef til å hente Type, Summary, Status, Premieredato og webside. 

Her står du selvfølgelig også fritt til å ta med flere felter du tror kan være intressante å vise.

Sjekk i GraphiQL at du kan få hentet ut de nye feltene.

***

##### Når vi først er i gang med utvidelser i typedef kan vi også ta med forsidebilde på tvseriene

*Oppgave 2:* Utvid typedef til å kunne hente forsidebilde på tvseriene 

Sjekk i graphiQL at du klarer å hentet ut informasjon om bildet.

```
Tips:
- bruk en egen type for dette siden det finnes 2 ulike versjoner av bildet i datasettet.
```

***

##### Nå som typedef er oppdatert og du har klart å hente informasjon i GraphiQL, kan vi benytte det nye dataelementet i frontend

*Oppgave 3:* Utvid frontend - shows.jsx - til å skrive ut informasjon om type, status og premieredato, samt vis et lite forsidebilde av hver enkelt tv-serie.

```
Tips:
- Det ligger vedlagt en css, så om du skriver markup i henhold til eksemplene i /markup-foldern vil du få litt gratis styling-hjelp.
- Query fra react-apollo benyttes for å kjøre en query.
- Queries plasseres i queries.js
```

***

##### Slik det er nå har vi en query - Shows - som henter alle tvseriene, men det er jo ikke alltid man ønsker å hente alle tvseriene. 

*Oppgave 4:* Utvid typedef og resolvers til å kunne hente en enkel tv-serie basert på tv-seriens id.

```
Tips:
- Typedef utvides med en ny query med queryparameter
- I resolvers bør du bruke standard metodesignatur:
 show(obj, args, context, info) {
    // Implementer henting av show basert på input i args.
 },

```

Sjekk i graphiQL at den nye resolveren din fungerer som planlagt.

***

##### Nå som vi kan hente enkelt-serie kan vi igjen utvide vår webapp til å vise enkelt-tvserie

*Oppgave 5:* Gjør nødvendige endringer i show.jsx slik at det kan hentes informasjon om tvserien.
Her passer det for eksempel fint å bruke summary og det største bildeformatet.

***

##### Informasjon om en tvserie alene er ganske kjedelig. Det er jo episodene i tvseriene det faktisk skjer noe! Typedef har ikke noe begrep om episoder nå. La oss utvide litt til.

*Oppgave 6:* Utvide typedef til å hente episoder innenfor en tvserie. 
```
Tips:
- Også her er det nok lurt å legge dette i en egen type.
```

Som vanlig, ta en titt i GraphiQL for å se at du har fått det riktig.

***


##### Tv-seriene som ligger sjekket inn er kanskje ikke din favorittserie. Det hadde vel vært gøy å jobbe videre med noe som er ditt hjerte nærmere? Kanskje Tore på Sporet eller Home and Away er en favoritt?

*Oppgave 7:* Legg til en ny tvserie i datasettet. 

``` 
  Tips:
  - http://www.tvmaze.com/api#show-lookup - benytt IMDB-datasett
  -> Eksempel: http://api.tvmaze.com/lookup/shows?imdb=tt0094481
  - legg til ?embed=episodes på urlén du blir redirectet til for å få med alle episodene.
  -> Eksempel: http://api.tvmaze.com/shows/5419?embed=episodes
  - Fjern "_embedded"-noden fra datasettet slik at det stemmer overens med strukturen til de andre tv-seriene) 
  - Lagre json og legg den til i data-directory i servern
```

***

##### Frem til nå har vi bare gjort query på datasettet, men en hver side med respekt for seg selv må jo ha et kommentarfelt! I GraphQL er alle skriv-operasjoner såkalte `Mutations`

*Oppgave 8:* Utvide typedef og gi hver tv-serie mulighet til å ha en liste med kommentarer.

***

*Oppgave 9:* Utvide typedef med en metode for å legge en kommentar til en tvserie.
 ```
 Hint: 
 - Metoden trenger 2 argumenter, hvilken tvserie det gjelder og selve kommentaren.
 ```

***

*Oppgave 10:* Utvid resovlvers med den nye metoden fra forrige punkt og gjør nødvendig endring på datasettet. 

(Du trenger ikke å lagre endringene til disk, for enkelhets skyld gjør vi det i minnet på data-objetet)


```
Hint:
- Her må du legge til Mutations på toppnivå i resolvers
- Alle resolver-metoder har de samme 4 standard argumenter
- Inngenfor Mutations må du lage en ny metode innenfor denne som legger kommentar på riktig tv-serie
```

Sjekk i GraphiQL at du har mulighet til å kjøre den nye mutasjonen, og at dersom du henter ut data i ettertid så er kommentarene lagret sammen med tv-serien.

```
Mutationen vil trolig ligne noe på dette:

mutation {
  createComment(showId: 112, comment:"ff") {
    id
    name
    comments
  }
}

Innholdet i metoden er hva den skal returnere som resultat av spørringen.

```

***

##### Nå som backenden er klar for kommentarer må vi jo utvide client-biten igjen!

*Oppgave 11:* Legg til et kommentarfelt i tilknyttning til hvert show som kjører GraphQL-spørring mot backend og lagrer kommentaren.

```
Tips:
- Her må du huske å utvide queries.js med ny graphQL-spørring

```
***

*Oppgave 12:* Utvid typedef og resolver for å kunne hente en enkelt episode basert på id
```
Tips:
- Dette blir en spørring innenfor et Show, derfor vil denne resolveren ikke ligge inni Query eller Mutation men innenfor Show.
```

### Åpen og noe mer avansert oppgave

Vi har nå en frontend som viser tvserier og info om hver enkelt tv-serie. Utvid serie-visningen med en episodeliste.
Her står du fritt til å lage eventuelle filtreringer på sesong og/eller årstall.
 
***

### Nyttige lenker 
- https://www.apollographql.com/docs/tutorial/introduction.html
- https://www.predic8.de/graphql-query-samples.htm 
- http://www.tvmaze.com/api#show-lookup
- https://www.apollographql.com/docs/graphql-tools/resolvers.html
- http://apis.guru/graphql-apis/
- https://www.howtographql.com/
- https://www.graph.cool/



