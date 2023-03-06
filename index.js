const express = require('express')
const swaggerUi = require('swagger-ui-express')
const swaggerDocument = require('./swagger.json');

var restaurants = [{id:0,name:"Woodshill"},{id:1,name:"Fiorellas"}]

const app = express();
app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
app.get('/index', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});



app.get("/restaurants", (req,res)=>{
    res.send(restaurants);//route for all the data.
})
app.post("/restaurant",(req,res)=>{
    restaurants.push({id:req.body.id, name:req.body.name})//post new data(restaurant) to the list.
    res.send(`${JSON.stringify(restaurants)} new data was created!`)
})
app.delete("/restaurants/:id", (req, res) => {
    console.log('delete:id:' + req.params.id);
    restaurants = restaurants.filter(item => item.id != req.params.id); //delete an item by id.
    res.send("restaurants left:" + JSON.stringify(restaurants));
})


app.put("/restaurant/:id",(req,res)=>{
    const restaurantToUpdate = restaurants.find(item=> item.id == req.params.id);//find item by id and update.
    if(restaurantToUpdate){
        restaurantToUpdate.name = req.body.name;
        res.send(`Restaurant with id ${req.params.id} was updated!`);
    } else {
        res.send(`Restaurant with id ${req.params.id} was not found!`);
    }
});


app.listen(4000,()=>console.log('Listening on 4000'))