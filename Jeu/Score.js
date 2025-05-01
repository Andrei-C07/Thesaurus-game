function demarrerCompteARebours() {
    if (tempsRestant === null && !jeuTermine) {
        tempsRestant = setInterval(() => {
            if (temps > 0) {
                temps--;
                document.getElementById("temps").innerText = `Temps : ${temps}`;
            } else {
                clearInterval(tempsRestant);
                tempsRestant = null;
                jeuTermine = true;

                const objNiveau = obtenirObjetsPourNiveau(niveau);
                nbOuvreurs = objNiveau.ouvreurs;
                document.getElementById("ouvreurs").innerText = `Ouvreurs : ${nbOuvreurs}`;
                document.getElementById("messageGameOver").style.display = "block";
                document.getElementById("sonGameOver").play();

                retournerAuSpawn();
                redemarrerNiveauSansRegenerer();
            }
        }, 1000);
    }
}

function demarrerPenaliteScoreVueAerienne() {
    if (penaliteVueAerienne === null) {
        penaliteVueAerienne = setInterval(() => {
            score = Math.max(0, score - 10);
            document.getElementById("score").innerText = `Score : ${score}`;

            if (score === 0) {
                clearInterval(penaliteVueAerienne);
                penaliteVueAerienne = null;
                ajusterHauteurPlafond(2.5);
                if (cameraSauvPos && cameraSauvTarget && estEnVueMap) {
                    setPositionsCameraXYZ(cameraSauvPos, objScene3D.camera);
                    setCiblesCameraXYZ(cameraSauvTarget, objScene3D.camera);
                    setOrientationsXYZ([0, 1, 0], objScene3D.camera);
                    estEnVueMap = false;
                }
                effacerCanevas(objgl);
                dessiner(objgl, objProgShaders, objScene3D);
            }
        }, 1000);
    }
}

function retournerAuSpawn() {
    const camera = objScene3D.camera;

    const positionActuelle = getPositionsCameraXYZ(camera);
    const cibleActuelle = getCiblesCameraXYZ(camera);
    const positionFinale = [...posJoueur];
    const cibleFinale = [...cibleJoueur];

    let progress = 0;
    const duree = 2000;
    const startTime = performance.now();

    function animationRetour() {
        const now = performance.now();
        progress = Math.min((now - startTime) / duree, 1);

        const interpolate = (start, end) => start + (end - start) * progress;

        const hauteurVol = 3;

        const yIntermediaire = positionFinale[1] + hauteurVol * (1 - Math.abs(0.5 - progress) * 2);

        const nouvellePosition = [
            interpolate(positionActuelle[0], positionFinale[0]),
            yIntermediaire,
            interpolate(positionActuelle[2], positionFinale[2])
        ];
        const nouvelleCible = [
            interpolate(cibleActuelle[0], cibleFinale[0]),
            interpolate(cibleActuelle[1], cibleFinale[1]),
            interpolate(cibleActuelle[2], cibleFinale[2])
        ];

        setPositionsCameraXYZ(nouvellePosition, camera);
        setCiblesCameraXYZ(nouvelleCible, camera);

        effacerCanevas(objgl);
        dessiner(objgl, objProgShaders, objScene3D);

        if (progress < 1) {
            requestAnimationFrame(animationRetour);
        } else {
            // Repositionner exactement à la fin
            setPositionsCameraXYZ(positionFinale, camera);
            setCiblesCameraXYZ(cibleFinale, camera);
        }
    }

    requestAnimationFrame(animationRetour);
}
function arreterPenaliteScoreVueAerienne() {
    if (penaliteVueAerienne !== null) {
        clearInterval(penaliteVueAerienne);
        penaliteVueAerienne = null;
    }
}