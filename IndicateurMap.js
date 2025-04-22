function creerObj3DIndicateur(objgl) {
    const obj3D = new Object();

    obj3D.fltLargeur = 0.8;
    obj3D.fltProfondeur = 0.8;
    obj3D.fltHauteur = 0.01;

    obj3D.vertex = creerVertexIndicateur(objgl);
    obj3D.couleurs = creerCouleursIndicateur(objgl, [1.0, 0.0, 0.0, 1.0]); // rouge
    obj3D.texels = creerTexelsIndicateur(objgl, TEX_TRANSPARENT);
    obj3D.maillage = creerMaillageIndicateur(objgl);
    obj3D.transformations = creerTransformations();
    setEchellesXYZ([0.2, 0.2, 0.2], obj3D.transformations);

    obj3D.estIndicateur = true;

    return obj3D;
}

function creerVertexIndicateur(objgl) {
    const tabVertex = [
        0.0, 0.0, 5,   // pointe
       -2, 0.0, -2,  // gauche
        2, 0.0, -2   // droite
    ];

    const objVertex = objgl.createBuffer();
    objgl.bindBuffer(objgl.ARRAY_BUFFER, objVertex);
    objgl.bufferData(objgl.ARRAY_BUFFER, new Float32Array(tabVertex), objgl.STATIC_DRAW);

    return objVertex;
}

function creerCouleursIndicateur(objgl, tabCouleur) {
    let tabCouleurs = [];
    for (let i = 0; i < 3; i++) // 3 sommets
        tabCouleurs = tabCouleurs.concat(tabCouleur);

    const objCouleurs = objgl.createBuffer();
    objgl.bindBuffer(objgl.ARRAY_BUFFER, objCouleurs);
    objgl.bufferData(objgl.ARRAY_BUFFER, new Float32Array(tabCouleurs), objgl.STATIC_DRAW);

    return objCouleurs;
}

function creerTexelsIndicateur(objgl, intNoTexture) {
    const tabTexels = [
        0.5, 1.0,
        0.0, 0.0,
        1.0, 0.0
    ];

    const objTexels = objgl.createBuffer();
    objgl.bindBuffer(objgl.ARRAY_BUFFER, objTexels);
    objgl.bufferData(objgl.ARRAY_BUFFER, new Float32Array(tabTexels), objgl.STATIC_DRAW);

    objTexels.intNoTexture = intNoTexture;
    objTexels.pcCouleurTexel = 0.0;

    return objTexels;
}

function creerMaillageIndicateur(objgl) {
    const tabMaillage = [0, 1, 2];

    const objMaillage = objgl.createBuffer();
    objgl.bindBuffer(objgl.ELEMENT_ARRAY_BUFFER, objMaillage);
    objgl.bufferData(objgl.ELEMENT_ARRAY_BUFFER, new Uint16Array(tabMaillage), objgl.STATIC_DRAW);

    objMaillage.intNbTriangles = 1;
    objMaillage.intNbDroites = 0;

    return objMaillage;
}