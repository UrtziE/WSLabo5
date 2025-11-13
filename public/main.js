let gordetakoMisioak=[]
let misioLista= document.getElementById("misioakLista")
let form= document.getElementById("formularioa")
let misioaID;
let botoia1=document.querySelector("input[value='Gehitu Misioa']")
let botoia2=document.querySelector("input[value='Ezabatu Dena']")
let botoia3=document.querySelector("input[value='Igo Zerbitzarira']")
let botoia4=document.querySelector("input[value='Jaitsi Zerbitzaritik']")

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
            igoZerbitzarira();
        } else if (botoia === "Jaitsi Zerbitzaritik") {
           jaitsiZerbitzaritik();
        }else if(botoia === "Gorde"){

          //  let botoia1=document.querySelector("input[value='Gorde']")
           // let botoia2=document.querySelector("input[value='Kantzelatu']")
            botoia1.value="Gehitu Misioa"
            botoia2.value="Ezabatu Dena"
            botoia3.style.visibility="visible";
            botoia4.style.visibility="visible";
            let izenaf = document.getElementById("misioIzena").value;
            let zailtasunaf = document.getElementById("misioZailtasuna").value;
            let sariaf = document.getElementById("misioSaria").value;
            let pertsonaKopf = document.getElementById("misioPertsonaKop").value;
            let misioBerri={
                id: parseInt(form.dataset.editingId),
                izena: izenaf,
                zailtasuna:zailtasunaf,
                saria:sariaf,
                pertsonaKop:pertsonaKopf
            }
            updateZerbitzaria(misioBerri)

        }else if(botoia === "Kantzelatu"){
            event.preventDefault();
           // let botoia1=document.querySelector("input[value='Gorde']")
           // let botoia2=document.querySelector("input[value='Kantzelatu']")
            botoia1.value="Gehitu Misioa"
            botoia2.value="Ezabatu Dena"
            botoia3.style.visibility="visible";
            botoia4.style.visibility="visible";
            document.getElementById("misioIzena").value="";
            document.getElementById("misioZailtasuna").value="";
            document.getElementById("misioSaria").value="";
            document.getElementById("misioPertsonaKop").value="";
        }else{
            event.preventDefault();
        }
    }
    )
    misioLista.addEventListener('click',function (event){
        if (event.target.classList.contains('editatu-btn')) {

            botoia1.value="Gorde"
            botoia2.value="Kantzelatu"
            botoia3.style.visibility="hidden";
            botoia4.style.visibility="hidden";
            const misioId = parseInt(event.target.dataset.id);
            const misioaEditatzeko = gordetakoMisioak.find(misio => misio.id === misioId);
            document.getElementById("misioIzena").value=misioaEditatzeko.izena;
            document.getElementById("misioZailtasuna").value=misioaEditatzeko.zailtasuna;
             document.getElementById("misioSaria").value=misioaEditatzeko.saria;
             document.getElementById("misioPertsonaKop").value=misioaEditatzeko.pertsonaKop;
             form.dataset.editingId = event.target.dataset.id;
             event.preventDefault();
        }else if(event.target.classList.contains('ezabatu-btn')){
            let misioID=parseInt(event.target.dataset.id);
            deleteZerbitzaritik(misioID);



        }

    })
}
window.onload=gertaerak
function ezabatuBatLokal(id){
    gordetakoMisioak=gordetakoMisioak.filter(uneko=>uneko.id!==id)
    misioLista.innerHTML=""
    localStorage.setItem("misioak", JSON.stringify(gordetakoMisioak))
    erakutsiMisioak();
}
function deleteZerbitzaritik(id){
    fetch(`http://localhost:14000/misioak/${id}`,
        {method:'DELETE'}).then(r=>{
        ezabatuBatLokal(id)
        alert("Infoa aktualizatu da.")}
    ).catch(error=>{alert('Errorea egon da igotzean')})
}
function updateZerbitzaria(misioBerri){
    fetch('http://localhost:14000/misioak',{method:'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(misioBerri)}).then(r=>{
            aktualizatu(misioBerri);
        alert("Infoa aktualizatu da.")}
    ).catch(error=>{alert('Errorea egon da igotzean')})
}
function igoZerbitzarira(){

    fetch('http://localhost:14000/misioak',{method:'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(gordetakoMisioak)}).then(
        alert("Dena ondo joan da")
    ).catch(error=>{alert('Errorea egon da igotzean')})

}
function  jaitsiZerbitzaritik(){
    fetch('http://localhost:14000/misioak').then(r=>r.json()).then(emaitza=>{
        emaitza.forEach(elementu=>{
            gordeMisioak(elementu);
        })
    }).catch(error=>{alert('Errorea egon da irakurtzean')});
}
function aktualizatu(misioBerri){
    gordetakoMisioak=gordetakoMisioak.filter(uneko=>uneko.id!==misioBerri.id)
    gordeMisioak(misioBerri);
}
function gehituMisioa(){
    let izenaf = document.getElementById("misioIzena").value;
    let zailtasunaf = document.getElementById("misioZailtasuna").value;
    let sariaf = document.getElementById("misioSaria").value;
    let pertsonaKopf = document.getElementById("misioPertsonaKop").value;
    if (!izenaf || !zailtasunaf || !sariaf || !pertsonaKopf) {
        alert("Bete eremu guztiak, mesedez!");
        return false;
    }

    let misioBerri={
        id: parseInt(Date.now()),
        izena: izenaf,
        zailtasuna:zailtasunaf,
        saria:sariaf,
        pertsonaKop:pertsonaKopf
    }

    gordeMisioak(misioBerri)
}
function gordeMisioak(misioBerri){
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
        misioDiv.className = "misio-item";

        const text = document.createElement("span");
        text.style.marginBottom = "10px"; // espacio entre misiones
        text.style.whiteSpace = "pre-line";
        text.textContent=`${i}-Misio izena:${misio.izena}
         Misio Zailtasuna:${misio.zailtasuna}
         Misio Saria:${misio.saria}
         Pertsona Kop:${misio.pertsonaKop}
         Misio id: ${misio.id}`
        i=i+1;
        const botoienDiv = document.createElement("div");
        botoienDiv.className = "misio-botoiak";
        const buttonEditatu= document.createElement("button")
        buttonEditatu.className = "editatu-btn";
        buttonEditatu.textContent="editatu"
        buttonEditatu.dataset.id=misio.id;
        const buttonEzabatu = document.createElement("button");
        buttonEzabatu.className = "ezabatu-btn"; // Clase propia para darle estilos
        buttonEzabatu.textContent = "ezabatu";
        buttonEzabatu.dataset.id = misio.id;
        botoienDiv.append(buttonEditatu);
        botoienDiv.append(buttonEzabatu)
        misioDiv.append(text)
        misioDiv.append(botoienDiv)

        misioLista.append(misioDiv)
    })
}
