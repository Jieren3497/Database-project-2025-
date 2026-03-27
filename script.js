let songs;
function init(){
  $.ajaxSetup({async: false});
  
  // Ensure Lesson_51_DBserver replit is running!
  let link = "http://localhost:8600";//replace with your Dev URL
  let route= "/songs";
  songs = $.getJSON(link+route).responseJSON;

  generateCards(songs);
}
function generateCards(songs){
  // document.getElementById("centerpanel") = "";
  let back = "";
  let front = "";
  
  for(let i=0; i<songs.length; i++){
    let song = songs[i];
    front = `
      <img src='songs/${song.SongName}.PNG'>
      <h2>${song.SongName}</h2>`;

    back = `<h3> By: ${song.ArtistName}</h3>`;
    back+= `<h3> Song ID: ${song.SongId}</h3>`;
    back+= `<h5> Song Rease Date: ${song.DateReleased}</h5>`;
	back+= `<p> Genre: ${song.Genre}</p>`;

    card = new FlipCard(front, back);
    card.render("centerpanel");
  } 
}

/* function generateCards(songs){
  let centerpanel = document.getElementById("centerpanel");
  let build ="";

  for(let i=0; i<songs.length; i++){
    let song = songs[i];
    let build ="";
    let frontContent = `
      <img src='songs/${song.songName}.PNG'>
      <h2>${song.songName}</h2>`;
    
    let backContent = `
      <h3> By: ${song.artistName}</h3>
      <h3> Song ID: ${song.songId}</h3>
      <h5> Song Rease Date: ${song.dateReleased}</h5>
      <p> Genre: ${song.Genre}</p>
    `;

    build += flipcard(frontContent, backContent);
    
  }
  // Now inject the build content into the output container
  centerpanel.innerHTML = build;
} */

/* function flipcard(front, back) {
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
} */
 

function filterBySongName(){
	document.getElementById("centerpanel").innerHTML = "";
    let sname = document.getElementById("songname").value;
    console.log(sname);

    let songList = [];

    for(let i=0; i<songs.length; i++){
        let song = songs[i]
        if(song.SongName == sname){
            songList.push(song);
        }
    }
    console.log(`number found ${songList.length}`);
    generateCards(songList);
}

function filterByGenre(){
  document.getElementById("centerpanel").innerHTML = "";
  let genretype = document.getElementById("genres").value;
  console.log(genretype);

  let genreList = []; //create a list of songs searched for
  
  for(let i=0; i<songs.length;i++){
    let song = songs[i] //get each song
    //make sure the list is no
    if( song.Genre == genretype ) {
          //add to the new list
          genreList.push(song);
    }
  }
  console.log(`number found ${genreList.length}`);
  generateCards(genreList);  
}