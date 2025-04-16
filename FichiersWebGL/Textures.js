function creerTextures(objgl, tabImages) {
    return new Promise((resolve) => {
        const tabObjTextures = new Array(tabImages.length);
        let imagesChargees = 0;

        if (tabImages.length === 0) {
            resolve([]);
            return;
        }

        for (let i = 0; i < tabImages.length; i++) {
            // L'image de la texture
            const objImage = new Image();
            objImage.src = tabImages[i];

            // Attendre que l'image soit chargée
            objImage.onload = function() {
                // Créer une texture
                const objTexture = objgl.createTexture();

                // Lier la texture et y ajouter l'image
                objgl.bindTexture(objgl.TEXTURE_2D, objTexture);
                objgl.texImage2D(objgl.TEXTURE_2D, 0, objgl.RGBA, objgl.RGBA, objgl.UNSIGNED_BYTE, objImage);

                // Paramétrer la texture
                objgl.texParameteri(objgl.TEXTURE_2D, objgl.TEXTURE_MAG_FILTER, objgl.LINEAR);
                objgl.texParameteri(objgl.TEXTURE_2D, objgl.TEXTURE_MIN_FILTER, objgl.NEAREST_MIPMAP_NEAREST);
                objgl.generateMipmap(objgl.TEXTURE_2D);
                objgl.texParameteri(objgl.TEXTURE_2D, objgl.TEXTURE_WRAP_S, objgl.REPEAT);
                objgl.texParameteri(objgl.TEXTURE_2D, objgl.TEXTURE_WRAP_T, objgl.REPEAT);

                // Ajouter la texture à l’index correct
                tabObjTextures[i] = objTexture;

                // Vérifier si toutes les images sont chargées
                imagesChargees++;
                if (imagesChargees === tabImages.length) {
                    resolve(tabObjTextures);
                }
            };

        }
    });
}
