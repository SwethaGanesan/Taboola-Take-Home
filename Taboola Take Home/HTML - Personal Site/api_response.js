var xhr = new XMLHttpRequest();
xhr.onload = function() {
  if(xhr.status == 200){
    console.log('success');
    console.log(this.responseText);
    var myObj = JSON.parse(this.responseText);
    console.log(myObj);

    if(myObj != null){
      var list = myObj.list;
      console.log(list);
      if (list.length != 6){
        console.log("Could not process request to get 6 ads");
      }
      else{
        var branding=[];
        var name=[];
        var thumbnailimage=[];
        var url=[];

        try{
        for(var i=0; i<6; i++){

          branding.push(list[i].branding);
          console.log(branding[i]);
          document.querySelectorAll(".branding")[i].textContent = branding[i];

          name.push(list[i].name);
          console.log(name[i]);
          document.querySelectorAll(".title")[i].textContent = name[i];

          thumbnailimage.push(list[i].thumbnail[0].url);
          console.log(thumbnailimage[i]);
          document.querySelectorAll(".thumbnail")[i].src = thumbnailimage[i];

          url.push(list[i].url);
          console.log(url[i]);

        }}
        catch(Exception){
          console.log("Couldn't process API request");
        }



    }
    }

  }
  else{
    console.log('Couldnt process request');
  }
};

xhr.open('GET','https://api.taboola.com/1.2/json/apitestaccount/recommendations.get?app.type=web&app.apikey=7be65fc78e52c11727793f68b06d782cff9ede3c&source.id=%2Fdigiday-publishing-summit%2F&source.url=https%3A%2F%2Fblog.taboola.com%2Fdigiday-publishing-summit%2F&source.type=text&placement.organic-type=mix&placement.visible=true&placement.available=true&placement.rec-count=6&placement.name=Below%20Article%20Thumbnails&placement.thumbnail.width=640&placement.thumbnail.height=480&user.session=init');
xhr.send();

//https://images.taboola.com/taboola/image/fetch/f_jpg%2Cq_auto%2Ch_480%2Cw_640%2Cc_fill%2Cg_faces:auto%2Ce_sharpen/http%3A%2F%2Fcdn.taboola.com%2Flibtrc%2Fstatic%2Fthumbnails%2Fcc0b0ea15f280ec6e40633694c793683.jpg
//https://images.taboola.com/taboola/image/fetch/f_jpg%2Cq_auto%2Ch_480%2Cw_640%2Cc_fill%2Cg_faces:auto%2Ce_sharpen/http%3A%2F%2Ffroppitinc.com%2Fcreatives%2Fbl%2Fancmyst%2F55.jpg
//https://images.taboola.com/taboola/image/fetch/f_jpg%2Cq_auto%2Ch_480%2Cw_640%2Cc_fill%2Cg_faces:auto%2Ce_sharpen/https%3A%2F%2Fstorage.googleapis.com%2Fcaw-uploads%2Fd6c6403e5bb75c6a39dc75c7c047b799.jpg
//https://images.taboola.com/taboola/image/fetch/f_jpg%2Cq_auto%2Ch_480%2Cw_640%2Cc_fill%2Cg_faces:auto%2Ce_sharpen/https%3A%2F%2Fcdn.science101.com%2Fwp-content%2Fuploads%2F2019%2F01%2FSquare-waves.jpg
//https://images.taboola.com/taboola/image/fetch/f_jpg%2Cq_auto%2Ch_480%2Cw_640%2Cc_fill%2Cg_faces:auto%2Ce_sharpen/http%3A%2F%2Fcdn.taboola.com%2Flibtrc%2Fstatic%2Fthumbnails%2F8f2b1606a416f13865766591baa323ac.jpg
//https://images.taboola.com/taboola/image/fetch/f_jpg%2Cq_auto%2Ch_480%2Cw_640%2Cc_fill%2Cg_faces:auto%2Ce_sharpen/https%3A%2F%2Fgallery-pl.go-game.io%2Fuploads%2F2019%2F01%2FVk_Resizes%25201000x600_B63497_1000x600_English%26IMG%3D1CZT.png










//document.querySelector("div").style.backgroundColor="yellow
//document.querySelector("button").classList.add("invisible");
//document.querySelector("button").classList.remove("invisible");, toggle
//document.querySelector("a").getAttribute("href")
//document.querySelector("a").setAttribute("href", "https://bing.com")

//var image1 = document.querySelectorAll("img")[0];
//image1.setAttribute("src, randomImage");

//document.querySelectorAll("img")[1].setAttribute("src", randomImageSource2);
//if(x>y)
//{}
//getElementById
/*

document.querySelector("button").addEventListener("click", handleClick);
function handleClick(){
  alert("I got clicked")
}

document.querySelector("button").addEventListener("click", function(){
alert("I got clicked")
});

for (var i=0; i< document.querySelectorAll(".drum").length; i++){
  document.querySelectorAll(".drum")[i].addEventListener("click", function()){
  alert("I got clicked")
  console.log(this.innerhtml)
  this.style.color = "white"

}
}

var housekeeper1 = new HouseKeeper(name, years)
function HouseKeeper(name,years){
this.name = name
this.years = years

}


*/
