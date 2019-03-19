# / TALK

## Initial setup
```
npm install
```

### Test project
```
npm run serve
```

## Working features
### Accès réservé aux membres identifiés :

 * ✅ Il faut pouvoir se créer un compte (Nom, email, mot de passe)
 * ✅ Il faut pouvoir se connecter ✅ *et se déconnecter*

### L'application présente 4 "écrans"
 * Login
 ✅ Se connecter / ✅ créer un compte
 
 * Liste des membres
 ✅ Voir la liste des membres / ✅ Voir la fiche d'un membre / ✅ *Supprimer un membre, sauf soit même* !
 
 * Liste des conversations
 ✅ Voir les conversations et leur description
 
 * Liste des messages d'une conversation
 ✅ Voir les messages / ✅ Poster un Message / ❌ *cliquer sur le nom du membre qui a posté le message pour voir la fiche* / ✅ *Editer un message* / ✅ *Supprimer un message*
 
 * Fiche d'un membre 
 ✅ La fiche permet de visualiser les infos publiques d'un membre : nom, email, ❌ *avatar* ainsi que ✅ la liste des 10 derniers messages postés par le membre. ✅ Ces messages sont cliquables et permettent de visionner le message, en contexte, dans la conversation.


### Chaque membre peut : 
 * ✅ Créer une conversation (Définir un titre et description)
 * ✅ Ouvrir toutes les conversations et voirs les messages dans une conversation
 * ✅ Poster un message dans une conversation
 * ❌ *Modifier une conversation (modifier son titre et sa description)*
 * ❌ *Supprimer une conversation*
 * ❌ *Editer ou supprimer seulement ses propres messages*

### Chaque membre se compose:
 * ✅ D'un nom complet (nom + prenom)
 * ✅ D'une adresse mail
 * ✅ d'un mot de passe *vérifié lors de sa création à l'aide d'une double saisie*
 * ❌ *D'un avatar visible sur tous ses messages, via Gravatar.com ou autre, avec un defaut sur venant d'un générateur d'avatars comme adorable.io*
