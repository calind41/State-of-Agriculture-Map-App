require([
    "esri/Map",
    "esri/views/MapView",
    "esri/layers/FeatureLayer",
    "esri/Graphic",
    "esri/layers/GraphicsLayer",
    "esri/geometry/Point",
    "esri/widgets/Legend"
  ], function(Map, MapView,FeatureLayer,Graphic,GraphicsLayer,Point,Legend) {

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
    let k = 0;
    let pointsZ2 = [];
    let str = "";
    function showCoordinatess(pt) {
        var coords = "" +  pt.longitude.toFixed(3)+ " " +  pt.latitude.toFixed(3) + ",";
        str+= coords;

        // coordsWidget.innerHTML = coords;
        pointsZ2[k] = {
            long: pt.longitude.toFixed(3),
            lat: pt.latitude.toFixed(3)
        };
        drawPoint(pointsZ2,k);
        k++;
        console.log(coords);
    }


    // -------------------------------------------------------------------------------------------------------------------------------------
    view.watch("stationary",function(isStationary) {
        showCoordinates(view.center);
    });

    view.on("pointer-move",function(evt) {
        showCoordinates(view.toMap({x: evt.x,y: evt.y}));
    })
    view.on("click",function(evt) {
        showCoordinatess(view.toMap({x: evt.x,y: evt.y}));
        // console.log(evt.x + " " + evt.y);
    })
    window.onkeydown = (evt) => {
        if (evt.which == 87)
            console.log('w');
    }
    // ---------------------------------------------------------------------------------------------------------------------------------------


    // add points 
    var graphicsLayerPoints = null;
    let soilNutrientColorCodes = ["#ED4F4F","#4CF07A","#1A0CBB","#FF21C1","#756767","#C1DA28"];
    function drawPoint(arr,pos) {
        
        if (graphicsLayerPoints === null) {
            graphicsLayerPoints = new GraphicsLayer();
            map.add(graphicsLayerPoints);
        }

        var point;
        if (Array.isArray(arr[0]) === false ) {
            point = {
                type: "point",
                longitude: arr[pos].long,
                latitude: arr[pos].lat
            }
        }
        else {
            point = {
                type: "point",
                longitude: arr[pos][0],
                latitude: arr[pos][1]
            };
        }
        

        
        
        
        let idx = Math.floor(Math.random() * 6);
        // console.log("idx is " + idx);

        
        var simpleMarkerSymbol = {
            type: "simple-marker",
            color: soilNutrientColorCodes[idx], // orange
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
        // var popupTemplate = {
        //     title: "{Name}",
        //     content: "I am located at <b>{Location}</b>."
        // };
    
        var pointGraphic = new Graphic({
            geometry: point,
            symbol: simpleMarkerSymbol,
            // attributes: attributes,
            // popupTemplate: popupTemplate
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
    
    function showMicroNutrientLayer() {

        if (graphicsLayerPoints === null) {

            let partsArr = [];
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

            for (let i = 0; i < partsArr.length; i++) {
                for (let j = 0; j < partsArr[i].length; j++) {
                    drawPoint(partsArr[i],j);
                }
            }
            
        }
        

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
    function drawPolygon(ringsArr) {
        // let graphicsLayer = new GraphicsLayer();
        // map.add(graphicsLayer);
        
        if (graphicsLayerPolygons === null) {
            graphicsLayerPolygons = new GraphicsLayer();
            map.add(graphicsLayerPolygons);
        }
           

        let zone4 = {
            type: "polygon",
            rings: ringsArr
        };
        let r = Math.floor(Math.random() * 256);
        let g = Math.floor(Math.random() * 256);
        let b  = Math.floor(Math.random() * 256);
        
        let simpleFillSymbol = {
            type: "simple-fill",
            color: [r,g,b,0.5],
            outline: {
                color: [255,255,255],
                width: 1
            },
            // style: "backward-diagonal"
        };

        let polygonGraphic = new Graphic({
            geometry: zone4,
            symbol: simpleFillSymbol
        });

        graphicsLayerPolygons.add(polygonGraphic);
    }


   

    function showMicroOrgLayer() {
        if (graphicsLayerPolygons === null) {
            for (let i = 0; i < argesP.length; i++) {
                drawPolygon(argesP[i]);
            }
            for (let i = 0; i < dambovitaP.length; i++) {
                drawPolygon(dambovitaP[i]);
            }
        
            for (let i = 0; i < prahovaP.length; i++) {
                drawPolygon(prahovaP[i]);
            }
            for (let i = 0; i < calarasiP.length; i++) {
                drawPolygon(calarasiP[i]);
            }
        
            for (let i = 0; i < bucurestiP.length; i++) {
                drawPolygon(bucurestiP[i]);
            }
        
            for (let i = 0; i < ialomitaP.length; i++) {
                drawPolygon(ialomitaP[i]);
            }
        
            for (let i = 0; i < buzauP.length; i++) {
                drawPolygon(buzauP[i]);
            }
        
            for (let i = 0; i < brailaP.length; i++) {
                drawPolygon(brailaP[i]);
            }
        
            for (let i  = 0; i < giurgiuP.length; i++) {
                drawPolygon(giurgiuP[i]);
            }
        
            for (let i = 0; i < teleromanP.length; i++) {
                drawPolygon(teleromanP[i]);
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
        
    nutrFltr.onclick = () => {
        let title = document.querySelector('.filters span');
        document.querySelector('.filters').style.backgroundColor='gray';
        let icon = document.querySelector('.filters i');
        title.textContent = 'Soil Nutrients';
        title.style.right = '5px';
        icon.style.left = '-18px';
        map.layers.remove(graphicsLayerPolygons);
        graphicsLayerPolygons = null;
        
        showMicroNutrientLayer();
        document.querySelector('.layerList').classList.toggle("show");

       

        legend2.style.display="none";
        legend3.style.display="none";
        legend4.style.display="none";
        legend5.style.display="none";
        // display legend
        
        legend1.style.display = "block";
        legend1.style.height = "200px";
        legend1.style.paddingBottom = '20px';

    }
    micrOrgFltr.onclick = () => {
        let title = document.querySelector('.filters span');
        document.querySelector('.filters').style.backgroundColor='gray';
        let icon = document.querySelector('.filters i');
        title.textContent = 'Soil Microorg.';
        title.style.right = '5px';
        icon.style.left = '-16px';

        map.layers.remove(graphicsLayerPoints);
        graphicsLayerPoints = null;
        showMicroOrgLayer();
        document.querySelector('.layerList').classList.toggle("show");

        // display legend
        legend1.style.display="none";
        legend3.style.display="none";
        legend4.style.display="none";
        legend5.style.display="none";
        
        legend2.style.display="block";
        legend2.style.height="200px";
        legend2.style.paddingBottom="20px";
    }
    salFltr.onclick = () => {

        let title = document.querySelector('.filters span');
        document.querySelector('.filters').style.backgroundColor='gray';
        let icon = document.querySelector('.filters i');
        title.textContent = 'Soil Salinity';
        title.style.right = '10px';
        icon.style.left = '-25px';


        map.layers.remove(graphicsLayerPoints);
        graphicsLayerPoints = null;
        showMicroOrgLayer();
        document.querySelector('.layerList').classList.toggle("show");


        // display legend
        legend1.style.display="none";
        legend2.style.display="none";
        legend4.style.display="none";
        legend5.style.display="none";
        
        legend3.style.display="block";
        legend3.style.height="200px";
        legend3.style.paddingBottom="20px";
    }
    thFltr.onclick = () => {

        let title = document.querySelector('.filters span');
        document.querySelector('.filters').style.backgroundColor='gray';
        let icon = document.querySelector('.filters i');
        title.textContent = 'Weather';
        title.style.right = '22px';
        icon.style.left = '-37px';

        map.layers.remove(graphicsLayerPoints);
        graphicsLayerPoints = null;
        showMicroOrgLayer();
        document.querySelector('.layerList').classList.toggle("show");


        // display legend
        legend1.style.display="none";
        legend2.style.display="none";
        legend3.style.display="none";
        legend5.style.display="none";
        
        legend4.style.display="block";
        legend4.style.height="200px";
        legend4.style.paddingBottom="20px";
    }
    statsFltr.onclick = () => {

        let title = document.querySelector('.filters span');
        document.querySelector('.filters').style.backgroundColor='gray';
        let icon = document.querySelector('.filters i');
        title.textContent = 'Statistics';
        title.style.right = '22px';
        icon.style.left = '-35px';


        map.layers.remove(graphicsLayerPoints);
        graphicsLayerPoints = null;
        showMicroOrgLayer();
        document.querySelector('.layerList').classList.toggle("show");


        // display legend
        legend1.style.display="none";
        legend2.style.display="none";
        legend3.style.display="none";
        legend4.style.display="none";
        
        legend5.style.display="block";
        legend5.style.height="200px";
        legend5.style.paddingBottom="20px";
    }


    
  });


  

 
