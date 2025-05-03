function creerObj3DFleche(objgl, intNoTexture) {
    const objFleche = new Object();
    const longueur = 0.8;
    const largeur = 0.4;
    const hauteur = 0.07; 

    const demiLargeur = largeur / 2;
    const demiLongueur = longueur / 2;
    const demiHauteur = hauteur / 2;

    const tabVertex = [
        0,  demiHauteur,  demiLongueur,   
        -demiLargeur,  demiHauteur, -demiLongueur,
         demiLargeur,  demiHauteur, -demiLongueur,
         
        0, -demiHauteur,  demiLongueur,
        -demiLargeur, -demiHauteur, -demiLongueur,
         demiLargeur, -demiHauteur, -demiLongueur,
    ];

    const tabIndices = [
        // Face avant
        0, 1, 2,
        // Face arrière
        3, 5, 4,
        // Côtés
        0, 2, 5,
        0, 5, 3,

        0, 3, 4,
        0, 4, 1,

        1, 4, 5,
        1, 5, 2
    ];

    const tabCouleurs = [];
    for (let i = 0; i < tabVertex.length / 3; i++) {
        tabCouleurs.push(1.0, 0.0, 0.0, 1.0); 
    }

    const tabTexels = new Array(tabVertex.length / 3 * 2).fill(0.5); 

    objFleche.vertex = objgl.createBuffer();
    objgl.bindBuffer(objgl.ARRAY_BUFFER, objFleche.vertex);
    objgl.bufferData(objgl.ARRAY_BUFFER, new Float32Array(tabVertex), objgl.STATIC_DRAW);

    objFleche.couleurs = objgl.createBuffer();
    objgl.bindBuffer(objgl.ARRAY_BUFFER, objFleche.couleurs);
    objgl.bufferData(objgl.ARRAY_BUFFER, new Float32Array(tabCouleurs), objgl.STATIC_DRAW);

    objFleche.texels = objgl.createBuffer();
    objgl.bindBuffer(objgl.ARRAY_BUFFER, objFleche.texels);
    objgl.bufferData(objgl.ARRAY_BUFFER, new Float32Array(tabTexels), objgl.STATIC_DRAW);
    objFleche.texels.intNoTexture = intNoTexture;
    objFleche.texels.pcCouleurTexel = 1.0;

    objFleche.maillage = objgl.createBuffer();
    objgl.bindBuffer(objgl.ELEMENT_ARRAY_BUFFER, objFleche.maillage);
    objgl.bufferData(objgl.ELEMENT_ARRAY_BUFFER, new Uint16Array(tabIndices), objgl.STATIC_DRAW);
    objFleche.maillage.intNbTriangles = tabIndices.length / 3;

    objFleche.transformations = creerTransformations();
    objFleche.estFleche = true;

    return objFleche;
}
