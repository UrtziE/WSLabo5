let gordetakoMisioak=[]
let misioLista= document.getElementById("misioakLista")
function gertaerak(){
    gordetakoMisioak= JSON.parse(localStorage.getItem('misioak'))||[];
    erakutsiMisioak();
    const form= document.getElementById("formularioa")
    form.addEventListener("submit", function (event){
        const botoia = event.submitter.value
        if (botoia === "Gehitu Misioa") {

            gehituMisioa();
        } else if (botoia === "Ezabatu Dena") {
            ezabatuDenak();
        } else if (botoia === "Igo Zerbitzarira") {
           // igoZerbitzarira();
        } else if (botoia === "Jaitsi Zerbitzaritik") {
           // jaitsiZerbitzaritik();
        }
    })

}
window.onload=gertaerak
function gehituMisioa(){
    const izenaf = document.getElementById("misioIzena").value;
    const zailtasunaf = document.getElementById("misioZailtasuna").value;
    const sariaf = document.getElementById("misioSaria").value;
    const pertsonaKopf = document.getElementById("misioPertsonaKop").value;

    if (!izenaf || !zailtasunaf || !sariaf || !pertsonaKopf) {
        alert("Bete eremu guztiak, mesedez!");
        return false;
    }

    let misioBerri={
        izena: izenaf,
        zailtasuna:zailtasunaf,
        saria:sariaf,
        pertsonaKop:pertsonaKopf
    }
    gordetakoMisioak.push(misioBerri)
    localStorage.setItem("misioak", JSON.stringify(gordetakoMisioak))
    erakutsiMisioak()
}
function ezabatuDenak(){
    localStorage.removeItem("misioak")
    gordetakoMisioak=[];
    misioLista.innerHTML=""
}

function erakutsiMisioak(){
    let i=1;

    gordetakoMisioak.forEach(function(misio){
        const misioDiv = document.createElement("div");
        misioDiv.style.marginBottom = "10px"; // espacio entre misiones
        misioDiv.style.whiteSpace = "pre-line";
        misioDiv.textContent=`${i}-Misio izena:${misio.izena}
         Misio Zailtasuna:${misio.zailtasuna}
         Misio Saria:${misio.saria}
         Pertsona Kop:${misio.pertsonaKop}`
        i=i+1;
        misioLista.append(misioDiv)
    })
}
