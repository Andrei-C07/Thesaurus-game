function creerObj3DMur(objgl, intNoTexture, hauteur = 2.5) {
    const obj3DMur = new Object();
    obj3DMur.fltLargeur = 1;
    obj3DMur.fltProfondeur = 1;
    obj3DMur.fltHauteur = hauteur;

    obj3DMur.vertex = creerVertexMur(objgl, obj3DMur.fltLargeur, obj3DMur.fltProfondeur, obj3DMur.fltHauteur);
    obj3DMur.couleurs = creerCouleursMur(objgl, [1.0, 1.0, 1.0, 1.0]);
    obj3DMur.texels = creerTexelsMur(objgl, intNoTexture);
    obj3DMur.maillage = creerMaillageMur(objgl);
    obj3DMur.transformations = creerTransformations();

    return obj3DMur;
}

function creerVertexMur(objgl, fltLargeur, fltProfondeur, fltHauteur) {
    const w = fltLargeur, h = fltHauteur, d = fltProfondeur;

    // Base non incluse
    const tabVertex = [
        // Devant
        0, 0, 0,  w, 0, 0,  0, h, 0,  w, h, 0,
        // Derrière
        0, 0, d,  w, 0, d,  0, h, d,  w, h, d,
        // Gauche
        0, 0, 0,  0, 0, d,  0, h, 0,  0, h, d,
        // Droite
        w, 0, 0,  w, 0, d,  w, h, 0,  w, h, d,
        // Haut
        0, h, 0,  w, h, 0,  0, h, d,  w, h, d,
    ];

    const objVertex = objgl.createBuffer();
    objgl.bindBuffer(objgl.ARRAY_BUFFER, objVertex);
    objgl.bufferData(objgl.ARRAY_BUFFER, new Float32Array(tabVertex), objgl.STATIC_DRAW);

    return objVertex;
}

function creerCouleursMur(objgl, tabCouleur) {
    let tabCouleurs = [];
    for (let i = 0; i < 20; i++) // 5 faces × 4 sommets
        tabCouleurs = tabCouleurs.concat(tabCouleur);

    const objCouleursMur = objgl.createBuffer();
    objgl.bindBuffer(objgl.ARRAY_BUFFER, objCouleursMur);
    objgl.bufferData(objgl.ARRAY_BUFFER, new Float32Array(tabCouleurs), objgl.STATIC_DRAW);

    return objCouleursMur;
}

function creerTexelsMur(objgl, intNoTexture) {
    const tabTexels = [];
    for (let i = 0; i < 5; i++) {
        tabTexels.push(0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 1.0, 1.0); // pour chaque face
    }

    const objTexelsMur = objgl.createBuffer();
    objgl.bindBuffer(objgl.ARRAY_BUFFER, objTexelsMur);
    objgl.bufferData(objgl.ARRAY_BUFFER, new Float32Array(tabTexels), objgl.STATIC_DRAW);

    objTexelsMur.intNoTexture = intNoTexture;
    objTexelsMur.pcCouleurTexel = 1.0;

    return objTexelsMur;
}

function creerMaillageMur(objgl) {
    const tabMaillage = [];

    for (let i = 0; i < 5; i++) {
        const base = i * 4;
        tabMaillage.push(base, base + 1, base + 2, base + 1, base + 2, base + 3);
    }

    const objMaillage = objgl.createBuffer();
    objgl.bindBuffer(objgl.ELEMENT_ARRAY_BUFFER, objMaillage);
    objgl.bufferData(objgl.ELEMENT_ARRAY_BUFFER, new Uint16Array(tabMaillage), objgl.STATIC_DRAW);

    objMaillage.intNbTriangles = 10; // 5 faces × 2 triangles
    objMaillage.intNbDroites = 0;

    return objMaillage;
}

function estMur(x, z) {
    //marge pour que le joueur ne puisse pas clip dans le mur
    const margin = 0.1;
    const cell = map[Math.floor(z)][Math.floor(x)];

    return (
        cell === "w" || cell === "b" || cell === "d" ||
        map[Math.floor(z)][Math.floor(x + margin)] === "w" ||
        map[Math.floor(z)][Math.floor(x - margin)] === "w" ||
        map[Math.floor(z + margin)][Math.floor(x)] === "w" ||
        map[Math.floor(z - margin)][Math.floor(x)] === "w"
    );
}