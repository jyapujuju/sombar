week = {
  0: 'आइतबार',
  1: 'सोमबार',
  2: 'मंगलबार',
  3: 'बुधबार',
  4: 'बिहिबार',
  5: 'शुक्रबार',
  6: 'शनिबार'
}

months = {
  1: ' बैशाख',
  2: 'जेष्ठ',
  3: 'आषाढ',
  4: 'श्रावण',
  5: 'भाद्र',
  6: 'आश्विन',
  7: 'कार्तिक',
  8: 'मंसिर',
  9: 'पौष',
  10: 'माघ',
  11: 'फाल्गुन',
  12: 'चैत्र'
},
  nums = {
    0: '०',
    1: '१',
    2: '२',
    3: '३',
    4: '४',
    5: '५',
    6: '६',
    7: '७',
    8: '८',
    9: '९'
  },

  calendar_data = {
    '2078': [31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30, 365],
    '2079': [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30, 365],
    '2080': [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30, 365],
    '2081': [31, 31, 32, 32, 31, 30, 30, 30, 29, 30, 30, 30, 366],
    '2082': [30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 30, 30, 365],
    '2083': [31, 31, 32, 31, 31, 30, 30, 30, 29, 30, 30, 30, 365],
    '2084': [31, 31, 32, 31, 31, 30, 30, 30, 29, 30, 30, 30, 365],
    '2085': [31, 32, 31, 32, 30, 31, 30, 30, 29, 30, 30, 30, 366],
    '2086': [30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 30, 30, 365],
    '2087': [31, 31, 32, 31, 31, 31, 30, 30, 29, 30, 30, 30, 366],
    '2088': [30, 31, 32, 32, 30, 31, 30, 30, 29, 30, 30, 30, 365],
    '2089': [30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 30, 30, 365],
    '2090': [30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 30, 30, 365],
    '2091': [31, 31, 32, 31, 31, 31, 30, 30, 29, 30, 30, 30, 366],
    '2092': [31, 31, 32, 32, 31, 30, 30, 30, 29, 30, 30, 30, 366]
  }

function daysDiff(calendarDate) {
  var then = new Date("4-14-2021")
  var now = new Date(calendarDate);               // no arguments -> current date
  return Math.round((now - then) / (1000 * 60 * 60 * 24));
}

function calendarSlider(days) {
  let days_counter = days + 1;
  for (let i in calendar_data) {
    if (days_counter > calendar_data[i][12]) {
      days_counter = days_counter - calendar_data[i][12]
      continue
    }
    for (let j = 0; j <= 12; j++) {
      if (days_counter > calendar_data[i][j]) {
        days_counter -= calendar_data[i][j];
      }
      else {
        let calendarText = `${i}-${j + 1}-${days_counter}`
        return calendarText
      }
    }
  }
}

function bsSlider(daysInBS) {
  bsday = daysInBS.split("-")[0];
  bsmonth = daysInBS.split("-")[1];
  bsyear = daysInBS.split("-")[2];
  daysCounter = 0;
  // add previous years
  for (var i = 0; i < Object.keys(calendar_data).indexOf(bsyear); i++) {
    daysCounter = daysCounter + Object.values(calendar_data)[i][12];
  }
  // add previous months

  for (var j = 1; j < bsmonth; j++) {
    daysCounter = daysCounter + calendar_data[bsyear][j - 1];
  }

  // add current datr
  return daysCounter + parseInt(bsday) - 1
}



function todayToBS(days) {
  // let days = daysDiff(currentDay)
  let geoDate = calendarSlider(days)
  // let geoDate = calendarSlider(500)
  return geoTObs(geoDate)
}

function geoTObs(bsdate) {
  if (bsdate.length) {
    let month = bsdate.split("-")[1]
    let year = bsdate.split("-")[0]
    let today = bsdate.split("-")[2]
    // let bsYear = year.split("").map(x => nums[x]).join("")
    // let bsMonth = months[month]
    // document.getElementById("dateHolder").innerHTML = ` ${bsMonth} ${bsYear}`;

    // return ` ${bsMonth} ${bsYear}`
    return `${year}-${month}-${today}`
  }
  return "माफ गर्नुहोस अक्षर बुझिएन "
}

