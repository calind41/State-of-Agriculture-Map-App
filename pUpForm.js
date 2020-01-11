let modal = document.getElementById('modal-wrapper');
window.onclick = function(evt) {
  if(evt.target == modal) {
    modal.style.display="none";
  }
}

let openPopup = document.querySelector('#open-popup');
openPopup.onclick = () => {
  document.querySelector('#modal-wrapper').style.display = 'block';
}
document.querySelector('.close').onclick = () => {
  document.getElementById('modal-wrapper').style.display='none';
}

let submitReportBtn = document.querySelector('#submitRep');
submitReportBtn.addEventListener("click",handleSubmit);

function handleSubmit() {
  let desc,lat,long,address;
  desc = document.querySelector('#textArea').value;
  lat = document.querySelector('#lat').value;
  long  = document.querySelector('#long').value;
  address = document.querySelector('#address').value;

  console.log('called');

  console.log('desc ' + desc);
  console.log('address '+ address);
  console.log('lat ' + lat);
  console.log('long ' + long);

  let jsonObj = {
    "address": address,
    "description": desc,
    "lat": lat,
    "long": long,
    // "value": "value"
  }
  ////////
  const http = new XMLHttpRequest();
  const url = "http://localhost/incident";
  http.open("POST",url);
  http.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

  http.send(JSON.stringify(jsonObj));

        http.onreadystatechange = (e) => {


            if (http.readyState == 4 && http.status == 200) {
                
                console.log("done");
            }
            else console.log('failed request');
            
        }

        
  
  }

let delEvtsBtn = document.querySelector('.delEvts');
delEvtsBtn.addEventListener('click',handleFunc);

function handleFunc() {
  const url = "http://localhost/deleteincidents";
  const http2 = new XMLHttpRequest();
  http2.open("GET",url);
  http2.send();

  let data = null;

  http2.onreadystatechange = (e) => {


      if (http2.readyState == 4 && http2.status == 200) {
          
          console.log('deleted');
      }
      else console.log('failed request');
      
    }
}

