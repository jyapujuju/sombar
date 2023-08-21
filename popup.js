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
// todayToBS()



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
    // return new Date(new Date() - this.day * 24 * 60 * 60 * 1000).getDay()// 0:sunday 6:saturday
    return (new Date(new Date() - this.day * 24 * 60 * 60 * 1000).getDay() + 1) % 7 + 1// 0:sunday 6:saturday
  }

  get weekWord() {
    return week[this.firstBar()]
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
    return new Date(new Date() - ad * 24 * 60 * 60 * 1000)
  }
  get date() {
    return this.adFull().getDate()
  }
  get month() {
    return this.adFull().toLocaleString('default', { month: 'short' })
  }
}


function domFill(today, firstBar, lastday, id) {
  var offsetDate = 0;
  let adDate = 0;
  let smallAD = ""
  let adClass = "active"
  var limit = parseInt(firstBar) + parseInt(lastday); // loop start from 0;
  for (let i = 1; i <= 7; i++) {
    if (i == firstBar) {
      for (let j = firstBar; j < limit; j++) {
        //AD
        adDate = new ADvalues(firstBar, today, j)
        adClass = adDate.date == 1 ? "redDate" : null
        smallAD = adDate.date == 1 ? adDate.month : adDate.date
        var node = document.createElement("SMALL");
        var textnode = document.createTextNode(smallAD);
        node.appendChild(textnode);
        node.classList.add(adClass)
        activeDate = parseInt(today) + parseInt(firstBar) - 1
        //!AD

        document.querySelector("#date-" + j).textContent = nepaliNum(j - firstBar + 1)
        document.querySelector("#date-" + j).appendChild(node); // for AD
        if (j == activeDate) {
          document.querySelector("#date-" + j).classList.add("active")
        }
        if (adDate.date == 1 && offsetDate == activeDate) {
          document.querySelector("small.redDate").classList.add("active")
        }
      }
    }
  }
}


function domFillDiffrentMonth(firstBar, lastday) {
  document.querySelector("#printer").innerHTML = firstBar
  document.querySelector("#header").innerHTML = lastday

  for (let j = 1; j <= 42; j++) {
    document.querySelector("#date-" + j).innerHTML = ""
  }
  document.querySelector(".active").classList.remove("active")
  for (let i = 1; i <= 7; i++) {
    if (i == firstBar) {
      for (let j = firstBar; j <= parseInt(lastday) + firstBar; j++) {
        document.querySelector("#date-" + j).innerHTML = `${nepaliNum(j - firstBar + 1)}<small class=""></small>`
      }
    }
  }
  document.getElementById("next").remove()
  document.getElementById("prev").remove()

}


document.addEventListener('DOMContentLoaded', function () {
  var prevlink = document.getElementById('prev');
  var nextlink = document.getElementById('next');
  prevlink.addEventListener('click', function () {
    prevMonthDaysDiffCount = daysDiffCount - today - 1
    let barx = new bikram(todayToBS(prevMonthDaysDiffCount))
    let lastdayCurrentx = barx.monthLastDay
    barx.printMonth()
    barx.printYear()
    x = new Date()
    sumdays = parseInt(today) + parseInt(lastdayCurrentx) - 1
    x.setDate(x.getDate() - sumdays)
    aMonthEarlierDateBar = x.getDay() + 1
    domFillDiffrentMonth(aMonthEarlierDateBar, lastdayCurrentx - 1)
  });
  // onClick's logic below:
  nextlink.addEventListener('click', function () {
    nextMonthDaysDiffCount = daysDiffCount + (lastdayCurrent - (today - bar.firstBar)) + 1
    let barx = new bikram(todayToBS(nextMonthDaysDiffCount))
    let firstBarCurrentx = barx.firstBar
    let lastdayCurrentx = barx.monthLastDay
    let todayx = barx.todayInNumber
    barx.printMonth()
    barx.printYear()
    x = new Date()
    sumdays = parseInt(lastdayCurrentx) - parseInt(barx.todayInNumber) - 1
    x.setDate(x.getDate() + sumdays)
    aMonthEarlierDateBar = x.getDay()
    // document.querySelector("#printer").innerHTML =aMonthEarlierDateBar
    // document.querySelector("#header").innerHTML = lastday
    domFillDiffrentMonth(aMonthEarlierDateBar, lastdayCurrentx)
  });
});


let daysDiffCount = daysDiff(new Date().toLocaleDateString())
let bar = new bikram(todayToBS(daysDiffCount))
// let bar = new bikram('2078-1-1')
let firstBarCurrent = bar.firstBar
let lastdayCurrent = bar.monthLastDay
let today = bar.todayInNumber
bar.printMonth()
bar.printYear()

domFill(today, firstBarCurrent, lastdayCurrent, "dateHolder")
