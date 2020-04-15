var dateObj = (function() {

  function month(num) {
    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    return months[num];
  }

  function day(num) {
    var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    return days[num];
  }

  function _getDate() {
    var today = new Date(),
      date = {};

    date = {
      date: today.getDate(),
      day: day(today.getDay()), 
      month: month(today.getMonth()),
      year: today.getFullYear()
    };

    return date;
  }

  return _getDate;

}());

var timeObj = (function() {
  var time = {};

  function _getTime() {
    var _time = new Date(),
      hours = _time.getHours(),
      minutes = _time.getMinutes(),
      seconds = _time.getSeconds();

    time = {
      hour: hours === 0 ? hours = 12 : (hours > 12 ? hours - 12 : hours),
      mins: minutes < 10 ? "0" + minutes : minutes,
      period: hours >= 12 ? "PM" : "AM",
      secs: seconds < 10 ? "0" + seconds : seconds
    };
    
    return time;
  }

  return _getTime;
}());

var setDateTime = (function() {
  var elm_clock = document.querySelector('#clock p'),
    elm_date = document.querySelector('#date p');

  var defaults = {
    dateMsg: "%dateDay, %dateMonth %dateDate, %dateYear",
    timeMsg: "%timeHour<span>:</span>%timeMinutes %timePeriod"
  };

  function _setTime() {
    var msg = defaults.timeMsg
      .replace('%timeHour', timeObj().hour)
      .replace('%timeMinutes', timeObj().mins)
      .replace('%timePeriod', timeObj().period);
    elm_clock.innerHTML = msg;
  }

  function _setDate() {
    var msg = defaults.dateMsg
      .replace('%dateDay', dateObj().day)
      .replace('%dateMonth', dateObj().month)
      .replace('%dateDate', dateObj().date)
      .replace('%dateYear', dateObj().year);

    elm_date.innerHTML = msg;
  }

  _setTime();
  _setDate();

  setInterval(function() {
    _setDate();
    _setTime();
  }, 1000);
}());

var cycleBG = (function() {
  var progressBar = document.querySelector('#bgProgress'),
    duration = 15000,
    bgImages = document.querySelectorAll('#images .image'),
    i = 0,
    x = 0;
  
  console.log(bgImages);

  function changeBg() {
    // if i >= bgImages.length -1
    (i >= bgImages.length - 1) ? i = 0: i++;
    //change bg image
    bgImages.forEach(function(img, index){
      img.classList.remove('active');
      if(index === i) { img.classList.add('active') }
    })
  }

  changeBg();

  setInterval(function() {
    // if x === 100
    x === 100 ? (x = 0, changeBg() ) : x++;
    //progressBar width = x
    progressBar.style.width = x + '%';
  }, (duration / 100));
}());

var weatherWidget = (function() {
  var cont = document.querySelector('#weather');
  var apiCall = {
    id: "d65a9694ae6425d1e080326aab19db69",
    unit: "imperial",
    coor: {
      lat: 32.715736,
      lon: -117.161087
    }
  };

  function renderWeather(data) {
    var html = "<p>";
    html += Math.floor(data.main.temp);
    html += apiCall.unit === "imperial" ? "&#8457;" : "&#8451;";
    html += " <i class='wi wi-fw wi-owm-";
    html += timeObj().period === "PM" ? "night-" : "day-";
    html += data.weather[0].id + "'></i> ";
    html += data.weather[0].description;
    html += "</p>";

    cont.innerHTML = html;
  }

  var apiURL = "https://api.openweathermap.org/data/2.5/weather?APPID=" + apiCall.id + "&units=" + apiCall.unit + "&lat=" + apiCall.coor.lat + "&lon=" + apiCall.coor.lon;

  var http = new XMLHttpRequest();

  http.onreadystatechange = function() {
    if (http.readyState == 4 && http.status == 200) {
      var data = JSON.parse(http.responseText);
      renderWeather(data);
    }
  };
  http.open("GET", apiURL, true);
  http.send();

}());