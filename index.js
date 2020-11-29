const viewPort = require('./src/viewport');
const { min, max, floor, abs } = Math
const { getPoints } = require('./src/points');
const { multiplyMatrixAndPoint, multiplyMatrixAndPoint4x4, multiplyMatrices, MatrixXRotation, MatrixYRotation, MatrixZRotation, customVecMultiply } = require('./src/matrixes');
const matrixes = require('./src/matrixes');
const points = require('./src/points');

let sides = [
    //SOUTH
    [ [0 , 0 , 0] ,    [0 , 1 , 0] ,    [1 , 1 , 0]  ],
    [ [0 , 0 , 0] ,    [1 , 1 , 0] ,    [1 , 0 , 0]  ],
   // EAST 
    [ [1 , 0 , 0] ,    [1 , 1 , 0] ,    [1 , 1 , 1]  ],
    [ [1 , 0 , 0] ,    [1 , 1 , 1] ,    [1 , 0 , 1]  ],
   // NORTH
    [ [1 , 0 , 1] ,    [1 , 1 , 1] ,    [0 , 1 , 1]  ],
    [ [1 , 0 , 1] ,    [0 , 1 , 1] ,    [0 , 0 , 1]  ],
   // WEST
    [ [0 , 0 , 1] ,    [0 , 1 , 1] ,    [0 , 1 , 0]  ],
    [ [0 , 0 , 1] ,    [0 , 1 , 0] ,    [0 , 0 , 0]  ],
   // TOP
    [ [0 , 1 , 0] ,    [0 , 1 , 1] ,    [1 , 1 , 1]  ],
    [ [0 , 1 , 0] ,    [1 , 1 , 1] ,    [1 , 1 , 0]  ],
   // BOTTOM
    [ [1 , 0 , 1] ,    [0 , 0 , 1] ,    [0 , 0 , 0]  ],
    [ [1 , 0 , 1] ,    [0 , 0 , 0] ,    [1 , 0 , 0]  ]
]
/*

    1 x 1 x 1

    cube 8 points

    [x, y, z]

    BOTTOM SQUARE
    1.point [0, 0, 0]
    2.point [1, 0, 0]
    3.point [0, 1, 0]
    4.point [1, 1, 0]

    TOP SQUARE
    1.point [0, 0, 1]
    2.point [1, 0, 1]
    3.point [0, 1, 1]
    4.point [1, 1, 1]
*/

let vp = new viewPort(200, 200, 60, 90);
let projMat = vp.projectionMatrix();
let rotZM = 0.1;
let rotXM = 0.1;
let rotYM = 0.1;
let upscaleMult = 0.7;
let hdv = 0.8;
let mv = 70;

setInterval(()=> {
    rotZM += 0.1;
    rotXM += 0.1;
    rotYM += 0.1;

    let rotZ = MatrixZRotation(rotZM);
    let rotX = MatrixXRotation(rotXM);
    let rotY = MatrixYRotation(rotYM);
    sides.forEach(tri => {

        let m1 = customVecMultiply(rotX, tri[0]);
        let m2 = customVecMultiply(rotX, tri[1]);
        let m3 = customVecMultiply(rotX, tri[2]);

        let points1 = customVecMultiply(rotZ, m1);
        let points2 = customVecMultiply(rotZ, m2);
        let points3 = customVecMultiply(rotZ, m3);

        points1 = customVecMultiply(rotY, points1);
        points2 = customVecMultiply(rotY, points2);
        points3 = customVecMultiply(rotY, points3);

        let translated1 = points1;
        let translated2 = points2;
        let translated3 = points3;

        translated1[2] += 3;
        translated2[2] += 3;
        translated3[2] += 3;

        points1 = customVecMultiply(projMat, translated1);
        points2 = customVecMultiply(projMat, translated2);
        points3 = customVecMultiply(projMat, translated3);

        /*points1 = multiplyMatrixAndPoint(rotX, tri[0]);
        points2 = multiplyMatrixAndPoint(rotX, tri[1]);
        points3 = multiplyMatrixAndPoint(rotX, tri[2]);*/

        //console.log(points1, points2, points3)

        points1[0] += 1; points1[1] += 1;
        points2[0] += 1; points2[1] += 1;
        points3[0] += 1; points3[1] += 1;

        points1[0] *= upscaleMult * (vp.w-mv);
        points1[1] *= upscaleMult * (vp.h/hdv-mv);

        points2[0] *= upscaleMult * (vp.w-mv);
        points2[1] *= upscaleMult * (vp.h/hdv-mv);
        
        points3[0] *= upscaleMult * (vp.w-mv);
        points3[1] *= upscaleMult * (vp.h/hdv-mv);

        //console.log(points1[0], points1[1], points2[0], points2[1], points3[0], points3[1]);

        vp.drawTri([
            [(points1[0]), (points1[1])],
            [(points2[0]), (points2[1])],
            [(points3[0]), (points3[1])]
        ])
    });

    vp.draw();

    vp.clear();

}, 200);

//PI = 180° v rad

//console.log(mnpcalc);