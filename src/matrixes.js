const { floor, abs } = Math

module.exports = {
    multiplyMatrixAndPoint: (matrix, point) => {
        let c0r0 = matrix[0], c1r0 = matrix[1], c2r0 = matrix[2];
        let c0r1 = matrix[3], c1r1 = matrix[4], c2r1 = matrix[5];
        let c0r2 = matrix[6], c1r2 = matrix[7], c2r2 = matrix[8];
    
        let x = point[0];
        let y = point[1];
        let z = point[2];
    
        let resultX = (x*c0r0) + (y*c0r1) + (z*c0r2);
        let resultY = (x*c1r0) + (y*c1r1) + (z*c1r2);
        let resultZ = (x*c2r0) + (y*c2r1) + (z*c2r2);
    
        return [resultX, resultY, resultZ]
    },

    customVecMultiply: (matrix, point) => {
        // Give a simple variable name to each part of the matrix, a column and row number
        let c0r0 = matrix[ 0], c1r0 = matrix[ 1], c2r0 = matrix[ 2], c3r0 = matrix[ 3];
        let c0r1 = matrix[ 4], c1r1 = matrix[ 5], c2r1 = matrix[ 6], c3r1 = matrix[ 7];
        let c0r2 = matrix[ 8], c1r2 = matrix[ 9], c2r2 = matrix[10], c3r2 = matrix[11];
        let c0r3 = matrix[12], c1r3 = matrix[13], c2r3 = matrix[14], c3r3 = matrix[15];

        // Now set some simple names for the point
        let x = point[0];
        let y = point[1];
        let z = point[2];
        
        // Multiply the point against each part of the 1st column, then add together
        let resX = (x * c0r0) + (y * c0r1) + (z * c0r2) + (c0r3);
        
        // Multiply the point against each part of the 2nd column, then add together
        let resY = (x * c1r0) + (y * c1r1) + (z * c1r2) + (c1r3);
        
        // Multiply the point against each part of the 3rd column, then add together
        let resZ = (x * c2r0) + (y * c2r1) + (z * c2r2) + (c2r3);
        
        // Multiply the point against each part of the 4th column, then add together
        let resW = (x * c3r0) + (y * c3r1) + (z * c3r2) + (c3r3);

        
        if(resW != 0){
            resX /= resW; resY /= resW; resZ /= resW;
        }
        
        return [(resX), (resY), (resZ)];
    },

    multiplyMatrixAndPoint4x4: (matrix, point) => {
        // Give a simple variable name to each part of the matrix, a column and row number
        let c0r0 = matrix[ 0], c1r0 = matrix[ 1], c2r0 = matrix[ 2], c3r0 = matrix[ 3];
        let c0r1 = matrix[ 4], c1r1 = matrix[ 5], c2r1 = matrix[ 6], c3r1 = matrix[ 7];
        let c0r2 = matrix[ 8], c1r2 = matrix[ 9], c2r2 = matrix[10], c3r2 = matrix[11];
        let c0r3 = matrix[12], c1r3 = matrix[13], c2r3 = matrix[14], c3r3 = matrix[15];
        
        // Now set some simple names for the point
        let x = point[0];
        let y = point[1];
        let z = point[2];
        let w = point[3];
        
        // Multiply the point against each part of the 1st column, then add together
        let resultX = (x * c0r0) + (y * c0r1) + (z * c0r2) + (w * c0r3);
        
        // Multiply the point against each part of the 2nd column, then add together
        let resultY = (x * c1r0) + (y * c1r1) + (z * c1r2) + (w * c1r3);
        
        // Multiply the point against each part of the 3rd column, then add together
        let resultZ = (x * c2r0) + (y * c2r1) + (z * c2r2) + (w * c2r3);
        
        // Multiply the point against each part of the 4th column, then add together
        let resultW = (x * c3r0) + (y * c3r1) + (z * c3r2) + (w * c3r3);
        
        return [resultX, resultY, resultZ, resultW];
    },

    multiplyMatrices: (matrixA, matrixB) => {
        let row0 = [matrixB[0], matrixB[1], matrixB[2]];
        let row1 = [matrixB[3], matrixB[4], matrixB[5]];
        let row2 = [matrixB[6], matrixB[7], matrixB[8]];
    
        let res0 = multiplyMatrixAndPoint(matrixA, row0);
        let res1 = multiplyMatrixAndPoint(matrixA, row1);
        let res2 = multiplyMatrixAndPoint(matrixA, row2);
    
        return [
            res0[0], res0[1], res0[2],
            res1[0], res1[1], res1[2],
            res2[0], res2[1], res2[2]
        ];
    },

    MatrixZRotation: (a) => {
        return [
            Math.cos(a), -Math.sin(a), 0, 0,
            Math.sin(a), Math.cos(a), 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1
        ]
    },

    MatrixXRotation: (a) => {
        return [
            1, 0, 0, 0,
            0, Math.cos(a * 0.5), -Math.sin(a * 0.5), 0,
            0, Math.sin(a * 0.5), Math.cos(a * 0.5), 0,
            0, 0, 0, 1
        ]
    },

    MatrixYRotation: (a) => {
        return [
            Math.cos(a), 0, Math.sin(a), 0,
            0, 1, 0, 0,
            -Math.sin(a), 0, Math.cos(a), 0,
            0, 0, 0, 1
        ]
    }
}