function currentDayinAD(daysDifference) {
  let x = new Date("4-14-2021")
  let y = x.setDate(x.getDate() + daysDifference);
  return new Date(y);
}



class bikram {
  constructor (bsFullYear) {
    this.day = bsFullYear.split("-")[2];
    this.month = bsFullYear.split("-")[1];
    this.year = bsFullYear.split("-")[0];
  }

  get todayInNumber() {
    return this.day;
  }

  get daysDiffCount() {
    return daysDiff(new Date().toLocaleDateString());
  }

  get currentMonthNumber() {
    return this.month;
  }

  get fullYear() {
    return this.day + " " + this.month + " " + this.year;
  }

  get monthLastDay() {
    return calendar_data[this.year][this.month - 1];
  }

  get adfulldate() {
    return calendar_data[this.year][this.month] - 1;
  }

  get firstBar() {
    let x = new Date()
    let y = x.setDate(x.getDate() - this.day + 1);
    return new Date(y).getDay();
    // return new Date(new Date() - this.day * 24 * 60 * 60 * 1000).getDay()// 0:sunday 6:saturday
    // return (new Date(new Date() - this.day * 24 * 60 * 60 * 1000).getDay() + 1) % 7 + 1// 0:sunday 6:saturday
  }

  get firstMonthName() {
    let x = new Date()
    let y = x.setDate(x.getDate() - this.day + 1);
    return new Date(y).getDate() == 1 ? y.toLocaleString('default', { month: 'short' }) : new Date(y).getDate();
  }

  get weekWord() {
    return week[this.firstBar]
  }

  printMonth() {
    document.getElementById("month").innerHTML = months[this.month]
  }
  printYear() {
    document.getElementById("year").innerHTML = this.year.toString().split("").map(x => nums[x]).join("")
  }
}

function nepaliNum(number) {
  return number.toString().split("").map(x => nums[x]).join("")
}

class ADvalues {
  constructor (firstbar, difference, incr) {
    this.firstbar = firstbar,
      this.difference = difference,
      this.incr = incr
  }
  adFull() {
    let ad = this.difference - this.incr + this.firstbar - 1; // - 1 because it starts from 0 which excludes first day
    var x = new Date(new Date() - ad * 24 * 60 * 60 * 1000)
    return x
  }
  get date() {
    return this.adFull().getDate()
  }
  get month() {
    return this.adFull().toLocaleString('default', { month: 'short' })
  }
}

function highlightToday(indexIdForDateInDiv, highlightToday) {
  if (highlightToday) {
    document.querySelector("#date-" + indexIdForDateInDiv).classList.add("active")
  }
}
function highlightAD(indexIdForDateInDiv) {
  document.querySelector("#date-" + indexIdForDateInDiv).getElementsByTagName('small')[0].classList.add('redDate')
}

function bsToAD(adDate) {
  adDate = new Date(adDate);
  return adDate.getDate() == 1 ? adDate.toLocaleString('default', { month: 'short' }) : adDate.getDate()
}



function domFill(today, firstBar, lastday, highlightTodayStatus, bsDate) {
  var bsYear = bsDate.split(" ")[2]
  var bsMonth = bsDate.split(" ")[1]


  for (let i = 0; i <= 7; i++) {
    if (i == firstBar) {
      for (let j = 0; j < lastday; j++) {
        // let daysDiffCount = daysDiff(new Date().toLocaleDateString())
        // let bar = new bikram(todayToBS(daysDiffCount))

        var bsFullYear = `${j + 1}-${bsMonth}-${bsYear}`;


        // console.log("year inside the brain", bsFullYear)
        var daysDiffFromBS = bsSlider(bsFullYear);
        var adDateFromBSdiff = currentDayinAD(daysDiffFromBS);
        var indexIdForDateInDiv = j + firstBar;
        document.querySelector("#date-" + indexIdForDateInDiv).getElementsByTagName('span')[0].textContent = nepaliNum(j + 1)
        document.querySelector("#date-" + indexIdForDateInDiv).getElementsByTagName('small')[0].textContent = bsToAD(adDateFromBSdiff)
        if (indexIdForDateInDiv == today) {
          highlightToday(indexIdForDateInDiv + firstBar - 1, highlightTodayStatus)
        }
        if (typeof (bsToAD(j + 1, firstBar)) === 'string') {
          highlightAD(indexIdForDateInDiv)
        }
      }
    }
  }
}





