function getNewLocationAndCheckCountry(position) {
  //Gets lat long from position and calls checkCountry
  var newCoordinates = JSON.stringify({
    lat: position.coords.latitude,
    lng: position.coords.longitude
  });
  localStorage.setItem('latlong', newCoordinates);
  checkCountry(position.coords.latitude, position.coords.longitude);
}

function checkCountry(latitude, longitude) {
  //takes lat long as input and checks if within US bounds, if not, changes header text content to display Hindi
  var top = 51.3457868; //north lat
  var left = -127.7844079; //west long
  var right = -69.9513812; //east long
  var bottom = 24.7433195; //south

  if (left > longitude || longitude > right || bottom > latitude || latitude > top) {
    var header = document.querySelector(".leftheader");
    //Display Hindi if not in the US
    header.textContent = decodeURIComponent(escape("\xE0\xA4\xB5\xE0\xA5\x87\xE0\xA4\xAC\x20\xE0\xA4\x95\xE0\xA5\x87\x20\xE0\xA4\x86\xE0\xA4\xB8\xE0\xA4\xAA\xE0\xA4\xBE\xE0\xA4\xB8\x20\xE0\xA4\xB8"));
  }
}


function showGrid(elem) {
  elem.classList.add('is-visible');
}

function addHyperlinkText(elem, link) {
  var linkTitle = document.createElement("a");
  linkTitle.href = link;
  linkTitle.target = "_blank";
  linkTitle.innerHTML = elem.innerHTML;
  elem.replaceChild(linkTitle, elem.childNodes[0]);
}


var xhr = new XMLHttpRequest();
xhr.onload = function() {
  //only if response is 200, process
  if (xhr.status === 200) {
    console.log('success');
    console.log(xhr.responseText);
    var myObj = JSON.parse(xhr.responseText);
    console.log(myObj);

    if (myObj !== null) {
      var list = myObj.list;
      if (list.length < 6) {
        console.error("Could not process request to get at least 6 ads from the Taboola API");
        return;
      } else {

        var brandingElements = document.querySelectorAll(".branding");
        var titleElements = document.querySelectorAll(".title");
        var thumbNailElements = document.querySelectorAll(".thumbnail");

        try {
          for (var i = 0; i < 6; i++) {

            brandingElements[i].textContent = list[i].branding;
            titleElements[i].textContent = list[i].name;
            thumbNailElements[i].src = list[i].thumbnail[0].url;
            //If Categories Exist, append first category to Brand
            if (list[i].categories !== undefined && list[i].categories.length !== 0) {
              brandingElements[i].textContent = list[i].categories[0].charAt(0).toUpperCase() + list[i].categories[0].substr(1) + " | " + brandingElements[i].textContent;
            }
            //Adding Hyperlinks using function
            addHyperlinkText(titleElements[i], list[i].url)
            addHyperlinkText(brandingElements[i], list[i].url)

            //Adding anchor tag as a parent to the image tag
            var linkImg = document.createElement("a");
            linkImg.href = list[i].url;
            linkImg.target = "_blank";
            var parent = thumbNailElements[i].parentNode;
            parent.replaceChild(linkImg, thumbNailElements[i]);
            linkImg.appendChild(thumbNailElements[i]);
          }
          //Make Grid container visible
          var displayGrid = document.querySelector(".grid-container");
          if (!displayGrid) return;
          showGrid(displayGrid);

        } catch (e) {
          console.log(e.stack);
        }
      }
    }

  } else {
    console.error('Error processing Taboola API response');
  }
};

//Looking up cache for lat long data
var oldLocation = localStorage.getItem('latlong');

if (oldLocation) {
  //Pulling from cache
  var coords = JSON.parse(oldLocation);
  var lat = coords.lat;
  var lng = coords.lng;
  //check if US and change header language otherwise
  checkCountry(lat, lng);
} else if ("geolocation" in navigator) {
  //if doesn't exist in cache get the current location data, check if US and change header otherwise
  navigator.geolocation.getCurrentPosition(getNewLocationAndCheckCountry);
}

//GET HTTP Call to Taboola API
xhr.open('GET', 'https://api.taboola.com/1.2/json/apitestaccount/recommendations.get?app.type=web&app.apikey=7be65fc78e52c11727793f68b06d782cff9ede3c&source.id=%2Fdigiday-publishing-summit%2F&source.url=https%3A%2F%2Fblog.taboola.com%2Fdigiday-publishing-summit%2F&source.type=text&placement.organic-type=mix&placement.visible=true&placement.available=true&placement.rec-count=6&placement.name=Below%20Article%20Thumbnails&placement.thumbnail.width=640&placement.thumbnail.height=480&user.session=init');
xhr.send();