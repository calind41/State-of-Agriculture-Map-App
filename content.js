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

    function handleClick(evt)  {
        if (evt.currentTarget.id === 'nutrients')
            $("#content").load('nutrients.html');
        if (evt.currentTarget.id === 'microOrg')
            $("#content").load("microOrganism.html");
        if (evt.currentTarget.id === 'salinity')
            $("#content").load("salinity.html");
        if (evt.currentTarget.id === "th")
            $("#content").load("weather.html");
        if (evt.currentTarget.id === "stats")
            $("#content").load("statistics.html");
        
    
    }
    // $("#content").load("salinity.html");
});