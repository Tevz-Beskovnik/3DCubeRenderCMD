const { getPoints } = require('./points');
const { tan, atan, sin, asin, cos, acos, PI } = Math
const process = require('process');

function ctg(x) { return 1 / Math.tan(x); }
function actg(x) { return Math.PI / 2 - Math.atan(x); }

class viewPort{
    constructor(width, height, refreshRate, fov){
        this.rfr = refreshRate;
        this.h = height;
        this.w = width;
        this.canv = [];
        this.fNear = 0.1;
        this.fFar = 100;
        this.fov = fov;
        this.fovRad = ctg(fov * 0.5 / 180 * PI);
        this.ascpectRation = this.h / this.w;
        for(let i = 0; i < this.h; i++){
            let row = [];
            for(let j = 0; j < this.w; j++){
                row.push("  ");
            }
            this.canv.push(row);
        }
    }

    distance = (x1, y1, x2, y2) => {
        return Math.sqrt((x2-x1)**2 + (y2-y1)**2);
    }

    projectionMatrix = () => {
        return [
            this.ascpectRation * this.fovRad, 0, 0, 0,
            0, this.fovRad, 0, 0,
            0, 0, this.fFar / (this.fFar - this.fNear), 1,
            0, 0, (-this.fFar * this.fNear) / (this.fFar - this.fNear), 0
        ]
    }

    drawTri = (a) => {
        // preveri da so točke
        a.length == 3 ? '' : console.error('A triangle is defined by 3 points');

        //znak namesto praznega prostora
        let f = "#|";
        
        //preveri če točke sežejo izven višine in dolžine
        a.map(b => {
            //dobi točke od največje do najmanješe lr -> sm
            let lr = a[0];
            let md = a[1];
            let sm = a[2];
            
            //dobi vse točke med točkami
            let points0 = getPoints(md, lr);
            let points1 = getPoints(sm, lr);
            let points2 = getPoints(sm, md);
            
            points0.map(a => {
                if((a[0] > -1 && a[0] < this.w) && (a[1] > -1 && a[1] < this.h)){
                    let h = a[1], w = a[0];
                    this.canv[h][w] = f;
                }
            });
        
            points1.map(a => {
                if((a[0] > -1 && a[0] < this.w) && (a[1] > -1 && a[1] < this.h)){
                    let h = a[1], w = a[0];
                    this.canv[h][w] = f;
                }
            });
        
            points2.map(a => {
                if((a[0] > -1 && a[0] < this.w) && (a[1] > -1 && a[1] < this.h)){
                    let h = a[1], w = a[0];
                    this.canv[h][w] = f;
                }
            });
        });
        
    }

    draw = () => {
        this.canv.forEach(a => {
            if(Array.isArray(a)){
                console.log(a.join(''));
            }
        });
    }

    clear = () => {
        process.stdout.write('\x1B[H\x1B[2J');
        this.canv = [];
        for(let i = 0; i < this.h; i++){
            let row = [];
            for(let j = 0; j < this.w; j++){
                row.push("  ");
            }
            this.canv.push(row);
        }
    }
}

module.exports = viewPort;