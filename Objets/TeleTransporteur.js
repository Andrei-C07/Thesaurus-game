function creerObj3DTeleTransporteur(objgl, intNoTexture) {
    const objTele = new Object();
    const rayon = 0.4;
    const hauteur = 0.2; // 🔥 Hauteur modérée (0.2) — PAS trop mince
    const segments = 20;

    const tabVertex = [];
    const tabCouleurs = [];
    const tabTexels = [];
    const tabIndices = [];

    // Créer le tour du cylindre (latéral)
    for (let i = 0; i <= segments; i++) {
        const angle = i * 2 * Math.PI / segments;
        const x = rayon * Math.cos(angle);
        const z = rayon * Math.sin(angle);

        // Bas
        tabVertex.push(x, 0, z);
        tabCouleurs.push(0.2, 0.6, 1.0, 1.0); // Bleu
        tabTexels.push(i / segments, 1.0);

        // Haut
        tabVertex.push(x, hauteur, z);
        tabCouleurs.push(0.2, 0.8, 1.0, 1.0); // Bleu plus clair
        tabTexels.push(i / segments, 0.0);
    }

    // Maillage : faces latérales
    for (let i = 0; i < segments; i++) {
        const base = i * 2;
        tabIndices.push(
            base, base + 1, base + 2,
            base + 1, base + 2, base + 3
        );
    }

    // Ajouter un disque au-dessus (couvercle)
    const startTop = tabVertex.length / 3;
    for (let i = 0; i <= segments; i++) {
        const angle = i * 2 * Math.PI / segments;
        const x = rayon * Math.cos(angle);
        const z = rayon * Math.sin(angle);
        tabVertex.push(x, hauteur, z);
        tabCouleurs.push(0.2, 0.8, 1.0, 1.0);
        tabTexels.push((x + rayon) / (2 * rayon), (z + rayon) / (2 * rayon));
    }
    tabVertex.push(0, hauteur, 0); // centre du haut
    tabCouleurs.push(0.2, 0.8, 1.0, 1.0);
    tabTexels.push(0.5, 0.5);

    const centerTop = tabVertex.length / 3 - 1;
    for (let i = 0; i < segments; i++) {
        tabIndices.push(centerTop, startTop + i, startTop + (i + 1) % segments);
    }

    objTele.vertex = objgl.createBuffer();
    objgl.bindBuffer(objgl.ARRAY_BUFFER, objTele.vertex);
    objgl.bufferData(objgl.ARRAY_BUFFER, new Float32Array(tabVertex), objgl.STATIC_DRAW);

    objTele.couleurs = objgl.createBuffer();
    objgl.bindBuffer(objgl.ARRAY_BUFFER, objTele.couleurs);
    objgl.bufferData(objgl.ARRAY_BUFFER, new Float32Array(tabCouleurs), objgl.STATIC_DRAW);

    objTele.texels = objgl.createBuffer();
    objgl.bindBuffer(objgl.ARRAY_BUFFER, objTele.texels);
    objgl.bufferData(objgl.ARRAY_BUFFER, new Float32Array(tabTexels), objgl.STATIC_DRAW);
    objTele.texels.intNoTexture = intNoTexture;
    objTele.texels.pcCouleurTexel = 1.0;

    objTele.maillage = objgl.createBuffer();
    objgl.bindBuffer(objgl.ELEMENT_ARRAY_BUFFER, objTele.maillage);
    objgl.bufferData(objgl.ELEMENT_ARRAY_BUFFER, new Uint16Array(tabIndices), objgl.STATIC_DRAW);
    objTele.maillage.intNbTriangles = tabIndices.length / 3;

    objTele.transformations = creerTransformations();

    return objTele;
}
