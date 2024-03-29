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
    var diaymes=req.body.diaymes
    bd.collection('ticket').insertMany([
        {nombre:nombre,telefono:telefono,prenda:prenda,descripcion:descripcion,total:total,sena:sena,saldo:saldo,diaymes:diaymes}
    ])
    res.json({nombre,telefono,prenda,descripcion,total,sena,saldo,diaymes})
})

app.post('/ver',async function(req,res){
    var ticket = await bd.collection('ticket').find().toArray()
    res.json(ticket)
})

app.post('/nombre', async function (req,res){
	var alfajores = await bd.collection('ticket').find({}, { _id:0, nombre: 1}).toArray()
	res.json(alfajores)
	console.log(alfajores)
})


app.listen(puerto,function(){
    console.log("servidor escuchando en el puerto " + puerto);
});