document.addEventListener('DOMContentLoaded', function () {
  let daysDurationFromMarker = daysDiff(new Date().toLocaleDateString())

  var prevlink = document.getElementById('prev');
  var nextlink = document.getElementById('next');
  // 
  nextlink.addEventListener('click', function () {
    checkToady = new bikram(todayToBS(daysDurationFromMarker))
    m = checkToady.monthLastDay
    n = checkToady.todayInNumber
    daysDurationFromMarker = daysDurationFromMarker + m - n + 1;
    let bar = new bikram(todayToBS(daysDurationFromMarker))
    elements = document.querySelectorAll(".date")
    elements.forEach(element => {
      element.getElementsByTagName('span')[0].textContent = ''; // Replace 'New Text' with the desired text
    });
    elements.forEach(element => {
      element.getElementsByTagName('small')[0].textContent = ''; // Replace 'New Text' with the desired text
    });
    elements.forEach(element => {
      element.classList.remove("active") // Replace 'New Text' with the desired text
    });
    let lastdayCurrent = bar.monthLastDay
    let today = bar.todayInNumber
    let bsFullYear = bar.fullYear

    let z = new Date('4-14-2021')
    a = z.setDate(z.getDate() + daysDurationFromMarker - bar.todayInNumber + 1)
    firstBarCurrent = new Date(a).getDay()
    bar.printMonth()
    bar.printYear()
    domFill(today, firstBarCurrent, lastdayCurrent, false, bsFullYear)
  });

  prevlink.addEventListener('click', function () {
    checkToady = new bikram(todayToBS(daysDurationFromMarker))
    m = checkToady.monthLastDay
    n = checkToady.todayInNumber
    daysDurationFromMarker = daysDurationFromMarker - n - 1;
    let bar = new bikram(todayToBS(daysDurationFromMarker))
    elements = document.querySelectorAll(".date")
    elements.forEach(element => {
      element.getElementsByTagName('span')[0].textContent = ''; // Replace 'New Text' with the desired text
    });
    elements.forEach(element => {
      element.getElementsByTagName('small')[0].textContent = ''; // Replace 'New Text' with the desired text
    });
    elements.forEach(element => {
      element.classList.remove("active") // Replace 'New Text' with the desired text
    });
    let lastdayCurrent = bar.monthLastDay
    let today = bar.todayInNumber
    let bsFullYear = bar.fullYear

    let z = new Date('4-14-2021')

    a = z.setDate(z.getDate() + daysDurationFromMarker - bar.todayInNumber + 1)
    firstBarCurrent = new Date(a).getDay()
    bar.printMonth()
    bar.printYear()
    domFill(today, firstBarCurrent, lastdayCurrent, false, bsFullYear)
  });
});

let daysDiffCount = daysDiff(new Date().toLocaleDateString())
let bar = new bikram(todayToBS(daysDiffCount))
// //
// aja = 861
// x = 861
// let bar = new bikram(todayToBS(x))
// //
let firstBarCurrent = bar.firstBar
// 
// let z = new Date('4-14-2021')
// a = z.setDate(z.getDate() + x - bar.todayInNumber + 1)
// firstBarCurrent = new Date(a).getDay()
// 
let lastdayCurrent = bar.monthLastDay
let today = bar.todayInNumber
let bsFullYear = bar.fullYear
bar.printMonth()
bar.printYear()

domFill(today, firstBarCurrent, lastdayCurrent, true, bsFullYear)
