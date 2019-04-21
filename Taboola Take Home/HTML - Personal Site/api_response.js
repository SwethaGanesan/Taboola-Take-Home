function checkCountry(position) {

  var top = 51.3457868; //north lat
  var left = -127.7844079; //west long
  var right = -69.9513812; //east long
  var bottom =  24.7433195; //south

  console.log(position.coords.longitude);
  console.log(position.coords.latitude);

  if(left<=position.coords.longitude && position.coords.longitude<=right && bottom<=position.coords.latitude && position.coords.latitude<=top){
    console.log("US");
  }
  else{
    console.log("not in the US");
    var header = document.querySelector(".leftheader");
    //Display Hindi if not in the US
    header.textContent = decodeURIComponent(escape("\xE0\xA4\xB5\xE0\xA5\x87\xE0\xA4\xAC\x20\xE0\xA4\x95\xE0\xA5\x87\x20\xE0\xA4\x86\xE0\xA4\xB8\xE0\xA4\xAA\xE0\xA4\xBE\xE0\xA4\xB8\x20\xE0\xA4\xB8"));
  }
}
var xhr = new XMLHttpRequest();
xhr.onload = function() {
  if(xhr.status === 200){
    console.log('success');
    console.log(xhr.responseText);
    var myObj = JSON.parse(xhr.responseText);
    console.log(myObj);

    if(myObj !== null){
      var list = myObj.list;
      if (list.length < 6){
        console.log("Could not process request to get at least 6 ads");
      }
      else{

        var brandingElements = document.querySelectorAll(".branding");
        var titleElements = document.querySelectorAll(".title");
        var thumbNailElements = document.querySelectorAll(".thumbnail");

        try{
        for(var i=0; i<6; i++){

          brandingElements[i].textContent = list[i].branding;
          titleElements[i].textContent = list[i].name;
          thumbNailElements[i].src = list[i].thumbnail[0].url;

          if (list[i].categories !== undefined && list[i].categories.length !== 0){
            brandingElements[i].textContent = list[i].categories[0].charAt(0).toUpperCase() + list[i].categories[0].substr(1) + " | " +  brandingElements[i].textContent;
          }

          var linkTitle = document.createElement("a");
          linkTitle.href = list[i].url;
          linkTitle.target = "_blank";
          linkTitle.innerHTML=titleElements[i].innerHTML;
          titleElements[i].replaceChild(linkTitle,titleElements[i].childNodes[0]);

          var linkBrand = document.createElement("a");
          linkBrand.href = list[i].url;
          linkBrand.target = "_blank";
          linkBrand.innerHTML = brandingElements[i].innerHTML;
          brandingElements[i].replaceChild(linkBrand,brandingElements[i].childNodes[0]);

          var linkImg = document.createElement("a");
          linkImg.href = list[i].url;
          linkImg.target = "_blank";
          var parent = thumbNailElements[i].parentNode;
          parent.replaceChild(linkImg, thumbNailElements[i]);
          linkImg.appendChild(thumbNailElements[i]);

        }}
        catch(e){
          console.log(e.stack);
        }
    }
    }

  }
  else{
    console.log('Couldnt process request');
  }
};




if ("geolocation" in navigator) {
  //geolocation is available
  navigator.geolocation.getCurrentPosition(checkCountry);
} else {
  //geolocation IS NOT available
  console.log("Geolocation not supported");
}

xhr.open('GET','https://api.taboola.com/1.2/json/apitestaccount/recommendations.get?app.type=web&app.apikey=7be65fc78e52c11727793f68b06d782cff9ede3c&source.id=%2Fdigiday-publishing-summit%2F&source.url=https%3A%2F%2Fblog.taboola.com%2Fdigiday-publishing-summit%2F&source.type=text&placement.organic-type=mix&placement.visible=true&placement.available=true&placement.rec-count=6&placement.name=Below%20Article%20Thumbnails&placement.thumbnail.width=640&placement.thumbnail.height=480&user.session=init');
xhr.send();
