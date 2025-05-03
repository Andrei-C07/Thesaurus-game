
function teleporterJoueurSiSurTeleporteur(objScene3D) {
    const camera = objScene3D.camera;
    const joueurX = Math.floor(getPositionCameraX(camera));
    const joueurZ = Math.floor(getPositionCameraZ(camera));

    for (let i = 0; i < objScene3D.teleporteurs.length; i++) {
        const tp = objScene3D.teleporteurs[i];
        if (Math.abs(joueurX + 0.5 - tp.x - 0.5) < 0.3 && Math.abs(joueurZ + 0.5 - tp.z - 0.5) < 0.3) {
            if (objScene3D.recepteurs.length === 0) return;

            const r = objScene3D.recepteurs[Math.floor(Math.random() * objScene3D.recepteurs.length)];

            // Garder direction actuelle
            const dx = getCibleCameraX(camera) - getPositionCameraX(camera);
            const dz = getCibleCameraZ(camera) - getPositionCameraZ(camera);

            setPositionCameraX(r.x + 0.5, camera);
            setPositionCameraZ(r.z + 0.5, camera);
            setCibleCameraX(r.x + 0.5 + dx, camera);
            setCibleCameraZ(r.z + 0.5 + dz, camera);

            //Son de téléportation
            document.getElementById("sonTeleportation").play();

        }
    }
}

