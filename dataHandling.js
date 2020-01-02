// request data for point sensosrs
let pointsData;

// request data for polygon sensors


// --------------------------------------------


// pointsData : [ {id:Number,sensor_id:Number,judet_index:Number(0,9), 
//point_index: Number,polygon_idex,value:Number,created_at:DateString,
//updated_at:DateString} ]

// let sz = pointsData.length;

// let judet = [];
// for (let i = 0; i < 9; i++) {
//     judet[i] = pointsData.filter((elem,i) => {
//         return elem.judet_index === this;
//     },i);
//     judet[i].sort((a,b) => {
//         return a.point_index - b.point_index;
//     }); // sortez ascendent dupa point index
// }

// judet[5] = [ { ... judet_index: 5,....} ]

// points is for soil nutrients , colors: 
// ED4F4F,4CF07A,1A0CBB,FF21C1,756767,C1DA28

// culorile le generez random 
// in tabel afisez o singura valoare per judet , fac medie

// let jl = judet.length;
// for (let i = 0; i < jl; i++) {
//     let sz = judet[i].length;
//     let medie = 0;
//     for (let j = 0; j < sz; j++) {
//         medie += judet[i][j];
//     }
//     medie  = medie / sz;
//     judet[i][0].valoareMedie = medie;
// }


// afisare in tabel valorile medii pentru micronutrienti bazat pe valori hardcodate

// let judet = [];
// judet[0] = [
//     {
//         value: 34,
//         medie: 32
//     },
//     {
//         value: 12
//     }
// ];

// judet[1] = [
//     {
//         value: 34,
//         medie: 594
//     },
//     {
//         value: 12
//     }
// ];

// judet[2] = [
//     {
//         value: 34,
//         medie: 8
//     },
//     {
//         value: 12
//     }
// ];

// judet[3] = [
//     {
//         value: 34,
//         medie: 95
//     },
//     {
//         value: 12
//     }
// ];

// judet[4] = [
//     {
//         value: 34,
//         medie: 5
//     },
//     {
//         value: 12
//     }
// ];

// judet[5] = [
//     {
//         value: 34,
//         medie: 94
//     },
//     {
//         value: 12
//     }
// ];

// judet[6] = [
//     {
//         value: 34,
//         medie: 235
//     },
//     {
//         value: 12
//     }
// ];

// judet[7] = [
//     {
//         value: 34,
//         medie: 234
//     },
//     {
//         value: 12
//     }
// ];

// judet[8] = [
//     {
//         value: 34,
//         medie: 12
//     },
//     {
//         value: 12
//     }
// ];

