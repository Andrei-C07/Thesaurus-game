function baisserPorteGraduellement(porte, objScene3D) {
    const targetY = -2.6;
    const decrement = 0.02;

    function animer() {
        let y = getPositionY(porte.transformations);

        if (y > targetY) {
            y = Math.max(y - decrement, targetY);
            setPositionY(y, porte.transformations);

            dessiner(objgl, objProgShaders, objScene3D);
            requestAnimationFrame(animer);
        } else {
            for (let z = 0; z < map.length; z++) {
                for (let x = 0; x < map[z].length; x++) {
                    if (map[z][x] === "d") {
                        map[z][x] = "g";
                    }
                }
            }
        }
    }

    animer();
}