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
                return true
            }
            else {
                return false
            }
        }
    }
}

