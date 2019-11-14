import axios from 'axios';

export const HTTP = axios.create({
  baseURL: ``,
  baseURL: `http://localhost:8181`,
    // baseURL: `http://172.16.100.72:8181`,
    // baseURL: `http://192.168.8.109:8181`,
//   baseURL: `http://192.168.8.198:8181`,
//   baseURL: `https://tessa.backpocket.site`,
  headers: {
    Authorization: 'Bearer {token}'
  }
})

export function checkRedirect(respData) {
    if (respData.Body !== null) {
        if (respData.Body.Redirect !== null && respData.Body.Redirect !== undefined && respData.Body.Redirect !== "") {
            window.location.href = '/#' + respData.Body.Redirect
        }
    }
}

export function checkPermissions() {
    HTTP.get('/api/permissions', {
        withCredentials: true
    }).then((response) => {
        checkRedirect(response.data)
    }).catch((e) => {
        if (window.location.hash !== "#/") {
            window.location.href = '/'
        }
    })
}

export function getDate() {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!
    var yyyy = today.getFullYear();

    if (dd < 10) {
        dd = '0' + dd
    }

    if (mm < 10) {
        mm = '0' + mm
    }

    today = dd + '/' + mm + '/' + yyyy;
    return today
}

export function dayofWeek() {
    var d = new Date();
    var weekday = new Array(7);
    weekday[0] = "Sunday";
    weekday[1] = "Monday";
    weekday[2] = "Tuesday";
    weekday[3] = "Wednesday";
    weekday[4] = "Thursday";
    weekday[5] = "Friday";
    weekday[6] = "Saturday";
    return weekday[d.getDay()]
}

export function dateTimeConvert(dateTime) {
    if (dateTime !== "") {
        dateTime = new Date(dateTime).toDateString() + ' ' + humanTime(new Date(dateTime.substring(0, 19)).toTimeString().substring(0, 8))
    }
    return dateTime
}

export function humanTime(time) {
    if (time == undefined) {
        return
    }

    time = time.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

    if (time.length > 1) { // If time format correct
        time = time.slice(1); // Remove full string match value
        time[5] = +time[0] < 12 ? ' AM' : ' PM'; // Set AM/PM
        time[0] = +time[0] % 12 || 12; // Adjust hours
    }
    return time.join(''); // return adjusted time or original
}

export function humanNumber(nStr) {
    nStr += '';
    var x = nStr.split('.');
    var x1 = x[0];
    var x2 = x.length > 1 ? ',' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + ',' + '$2');
    }
    return x1 + x2;
}

export function displayImage(event, app, field) {
    var reader = new FileReader();
    var selectedFile = event.target.files[0];
    event.target.value = '';
    reader.readAsDataURL(selectedFile);
    reader.onload = function () {
        if (selectedFile.size > 10240000) {
            app.notifications.push({
                Code: 0,
                Message: "Image File must be less than 10MB"
            })
        } else {
            switch (selectedFile.type) {
                case "image/gif":
                case "image/png":
                case "image/jpg":
                case "image/jpeg":
                    app.record[field] = reader.result;
                    break;

                default:
                    app.notifications.push({
                        Code: 0,
                        Message: "File Must be a valid Image"
                    })
                    break
            }
        }
    };
    reader.onerror = function (error) {
        app.notifications.push({
            Code: 0,
            Message: "Image Error:" + error
        })
    };
}


export function uploadFile(event, app, field) {
    var reader = new FileReader();
    var selectedFile = event.target.files[0];
    event.target.value = '';
    reader.readAsDataURL(selectedFile);
    reader.onload = function () {
        if (selectedFile.size > 10240000) {
            app.notifications.push({
                Code: 0,
                Message: "File must be less than 10MB"
            })
        } else {
            switch (selectedFile.type) {
                case "text/csv":
                case "application/csv":
                case "application/json":
                    app.record[field] = reader.result;
                    break;

                default:
                    app.notifications.push({
                        Code: 0,
                        Message: "File Must be a JSON or CSV"
                    })
                    break
            }
        }
    };
    reader.onerror = function (error) {
        app.notifications.push({
            Code: 0,
            Message: "Image Error:" + error
        })
    };
}

export function uploadZip(event, app, field) {
    var reader = new FileReader();
    var selectedFile = event.target.files[0];
    event.target.value = '';
    reader.readAsDataURL(selectedFile);
    reader.onload = function () {
        if (selectedFile.size > 10240000) {
            app.notifications.push({
                Code: 0,
                Message: "File must be less than 10MB"
            })
        } else {
            switch (selectedFile.type) {

                case "multipart/x-zip":
                case "application/zip":
                case "application/octet-stream":
                case "application/x-zip-compressed":
                    app.record[field] = reader.result;
                    break;

                default:
                    app.notifications.push({
                        Code: 0,
                        Message: "File Must be a ZIP File"
                    })
                    break
            }
        }
    };
    reader.onerror = function (error) {
        app.notifications.push({
            Code: 0,
            Message: "File Upload Error:" + error
        })
    };
}

export function uploadDocument(event, app) {
    var reader = new FileReader();
    var selectedFile = event.target.files[0];
    event.target.value = '';
    reader.readAsDataURL(selectedFile);
    reader.onload = function () {
        if (selectedFile.size > 10240000) {
            app.notifications.push({
                Code: 0,
                Message: "Document must be less than 10MB"
            })
        } else {
            app.record.Filepath = reader.result;
            app.record.Filesize = selectedFile.size;
            app.record.Filename = selectedFile.name;
            app.record.Filetype = selectedFile.type;
            console.log(app.record)
        }
    };
    reader.onerror = function (error) {
        app.notifications.push({
            Code: 0,
            Message: "Document Error:" + error
        })
    };
}
