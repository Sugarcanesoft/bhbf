var config = {
    apiKey: "AIzaSyDvDkTOhjgUs6OcoWpnFIMc2sTpgdnajpI",
    authDomain: "scs-bhbf.firebaseapp.com",
    databaseURL: "https://scs-bhbf.firebaseio.com",
    projectId: "scs-bhbf",
    storageBucket: "scs-bhbf.appspot.com",
    messagingSenderId: "762980968129"
};
firebase.initializeApp(config);

var db = firebase.firestore();

var getQ = (name, url) => {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}
const _doc = getQ("i");

if (!_doc) {
    location.pathname = "/404";
} else {
    db.collection("petition").doc(_doc).get().then(doc => {
        const Data = doc.data();
        const date1 = Data.time1.toDate();
        const date2 = Data.time2.toDate();
        const D = new Date().getTime();
        let t = "";
        if (D > date2.getTime()) {
            t = '청원 종료됨';
        } else {
            t = date1.getFullYear() + ". " + (date1.getMonth() + 1) + ". " + date2.getDate() + " ~ " + date2.getFullYear() + ". " + (date2.getMonth() + 1) + ". " + date2.getDate();
        }
        document.getElementById("title").innerHTML = Data.title;
        document.getElementById("category").innerHTML = Data.category;
        document.getElementById("time").innerHTML = t;
        document.getElementById("url").addEventListener("click", () => {
            location.href = Data.url;
        })
    })

    db.collection("petition").doc(_doc).collection("participant").get().then(querySnapshot => {
        let _data = [];
        let _labels = [];
        let _n = 0;
        querySnapshot.forEach(doc => {
            _n++;
            const Data = doc.data();
            _labels.push(Data.time.toDate().toDateString())
            let n = "" + Data.n.replace(/,/gi,'');
            _data.push(n * 1);
        });
        // document.getElementById('chartin').style.width = _n * 10 + "px";
        const ctx = document.getElementById('chart').getContext('2d');
        var chart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: _labels,
                datasets: [{
                    label: "청원 참여자 수",
                    backgroundColor: '#66bb6a',
                    borderColor: '#4caf50',
                    data: _data,
                }]
            },

            // Configuration options go here
            options: {}
        });
    });
}

document.getElementById('main').onscroll = function() {
    let x = document.getElementById('main').scrollTop;
    if (x <= 100) {
        document.getElementsByClassName("mdl-layout__drawer-button")[0].style.display = "block";
        document.getElementsByClassName("mdl-layout__drawer-button")[0].style.opacity = Math.round(100 * (100 - x) / 100) / 100;
    } else {
        document.getElementsByClassName("mdl-layout__drawer-button")[0].style.opacity = 0;
        document.getElementsByClassName("mdl-layout__drawer-button")[0].style.display = "none";
    }
}