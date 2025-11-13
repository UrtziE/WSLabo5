let express = require('express');
let path = require('path');
let fs= require('fs').promises;
let app= express ();

const PORT= 14000;
const ROUTE= path.join(__dirname,'data')
const QUESTROUTE =path.join(ROUTE, 'quests.json')

app.use(express.static('public'));
app.use(express.json());
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.listen(PORT, ()=>{
    console.log(`Zerbitzaria entzuten http://localhost:${PORT}`)
})
app.get('/' ,(req,res)=>{
    res.send('GET orri printzipalera')
})
app.get('/misioak',async (req,res)=>{
    console.log("Sartu zara get-era")
    try {
        const emaitzaString = await fs.readFile(QUESTROUTE, 'utf8');
        console.log(JSON.parse(emaitzaString))
        res.json( JSON.parse(emaitzaString));

    }catch(error){

        console.error('Error misioak irakurtzean:', error);
        res.status(500).json({ emaitza: 'Errorea irakurtzean misioak' });
    }


})

app.post('/misioak',async (req,res)=>{
    let emaitza= req.body
    try {
        const emaitzaString = await fs.readFile(QUESTROUTE, 'utf8');
        let emaitzaJson = JSON.parse(emaitzaString)
        emaitza.forEach(unekoa=>{
            emaitzaJson.push(unekoa)
           })

        await fs.writeFile(QUESTROUTE, JSON.stringify(emaitzaJson))
        res.status(200).json({emaitza :'Dena ondo joan da.'})
    }catch(error){
        console.error('Errorea prozesuan', error.message);
        res.status(404).json({emaitza :'Zerbitzarian gordetzean errore bat egon da'})
    }
})
app.put('/misioak', async (req,res)=>{
    let update=req.body;
    try {
        const emaitzaString = await fs.readFile(QUESTROUTE, 'utf8');
        let emaitzaJson = JSON.parse(emaitzaString)
        emaitzaJson=emaitzaJson.filter((unekoa)=>{
          return  unekoa.id!==update.id})
        emaitzaJson.push(update);
        await fs.writeFile(QUESTROUTE, JSON.stringify(emaitzaJson))
        res.status(200).json({emaitza :'Dena ondo joan da.'})
    }catch(error){
        console.error('Errorea prozesuan', error.message);
        res.status(404).json({emaitza :'Zerbitzarian gordetzean errore bat egon da'})
    }
})
app.delete('/misioak/:id',async(req,res)=>{
    let idDelete=parseInt(req.params.id)
    try{
    const emaitzaString = await fs.readFile(QUESTROUTE, 'utf8');
    let emaitzaJson = JSON.parse(emaitzaString);
    emaitzaJson=emaitzaJson.filter((unekoa)=>{
        console.log(idDelete, "ID delete")
        console.log(unekoa.id,"UNEKOA ID")
        return  unekoa.id!==idDelete});
    await fs.writeFile(QUESTROUTE, JSON.stringify(emaitzaJson))
    res.status(200).json({emaitza :'Dena ondo joan da.'})
}catch(error){
    console.error('Errorea prozesuan', error.message);
    res.status(404).json({emaitza :'Zerbitzarian gordetzean errore bat egon da'})
}
})


