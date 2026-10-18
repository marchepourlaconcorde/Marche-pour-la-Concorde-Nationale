# Marche pour la Concorde Nationale : mise en ligne

Le site comprend la page (`index.html`), trois petites fonctions serveur (dossier `netlify/functions`) qui enregistrent les signatures et calculent les compteurs par département, et le fichier `rassemblements.json` où vous publiez les lieux et horaires.

## Mettre le site en ligne (environ 15 minutes)

Les fonctions serveur ne fonctionnent pas avec un simple glisser-déposer : il faut passer par GitHub.

1. Créez un compte sur github.com avec l'adresse du collectif, puis un dépôt (bouton « New repository »), privé de préférence.
2. Dans le dépôt, cliquez sur « Add file » puis « Upload files » et déposez tout le contenu de ce dossier, en conservant le dossier `netlify/functions`.
3. Sur netlify.com, connectez-vous avec ce compte GitHub, puis « Add new site » > « Import an existing project » > GitHub > choisissez le dépôt. Laissez les réglages par défaut et lancez le déploiement.
4. Dans Netlify, « Site configuration » > « Environment variables », ajoutez `ADMIN_CLE` avec un long mot de passe de votre choix.
5. Facultatif : rattachez un nom de domaine dans « Domain management ».

## Publier un rassemblement

Ouvrez `rassemblements.json` sur GitHub, cliquez sur le crayon, et ajoutez une entrée par département :

```json
{
  "59": { "ville": "Lille", "lieu": "Place du Général-de-Gaulle", "heure": "Samedi 24 octobre, 14 h" },
  "63": { "ville": "Clermont-Ferrand", "lieu": "Place de Jaude", "heure": "Samedi 24 octobre, 15 h" }
}
```

Enregistrez (« Commit changes ») : le site se met à jour en une minute. Ne publiez un lieu qu'une fois le rassemblement déclaré.

## Récupérer les signatures

Ouvrez `https://votre-site/api/export?cle=VOTRE_CLE` : un fichier CSV (e-mail, département, date) se télécharge. Ne partagez jamais cette adresse.

## À compléter dans index.html

- l'adresse e-mail du collectif (cherchez `[adresse e-mail du collectif]`, deux occurrences) ;
- l'hébergeur dans les mentions légales : Netlify, Inc., 101 2nd Street, San Francisco, CA 94105, États-Unis (à vérifier sur netlify.com).

## Données personnelles

Les adresses servent uniquement à comptabiliser les signatures. Seuls les totaux par département sont publics. Supprimez les données une fois la marche passée, et répondez à toute demande de suppression envoyée à l'adresse de contact.
