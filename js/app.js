// scanVaccineByPin returns bool if it found vaccine
function scanVaccineByPin(pincode, date) {       //date = dd-mm-yyyy
    let url = `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin?pincode=${pincode}&date=${date}`
    let r = new XMLHttpRequest();
    r.open('GET', url);
    r.responseType = 'json';
    r.send();
    r.onload = function () {
        const vaccData = r.response;
        for (var i = 0; i < vaccData.sessions.length; i++) {
            var session = vaccData.sessions[i];
            if (session.fee_type == 'Free') {
                window.open('https://selfregistration.cowin.gov.in/');
                return false
            }
            else {
                return true
            }
        }
    }
}




function startCowinTracker(i) {
    let p = document.getElementById(`pincode${i}`);
    let d = document.getElementById(`cowinDate${i}`); //yyyy-mm-dd
    let killSwitch = document.getElementById(`killSwitch${i}`)
    let pincode = p.value;
    let date = d.value;
    let dd = date.slice(8, 10);
    let mm = date.slice(5, 7);
    let yyyy = date.slice(0, 4);
    date = dd + '-' + mm + '-' + yyyy; // date = dd-mm-yyyy now

    console.log(pincode);
    console.log(date);
    // let killer = true;
    // do {
    //     setTimeout(() => { console.log('trial'); killer = scanVaccineByPin(pincode, date) }, 3000);
    // } while (killer)
}
function setupCowinCard(i) {
    // let mainArea = document.getElementById('mainArea');
    // let elem = document.createElement('div');
    document.getElementById(`card${i}`).innerHTML = `<div class="cowinh3">
    <h3>Cowin Tracker</h3><br>
<div class="pincode" id="">
    <label for="">Enter pincode - </label>
    <input type="text" id="pincode${i}" class="pincodeAccept" maxlength="6">
    <button id="setPicode">Set</button>
</div><br>
<div class="date1">
    <label>Select Date - </label>
    <input type="date" id="cowinDate${i}">
</div><br>
<div class="searchBtnCowin">
    <button class="newBtn" id="cowinTrackBtn${i}" onclick="startCowinTracker(${i});">Track</button>

</div>
<br><br></div>`;
    // document.querySelector(`div#cowinCard${i}`).appendChild(elem);  cowinTrackBtn9
}
function createNewCard() {
    if (localStorage.getItem('cardSerial') === null) {//new
        localStorage.setItem('cardSerial', '0')//new
    }//new
    let elem = document.createElement('div');
    elem.setAttribute('class', 'cardLayout');
    let i = parseInt(localStorage.getItem('cardSerial'));
    elem.setAttribute(`id`, `card${i}`);      // new
    document.querySelector('div.playground').appendChild(elem);
    // new

    if (document.getElementById('userCardOption').value === 'cowinTracker') {
        setupCowinCard(i);
    }// add other invokes in elif
    i = i + 1;
    localStorage.setItem('cardSerial', i)//new

}














// -------------Event Listeners----------------------------------------
document.getElementById('newCardBtn').addEventListener('click', function () {
    let btnId = this.id;
    createNewCard(btnId);
});

// document.getElementById().addEventListener('click', function () {
//     let idSerial = (this.id);
//     idSerial = idSerial.slice(13, 14);
//     console.log(idSerial);
// });