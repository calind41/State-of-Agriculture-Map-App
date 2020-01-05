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
 let judet = [];
$(function() {

    let nutrients = document.querySelector('.layerList #nutrients');
    let microOrg = document.querySelector('.layerList #microOrg');
    let salinity = document.querySelector('.layerList #salinity');
    let th = document.querySelector('.layerList #th');
    let stats = document.querySelector('.layerList #stats');

    nutrients.addEventListener('click',handleClick);
    microOrg.addEventListener('click',handleClick);
    salinity.addEventListener('click',handleClick);
    th.addEventListener('click',handleClick);
    stats.addEventListener('click',handleClick);

    
    let currentTbl="";
    let contentEl = $("#content");
    function handleClick(evt)  {
        if (evt.currentTarget.id === 'nutrients'){
            contentEl.load('nutrients.html',() => {

                const url = "http://localhost/reports/1";
                addData(url,'#nutr',showMicroNutrientLayer,medNutrPerPart);
            });
            currentTbl="nutrients.html";
        }
        if (evt.currentTarget.id === 'microOrg') {
            contentEl.load("microOrganism.html",() => {
                const url = "http://localhost/reports/2";
                addData(url,'#mcrOrg',showMicrOrgLayer,medMicrOrgPerPart);
            });
            currentTbl="microOrganism.html";
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
        }
        if (evt.currentTarget.id === "stats") {
            contentEl.load("statistics.html",() => {
                const url = "http://localhost/reports/5";
                addData(url,'#stts',showStatsLayer,medStatsPerPart);
                
            });
            currentTbl="statistics.html";
        }
        
    }

    let chartViewOn = false;
    $(".navigator .locations").click((evt) => {
       if ($(".filters span").text() !== 'FILTERS') {
            if(chartViewOn) {
                contentEl.load(currentTbl);
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
            }
            else console.log('failed request');
            
        }
        
    }

});



