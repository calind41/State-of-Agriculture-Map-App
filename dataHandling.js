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

// // let judet = [];
// judet[0] = [
//     {
//         value: 34,
//         medie1: 32,
//         medie2: 32,
//         medie3: 32,
//         medie4: 32,
//         medie5: 32
//     },
//     {
//         value: 12
//     }
// ];

// judet[1] = [
//     {
//         value: 34,
//         medie1: 594,
//         medie2: 594,
//         medie3: 594,
//         medie4: 594,
//         medie5: 594
//     },
//     {
//         value: 12
//     }
// ];

// judet[2] = [
//     {
//         value: 34,
//         medie1: 8,
//         medie2: 8,
//         medie3: 8,
//         medie4: 8,
//         medie5: 8
//     },
//     {
//         value: 12
//     }
// ];

// judet[3] = [
//     {
//         value: 34,
//         medie1: 95,
//         medie2: 95,
//         medie3: 95,
//         medie4: 95,
//         medie5: 95
//     },
//     {
//         value: 12
//     }
// ];

// judet[4] = [
//     {
//         value: 34,
//         medie1: 5,
//         medie2: 5,
//         medie3: 5,
//         medie4: 5,
//         medie5: 5
//     },
//     {
//         value: 12
//     }
// ];

// judet[5] = [
//     {
//         value: 34,
//         medie1: 94,
//         medie2: 94,
//         medie3: 94,
//         medie4: 94,
//         medie5: 94
//     },
//     {
//         value: 12
//     }
// ];

// judet[6] = [
//     {
//         value: 34,
//         medie1: 235,
//         medie2: 235,
//         medie3: 235,
//         medie4: 235,
//         medie5: 235
//     },
//     {
//         value: 12
//     }
// ];

// judet[7] = [
//     {
//         value: 34,
//         medie1: 234,
//         medie2: 234,
//         medie3: 234,
//         medie4: 234,
//         medie5: 234
//     },
//     {
//         value: 12
//     }
// ];

// judet[8] = [
//     {
//         value: 34,
//         medie1: 12,
//         medie2: 12,
//         medie3: 12,
//         medie4: 12,
//         medie5: 12
//     },
//     {
//         value: 12
//     }
// ];