function deplacerCamera() {

    if (!tempsDemarre) {
        tempsDemarre = true;
        demarrerCompteARebours();
    }

    const camera = objScene3D.camera;
    if (jeuTermine) return;
    let fltX;
    let fltZ;
    let intDirection;
    let fltAngle;
    let fltXPrime;
    let fltZPrime;
    let fltRayon;
    //On va changer les page up and page down apres quon finit tout
    //Page Up -> map view
    if (event.key === "1" && !estEnVueMap) {
        if (score < 10) {
            console.log("Vue aérienne désactivée : score trop bas (<10)");
            return;
        }
        demarrerPenaliteScoreVueAerienne();
        cameraSauvPos = [...getPositionsCameraXYZ(camera)];
        cameraSauvTarget = [...getCiblesCameraXYZ(camera)];
        estEnVueMap = true;
        posJoueurLive = getPositionsCameraXYZ(objScene3D.camera);
        cibleJoueurLive = getCiblesCameraXYZ(objScene3D.camera);
        const mapCenterX = 15.5;  // Ajustez selon la taille de votre carte
        const mapCenterZ = 15.5;  // Ajustez selon la taille de votre carte

        // Positionnez la caméra juste au-dessus de la carte
        setPositionsCameraXYZ([mapCenterX, 20, mapCenterZ], camera);

        // La caméra regarde directement vers le bas (vue orthogonale parfaite)
        setCiblesCameraXYZ([mapCenterX, 0, mapCenterZ], camera);

        // L'orientation "up" doit être dans la direction -Z pour que la carte soit orientée correctement
        setOrientationsXYZ([0, 0, -1], camera);

        ajusterHauteurPlafond(100);
        effacerCanevas(objgl);
        dessiner(objgl, objProgShaders, objScene3D);
        return;
    }
    // Page Down -> Retour caméra joueur
    if (event.key === "2") {
        //Si tu veut que les triches soit OFF a chaque fois que tu sort de vue aerienne
        tricheActive = false;
        arreterPenaliteScoreVueAerienne();
        ajusterHauteurPlafond(0);
        if (cameraSauvPos && cameraSauvTarget && estEnVueMap) {
            setPositionsCameraXYZ(cameraSauvPos, camera);
            setCiblesCameraXYZ(cameraSauvTarget, camera);
            setOrientationsXYZ([0, 1, 0], camera);
            estEnVueMap = false;
        }

        effacerCanevas(objgl);
        dessiner(objgl, objProgShaders, objScene3D);
        return;
    }
    if (event.keyCode == 37 || event.keyCode == 39) {
        // 37:  Flèche-à-gauche; 39:Flèche-à-droite
        fltX = getCibleCameraX(camera) - getPositionCameraX(camera);
        fltZ = getCibleCameraZ(camera) - getPositionCameraZ(camera);
        intDirection = (event.keyCode == 37) ? -1 : 1;
        fltAngle = intDirection * Math.PI / 90; // Tourner 2 degrés
        fltXPrime = fltX * Math.cos(fltAngle) - fltZ * Math.sin(fltAngle);
        fltZPrime = fltX * Math.sin(fltAngle) + fltZ * Math.cos(fltAngle);
        setCibleCameraX(getPositionCameraX(camera) + fltXPrime, camera);
        setCibleCameraZ(getPositionCameraZ(camera) + fltZPrime, camera);
    }
    else if (event.keyCode == 38 || event.keyCode == 40) {
        const direction = (event.keyCode == 38) ? 1 : -1;

        let dx = getCibleCameraX(camera) - getPositionCameraX(camera);
        let dz = getCibleCameraZ(camera) - getPositionCameraZ(camera);
        const distance = Math.sqrt(dx * dx + dz * dz);

        dx /= distance;
        dz /= distance;

        const stepSize = 0.2 * direction;

        const newX = getPositionCameraX(camera) + dx * stepSize;
        const newZ = getPositionCameraZ(camera) + dz * stepSize;

        // Vérifier si le nouveau point est un mur
        // Si ce n'est pas un mur, mettre à jour la position de la caméra
        if (!estMur(newX, newZ)) {
            setPositionCameraX(newX, camera);
            setPositionCameraZ(newZ, camera);
            setCibleCameraX(getCibleCameraX(camera) + dx * stepSize, camera);
            setCibleCameraZ(getCibleCameraZ(camera) + dz * stepSize, camera);
        }
    }

    if (objScene3D.coffre) {
        const joueurX = Math.floor(getPositionCameraX(objScene3D.camera));
        const joueurZ = Math.floor(getPositionCameraZ(objScene3D.camera));

        if (joueurX === objScene3D.coffre.x && joueurZ === objScene3D.coffre.z && !niveauEnTransition) {
            niveauEnTransition = true;

            console.log("Trésor trouvé !");
            document.getElementById("sonNiveauReussi").play();
            score += 10 * temps;
            document.getElementById("score").innerHTML = score;


            setTimeout(() => {
                niveauSuivant(objgl, objProgShaders);
                niveauEnTransition = false;
            }, 1000);
        }

    }
    if (event.code === "Space" && !estEnVueMap) {
        utiliserOuvreur();
        return;
    }
    teleporterJoueurSiSurTeleporteur(objScene3D);

    effacerCanevas(objgl);
    dessiner(objgl, objProgShaders, objScene3D);
}
function utiliserOuvreur() {

    if (score < 50) {
        console.log("Ouvreur désactivé : score trop bas (<50)");
        return;
    }
    if (nbOuvreurs <= 0) {
        console.log("Pas d'ouvreurs restants!");
        return;
    }

    const camera = objScene3D.camera;
    const joueurX = getPositionCameraX(camera);
    const joueurZ = getPositionCameraZ(camera);
    const cibleX = getCibleCameraX(camera);
    const cibleZ = getCibleCameraZ(camera);

    const dx = cibleX - joueurX;
    const dz = cibleZ - joueurZ;

    let direction = "";
    if (Math.abs(dx) > Math.abs(dz)) {
        direction = dx > 0 ? "droite" : "gauche";
    } else {
        direction = dz > 0 ? "avant" : "arrière";
    }

    // Déterminer la cellule devant
    let celluleX = Math.floor(joueurX);
    let celluleZ = Math.floor(joueurZ);

    if (direction === "avant") celluleZ += 1;
    else if (direction === "arrière") celluleZ -= 1;
    else if (direction === "droite") celluleX += 1;
    else if (direction === "gauche") celluleX -= 1;

    // Vérifier si c'est un mur ouvrable
    if (map[celluleZ][celluleX] === "w") {
        // Ouvrir le mur
        map[celluleZ][celluleX] = "g";
        if (memoNiveau && memoNiveau.mursOuverts) {
            memoNiveau.mursOuverts.push({ x: celluleX, z: celluleZ });
        }


        // Supprimer visuellement le mur dans objScene3D
        objScene3D.tabObjets3D = objScene3D.tabObjets3D.filter(obj => {
            const pos = getPositionsXYZ(obj.transformations);
            return !(Math.floor(pos[0]) === celluleX && Math.floor(pos[2]) === celluleZ && pos[1] === 0);
        });

        nbOuvreurs--;
        document.getElementById("ouvreurs").innerHTML = nbOuvreurs;
        score = Math.max(0, score - 50);
        document.getElementById("score").innerHTML = score;

        effacerCanevas(objgl);
        dessiner(objgl, objProgShaders, objScene3D);
    } else {
        console.log("Aucun mur ouvrable devant !");
    }
}