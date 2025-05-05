let niveau = 1;
const NIVEAU_MAX = 10;

async function niveauSuivant(objgl, objProgShaders) {
    if (niveau >= NIVEAU_MAX) {
        document.getElementById("messageJeuReussi").style.display = "block";
        document.getElementById("sonJeuReussi").play();
        jeuTermine = true;
        return;
    }

    niveau++;

    map = initMap();
    objScene3D = await initScene3D(objgl);
    aQuitteEnclos = false;
    etaitSurE = false;

    resetPorte(objScene3D.porteSpawn);

    temps = DUREE_NIVEAU;

    document.getElementById("temps").innerText = temps;
    document.getElementById("niveau").innerHTML = niveau;
    const objNiveau = obtenirObjetsPourNiveau(niveau);
    nbOuvreurs = objNiveau.ouvreurs;
    document.getElementById("ouvreurs").innerHTML = nbOuvreurs;

    clearInterval(tempsRestant);
    tempsRestant = null;
    tempsDemarre = false;

    effacerCanevas(objgl);
    dessiner(objgl, objProgShaders, objScene3D);
    tricheActive = false;
    mettreAJourVisibiliteTriche();

    setTimeout( () => {
        const sonDebut = document.getElementById("sonDebutNiveau");
        if (sonDebut) sonDebut.play()
    }, 1700);
}


function obtenirObjetsPourNiveau(niveau) {
    const fleches = Math.max(18 - (niveau - 1) * 2, 0);

    const nbTPParNiveau = [0, 1, 1, 2, 2, 3, 3, 4, 4, 5];
    const nbRParNiveau = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

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

function restaurerMemoNiveau(objgl, objScene3D) {
    // Coffre
    const coffre = creerObj3DChest(objgl, TEX_CHEST);
    setPositionX(memoNiveau.coffre.x + 0.5, coffre.transformations);
    setPositionZ(memoNiveau.coffre.z + 0.5, coffre.transformations);
    setPositionY(0, coffre.transformations);
    coffre.binVisible = false;
    objScene3D.coffre = {
        x: memoNiveau.coffre.x,
        z: memoNiveau.coffre.z,
        objet: coffre
    };
    objScene3D.tabObjets3D.push(coffre);

    // Téléporteurs
    objScene3D.teleporteurs = [];
    for (const { x, z } of memoNiveau.teleporteurs) {
        const tp = creerObj3DTeleTransporteur(objgl, TEX_TELETRANS);
        setPositionX(x, tp.transformations);
        setPositionZ(z, tp.transformations);
        setPositionY(0, tp.transformations);
        objScene3D.teleporteurs.push(tp);
        objScene3D.tabObjets3D.push(tp);
    }

    // Récepteurs
    objScene3D.recepteurs = [];
    for (const { x, z } of memoNiveau.recepteurs) {
        const r = creerObj3DTeleRecepteur(objgl, TEX_TELERECP);
        setPositionX(x, r.transformations);
        setPositionZ(z, r.transformations);
        setPositionY(0, r.transformations);
        objScene3D.recepteurs.push(r);
        objScene3D.tabObjets3D.push(r);
    }

    // Flèches
    tabFleches = [];
    for (const { x, z, angle } of memoNiveau.fleches) {
        const f = creerObj3DFleche(objgl, TEX_FLECHE);
        setPositionX(x, f.transformations);
        setPositionZ(z, f.transformations);
        setPositionY(1.9, f.transformations);
        setAngleY(angle, f.transformations);
        tabFleches.push(f);
        objScene3D.tabObjets3D.push(f);
    }
}

function redemarrerNiveauSansRegenerer() {
    temps = DUREE_NIVEAU;
    score = Math.max(0, score - 200);
    document.getElementById("score").innerHTML = score;

    const objNiveau = obtenirObjetsPourNiveau(niveau);
    nbOuvreurs = objNiveau.ouvreurs;
    document.getElementById("ouvreurs").innerHTML = nbOuvreurs;

    if (memoNiveau?.mursOuverts) {
        for (const mur of memoNiveau.mursOuverts) {
            map[mur.z][mur.x] = "w";
        }
        memoNiveau.mursOuverts = [];
    }
    // 🔁 Restaure la porte d'enclos si elle avait été remplacée par un mur
    if (objScene3D?.posPorteSpawn) {
        const { x, z } = objScene3D.posPorteSpawn;

        // 1. Modifier la map : plus de porte, c'est un couloir maintenant
        map[z][x] = "g";

        // 2. Supprimer l'objet 3D de la porte (qu'elle soit encore visible ou fermée)
        objScene3D.tabObjets3D = objScene3D.tabObjets3D.filter(obj => {
            const pos = getPositionsXYZ(obj.transformations);
            return !(Math.floor(pos[0]) === x && Math.floor(pos[2]) === z);
        });

        // 3. Supprimer les références à la porte dans l'objet scene
        objScene3D.posPorteSpawn = null;
        objScene3D.porteSpawn = null;
    }

    restaurerMemoNiveau(objgl, objScene3D);

    effacerCanevas(objgl);
    dessiner(objgl, objProgShaders, objScene3D);
    tricheActive = false;
    mettreAJourVisibiliteTriche();


    tempsDemarre = false;
}
function saveMemoNiveau(objScene3D) {
    memoNiveau = {
        coffre: {
            x: objScene3D.coffre.x,
            z: objScene3D.coffre.z
        },
        teleporteurs: objScene3D.teleporteurs
            .filter(tp => tp && tp.transformations)
            .map(tp => ({
                x: getPositionsXYZ(tp.transformations)[0],
                z: getPositionsXYZ(tp.transformations)[2]
            })),

        recepteurs: objScene3D.recepteurs.map(r => ({
            x: getPositionsXYZ(r.transformations)[0],
            z: getPositionsXYZ(r.transformations)[2]
        })),
        fleches: tabFleches.map(f => ({
            x: getPositionsXYZ(f.transformations)[0],
            z: getPositionsXYZ(f.transformations)[2],
            angle: getAngleY(f.transformations)
        })),
        mursOuverts: [],
        cameraPos: [...getPositionsCameraXYZ(objScene3D.camera)],
        cameraCible: [...getCiblesCameraXYZ(objScene3D.camera)],
    };
}
