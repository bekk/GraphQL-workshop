# GraphQL-workshop

# Installere på forhånd
* node / yarn + npm

## Backend:

`yarn`

`node GraphqlServer.js `

Vipps, du har en server kjørende på [localhost:4000](http://localhost:4000/)

## Frontend:
                                   
`cd client`

`yarn && yarn start`

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

Om du klikker `ctrl + space` vil du merke at det finnes et felt til tilgjengelig, 
du kan også hente navnet på tv-serien.


Vi har også laget et enkelt frontend-skall som gjør spørringer mot GraphQL-serveren. Denne kjører på [localhost:3000](http://localhost:3000).
Her ser du at det vises en liste med tvserier og deres navn.


##### typedef.js henter bare ut id og navn på tvseriene. La oss utvide denne.

0: Utvid typedef til å hente Type, Status, Premieredato og webside.
0: Sjekk i GraphiQL at du kan få hentet ut de nye feltene.

##### Når vi først er i gang med utvidelser i typedef kan vi også ta med forsidebilde på tvseriene

1: Utvid typedef til å kunne hente forsidebilde på tvseriene 
```
Tips: 
- bruk en egen type for dette siden det finnes 2 ulike versjoner av bildet i datasettet.
```
2: Sjekk i graphiQL at du klarer å hentet ut informasjon om bildet.

##### Nå som typedef er oppdatert og du har klart å hente informasjon i GraphiQL, kan vi benytte det nye dataelementet i frontend

3: Utvid frontend til å vise forsidebilde av hver enkelt tv-sereie.


##### Slik det er nå har vi en query på Shows som henter alle tvseriene, men det er jo ikke alltid man ønsker å hente alle tvseriene. 

4: Utvid resolvers til å kunne hente en enkel tv-serie basert på tv-seriens id.

5: Sjekk i grapiQL at den nye resolveren din fungerer som planlagt.

##### Nå som vi kan hente enkelt-serie kan vi igjen utvide vår webside til å vise enkelt-tvserie

0: Gjør nødvendige endringer i show.jsx slik at det kan hentes informasjon om tvserien.
Her kunne det kanskje vært gøy å vist description-feltet fra json-objektene.


##### Informasjon om en tvserie alene er ganske kjedelig. Det er jo episodene i tvseriene det faktisk skjer noe! Typedef har ikke noe begrep om episoder nå. La oss utvide litt til.

6: Utvide typedef til å hente episoder innenfor en tvserie. Også her er det nok lurt å legge dette i en egen type.

##### Tv-seriene som ligger sjekket inn er kanskje ikke din favorittserie. Det hadde vel vært gøy å jobbe videre med noe som er ditt hjerte nærmere? Kanskje Tore på Sporet er en favoritt?

7: Legg til en ny tvserie i datasettet. 

``` 
  Tips: 
  - http://www.tvmaze.com/api#show-lookup - benytt IMDB-datasett
  - legg til ?embed=episodes for å få med alle episodene.
  - Fjern "_embedded" fra datasettet slik at det stemmer overens med strukturen til de andre tv-seriene) 
```

##### Frem til nå har vi bare gjort query på datasettet, men en hver side med respekt for seg selv må jo ha et kommentarfelt! I GraphQL er alle skriv-operasjoner såkalte `Mutations`

8: Utvide typedef og gi hver tv-serie mulighet til å ha en liste med kommentarer.
9: Utvide typedef med en metode for å legge en kommentar til en tvserie (hint: alle resolver-metoder har samme 4 argumenter)

10: Utvid resovlvers med den nye metoden fra forrige punkt og gjør nødvendig endring på datasettet (Du trenger ikke å lagre endringene til disk, for enkelhets skyld gjør vi det i minnet på data-objetet)

11: Sjekk i GraphiQL at du har mulighet til å kjøre den nye mutasjonen, og at dersom du henter ut data i ettertid så er kommentarene lagret sammen med tv-serien.

#####Nå som backenden er klar for kommentarer må vi jo utvide client-biten igjen!

12: Legg til et kommentarfelt i tilknyttning til hvert show som kjører GraphQL-spørring mot backend og lagrer kommentaren.

### Åpen og noe mer avansert oppgave

Vi har nå en frontend som viser tvserier og info om hver enkelt tv-serie. Utvid serie-visningen med en episodeliste.
Her står du fritt til å lage eventuelle filtreringer på sesong og/eller årstall.
 
