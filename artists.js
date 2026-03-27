let Artists;
function init(){
  $.ajaxSetup({async: false});
  
  // Ensure Lesson_51_DBserver replit is running!
  let link = "http://localhost:8600";//replace with your Dev URL
  let route= "/Artists";
  Artists = $.getJSON(link+route).responseJSON;

  generateCards(Artists);
}

function generateCards(Artists){  
  let back = "";
  let front = "";
  
  for(let i=0; i<Artists.length; i++){
    let artist = Artists[i];
    
	front = `
      <h2>${artist.ArtistName}</h2>  
      <img src='artist/${artist.ArtistName}.PNG'>`;
    
    back =`<h3> Date Of Birth: ${artist.DateOfBirth}</h3>`;
    back+=`<h3> Song ID: ${artist.ArtistId}</h3>`;
    back+=`  <p> Age: ${artist.Age}</p>`;

    card = new FlipCard(front, back);
    card.render("centerpanel");
    
  }
  
  // Now inject the build content into the output container
  output.innerHTML = build;
}

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

function filterByAge(){
  let artistAge = document.getElementById("age").value;

  let newArtists = []; //create a list of songs searched for
  
  for(let i=0; i<Artists.length;i++){
    let artist = Artists[i] //get each artists
    //make sure the list is no
    if( artist.Age == artistAge ) {
          //add to the new list
          newArtists.push(artist);
       }
  }
  generateCards(newArtists);  
}
