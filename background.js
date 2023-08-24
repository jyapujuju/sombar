months = {
  1 : ' बैशाख', 
  2 : 'जेष्ठ', 
  3 : 'आषाढ', 
  4 : 'श्रावण', 
  5 : 'भाद्र', 
  6 : 'आश्विन', 
  7 : 'कार्तिक', 
  8 : 'मंसिर', 
  9 : 'पौष', 
  10:'माघ', 
  11:'फाल्गुन', 
  12:'चैत्र'
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
  '2078': [ 31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30, 365 ],
  '2079': [ 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30, 365 ],
  '2080': [ 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30, 365 ],
  '2081': [ 31, 31, 32, 32, 31, 30, 30, 30, 29, 30, 30, 30, 366 ],
  '2082': [ 30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 30, 30, 365 ],
  '2083': [ 31, 31, 32, 31, 31, 30, 30, 30, 29, 30, 30, 30, 365 ],
  '2084': [ 31, 31, 32, 31, 31, 30, 30, 30, 29, 30, 30, 30, 365 ],
  '2085': [ 31, 32, 31, 32, 30, 31, 30, 30, 29, 30, 30, 30, 366 ],
  '2086': [ 30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 30, 30, 365 ],
  '2087': [ 31, 31, 32, 31, 31, 31, 30, 30, 29, 30, 30, 30, 366 ],
  '2088': [ 30, 31, 32, 32, 30, 31, 30, 30, 29, 30, 30, 30, 365 ],
  '2089': [ 30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 30, 30, 365 ],
  '2090': [ 30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 30, 30, 365 ],
  '2091': [ 31, 31, 32, 31, 31, 31, 30, 30, 29, 30, 30, 30, 366 ],
  '2092': [ 31, 31, 32, 32, 31, 30, 30, 30, 29, 30, 30, 30, 366 ]
}

function daysDiff(calendarDate){
  var then = new Date("4-14-2021") 
  var now  = new Date(calendarDate);               // no arguments -> current date
  return Math.round((now - then) / (1000 * 60 * 60 * 24));
}

function calendarSlider(days){
  let days_counter = days + 1; 

  var x;
  for(let i in calendar_data){
    if (days_counter > calendar_data[i][12]){
      days_counter = days_counter - calendar_data[i][12]
      continue
    }
    for(let j=0; j<=12; j++){
      if (days_counter > calendar_data[i][j]){
        days_counter -= calendar_data[i][j]; 
      }
      else{
        let calendarText = `${i}-${j+1}-${days_counter}`
        return calendarText
      }
    }
  }
}

function main(dayToConvert){
  let days = daysDiff(dayToConvert)
  return calendarSlider(days)
}

function todayToBS(){
  let today = new Date().toLocaleDateString()
  let days = daysDiff(today)
  return calendarSlider(days)
}

function geoTObs(bsdate){
  if(bsdate.length){
    let month =  bsdate.split("-")[1]
    let year =  bsdate.split("-")[0]
    let bsYear = year.split("").map(x => nums[x]).join("")
    let bsMonth = months[month]
    return ` ${bsMonth} ${bsYear}`
  }
  return "माफ गर्नुहोस अक्षर बुझिएन "
}



function fetchDate(){
  let bsCal = todayToBS()
  if (bsCal.length){
    let today = bsCal.split("-")[2]
      chrome.action.setIcon({
      path: `./datePic/${today}.png`,
    });
  }


}

chrome.idle.onStateChanged.addListener(() => {
  fetchDate()
})

chrome.runtime.onStartup.addListener(() => {
  fetchDate()
})

chrome.runtime.onInstalled.addListener(() => {
  fetchDate()
});

chrome.windows.onCreated.addListener(() => {
  fetchDate()
})

