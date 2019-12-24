
let locations  = document.querySelector('.navigator .locations');
let charts = document.querySelector('.navigator .charts');

locations.addEventListener("click",handleClick);
charts.addEventListener("click",handleClick);

function handleClick(evt) {
    if (evt.currentTarget.classList.contains("locations")) {
        charts.style.color = 'black';
        charts.style.fontWeight="normal";
        locations.style.fontWeight = "bold";
        locations.style.color = '#419ADA';
    }


    if (evt.currentTarget.classList.contains("charts")) {
        locations.style.color = 'black';
        locations.style.fontWeight = "normal";
        charts.style.color = '#419ADA';
        charts.style.fontWeight = "bold";
    }

}

// let long = Number(item.slice(10,16));
// let lat = Number(item.slice(17,23));

// return [long,lat];
