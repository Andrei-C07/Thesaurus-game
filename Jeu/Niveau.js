let niveau = 1;

async function niveauSuivant(objgl, objProgShaders) {
    niveau++;
    document.getElementById("niveau").innerText = `Niveau : ${niveau}`;

    objScene3D = await initScene3D(objgl); 
    effacerCanevas(objgl);
    dessiner(objgl, objProgShaders, objScene3D);

    // Jouer son de début de niveau
    const sonDebut = document.getElementById("sonDebutNiveau");
    if (sonDebut) sonDebut.play();
}
