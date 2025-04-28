function creerObj3DChest(objgl, intNoTexture) {
    const objChest = new Object();
    const largeur = 1;
    const hauteur = 0.5;
    const profondeur = 1;

    const tabVertex = [
        // Devant
        0, 0, profondeur,  largeur, 0, profondeur,  0, hauteur, profondeur,  largeur, hauteur, profondeur,
        // Derrière
        largeur, 0, 0,  0, 0, 0,  largeur, hauteur, 0,  0, hauteur, 0,
        // Gauche
        0, 0, 0,  0, 0, profondeur,  0, hauteur, 0,  0, hauteur, profondeur,
        // Droite
        largeur, 0, profondeur,  largeur, 0, 0,  largeur, hauteur, profondeur,  largeur, hauteur, 0,
        // Haut
        0, hauteur, profondeur,  largeur, hauteur, profondeur,  0, hauteur, 0,  largeur, hauteur, 0,
        // Bas
        0, 0, 0,  largeur, 0, 0,  0, 0, profondeur,  largeur, 0, profondeur,
    ];

    const tabTexels = [];
    for (let i = 0; i < 6; i++) {
        tabTexels.push(
            0.0, 0.0, 
            1.0, 0.0,
            0.0, 1.0,
            1.0, 1.0,
        
            // Derrière (MIROIR sur X)
            1.0, 0.0,
            0.0, 0.0,
            1.0, 1.0,
            0.0, 1.0,
        
            // Gauche (MIROIR sur X)
            1.0, 0.0,
            0.0, 0.0,
            1.0, 1.0,
            0.0, 1.0,
        
            // Droite
            0.0, 0.0,
            1.0, 0.0,
            0.0, 1.0,
            1.0, 1.0,
        
            // Haut (retourner selon besoin, ici standard)
            0.0, 0.0,
            1.0, 0.0,
            0.0, 1.0,
            1.0, 1.0,
        
            // Bas (peu importe, rarement visible, mais cohérent)
            0.0, 0.0,
            1.0, 0.0,
            0.0, 1.0,
            1.0, 1.0,
        );
    }

    const tabCouleurs = [];
    for (let i = 0; i < 24; i++) {
        tabCouleurs.push(1.0, 1.0, 1.0, 1.0); // blanc pour toutes les faces
    }

    const tabIndices = [];
    for (let i = 0; i < 6; i++) {
        const base = i * 4;
        tabIndices.push(
            base, base + 1, base + 2,
            base + 1, base + 2, base + 3
        );
    }

    objChest.vertex = objgl.createBuffer();
    objgl.bindBuffer(objgl.ARRAY_BUFFER, objChest.vertex);
    objgl.bufferData(objgl.ARRAY_BUFFER, new Float32Array(tabVertex), objgl.STATIC_DRAW);

    objChest.couleurs = objgl.createBuffer();
    objgl.bindBuffer(objgl.ARRAY_BUFFER, objChest.couleurs);
    objgl.bufferData(objgl.ARRAY_BUFFER, new Float32Array(tabCouleurs), objgl.STATIC_DRAW);

    objChest.texels = objgl.createBuffer();
    objgl.bindBuffer(objgl.ARRAY_BUFFER, objChest.texels);
    objgl.bufferData(objgl.ARRAY_BUFFER, new Float32Array(tabTexels), objgl.STATIC_DRAW);
    objChest.texels.intNoTexture = intNoTexture;
    objChest.texels.pcCouleurTexel = 1.0;

    objChest.maillage = objgl.createBuffer();
    objgl.bindBuffer(objgl.ELEMENT_ARRAY_BUFFER, objChest.maillage);
    objgl.bufferData(objgl.ELEMENT_ARRAY_BUFFER, new Uint16Array(tabIndices), objgl.STATIC_DRAW);
    objChest.maillage.intNbTriangles = tabIndices.length / 3;

    objChest.transformations = creerTransformations();

    return objChest;
}
