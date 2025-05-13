# 🎮 Thesaurus - Game

## 🧭 Sommaire

**Thesaurus** est un jeu d’exploration 3D où un joueur doit parcourir un dédale pour trouver un trésor caché. Pour l’aider, des flèches pointent vers le trésor, des ouvreurs de murs permettent de débloquer des passages, et des téléporteurs l’envoient aléatoirement ailleurs dans le labyrinthe. Le tout, en 10 niveaux chronométrés.

---

## 🧱 Objets du jeu

- Dédale (31x31)
- Plancher et plafond
- Murs ouvrables et non ouvrables
- Ouvreurs de murs
- Flèches directionnelles
- Télé-transporteurs et télé-récepteurs
- Trésor (objet 3D)

---

## 🕹️ Joueur

- Représenté par la caméra
- Contrôles : flèches du clavier et roulette/boutons de souris
- Commence dans l’enclos
- Peut utiliser un ouvreur de murs (`Espace`)
- Collision avec un téléporteur → transport aléatoire dans un télé-récepteur
- Ne peut pas repasser dans l’enclos une fois sorti

---

## 🗺️ Vue aérienne

- Touche `Page Up` → vue du dessus
- `CTRL + SHIFT + ESPACE` → triche : tous les objets visibles (sauf plafond)
- `Page Down` → retour au mode normal

---

## 🎯 Déroulement d’un niveau

- **Objectif** : trouver le trésor en 60 secondes
- Les murs s’ouvrent, le temps défile, et certains objets changent à chaque niveau
- Si temps écoulé → recommencer le niveau (mêmes positions d’objets mais reset du temps et murs fermés)

---

## 📊 Progression des niveaux

| Niveau | Trésor | Ouvreurs | Flèches | TPs | Récepteurs |
|--------|--------|----------|---------|-----|------------|
| 1      | 1      | 4        | 18      | 0   | 0          |
| 2      | 1      | 4        | 16      | 1   | 1          |
| 3      | 1      | 3        | 14      | 1   | 2          |
| ...    | ...    | ...      | ...     | ... | ...        |
| 10     | 1      | 0        | 0       | 5   | 9          |

---

## 🧮 Système de score

- Départ : **300 pts**
- Recommencer un niveau : **-200 pts**
- Trésor trouvé : **+10 pts × secondes restantes**
- Ouvrir un mur : **-50 pts**
- Mode aérien : **-10 pts/sec**

> ⚠️ Si score < 200 → game over lors d’un échec  
> ⚠️ Si score < 50 → impossible d’utiliser des ouvreurs  
> ⚠️ Si score < 10 → pas de vue aérienne

---

## 🔊 Sons / musiques requis

1. Début de niveau  
2. Trésor trouvé  
3. Temps écoulé  
4. Mur ouvert  
5. Téléportation  
6. Game over  
7. Fin du jeu

---

## 🔁 Animation

Aucune animation automatique obligatoire, mais c’est un plus apprécié.

---

## 💯 Pondération

- **Fonctionnement & respect des consignes** : 80%
- **Interface** : 20%
  - Originalité et esthétique
  - Qualité des objets 3D, textures, couleurs
  - Fluidité des mouvements
  - Animation (bonus)

---

## ✉️ Remarque finale

Indiquez dans votre courriel de remise :
- Le **fichier** contenant la variable de durée d’un niveau
- Le **nom** de cette variable

---

> Thesaurus — *"trésor" en latin* ⚱️
