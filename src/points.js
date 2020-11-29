/*var A = [20, 80];
var B = [40, 28];*/

module.exports = { getPoints }

function getPoints(A, B){
    function slope(a, b) {
        if (a[0] == b[0]) {
            return null;
        }
    
        return (b[1] - a[1]) / (b[0] - a[0]);
    }
    
    function intercept(point, slope) {
        if (slope === null) {
            // vertical line
            return point[0];
        }
        return point[1] - slope * point[0];
    }
    
    const { floor, abs, max, min } = Math;
    var m = slope(A, B);
    var b = intercept(A, m);
    var add = A[1] < B[1] ? 1 : -1;
    var check = add == -1 ? min(A[1], B[1]) : max(A[1], B[1]);
    
    var coordinates = [];
    for (var x = A[0]; x <= B[0]; x++) {
        var y = m * x + b;
    
        var yn = m * (x+1) + b;
        
        if((abs(A[0] - B[0]) < abs(A[1] - B[1])) && (A[0] != B[0])){
            if(A[1] < B[1]){
                while((floor(y) < floor(yn)) && (y <= check)){
                    coordinates.push([floor(x), floor(y)]);
                    y+=add;
                }
            }else{
                while((floor(y) != floor(yn)) && (y >= check)){
                    coordinates.push([floor(x), floor(y)]);
                    y+=add;
                }
            }
        }else if(A[0] == B[0]){
            let j = add == -1 ? max(A[1], B[1]) : min(A[1], B[1]);
            while(j != check+add){
                coordinates.push([floor(x), floor(j)]);
                j+=add;
            }
        }else{
            coordinates.push([floor(x), floor(y)]);
        }
    }
    if(coordinates.length < 1 || coordinates == undefined){
        return getPoints(B, A);
    }else{
        return coordinates;
    }
}


/*function ha(A, B){
    function slope(a, b) {
        if (a[0] == b[0]) {
            return null;
        }
        console.log("ye")
        return (b[1] - a[1]) / (b[0] - a[0]);
    }

    function intercept(point, slope) {
        if (slope === null) {
            // vertical line
            return point[0];
        }
        console.log("yes")
        return point[1] - slope * point[0];
    }

    const { floor, abs, max, min } = Math;
    var m = slope(A, B);
    var b = intercept(A, m);
    var add = A[1] < B[1] ? 1 : -1;
    var check = add == -1 ? min(A[1], B[1]) : max(A[1], B[1]);

    var coordinates = [];
    for (var x = A[0]; x <= B[0]; x++) {
        var y = m * x + b;
        var yn;
        var yn = m * (x+1) + b;
        if((abs(A[0] - B[0]) < abs(A[1] - B[1])) && A[0] != B[0]){
            if(A[1] < B[1]){
                while((floor(y) != floor(yn)) && (y <= check)){
                    coordinates.push([floor(x), floor(y)]);
                    y+=add;
                }
            }else{
                while((floor(y) != floor(yn)) && (y >= check)){
                    coordinates.push([floor(x), floor(y)]);
                    y+=add;
                }
            }
        }else if(A[0] == B[0]){
            let j = add == -1 ? max(A[1], B[1]) : min(A[1], B[1]);
            while(j != check+add){
                coordinates.push([floor(x), floor(j)]);
                j+=add;
            }
        }else{
            coordinates.push([floor(x), floor(y)]);
        }
    }
    if(coordinates.length < 1 || coordinates == undefined){
        console.log("amHere")
        return ha(B, A);
    }else{
        return coordinates;
    }
}

console.log(ha(A, B))*/