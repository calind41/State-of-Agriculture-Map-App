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
            contentEl.load('nutrients.html');
            currentTbl="nutrients.html";
        }
        if (evt.currentTarget.id === 'microOrg') {
            contentEl.load("microOrganism.html");
            currentTbl="microOrganism.html";
        }
        if (evt.currentTarget.id === 'salinity'){
            contentEl.load("salinity.html");
            currentTbl="salinity.html";
        }
        if (evt.currentTarget.id === "th") {
            contentEl.load("weather.html");
            currentTbl="weather.html";
        }
        if (evt.currentTarget.id === "stats") {
            contentEl.load("statistics.html");
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
    // $("#content").load("salinity.html");
});
