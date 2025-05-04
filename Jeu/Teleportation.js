function placerTeleporteursEtRecepteurs(objgl, objScene3D, tabObjets3D, nbTeleporteurs, nbRecepteurs) {
    const cellulesDisponibles = [];

    for (let z = 0; z < map.length; z++) {
        for (let x = 0; x < map[z].length; x++) {
            const type = map[z][x];
            if (type === "g") {
                // Exclure la cellule du trésor
                if (!(x === objScene3D.coffre.x && z === objScene3D.coffre.z)) {
                    cellulesDisponibles.push({ x, z });
                }
            }
        }
    }

    const positionsUtilisees = new Set();

    function prendreCelluleAleatoire() {
        while (cellulesDisponibles.length > 0) {
            const index = Math.floor(Math.random() * cellulesDisponibles.length);
            const { x, z } = cellulesDisponibles.splice(index, 1)[0];
            const key = `${x},${z}`;
            if (!positionsUtilisees.has(key)) {
                positionsUtilisees.add(key);
                return { x, z };
            }
        }
        return null;
    }

    for (let i = 0; i < nbTeleporteurs; i++) {
        const cellule = prendreCelluleAleatoire();
        if (!cellule) break;

        const tp = creerObj3DTeleTransporteur(objgl, TEX_TELETRANS);
        setPositionX(cellule.x + 0.5, tp.transformations);
        setPositionZ(cellule.z + 0.5, tp.transformations);
        setPositionY(0, tp.transformations);

        tp.x = cellule.x;
        tp.z = cellule.z;

        objScene3D.teleporteurs.push(tp);
        tabTeleporteurs.push(tp);
        tabObjets3D.push(tp);
    }

    for (let i = 0; i < nbRecepteurs; i++) {
        const cellule = prendreCelluleAleatoire();
        if (!cellule) break;

        const r = creerObj3DTeleRecepteur(objgl, TEX_TELERECP);
        setPositionX(cellule.x + 0.5, r.transformations);
        setPositionZ(cellule.z + 0.5, r.transformations);
        setPositionY(0.01, r.transformations);

        r.x = cellule.x;
        r.z = cellule.z;

        objScene3D.recepteurs.push(r);
        tabRecepteurs.push(r);
        tabObjets3D.push(r);
    }
}
