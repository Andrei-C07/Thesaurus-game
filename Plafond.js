function creerObj3DPlafond(objgl, intNoTexture, hauteur = 2.5) {
    const obj3DPlafond = new Object();
    obj3DPlafond.fltLargeur = 1000;
    obj3DPlafond.fltProfondeur = 1000;
    obj3DPlafond.fltHauteur = hauteur;

    obj3DPlafond.vertex = creerVertexPlafond(objgl, obj3DPlafond.fltLargeur, obj3DPlafond.fltProfondeur, obj3DPlafond.fltHauteur);
    obj3DPlafond.couleurs = creerCouleursPlafond(objgl, [1.0, 1.0, 1.0, 1.0]); 
    obj3DPlafond.texels = creerTexelsPlafond(objgl, obj3DPlafond.fltLargeur, obj3DPlafond.fltProfondeur, intNoTexture);
    obj3DPlafond.maillage = creerMaillagePlafond(objgl);
    obj3DPlafond.transformations = creerTransformations();

    return obj3DPlafond;
}

function creerVertexPlafond(objgl, fltLargeur, fltProfondeur, fltHauteur) {
    const tabVertex = [
        0.0, fltHauteur, 0.0,
        fltLargeur, fltHauteur, 0.0,
        0.0, fltHauteur, fltProfondeur,
        fltLargeur, fltHauteur, fltProfondeur
    ];

    const objPlafond = objgl.createBuffer();
    objgl.bindBuffer(objgl.ARRAY_BUFFER, objPlafond);
    objgl.bufferData(objgl.ARRAY_BUFFER, new Float32Array(tabVertex), objgl.STATIC_DRAW);

    return objPlafond;
}

function creerCouleursPlafond(objgl, tabCouleur) {
    let tabCouleurs = [];
    for (let i = 0; i < 4; i++)
        tabCouleurs = tabCouleurs.concat(tabCouleur);

    const objCouleursPlafond = objgl.createBuffer();
    objgl.bindBuffer(objgl.ARRAY_BUFFER, objCouleursPlafond);
    objgl.bufferData(objgl.ARRAY_BUFFER, new Float32Array(tabCouleurs), objgl.STATIC_DRAW);

    return objCouleursPlafond;
}

function creerTexelsPlafond(objgl, fltLargeur, fltProfondeur, intNoTexture) {
    const tabTexels = [
        0.0, 0.0,
        fltLargeur, 0.0,
        0.0, fltProfondeur,
        fltLargeur, fltProfondeur
    ];

    const objTexelsPlafond = objgl.createBuffer();
    objgl.bindBuffer(objgl.ARRAY_BUFFER, objTexelsPlafond);
    objgl.bufferData(objgl.ARRAY_BUFFER, new Float32Array(tabTexels), objgl.STATIC_DRAW);

    objTexelsPlafond.intNoTexture = intNoTexture;
    objTexelsPlafond.pcCouleurTexel = 1.0;

    return objTexelsPlafond;
}

function creerMaillagePlafond(objgl) {
    const tabMaillage = [0, 1, 2, 1, 2, 3];

    const objMaillagePlafond = objgl.createBuffer();
    objgl.bindBuffer(objgl.ELEMENT_ARRAY_BUFFER, objMaillagePlafond);
    objgl.bufferData(objgl.ELEMENT_ARRAY_BUFFER, new Uint16Array(tabMaillage), objgl.STATIC_DRAW);

    objMaillagePlafond.intNbTriangles = 2;
    objMaillagePlafond.intNbDroites = 0;

    return objMaillagePlafond;
}