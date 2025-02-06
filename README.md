# GenAI for Public Good

![GenAI for Public Good Logo](images/logo_hackathon.svg)

## Description

Ce repo contient les sources de la soumission de [Réfugiés.info](https://refugies.info/fr) dans le cadre du Hackathon [GenAI for Public Good](https://alliance.numerique.gouv.fr/hackathon/ai-action-summit/) du 5-6 février 2025.

Le repo est un monorepo hybride (node + python) organisé de la manière suivante:

| Répertoire        | Description                                                    |
|---------------|----------------------------------------------------------------|
| `apps`        | Les applications                     |
| `data`        | Datasets et données traitées                                    |
| `docs`        | Documentation et documentation technique                       |
| `images`      | Images et ressources graphiques utilisées dans le projet         |
| `models`      | Modèles de langue et scripts liés aux modèles   |
| `notebooks`   |  Notebooks Jupyter pour l'analyse des données et le développement des modèles      |
| `packages`    | Packages et bibliothèques réutilisables                         |
| `scripts`     | Scripts utilitaires pour le traitement des données et l'automatisation





## Installation

### Python

Ce répo utilise python 3.12.8 et `uv` pour l'installation et la gestion des environnements virtuels.  Installer `uv` en suivant les [instructions pour
votre système d'exploitation](https://docs.astral.sh/uv/getting-started/installation/).

Ensuite créer l'environment virtuel et installer les dépendances avec : `uv sync`

### Node

Ce repo utilise `volta` pour l'installation des dépendances.  Installer `volta` en suivant les [instructions pour
votre système d'exploitation](https://docs.volta.sh/guide/getting-started).

Ensuite installer les dépendances avec :

```
volta install node@22.13.1
volta install pnpm@10.2.0
pnpm install
```

## Recommendations

- [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/)

## Scripts utiles

- `pnpm clean:branches` : Nettoyer les branches supprimées de github