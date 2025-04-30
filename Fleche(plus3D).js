function creerObj3DFleche(objgl, intNoTexture) {
    const obj = new Object();

    const epaisseur = 0.1;
    const largeur = 0.4;
    const longueur = 0.7;
    const hauteur = 0.1;

    const demiLargeur = largeur / 2;
    const demiLongueur = longueur / 2;

    // Base rectangulaire (extrudée)
    const tabVertex = [
        // Bas (rectangle)
        -demiLargeur, 0, -demiLongueur,
        demiLargeur, 0, -demiLongueur,
        demiLargeur, 0, 0,
        -demiLargeur, 0, 0,

        // Haut (rectangle)
        -demiLargeur, epaisseur, -demiLongueur,
        demiLargeur, epaisseur, -demiLongueur,
        demiLargeur, epaisseur, 0,
        -demiLargeur, epaisseur, 0,

        // Pointe (pyramide)
        0, epaisseur + hauteur, demiLongueur, // sommet
        -demiLargeur, epaisseur, 0,
        demiLargeur, epaisseur, 0,
    ];

    const tabCouleurs = [];
    for (let i = 0; i < tabVertex.length / 3; i++) {
        tabCouleurs.push(1.0, 0.0, 0.0, 1.0); // rouge
    }

    const tabTexels = new Array(tabVertex.length / 3 * 2).fill(0.5); // Juste pour remplir (optionnel)

    const tabIndices = [
        // base bas
        0, 1, 2,  0, 2, 3,
        // base haut
        4, 5, 6,  4, 6, 7,
        // côtés
        0, 1, 5,  0, 5, 4,
        1, 2, 6,  1, 6, 5,
        2, 3, 7,  2, 7, 6,
        3, 0, 4,  3, 4, 7,

        // pointe
        8, 9, 10
    ];

    obj.vertex = objgl.createBuffer();
    objgl.bindBuffer(objgl.ARRAY_BUFFER, obj.vertex);
    objgl.bufferData(objgl.ARRAY_BUFFER, new Float32Array(tabVertex), objgl.STATIC_DRAW);

    obj.couleurs = objgl.createBuffer();
    objgl.bindBuffer(objgl.ARRAY_BUFFER, obj.couleurs);
    objgl.bufferData(objgl.ARRAY_BUFFER, new Float32Array(tabCouleurs), objgl.STATIC_DRAW);

    obj.texels = objgl.createBuffer();
    objgl.bindBuffer(objgl.ARRAY_BUFFER, obj.texels);
    objgl.bufferData(objgl.ARRAY_BUFFER, new Float32Array(tabTexels), objgl.STATIC_DRAW);
    obj.texels.intNoTexture = intNoTexture;
    obj.texels.pcCouleurTexel = 1.0;

    obj.maillage = objgl.createBuffer();
    objgl.bindBuffer(objgl.ELEMENT_ARRAY_BUFFER, obj.maillage);
    objgl.bufferData(objgl.ELEMENT_ARRAY_BUFFER, new Uint16Array(tabIndices), objgl.STATIC_DRAW);
    obj.maillage.intNbTriangles = tabIndices.length / 3;

    obj.transformations = creerTransformations();
    obj.estFleche = true;

    return obj;
}
