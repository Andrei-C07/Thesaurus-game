let niveau = 1;

async function niveauSuivant(objgl, objProgShaders) {
    niveau++;
    document.getElementById("niveau").innerText = `Niveau : ${niveau}`;

    map = initMap(); // Réinitialiser la carte

    objScene3D = await initScene3D(objgl); 

    resetPorte(objScene3D.porteSpawn);

    effacerCanevas(objgl);
    dessiner(objgl, objProgShaders, objScene3D);

    // Jouer son de début de niveau
    const sonDebut = document.getElementById("sonDebutNiveau");
    if (sonDebut) sonDebut.play();
}

function obtenirObjetsPourNiveau(niveau) {
    const fleches = Math.max(18 - (niveau - 1) * 2, 0);

    const nbTPParNiveau = [0, 1, 1, 2, 2, 3, 3, 4, 4, 5]; 
    const nbRParNiveau  = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

    const teleporteurs = nbTPParNiveau[niveau - 1] || 0;
    const recepteurs = nbRParNiveau[niveau - 1] || 0;

    let ouvreurs = 0;
    if (niveau <= 2) ouvreurs = 4;
    else if (niveau <= 4) ouvreurs = 3;
    else if (niveau <= 6) ouvreurs = 2;
    else if (niveau <= 8) ouvreurs = 1;
    else ouvreurs = 0;

    return { fleches, teleporteurs, recepteurs, ouvreurs };
}

function redemarrerNiveauSansRegenerer() {
    temps = DUREE_NIVEAU;
    const objNiveau = obtenirObjetsPourNiveau(niveau);
    nbOuvreurs = objNiveau.ouvreurs;
    document.getElementById("ouvreurs").innerText = `Ouvreurs : ${nbOuvreurs}`;
    

    if (memoNiveau?.mursOuverts) {
        for (const mur of memoNiveau.mursOuverts) {
            map[mur.z][mur.x] = "w";
        }
        memoNiveau.mursOuverts = [];
    }

    initScene3D(objgl).then((scene) => {
        objScene3D = scene;

        objScene3D.coffre = memoNiveau.coffre;
        objScene3D.teleporteurs = [...memoNiveau.teleporteurs];
        objScene3D.recepteurs = [...memoNiveau.recepteurs];
        tabFleches = [...memoNiveau.fleches];

        effacerCanevas(objgl);
        dessiner(objgl, objProgShaders, objScene3D);
    });

    demarrerCompteARebours();
}
