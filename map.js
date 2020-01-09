
let showMicroNutrientLayer;
let showMicrOrgLayer;
let showSalinityLayer;
let showWTempLayer;
let showStatsLayer;

let medNutrPerPart = [];
let medMicrOrgPerPart = [];
let medSalntyPerPart = [];
let medTempPerPart = [];
let medStatsPerPart = [];

require([
    "esri/Map",
    "esri/views/MapView",
    "esri/layers/FeatureLayer",
    "esri/Graphic",
    "esri/layers/GraphicsLayer",
    "esri/geometry/Point",
    "esri/widgets/Legend",
    "esri/widgets/Search"
  ], function(Map, MapView,FeatureLayer,Graphic,GraphicsLayer,Point,Legend,Search) {

    var map = new Map({
      basemap: "dark-gray",
    });

    var view = new MapView({
      container: "viewDiv",
      map: map,
      center: [27,44.8],
      zoom: 5,
      scale:2141162
      //2341162
    });

    var layer = new FeatureLayer({
        url: "https://services7.arcgis.com/96WiU7O7nBMDhJ4y/arcgis/rest/services/regiunea_muntenia/FeatureServer",
       
    });
    map.add(layer);

    // coords widget
    var coordsWidget = document.createElement('div');
    coordsWidget.id = "coordsWidget";
    coordsWidget.className="esri-widget esri-component";
    coordsWidget.style.padding="7px 15px 5px";
    view.ui.add(coordsWidget,"bottom-right");

  

    function showCoordinates(pt) {
        var coords = "Lat/Lon " + pt.latitude.toFixed(3) + " " + pt.longitude.toFixed(3) +
        " | Scale 1:" + Math.round(view.scale * 1) / 1 +
        " | Zoom " + view.zoom;

        coordsWidget.innerHTML = coords;
        // console.log(coords);
    }

    // -----------------------------------------------------------------------------------------------------------------------------------
    // let k = 0;
    // let pointsZ2 = [];
    // let str = "";
    // function showCoordinatess(pt) {
    //     var coords = "" +  pt.longitude.toFixed(3)+ " " +  pt.latitude.toFixed(3) + ",";
    //     str+= coords;

    //     // coordsWidget.innerHTML = coords;
    //     pointsZ2[k] = {
    //         long: pt.longitude.toFixed(3),
    //         lat: pt.latitude.toFixed(3)
    //     };
    //     drawPoint(pointsZ2,k);
    //     k++;
    //     console.log(coords);
    // }


    // -------------------------------------------------------------------------------------------------------------------------------------
    view.watch("stationary",function(isStationary) {
        showCoordinates(view.center);
    });

    view.on("pointer-move",function(evt) {
        showCoordinates(view.toMap({x: evt.x,y: evt.y}));
    })
    view.on("click",function(evt) {
        getAdress(view.toMap({x: evt.x,y: evt.y}));
        // console.log(evt.x + " " + evt.y);
    })
    // window.onkeydown = (evt) => {
    //     if (evt.which == 87)
    //         console.log('w');
    // }
    // ---------------------------------------------------------------------------------------------------------------------------------------


    function getAdress(coords) {
        let lat = coords.latitude.toFixed(3);
        let long = coords.longitude.toFixed(3);

        
    }
    // add points 
    var graphicsLayerPoints = null;
    let soilNutrientColorCodes = ["#ED4F4F","#4CF07A","#1A0CBB","#FF21C1","#756767","#C1DA28"];
    function drawPoint(arr,pos,color,nutrientValues,nutrientName) {
        
        if (graphicsLayerPoints === null) {
            graphicsLayerPoints = new GraphicsLayer();
            map.add(graphicsLayerPoints);
        }

        var point = {
            type: "point",
            longitude: arr[nutrientValues[pos].point_index][0],
            latitude: arr[nutrientValues[pos].point_index][1]
        };
        
        
        var simpleMarkerSymbol = {
            type: "simple-marker",
            color: color,
            // outline: {
            //     color: [255,255,255], // white
            //     width: 1
            // },
            size: 7
        };
    
        // create attributes
        // var attributes = {
        //     Name: "My point",
        //     Location: " Point somewhere in Muntenia"
        // };
    
        // create popup template
        var popupTemplate = {
            title: nutrientName,
            content: "Value " + nutrientValues[pos].value
        };
    
        var pointGraphic = new Graphic({
            geometry: point,
            symbol: simpleMarkerSymbol,
            // attributes: attributes,
            popupTemplate: popupTemplate
        });
        
        graphicsLayerPoints.add(pointGraphic);
    
    }


    function drawLine(coords) {
        var simpleLineSymbol = {
            type: "simple-line",
            color: [226, 119, 40], // orange
            width: 2
          };
   
          var polyline = {
            type: "polyline",
            paths: coords
          };
   
          var polylineGraphic = new Graphic({
            geometry: polyline,
            symbol: simpleLineSymbol
          });
   
          graphicsLayerZones.add(polylineGraphic);
    }
    
    let partsArr = [];
    showMicroNutrientLayer = function () {

        if (graphicsLayerPoints === null) {

            partsArr[0] = argesPts;
            partsArr[1] = dambovitaPts;
            partsArr[2] = prahovaPts;
            partsArr[3] = buzauPts;
            partsArr[4] = brailaPts;
            partsArr[5] = ialomitaPts;
            partsArr[6] = calarasiPts;
            partsArr[7] = bucurestiPts;
            partsArr[8] = giurgiuPts;
            partsArr[9] = teleromanPts;


            let medNitro = 0;
            let medPhosph = 0;
            let medPotass = 0;
            let medIron = 0;
            let medZinc = 0;
            let medCopper = 0;


            
            
            for (let i = 0; i < partsArr.length; i++) {
                let nr,rest;
                for (let j = 0; j < partsArr[i].length; j++) {
                    nr = Math.floor(partsArr[i].length / 6);
                    rest = partsArr[i].length - nr;

                    if (j < nr) {
                        // nitrogen
                        drawPoint(partsArr[i],j,"#ED4F4F",judet[i],"Nitrogen");
                        medNitro += judet[i][j].value;
                    } else if (j < 2*nr) {
                        // phosporus
                        drawPoint(partsArr[i],j,"#4CF07A",judet[i],"Phosporus");
                        medPhosph += judet[i][j].value;
                    } else if (j < 3*nr) {
                        //potassium
                        drawPoint(partsArr[i],j,"#1A0CBB",judet[i],"Potassium");
                        medPotass += judet[i][j].value;
                    } else if (j < 4*nr) {
                        // iron
                        drawPoint(partsArr[i],j,"#FF21C1",judet[i],"Iron");
                        medIron += judet[i][j].value;
                    } else if (j < 5*nr) {
                        //zinc
                        drawPoint(partsArr[i],j,"#756767",judet[i],"Zinc");
                        medZinc += judet[i][j].value;
                    } else if (j <= 6*nr) {
                        // copper
                        drawPoint(partsArr[i],j,"#C1DA28",judet[i],"Copper");
                        medCopper += judet[i][j].value;
                    } else if (rest != 0) {
                        // zinc
                        drawPoint(partsArr[i],j,"#756767",judet[i],"Zinc");
                        medZinc += judet[i][j].value;
                    }
                    
                }
                medNitro = (medNitro / nr).toFixed(2);
                medPhosph = (medPhosph / nr).toFixed(2);
                medPotass = (medPotass / nr).toFixed(2);
                medIron = (medIron / nr).toFixed(2);
                medZinc = (medZinc / (nr + rest)).toFixed(2);
                medCopper = (medCopper / nr).toFixed(2);
                // console.log("iter " + i + " and nitro" + medNitro + ", phosp " + medPhosph + " , potass " + medPotass + ", iron"  + medIron + " ,zinc " + medZinc + " ,copper" + medCopper);
                medNutrPerPart[i] = [
                                        medNitro,
                                        medPhosph,
                                        medPotass,
                                        medIron,
                                        medZinc,
                                        medCopper
                                                    ];
                medNitro = 0;
                medPhosph = 0;
                medPotass = 0;
                medIron = 0;
                medZinc = 0;
                medCopper = 0;
                                                    
            }


            
            
        }
        // judet idx 0 -> Arges
        // judet idx 1 -> Dambovita
        // judet idx 2 -> Prahova
        // judet idx 3 -> Buzau
        // judet idx 4 -> Braila
        // judet idx 5 -> Ialomita
        // judet idx 6 -> Calarasi
        // judet idx 7 -> Bucuresti
        // judet idx 8 -> Giurgiu
        // judet idx 9 -> Teleroman
        // console.log(judet);

    }

    let graphicsLayerZones = GraphicsLayer();
    
    function drawBorders() {
        // var graphicsLayer = new GraphicsLayer();
        map.add(graphicsLayerZones);
        var zone1 = {
            type: "polygon",
            rings: borderMuntenia
        };

        var simpleFillSymbol = {
            type: "simple-fill",
            color: [0,139,79,0.1], // orange opacity 80%
            outline: {
                color: [0,0,0],
                width: 3
            },
            // style: "backward-diagonal"
        };

        var polygonGraphic = new Graphic({
            geometry: zone1,
            symbol: simpleFillSymbol
        });
        
        graphicsLayerZones.add(polygonGraphic);

        // ---------------------------------------------------------

        drawLine(borderDambovita);
        drawLine(borderArges);
        drawLine(borderTeleroman);
        drawLine(borderPrahova);
        drawLine(borderGiurgiu);
        drawLine(borderCalarasi);
        drawLine(borderBucuresti);
        drawLine(borderIalomita);
        drawLine(borderBuzau);
    }


    drawBorders();


    

    
    let graphicsLayerPolygons = null;
    function drawPolygon(ringsArr,pos,color,sensorVals,title,layerNr) {
        // let graphicsLayer = new GraphicsLayer();
        // map.add(graphicsLayer);
        
        if (graphicsLayerPolygons === null) {
            graphicsLayerPolygons = new GraphicsLayer();
            map.add(graphicsLayerPolygons);
        }
           

        let zone4 = {
            type: "polygon",
            rings: ringsArr[sensorVals[pos].polygon_index]
        };

        
        let simpleFillSymbol = {
            type: "simple-fill",
            color: color,
            outline: {
                color: [255,255,255],
                width: 1
            },
            // style: "backward-diagonal"
        };
        var popupTemplate;
        if (layerNr == 2 || layerNr == 5) {
            popupTemplate = {
                title: title,
                content: "Value " + sensorVals[pos].value
              };
    
        } else {
            popupTemplate = {
                title: title
              };
    
        }

        let polygonGraphic = new Graphic({
            geometry: zone4,
            symbol: simpleFillSymbol,
            popupTemplate: popupTemplate
        });
        if (polygonGraphic)
            console.log("called");
        graphicsLayerPolygons.add(polygonGraphic);
    }

    showMicrOrgLayer = function () {
        let layerNr = 2;
        if (graphicsLayerPolygons === null) {

            partsArr = [];
            partsArr[0] = argesP;
            partsArr[1] = dambovitaP;
            partsArr[2] = prahovaP;
            partsArr[3] = calarasiP;
            partsArr[4] = bucurestiP;
            partsArr[5] = ialomitaP;
            partsArr[6] = buzauP;
            partsArr[7] = brailaP;
            partsArr[8] = giurgiuP;
            partsArr[9] = teleromanP;

            let sz = partsArr.length;

            let medBnfcl = 0;
            let medPhyto = 0;
            let medFusrm = 0;
            let medVertc = 0;
            let medPythm = 0;
            let medRhizct = 0;


            for (let i = 0; i < sz; i++) { 
                let nr,rest;
                 for (let j = 0; j < partsArr[i].length; j++) {
                    nr = Math.floor(partsArr[i].length / 6);
                    rest = partsArr[i].length - nr;

                    if (j < nr) {
                        // beneficial microorg.
                        drawPolygon(partsArr[i],j,"#3FEF23",judet[i],"Beneficial Microorganisms",layerNr);
                        medBnfcl += judet[i][j].value;
                    } else if (j < 2*nr) {
                        // phytophtora
                        drawPolygon(partsArr[i],j,"#29F5DD",judet[i],"Phytophtora",layerNr);
                        medPhyto += judet[i][j].value;
                    } else if (j < 3*nr) {
                        // fusarium
                        drawPolygon(partsArr[i],j,"#A412D8",judet[i],"Fusarium",layerNr);
                        medFusrm += judet[i][j].value;
                    } else if (j < 4*nr) {
                        // verticillium
                        drawPolygon(partsArr[i],j,"#CDBD2B",judet[i],"Verticillium",layerNr);
                        medVertc += judet[i][j].value;
                    } else if (j < 5*nr) {
                        // pythium
                        drawPolygon(partsArr[i],j,"#6D7513",judet[i],"Pythium",layerNr);
                        medPythm += judet[i][j].value;
                    } else if (j <= 6*nr) {
                        // rhizoctonga
                        drawPolygon(partsArr[i],j,"#ED4F4F",judet[i],"Rhizoctonga",layerNr);
                        medRhizct += judet[i][j].value;
                    } else if (rest != 0) {
                        // pythium
                        drawPolygon(partsArr[i],j,"#6D7513",judet[i],"Pythium",layerNr);
                        medPythm += judet[i][j].value;
                    }
                }

                medBnfcl = (medBnfcl / nr).toFixed(2);
                medPhyto = (medPhyto / nr).toFixed(2);
                medFusrm = (medFusrm / nr).toFixed(2);
                medVertc = (medVertc / nr).toFixed(2);
                medPythm = (medPythm / (nr+rest)).toFixed(2);
                medRhizct = (medRhizct / nr).toFixed(2);
                
                medMicrOrgPerPart[i] = [
                    medBnfcl,
                    medPhyto,
                    medFusrm,
                    medVertc,
                    medPythm,
                    medRhizct
                ];

                medBnfcl = 0;
                medPhyto = 0;
                medFusrm = 0;
                medVertc = 0;
                medPythm = 0;
                medRhizct = 0;
            }
        }

    }

    showSalinityLayer = function () {
        let layerNr = 3;
        let maxVSalinity = 800;
        let color;
        let title;
        if (graphicsLayerPolygons === null) {

            partsArr = [];
            partsArr[0] = argesP;
            partsArr[1] = dambovitaP;
            partsArr[2] = prahovaP;
            partsArr[3] = calarasiP;
            partsArr[4] = bucurestiP;
            partsArr[5] = ialomitaP;
            partsArr[6] = buzauP;
            partsArr[7] = brailaP;
            partsArr[8] = giurgiuP;
            partsArr[9] = teleromanP;

            let sz = partsArr.length;
            let medSalinity = 0;


            for (let i = 0; i < sz; i++) { 
                let nr = partsArr[i].length;
                console.log("nr is " + nr);
                 for (let j = 0; j < nr; j++) {

                    if ( (judet[i][j].value / maxVSalinity) * 100 <= 40){
                        color = 'rgb(192,192,192)';
                    } else if ((judet[i][j].value / maxVSalinity) * 100 > 40 
                                &&  (judet[i][j].value / maxVSalinity) * 100 <= 70) {
                        color = 'rgb(169,169,169)';
                    } else if ((judet[i][j].value / maxVSalinity) * 100 > 70) {
                        color = 'rgb(105,105,105)';
                    }

                    title = 'Salinity ' + ((judet[i][j].value / maxVSalinity) * 100).toFixed(2) + '%';
                  
                    drawPolygon(partsArr[i],j,color,judet[i],title,layerNr);
                    medSalinity += judet[i][j].value;

                }

                medSalinity = (medSalinity / nr).toFixed(2);
                medSalntyPerPart[i] = [
                   medSalinity
                ];
                medSalinity = 0;
            }
        }
    }

    showWTempLayer = function () {
        let layerNr = 4;
        let color;
        let title;
        if (graphicsLayerPolygons === null) {

            partsArr = [];
            partsArr[0] = argesP;
            partsArr[1] = dambovitaP;
            partsArr[2] = prahovaP;
            partsArr[3] = calarasiP;
            partsArr[4] = bucurestiP;
            partsArr[5] = ialomitaP;
            partsArr[6] = buzauP;
            partsArr[7] = brailaP;
            partsArr[8] = giurgiuP;
            partsArr[9] = teleromanP;

            let sz = partsArr.length;

            let medTemp = 0;
            let medHumidity = 0;


            for (let i = 0; i < sz; i++) { 
                let nr = partsArr[i].length;
                 for (let j = 0; j < nr; j++) {

                    if ( judet[i][j].value >= 0
                            && judet[i][j].value < 14 ) {
                        color = '#949EF8';
                    } else if ( judet[i][j].value >= 14
                                &&  judet[i][j].value <= 30) {
                        color = '#cce67e';
                    } else if ( judet[i][j].value > 30 )  {
                        color = '#ed8702';
                    }

                    let humidity = (100 - judet[i][j].value * 10 / 6);
                    medHumidity += humidity;
                    title = 'Temperature ' + judet[i][j].value +'&degC ' + 'Humidity: ' + humidity.toFixed(2) + "%";
                    drawPolygon(partsArr[i],j,color,judet[i],title,layerNr);
                    medTemp += judet[i][j].value;
                }

                medTemp = (medTemp / nr).toFixed(2);
                medHumidity  = (medHumidity / nr).toFixed(2);
                medTempPerPart[i] = [
                    medTemp,
                    medHumidity
                ];
                medTemp = 0;
                medHumidity = 0;
            }
        }
    }

    showStatsLayer = function() {
        let layerNr = 5;
        if (graphicsLayerPolygons === null) {

            partsArr = [];
            partsArr[0] = argesP;
            partsArr[1] = dambovitaP;
            partsArr[2] = prahovaP;
            partsArr[3] = calarasiP;
            partsArr[4] = bucurestiP;
            partsArr[5] = ialomitaP;
            partsArr[6] = buzauP;
            partsArr[7] = brailaP;
            partsArr[8] = giurgiuP;
            partsArr[9] = teleromanP;

            let sz = partsArr.length;

            let medCartofi = 0;
            let medFlSoar = 0;
            let medGrau = 0;
            let medOrz = 0;
            let medPrmb = 0;


            for (let i = 0; i < sz; i++) { 
                let nr,rest;
                 for (let j = 0; j < partsArr[i].length; j++) {
                    nr = Math.floor(partsArr[i].length / 5);
                    rest = partsArr[i].length - nr;

                    if (j < nr) {
                        // cartofi
                        drawPolygon(partsArr[i],j,"#d36e10",judet[i],"Cartofi",layerNr);
                        medCartofi += judet[i][j].value;
                    } else if (j < 2*nr) {
                        // floarea soarelui
                        drawPolygon(partsArr[i],j,"#1b130c",judet[i],"Floarea soarelui",layerNr);
                        medFlSoar += judet[i][j].value;
                    } else if (j < 3*nr) {
                        // grau
                        drawPolygon(partsArr[i],j,"#86674b",judet[i],"Grau",layerNr);
                        medGrau += judet[i][j].value;
                    } else if (j < 4*nr) {
                        // orz
                        drawPolygon(partsArr[i],j,"#5ac429",judet[i],"Orz",layerNr);
                        medOrz += judet[i][j].value;
                    } else if (j < 5*nr) {
                        // porumb
                        drawPolygon(partsArr[i],j,"#db6b90",judet[i],"Porumb",layerNr);
                        medPrmb += judet[i][j].value;
                    } else if (rest != 0) {
                        // orz
                        drawPolygon(partsArr[i],j,"#5ac429",judet[i],"Orz",layerNr);
                        medOrz += judet[i][j].value;
                    }
                }

                medCartofi = (medCartofi / nr).toFixed(2);
                medFlSoar = (medFlSoar / nr).toFixed(2);
                medGrau = (medGrau / nr).toFixed(2);
                medOrz = (medOrz / (nr+rest)).toFixed(2);
                medPrmb = (medPrmb / nr).toFixed(2);
                
                medStatsPerPart[i] = [
                    medCartofi,
                    medFlSoar,
                    medGrau,
                    medOrz,
                    medPrmb                
                ];

                medCartofi = 0;
                medFlSoar = 0;
                medGrau = 0;
                medOrz = 0;
                medPrmb = 0;
            }
        }
    }
   

    let nutrFltr = document.getElementById("nutrients");
    let micrOrgFltr = document.getElementById("microOrg");
    let salFltr = document.getElementById("salinity");
    let thFltr = document.getElementById("th");
    let statsFltr = document.getElementById("stats");


    let legend1 = document.querySelector('.legend-micronutrients');
    let legend2 = document.querySelector('.legend-microorg');
    let legend3 = document.querySelector('.legend-salinity');
    let legend4 = document.querySelector('.legend-wh');
    let legend5 = document.querySelector('.legend-stats');

    let locations  = document.querySelector('.navigator .locations');
    let charts = document.querySelector('.navigator .charts');
        
    nutrFltr.onclick = () => {
        
        charts.style.color = 'black';
        charts.style.fontWeight="normal";
        locations.style.fontWeight = "bold";
        locations.style.color = '#419ADA';

        let title = document.querySelector('.filters span');
        document.querySelector('.filters').style.color='#419ADA';
        let icon = document.querySelector('.filters i');
        title.textContent = 'Soil Nutrients';
        title.style.right = '5px';
        icon.style.left = '-18px';
        map.layers.remove(graphicsLayerPolygons);
        graphicsLayerPolygons = null;
        
        // showMicroNutrientLayer();
        document.querySelector('.layerList').classList.toggle("show");

       

        legend2.style.display="none";
        legend3.style.display="none";
        legend4.style.display="none";
        legend5.style.display="none";
        // display legend
        
        legend1.style.display = "block";
        legend1.style.height = "230px";
        legend1.style.paddingBottom = '20px';
    }
    micrOrgFltr.onclick = () => {

        charts.style.color = 'black';
        charts.style.fontWeight="normal";
        locations.style.fontWeight = "bold";
        locations.style.color = '#419ADA';


        let title = document.querySelector('.filters span');
        document.querySelector('.filters').style.color='#419ADA';
        let icon = document.querySelector('.filters i');
        title.textContent = 'Soil Microorg.';
        title.style.right = '5px';
        icon.style.left = '-16px';

        map.layers.remove(graphicsLayerPoints);
        graphicsLayerPoints = null;
        if (graphicsLayerPolygons != null) {
            map.layers.remove(graphicsLayerPolygons);
            graphicsLayerPolygons = null;
        }

        // showPolygonLayer();
        document.querySelector('.layerList').classList.toggle("show");

        // display legend
        legend1.style.display="none";
        legend3.style.display="none";
        legend4.style.display="none";
        legend5.style.display="none";
        
        legend2.style.display="block";
        legend2.style.height="230px";
        legend2.style.paddingBottom="20px";
    }
    salFltr.onclick = () => {

        charts.style.color = 'black';
        charts.style.fontWeight="normal";
        locations.style.fontWeight = "bold";
        locations.style.color = '#419ADA';

        let title = document.querySelector('.filters span');
        document.querySelector('.filters').style.color='#419ADA';
        let icon = document.querySelector('.filters i');
        title.textContent = 'Soil Salinity';
        title.style.right = '10px';
        icon.style.left = '-25px';


        map.layers.remove(graphicsLayerPoints);
        graphicsLayerPoints = null;
        if (graphicsLayerPolygons != null) {
            map.layers.remove(graphicsLayerPolygons);
            graphicsLayerPolygons = null;
        }
        // showPolygonLayer();
        document.querySelector('.layerList').classList.toggle("show");


        // display legend
        legend1.style.display="none";
        legend2.style.display="none";
        legend4.style.display="none";
        legend5.style.display="none";
        
        legend3.style.display="block";
        legend3.style.height="230px";
        legend3.style.paddingBottom="20px";
    }
    thFltr.onclick = () => {


        charts.style.color = 'black';
        charts.style.fontWeight="normal";
        locations.style.fontWeight = "bold";
        locations.style.color = '#419ADA';

        let title = document.querySelector('.filters span');
        document.querySelector('.filters').style.color='#419ADA';
        let icon = document.querySelector('.filters i');
        title.textContent = 'Weather';
        title.style.right = '22px';
        icon.style.left = '-37px';

        map.layers.remove(graphicsLayerPoints);
        graphicsLayerPoints = null;
        if (graphicsLayerPolygons != null) {
            map.layers.remove(graphicsLayerPolygons);
            graphicsLayerPolygons = null;
        }
        // showPolygonLayer();
        document.querySelector('.layerList').classList.toggle("show");


        // display legend
        legend1.style.display="none";
        legend2.style.display="none";
        legend3.style.display="none";
        legend5.style.display="none";
        
        legend4.style.display="block";
        legend4.style.height="230px";
        legend4.style.paddingBottom="20px";
    }
    statsFltr.onclick = () => {

        charts.style.color = 'black';
        charts.style.fontWeight="normal";
        locations.style.fontWeight = "bold";
        locations.style.color = '#419ADA';

        let title = document.querySelector('.filters span');
        document.querySelector('.filters').style.color='#419ADA';
        let icon = document.querySelector('.filters i');
        title.textContent = 'Statistics';
        title.style.right = '22px';
        icon.style.left = '-35px';


        map.layers.remove(graphicsLayerPoints);
        graphicsLayerPoints = null;
        if (graphicsLayerPolygons != null) {
            map.layers.remove(graphicsLayerPolygons);
            graphicsLayerPolygons = null;
        }
        // showPolygonLayer();
        document.querySelector('.layerList').classList.toggle("show");


        // display legend
        legend1.style.display="none";
        legend2.style.display="none";
        legend3.style.display="none";
        legend4.style.display="none";
        
        legend5.style.display="block";
        legend5.style.height="230px";
        legend5.style.paddingBottom="20px";
    }


    // search widget 
    let search = new Search({
        view: view
    });

    view.on("click",function(evt) {
        search.clear();
        view.popup.clear();
        if (search.activeSource) {
            let geocoder = search.activeSource.locator; // World geocode service
            let params = {
                location: evt.mapPoint
            };

            geocoder.locationToAddress(params)
                .then(function(response) { // Show the address found
                    let address = response.address;
                    showPopup(address,evt.mapPoint);
                },function(err) { // show no address found
                    showPopup("No address found",evt.mapPoint);

                });
        }
    });

    function showPopup(address,pt) {
        view.popup.open({
            title: + Math.round(pt.longitude * 100000) / 100000 + "," + Math.round(pt.latitude * 100000) / 100000,
            content: address,
            location: pt
        });
    }

    
  });