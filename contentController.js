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

// 1: 0,600
// 2: 0,100
// 3: 0,800
// 4: 0,50
// 5: 0,500
let judet = [];
$(function() {

    let nutrients = document.querySelector('.layerList #nutrients');
    let microOrg = document.querySelector('.layerList #microOrg');
    let salinity = document.querySelector('.layerList #salinity');
    let th = document.querySelector('.layerList #th');
    let stats = document.querySelector('.layerList #stats');
    let reports = document.querySelector('.layerList #reports');

    nutrients.addEventListener('click',handleClick);
    microOrg.addEventListener('click',handleClick);
    salinity.addEventListener('click',handleClick);
    th.addEventListener('click',handleClick);
    stats.addEventListener('click',handleClick);
    reports.addEventListener('click',handleClick);


    let rfrshData = document.querySelector('.requestData button');
    rfrshData.addEventListener("click",refreshData);

    function refreshData() {
        const url1 = 'http://localhost/sensor/1/limit/0,600';
        const url2 = 'http://localhost/sensor/2/limit/0,100';
        const url3 = 'http://localhost/sensor/3/limit/0,800';
        const url4 = 'http://localhost/sensor/4/limit/0,50';
        const url5 = 'http://localhost/sensor/5/limit/0,500';

        const http1 = new XMLHttpRequest();
        const http2 = new XMLHttpRequest();
        const http3 = new XMLHttpRequest();
        const http4 = new XMLHttpRequest();
        const http5 = new XMLHttpRequest();
        http1.open("GET",url1);
        http2.open("GET",url2);
        http3.open("GET",url3);
        http4.open("GET",url4);
        http5.open("GET",url5);
        
        http1.send();
        http2.send();
        http3.send();
        http4.send();
        http5.send();

        http1.onreadystatechange = (e) => {
            console.log('enter1');
            if (http1.readyState == 2) {
                console.log('done1');
            }
        }
        http2.onreadystatechange = (e) => {
            console.log('enter2');
            if (http2.readyState == 2) {
                console.log('done2');
            }
        }
        http3.onreadystatechange = (e) => {
            console.log('enter3');
            if (http3.readyState == 2) {
                console.log('done3');
            }
        }
        http4.onreadystatechange = (e) => {
            console.log('enter4');
            if (http4.readyState == 2) {
                console.log('done4');
            }
        }
        http5.onreadystatechange = (e) => {
            console.log('enter5');
            if (http5.readyState == 2) {
                console.log('done5');
            }
        }

    }

    
    let currentTbl="";
    let currentTblId = "";
    let currentShLayer;
    let currentmedArr;

    let contentEl = $("#content");

    function displayChart(datasets,min,max) {
        let txt = document.querySelector('.filters span').textContent;
        if ( txt != 'FILTERS' && txt != 'Incidents') {
        let bp = [];
        if (currentTblId === "#slnty" || currentTblId === "#wther"){
            console.log("entered");
            bp = [{barThickness: 14}];
        }
        let canvasEl = document.createElement("CANVAS");
        canvasEl.width = '200';
        canvasEl.height = '50';
        let ctx = canvasEl.getContext('2d');
        
        let data = {
            labels: ["Arges","Braila","Bucuresti","Buzau","Calarasi","Dambovita",
                        "Giurgiu","Ialomita","Prahova","Teleroman"],
            datasets: datasets
        };
        
        let myBarChart = new Chart(ctx,{
            type: 'bar',
            data: data,
            options: {
                barValueSpacing: 20,
                scales: {
                    yAxes: [
                        {
                            display: true,
                            ticks: {
                                min: min,
                                max: max
                            }
                        }
                    ],
                    xAxes: bp
                }
            }
        });
        contentEl.append(canvasEl);

    }
        
    }   

    function showCharts(t) {
        document.querySelector(".navigator .charts").onclick = () => {
            // console.log(t.rows[1].cells[2].innerHTML)
            // t is table , can extract data from it + display charts code in here : 


            switch(t.id) {
                case "nutr": {
                    let nitroVals = [],
                        phosphVals = [],
                        potassVals = [],
                        ironVals = [],
                        zincVals = [],
                        copperVals = [];
                    let sz = t.rows.length;
                    for (let i = 1; i < sz; i++) {
                        nitroVals[i-1] = parseFloat(t.rows[i].cells[1].innerHTML);
                        phosphVals[i-1] = parseFloat(t.rows[i].cells[2].innerHTML);
                        potassVals[i-1] = parseFloat(t.rows[i].cells[3].innerHTML);
                        ironVals[i-1] = parseFloat(t.rows[i].cells[4].innerHTML);
                        zincVals[i-1] = parseFloat(t.rows[i].cells[5].innerHTML);
                        copperVals[i-1] = parseFloat(t.rows[i].cells[6].innerHTML);
                    }
                    let datasets =  [
                        {
                            label: "Nitrogen",
                            backgroundColor: "#ED4F4F",
                            data: nitroVals
                        },
                        {
                            label: "Phosphorus",
                            backgroundColor: "#4CF07A",
                            data: phosphVals
                        },
                        {
                            label: "Potassium",
                            backgroundColor: "#1A0CBB",
                            data: potassVals
                        },
                        {
                            label: "Iron",
                            backgroundColor: "#FF21C1",
                            data: ironVals
                        },
                        {
                            label: "Zinc",
                            backgroundColor: "#756767",
                            data: zincVals
                        },
                        {
                            label: "Copper",
                            backgroundColor: "#C1DA28",
                            data: copperVals
                        }
                    ];
                    let min = 0;
                    let max = 600;
                    displayChart(datasets,min,max);
                    break;
                }
                case "mcrOrg": {
                    let benVals = [],
                        phytoVals = [],
                        fusarVals = [],
                        vertiVals = [],
                        phytiVals = [],
                        rhizVals = [];

                    let sz = t.rows.length;
                    for (let i = 1; i < sz; i++) {
                        benVals[i-1] = parseFloat(t.rows[i].cells[1].innerHTML);
                        phytoVals[i-1] = parseFloat(t.rows[i].cells[2].innerHTML);
                        fusarVals[i-1] = parseFloat(t.rows[i].cells[3].innerHTML);
                        vertiVals[i-1] = parseFloat(t.rows[i].cells[4].innerHTML);
                        phytiVals[i-1] = parseFloat(t.rows[i].cells[5].innerHTML);
                        rhizVals[i-1] = parseFloat(t.rows[i].cells[6].innerHTML);
                    }
                    let datasets =  [
                        {
                            label: "Beneficial Micr.",
                            backgroundColor: "#3FEF23",
                            data: benVals
                        },
                        {
                            label: "Phytophtora",
                            backgroundColor: "#29F5DD",
                            data: phytoVals
                        },
                        {
                            label: "Fusarium",
                            backgroundColor: "#A412D8",
                            data: fusarVals
                        },
                        {
                            label: "Verticillium",
                            backgroundColor: "#CDBD2B",
                            data: vertiVals
                        },
                        {
                            label: "Phytium",
                            backgroundColor: "#6D7513",
                            data: phytiVals
                        },
                        {
                            label: "Rhizoctonga",
                            backgroundColor: "#ED4F4F",
                            data: rhizVals
                        }
                    ];
                    let min  = 0;
                    let max = 100;
                    displayChart(datasets,min,max);
                    break;
                }
                case "slnty": {
                    let salinity = [];

                    let sz = t.rows.length;
                    for (let i = 1; i < sz; i++) {
                        salinity[i-1] = parseFloat(t.rows[i].cells[1].innerHTML);
                    }
                    let datasets =  [
                        {
                            label: "Salinity",
                            backgroundColor: "rgb(105,105,105)",
                            barThickness: 5,
                            data: salinity
                        }
                    ];
                    let min = 0;
                    let max = 800;
                    displayChart(datasets,min,max);
                    break;
                }
                case "wther": {
                    let tempVals = [],
                        humidVals = [];

                    let sz = t.rows.length;
                    for (let i = 1; i < sz; i++) {
                        tempVals[i-1] = parseFloat(t.rows[i].cells[1].innerHTML);
                        humidVals[i-1] = parseFloat(t.rows[i].cells[2].innerHTML);
                    }
                    let datasets =  [
                        {
                            label: "Temperature",
                            backgroundColor: "#949EF8",
                            barThickness: 5,
                            data: tempVals
                        },
                        {
                            label: "Humidity",
                            backgroundColor: "#cce67e",
                            barThickness: 5,
                            data: humidVals
                        }
                    ];
                    let min = 0, max = 100;
                    displayChart(datasets,min,max);
                    break;
                }
                case "stts": {
                    let cartofVals = [],
                        flSrVals = [],
                        grauVals = [],
                        orzVals = [],
                        porumbVals = [];
                    let sz = t.rows.length;
                    for (let i = 1; i < sz; i++) {
                        cartofVals[i-1] = parseFloat(t.rows[i].cells[1].innerHTML);
                        flSrVals[i-1] = parseFloat(t.rows[i].cells[2].innerHTML);
                        grauVals[i-1] = parseFloat(t.rows[i].cells[3].innerHTML);
                        orzVals[i-1] = parseFloat(t.rows[i].cells[4].innerHTML);
                        porumbVals[i-1] = parseFloat(t.rows[i].cells[5].innerHTML);
                    }
                    let datasets =  [
                        {
                            label: "Cartofi",
                            backgroundColor: "#d36e10",
                            data: cartofVals
                        },
                        {
                            label: "Floarea Soarelui",
                            backgroundColor: "#1b130c",
                            data: flSrVals
                        },
                        {
                            label: "Grau",
                            backgroundColor: "#86674b",
                            data: grauVals
                        },
                        {
                            label: "Orz",
                            backgroundColor: "#5ac429",
                            data: orzVals
                        },
                        {
                            label: "Porumb",
                            backgroundColor: "#db6b90",
                            data: porumbVals
                        }
                    ];
                    let min = 0,max = 500;
                    displayChart(datasets,min,max);
                    break;
                }
            }

        }
    }
    function handleClick(evt)  {
        if (evt.currentTarget.id === 'nutrients'){
            contentEl.load('nutrients.html',() => {

                const url = "http://localhost/reports/1";
                addData(url,'#nutr',showMicroNutrientLayer,medNutrPerPart);
            });
            currentTbl="nutrients.html";
            currentTblId = "#nutr";
            currentShLayer = showMicroNutrientLayer;
            currentmedArr = medNutrPerPart;
        }
        if (evt.currentTarget.id === 'microOrg') {
            contentEl.load("microOrganism.html",() => {
                const url = "http://localhost/reports/2";
                addData(url,'#mcrOrg',showMicrOrgLayer,medMicrOrgPerPart);
            });
            currentTbl="microOrganism.html";
            currentTblId = "#mcrOrg";
            currentShLayer = showMicrOrgLayer;
            currentmedArr = medMicrOrgPerPart;
            
        }
        if (evt.currentTarget.id === 'salinity'){
            contentEl.load("salinity.html",() => {
                // const url1 = "http://localhost/sensor/2/limit/0,800";
                // const http = new XMLHttpRequest();
                // http.open("GET",url1);
                // http.send();
                

                const url2 = "http://localhost/reports/3";
                addData(url2,'#slnty',showSalinityLayer,medSalntyPerPart);
            });
            currentTbl="salinity.html";
            currentTblId = "#slnty";

            currentShLayer = showSalinityLayer;
            currentmedArr = medSalntyPerPart;
        }
        if (evt.currentTarget.id === "th") {
            contentEl.load("weather.html",() => {
                // const url1 = "http://localhost/sensor/2/limit/-20,50";
                const url2 = "http://localhost/reports/4";
                addData(url2,'#wther',showWTempLayer,medTempPerPart);

                // const http = new XMLHttpRequest();
                // http.open("GET",url1);
                // http.send();
                
            });
            currentTbl="weather.html";
            currentTblId = "#wther";
            currentShLayer = showWTempLayer;
            currentmedArr = medTempPerPart;

        }
        if (evt.currentTarget.id === "stats") {
            contentEl.load("statistics.html",() => {
                const url = "http://localhost/reports/5";
                addData(url,'#stts',showStatsLayer,medStatsPerPart);
                
            });
            currentTbl="statistics.html";
            currentTblId = "#stts";
            currentShLayer = showStatsLayer;
            currentmedArr = medStatsPerPart;
        }
        if (evt.currentTarget.id === "reports") {
            contentEl.html("");
            
        }
        
    }

    let chartViewOn = false;
    $(".navigator .locations").click((evt) => {
        let txt = $(".filters span").text();
       if ( txt !== 'FILTERS' && txt !== "Incidents" ) {
            if(chartViewOn) {
                contentEl.load(currentTbl,() => {
                    let url;
                    if (currentTbl === "nutrients.html")
                        url = "http://localhost/reports/1"
                    if (currentTbl === "microOrganism.html")
                        url = "http://localhost/reports/2";
                    if (currentTbl === "salinity.html")
                        url = "http://localhost/reports/3"
                    if (currentTbl === "weather.html")
                        url = "http://localhost/reports/4";
                    if (currentTbl === "statistics.html")
                        url = "http://localhost/reports/5";
                    addData(url,currentTblId,currentShLayer,currentmedArr);
                });
                chartViewOn = false;
            }
        }
    })
    $(".navigator .charts").click((evt) => {
        if ($(".filters span").text() !== 'FILTERS') {
            contentEl.html("");
            chartViewOn = true;
        }
    })


    function shuffle(array) {
        array.sort(() => Math.random() - 0.5);
    }
    // $("#content").load("salinity.html");


    function addData(url,tblId,func,medArr) {
        let nrJudete = 10;
        let data = null;
        const http = new XMLHttpRequest();
        http.open("GET",url);
        http.send();

        http.onreadystatechange = (e) => {


            if (http.readyState == 4 && http.status == 200) {
                data = JSON.parse(http.responseText);
                let sz = data.length;
                for (let i = 0; i < nrJudete; i++) {
                    judet[i] = data.filter((elem) => {
                        return elem.judet_index == i;
                    },i);
                    // judet[i].sort((a,b) => {
                    //     return a.point_index - b.point_index;
                    // }); // sortez ascendent dupa point_index
                    shuffle(judet[i]);
                }
                func();
                let t  = document.querySelector(tblId);
                let d = t.getElementsByTagName("tr");
                for (let i  = 1; i < t.rows.length; i++) {
                    for (let j = 1; j < t.rows[i].cells.length; j++)
                    t.rows[i].cells[j].innerHTML = medArr[i-1][j-1];
                }
                showCharts(t);

            }
            else console.log('failed request');
            
        }
        
    }
    

});



