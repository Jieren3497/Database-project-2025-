let Albums;
function init(){
  $.ajaxSetup({async: false});
  
  // Ensure Lesson_51_DBserver replit is running!
  let link = "http://localhost:8600";//replace with your Dev URL
  let route= "/Albums";
  Albums = $.getJSON(link+route).responseJSON;

  generateCards(Albums);  
}

function generateCards(Albums){  
  let mainpanel = document.getElementById("centerpanel");
  let build ="";
   
  for(let i=0; i<Albums.length; i++){
    let album = Albums[i];
    let build="";
    let frontContent = `
      <h2>${album.AlbumName}</h2>  
      <img src='album/${album.AlbumName}.PNG'>`;
    
    let backContent = `
      <h3> Made by: ${album.ArtistName}</h3>
      <img src='artist/${album.ArtistName}>';
      <h3> Album ID: ${album.AlbumId}</h3>
      <p> Date Released: ${album.AlbumReleaseDate}</p>
    `;

    build += flipcard(frontContent, backContent);
    
  }
  mainpanel.innerHTML = build;  
}

function flipcard(front, back) {
  return `
    <div class="flip-card">
      <div class="flip-card-inner">
        <div class="flip-card-front">
          ${front}
        </div>
        <div class="flip-card-back">
          ${back}
        </div>
      </div>
    </div>
  `;
}

function filterByArtistName(){
  let artist = document.getElementById("artistname").value;
  console.log(artist);

  let newAlbum = []; //create a list of songs searched for
  
  for(let i=0; i<Albums.length;i++){
    let album = Albums[i] 
    //make sure the list is no
    if( album.artistName == artist ) {
          //add to the new list
          newAlbum.push(album);
       }
  }
  console.log(`number found ${newAlbum.length}`)
  generateCards(newAlbum);  
}