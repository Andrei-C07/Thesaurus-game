function creerObj3DTeleRecepteur(objgl, intNoTexture) {
    const objRecepteur = new Object();
    const rayon = 0.4;
    const latBands = 12;
    const longBands = 12;

    const tabVertex = [];
    const tabTexels = [];
    const tabCouleurs = [];
    const tabIndices = [];

    for (let lat = 0; lat <= latBands; lat++) {
        const theta = lat * Math.PI / latBands;
        const sinTheta = Math.sin(theta);
        const cosTheta = Math.cos(theta);

        for (let lon = 0; lon <= longBands; lon++) {
            const phi = lon * 2 * Math.PI / longBands;
            const sinPhi = Math.sin(phi);
            const cosPhi = Math.cos(phi);

            const x = cosPhi * sinTheta;
            const y = cosTheta;
            const z = sinPhi * sinTheta;

            tabVertex.push(rayon * x, rayon * y, rayon * z);
            tabTexels.push(lon / longBands, lat / latBands);
            tabCouleurs.push(1.0, 0.4, 0.2, 1.0); 
        }
    }

    for (let lat = 0; lat < latBands; lat++) {
        for (let lon = 0; lon < longBands; lon++) {
            const first = (lat * (longBands + 1)) + lon;
            const second = first + longBands + 1;
            tabIndices.push(first, second, first + 1);
            tabIndices.push(second, second + 1, first + 1);
        }
    }

    objRecepteur.vertex = objgl.createBuffer();
    objgl.bindBuffer(objgl.ARRAY_BUFFER, objRecepteur.vertex);
    objgl.bufferData(objgl.ARRAY_BUFFER, new Float32Array(tabVertex), objgl.STATIC_DRAW);

    objRecepteur.couleurs = objgl.createBuffer();
    objgl.bindBuffer(objgl.ARRAY_BUFFER, objRecepteur.couleurs);
    objgl.bufferData(objgl.ARRAY_BUFFER, new Float32Array(tabCouleurs), objgl.STATIC_DRAW);

    objRecepteur.texels = objgl.createBuffer();
    objgl.bindBuffer(objgl.ARRAY_BUFFER, objRecepteur.texels);
    objgl.bufferData(objgl.ARRAY_BUFFER, new Float32Array(tabTexels), objgl.STATIC_DRAW);
    objRecepteur.texels.intNoTexture = intNoTexture;
    objRecepteur.texels.pcCouleurTexel = 1.0;

    objRecepteur.maillage = objgl.createBuffer();
    objgl.bindBuffer(objgl.ELEMENT_ARRAY_BUFFER, objRecepteur.maillage);
    objgl.bufferData(objgl.ELEMENT_ARRAY_BUFFER, new Uint16Array(tabIndices), objgl.STATIC_DRAW);
    objRecepteur.maillage.intNbTriangles = tabIndices.length / 3;

    objRecepteur.transformations = creerTransformations();

    return objRecepteur;
}
