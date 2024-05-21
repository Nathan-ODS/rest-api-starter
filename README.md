# REST-API
Ceci est un projet simple pour comprendre et définir les bonnes pratiques pour une API REST.

### Définition
Une API REST est une API qui suit une structure donnée. Cela ne signifit donc pas qu'elle suit des normes ou des règles précises. Je vais utiliser [cet article](https://www.freecodecamp.org/news/rest-api-design-best-practices-build-a-rest-api/#rest-api-best-practices) pour essayer de lister les principaux points d'une API REST suivant de bonnes pratiques en détaillant le plus possible.

### Gestion des versions
Avant de coder notre code principal pour notre API il faut déjà penser à la gestion des versions. C'est un avantage car on sait que l'on va déployer une version de notre API et travailler sur de nouvelles features que les clients ne doivent pas avoir accès. S'il y a des breaking changes dans nos projets en développements cela ne doit pas impacter le client.
De plus, rien n'oblige le client à utilser la dernière version, il peut choisir une version stable et choisir quand migrer vers les plus récentes.
## Bonne pratique numéro 1
>On peut différencier les versions en ajoutant `v1` ou `v2` à notre URL.

```js
// Version 1
"/api/v1/resource"
// Version 2
"/api/v2/resource"
```

C'est bien mais il faut aussi structurer notre projet pour chaque version !

à noter que nos dossiers routes sous dans nos dossier de version, il n'en ai pas de même pour les autres fichiers de notre API (controllers, services) car c'est un projet simple. Mais dans un projet qui évolue et où les controllers ou des mécanismes de notre API changent avec les versions, il vaudra mieux les déplacer dans les dossier de version correspondants.

## Bonne pratique numéro 2
>Nommer les ressources au pluriel

Lors de l'implémentation de nos fondamentaux CRUD _(create, read, update, delete)_, nommer nos ressources au pluriel présente le gros avantage qu'il est parfaitement clair pour les autres humains qu'il s'agit d'une collection composée de différentes ressources.

## Bonne pratique numéro 3
>Accepter et répondre avec des données au format JSON

Il existe de nombreux format de données différents mais JSON _(Javascript Object Notation)_ est un format standardisé.
Les API 'doivent' **accepter** et **répondre** avec des formats JSON.

## Bonne pratique numéro 4
>C'est également une bonne pratique de nommer les méthodes de service de la même manière que les méthodes du contrôleur afin d'avoir une connexion entre elles.

Pour rappel:
Couche Contrôleur: Cette couche est responsable de la gestion des requêtes HTTP entrantes. Elle analyse la requête, valide les données d'entrée et appelle la méthode appropriée de la couche service. Ensuite, elle renvoie la réponse au client. Les contrôleurs sont généralement minces et ne contiennent pas de logique métier.

Couche Service: Cette couche contient la logique métier de l'application. Elle est appelée par la couche contrôleur. La couche service effectue les opérations nécessaires, comme les interactions avec la base de données, l'appel à d'autres services, les calculs complexes, etc. Ensuite, elle renvoie les résultats à la couche contrôleur.

Nous allons utiliser une base de données sous la forme d'un simple fichier JSON.

## Bonne pratique numéro 5
>Répondre avec des codes d'erreur HTTP standard

Implémenter les opération **CRUD** (create, read, update, delete) c'est bien mais dans le monde réel notre API peut produire de nombreuses erreurs que ce soit d'un point de vue humain ou technique. Réponse avec des bons status et messages peut largement aider dans le debug mais il faut aussi être vigilant aux informations que l'on donne dans les réponses d'erreur. Exemple: `Mot de passe incorrect` révèle qu'un utilisateur existe avec un Login donné.

Quelques status à connaître:
- 200 : OK
- 201 : CREATED
- 204 : NO CONTENT (ressource deleted)
- 400 : FAILED
- 404 : NOT FOUND
- 500 : SERVER ERROR

## Bonne pratique numéro 6
>Ne pas utiliser les verbes dans les noms de points de terminaison

Chaque URL doit pointer vers une ressource.
```
// Current implementations (without verbs)
GET "/api/v1/things" 
GET "/api/v1/things/:thingId" 
POST "/api/v1/things" 
PATCH "/api/v1/things/:thingId" 
DELETE "/api/v1/things/:thingId"  

// Implementation using verbs 
GET "/api/v1/getAllThings" 
GET "/api/v1/getThingsById/:thingId" 
CREATE "/api/v1/createThing" 
PATCH "/api/v1/updateThing/:thingId" 
DELETE "/api/v1/deleteThing/:thingId"
```

On peut clairement voir pourquoi utiliser des verbes n'est pas scalable. Le verbe HTTP désigne déjà l'action (GET, DELETE) 

## Bonne pratique numéro 7
>Regrouper les ressources associées (imbrication logique)

Lorsque vous concevez votre API, il peut arriver que vous disposiez de ressources associées à d'autres. C'est une bonne pratique de les regrouper en un seul point de terminaison et de les imbriquer correctement.

Si nous avons une ressource qui dépend aussi d'une autre ressource, nous pourrions les regrouper vers une même terminaison. L'URI de ce point de terminaison sera /api/v1/things/:thingId/records

Il s'agit d'une bonne pratique pour permettre l'imbrication logique des URL. L'URL elle-même ne doit pas nécessairement refléter la structure de la base de données.

## Bonne pratique numéro 8
>Intégrer le filtrage, le tri et la pagination
