var express=require('express');
var app=express();
var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb+srv://flor:flor@cluster0-slegg.mongodb.net/test?retryWrites=true&w=majority'
var puerto = process.env.PORT || 3000

var dbNombre = 'flor';
var bd = [];
var cliente = new MongoClient(url, { useUnifiedTopology: true })
cliente.connect(function (err, client) {
    if (err) {
        console.error(err)
        client.close()
        process.exit(1)
    }

    console.log('Conectado exitosamente!');
    bd = client.db(dbNombre);
    bd.collection('ticket');
    
});

app.use(express.static('public'));
app.use(express.urlencoded({ extended: false}));

app.post('/ticket',function(req,res){
    var nombre=(req.body.nombre).toUpperCase();
    var telefono=req.body.telefono;
    var prenda=(req.body.prenda).toUpperCase();
    var descripcion=(req.body.descripcion).toUpperCase();
    var total=parseFloat(req.body.total);
    var sena=parseFloat(req.body.sena);
    var saldo=parseFloat(total-sena);
    var fecha=req.body.fecha
    bd.collection('ticket').insertMany([
        {nombre:nombre,telefono:telefono,prenda:prenda,descripcion:descripcion,total:total,sena:sena,saldo:saldo,fecha:fecha}
    ])
    res.json({nombre,telefono,prenda:prenda,descripcion,total,sena,saldo,fecha})
})

app.post('/ver',async function(req,res){
    var ticket = await bd.collection('ticket').find().toArray()
    res.json(ticket)
       
})
app.listen(puerto,function(){
    console.log("servidor escuchando en el puerto " + puerto);
});
