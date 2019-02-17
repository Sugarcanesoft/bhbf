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

window.onload = () => {
    document.getElementById("s00").style.display = "none";
    document.getElementById("s3").style.display = "none";
    document.getElementById("s5").style.display = "none";
    document.getElementById('logoimg').style.opacity = 1;
    anime({
        targets: '.fbtn',
        bottom: '25px',
        rotate: '720'
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

var refresh = x => {
    document.getElementById("field").innerHTML = "";
    db.collection("petition").orderBy("n").get().then(function(querySnapshot) {
        let _i = 0;
        const D = new Date().getTime();
        let akey = [];
        querySnapshot.forEach(function(doc) {
            let toShow = true;
            const Data = doc.data();
            const title = Data.title;
            const date1 = Data.time1.toDate();
            const date2 = Data.time2.toDate();
            
            if (x != "") {
                const key = title.toUpperCase().split(x);
                if (title.toUpperCase() == key[0]) toShow = false;
            }

            if (toShow) {
                _i++;
                let t = "";
                if (D > date2.getTime()) {
                    t = '청원 종료됨';
                } else {
                    t = date1.getFullYear() + ". " + (date1.getMonth() + 1) + ". " + date2.getDate() + " ~ " + date2.getFullYear() + ". " + (date2.getMonth() + 1) + ". " + date2.getDate();
                }
                let s = "";
                s += "<div class='mdl-cell mdl-cell--4-col mdl-cell--4-col-phone'><div class='card' onclick='info(" + doc.id + ")'><div>";
                s += "<h2 class='c_0'><b class='c__" + doc.id + "'>0</b><span class='c_0_0'>명 참여중</span></h2></div><hr style='margin:0px;' /><div>";
                s += "<h4 class='c_1'>" + title + "</h4>";
                s += "<span class='mdl-chip'><span class='mdl-chip__text'>" + Data.category + "</span></span>";
                s += "<span class='mdl-chip c_2'><span class='mdl-chip__text'>" + t + "</span></span></div></div></div>";
                s += ""
                document.getElementById("field").innerHTML += s;
                akey.push(['.c__' + doc.id, Data.n]);                
            }
        });
        if (_i == 0) {
            let s = "";
            s += "<div class='mdl-cell mdl-cell--4-col mdl-cell--4-col-phone'><div class='card'><div>";
            s += "<h4 class='c_1'>검색 결과가 없습니다</h4></div></div></div>";
            document.getElementById("field").innerHTML = s;
        }
        for (let i in akey) {
            anime({
                targets: akey[i][0],
                innerHTML: [0, akey[i][1]],
                easing: 'linear',
                color: '#1e88e5',
                duration: Math.floor(akey[i][1] / 50),
                round: 1
            })
        }
    });
}
refresh("");

var info = s => {
    location.href = "https://" + location.host + "/info?i=" + s;
}

var add = () => {
    let link = prompt("청원 링크를 입력해주세요.", "https://www1.president.go.kr/petitions/XXXXXX");
    link = link.split("?");
    link = link[0];
    link = link.split("/");
    link = link[link.length - 1];
    if (isNaN(link * 1) || link.length != 6) {
        alert("링크의 형식이 올바르지 않습니다");
    } else {
        db.collection("petition").doc(link).get().then(function(doc) {
            if (doc.exists) {
                const c = confirm("이미 존재하는 청원입니다. 해당 문서로 이동하시겠습니까?");
                if (c) info(link);
            } else {
                db.collection("req").doc(link).set({
                    id: link,
                    time: firebase.firestore.FieldValue.serverTimestamp()
                }).then(function() {
                    alert("성공적으로 접수되었습니다.");
                }).catch(function(error) {
                    console.error("Error writing document: ", error);
                });
            }
        }).catch(function(error) {
            console.log("Error getting document:", error);
        });
    }
}

var searchON = () => {
    document.getElementById('s1').style.display = "none";
    document.getElementById('s00').style.display = "block";
    document.getElementById('s2').style.display = "block";
    document.getElementById('s3').style.display = "block";
    document.getElementById('s5').style.display = "block";
    // document.getElementById('searchbox').classList.remove('mdl-shadow--2dp');
    document.getElementById('s4').focus();
}

var searchOFF = s => {
    document.getElementById('s1').style.display = "block";
    document.getElementById('s00').style.display = "none";
    document.getElementById('s2').style.display = "none";
    document.getElementById('s3').style.display = "none";
    document.getElementById('s5').style.display = "none";
    // document.getElementById('searchbox').classList.add('mdl-shadow--2dp');

    if (s != "__close") {
        if (s != "") {
            document.getElementById('s1').innerHTML = "'" + s + "' 검색 결과";
            refresh(s);        
        } else document.getElementById('s1').innerHTML = "청원 검색";
    }
}

var searchClear = () => {
    document.getElementById('s4').value = "";
    document.getElementById('s4').focus();
}

document.getElementById("s2").onkeyup = (e) => {
    if (e.keyCode == 13) {
        searchOFF(document.getElementById("s4").value);
    } else {
        event.preventDefault();
    }
}