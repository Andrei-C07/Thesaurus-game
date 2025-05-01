function placerTeleporteursEtRecepteurs(objgl, objScene3D, tabObjets3D, nbTeleporteurs, nbRecepteurs) {
    objScene3D.teleporteurs = [];
    objScene3D.recepteurs = [];
    tabTeleporteurs = [];
    tabRecepteurs = [];

    const cellulesDisponibles = [];

    for (let z = 0; z < map.length; z++) {
        for (let x = 0; x < map[z].length; x++) {
            const cellule = map[z][x];
            if (cellule === "g" && (x !== objScene3D.coffre.x || z !== objScene3D.coffre.z)) {
                cellulesDisponibles.push({ x, z });
            }
        }
    }

    // Mélange aléatoire
    for (let i = cellulesDisponibles.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [cellulesDisponibles[i], cellulesDisponibles[j]] = [cellulesDisponibles[j], cellulesDisponibles[i]];
    }

    let index = 0;
    const positionsUtilisees = new Set();

    let i = 0;
    while (i < nbTeleporteurs && index < cellulesDisponibles.length) {

        const { x, z } = cellulesDisponibles[index++];
        const key = `${x},${z}`;
        if (positionsUtilisees.has(key)) continue;

        const objTele = creerObj3DTeleTransporteur(objgl, TEX_TELETRANS);
        setPositionX(x + 0.5, objTele.transformations);
        setPositionZ(z + 0.5, objTele.transformations);
        setPositionY(0, objTele.transformations);
        tabObjets3D.push(objTele);
        tabTeleporteurs.push(objTele);
        objScene3D.teleporteurs.push({ x, z });
        positionsUtilisees.add(key);
        i++;
    }

    //Récepteurs
    let k = 0;

    while (k < nbRecepteurs && index < cellulesDisponibles.length) {


        const { x, z } = cellulesDisponibles[index++];
        const key = `${x},${z}`;
        if (positionsUtilisees.has(key)) continue;

        const objRecepteur = creerObj3DTeleRecepteur(objgl, TEX_TELERECP);
        setPositionX(x + 0.5, objRecepteur.transformations);
        setPositionZ(z + 0.5, objRecepteur.transformations);
        setPositionY(0, objRecepteur.transformations);
        tabObjets3D.push(objRecepteur);
        tabRecepteurs.push(objRecepteur);
        objScene3D.recepteurs.push({ x, z });
        positionsUtilisees.add(key);
        k++;
    }
}
