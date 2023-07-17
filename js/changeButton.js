

function toggleDiv() {
  var div = document.getElementById("league");
  if (div.style.display === "none") {
    div.style.display = "block";
  } else {
    div.style.display = "none";
  }
}

// Agrega un evento para esperar a que el contenido se cargue
