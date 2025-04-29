// Fleche.js

function creerObj3DFleche(objgl, intNoTexture) {
    const objFleche = new Object();
    const longueur = 0.8;
    const largeur = 0.4;
    const hauteur = 0.1;

    const demiLargeur = largeur / 2;
    const demiLongueur = longueur / 2;

    const tabVertex = [
        0, hauteur, demiLongueur,     // Sommet
        -demiLargeur, 0, -demiLongueur,
        demiLargeur, 0, -demiLongueur,
    ];

    const tabTexels = [
        0.5, 1.0,
        0.0, 0.0,
        1.0, 0.0,
    ];

    const tabCouleurs = [
        1.0, 0.0, 0.0, 1.0,  
        1.0, 0.0, 0.0, 1.0,
        1.0, 0.0, 0.0, 1.0,
    ];

    const tabIndices = [
        0, 1, 2
    ];

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
