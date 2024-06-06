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

L'intégration de filtrage de tri et de pagination est une étape importante dans l'amélioration d'une API REST

Le filtrage et la pagination sont importants pour permettre à nos requêtes de rester rapides et d'éviter de faire tomber nos systèmes (requête de 1M things).

La pagination est un mécanisme permettant de diviser l'ensemble de notre collection de Thing en plusieurs "pages" où chaque page contient un nombre limité de Things.

Le tri peut être une tâche complexe, il est donc efficace de le faire dans notre API pour ne pas que le Client le fasse.

Nous ajoutons les critères de filtre en tant que **paramamètre de requête**.
Nous allons utiliser l'attribut `color` pour simuler le filtre.
req.query contient les requêtes après le `?` dans l'URL (Exemple: `/thing?color=red`)

## Bonne pratique numéro 9
>Utiliser le `data caching` pour améliorer les performances

Le cache agit comme une couche d'accès adjacente aux données pour votre base de données que vos applications peuvent utiliser pour accroître leurs performances.

Pour les ressources fréquemment utilisées il fait sens de les stocker dans le cache et les resservir via le cache plutôt que de faire une requête à la base de données. Il faut cependant faire attention à ce que ces données **soient le plus à jour possible**.

Il existe plusieurs solutions pour implémenter le caching comme `redis` ou le middleware express `apicache`. Nous allons utiliser apicache pour l'exemple.

Après avoir cacher les requêtes les plus utilisées comme les requêtes `GET`, on gagne largement en performances pour aller chercher de la donnée identique. Il faut toujours garder cela à l'esprit lors de l'utilisation de notre api que la donnée ne peut etre plus à jour !

Il n'est pas nécessaire de **toujours** avoir un cache. On peut commencer sans et l'implémenter si le besoin se présente.

## Bonne pratique numéro 10
>La Sécurité !
Evidemment pour une API la sécurité est une un facteur clé.
- Utilisation de SLL/TLS car c'est le standard de la communication sur internet à nos jours et c'est très important pour une API qui envoie de la donnée privée
- Si nous avons des ressources uniquement accessible pour des utilisateurs authentifié il faudra alors les proteger. Dans express nous pouvons par exemple implémenter une vérification dans un middleware dans nos routes avant d'accéder aux controllers.
- Il pourrait aussi y avoir des actions ou des ressources accessible uniquement pour certains rôles d'utilisateurs comme des `admins` qui peuvent créer, mettre à jour ou supprimer de la donnée. Cela peut aussi être fait avec un middleware de rôle en supplément de l'authentification.

Voici des ressources pour creuser un peu plus la sécurité dans une API REST.
>https://restfulapi.net/security-essentials/

## Bonne pratique numéro 11
>Documenter clairement son API

>"_An API is just as good as it's documentation_"

Ce n'est pas simplement pour faire joli. Une bonne documentation rend aussi la vied es développeurs plus facile. La documentation est la page de couverture d'une API, alors plus tôt elle est comprise plus tôt d'autres personnes voudront l'utiliser. Voici une documentation [OpenAPI Specification](https://swagger.io/specification/). Des paquets comme [swagger-ui-express](https://www.npmjs.com/package/swagger-ui-express) et [swagger-jsdoc](https://www.npmjs.com/package/swagger-jsdoc) peuvent nous aider générer de la documentation rapidement. _Aller voir `swagger.js`_ .
Nous ajoutons l'url de la documentation swagger dans notre `listen()` de notre  `index.js`. Lorsque le server node se lance nous pourrons aller vois la doc de notre API qui s'update de façon dynamique avec les JsDocs dans nos fichiers. J'ai ajouté des exemples dans l'endpoint GET et le schema de notre modele Thing.