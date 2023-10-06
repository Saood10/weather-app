const express = require('express')
const hbs = require('hbs')
const path = require('path');
const app = express();

const port = process.env.PORT || 3000

//requiring 
const request = require('postman-request')
const forcast = require('./utils/forcast')
const geocode = require('./utils/geocode')

//set up path
const publicdirpath = path.join(__dirname , '../public');
const viewspath = path.join(__dirname , '../templates/views');
const partialspath = path.join(__dirname , '../templates/partials');

//set up hbs engine and location
app.set('view engine' , 'hbs');
app.set('views' , viewspath);
hbs.registerPartials( partialspath);

//public path
app.use(express.static(publicdirpath));

app.get('' , (req , res) => {

    res.render('index' ,{
        "title" : "Weather",
        "name" : "S.s"
    });

})

app.get('/about' , (req , res) => {

    res.render('about' ,{
        "title" : "About",
        "name" : "S.s"
    })

})

app.get('/help' , (req , res) => {

    res.render('help' ,{
        "title" : "Help",
        "helptxt" : "need help",
        "name" : "S.s"
    })

})
app.get('/help/*' , (req ,res) =>{
    res.render('404' , {
        "title" : "404",
        "errmsg" : "help article not found",
        "name" : "S.s"
    })
})

app.get('/weather' , (req ,res)=>{

    const loca = req.query.address;

    if(!loca)
    {
        return res.send({
            'err' : 'You must provide address in search term'  
        })
    }


        geocode(loca, (err , data ) =>{

            if(err)
            {
                return console.log(err)
            }
            forcast(data.lat , data.lon , (err,forcastdata)=>{
        
                if(err)
                {
                    return console.log(err)
                }
        
                res.send({
                    'location' : data.location,
                    'forcast' : forcastdata
                })

            })
        
        })

})

app.get('*' , (req ,res) =>{
    res.render('404' , {
        "title" : "404",
        "errmsg" : "page not found",
        "name" : "S.s"
    })
})


app.listen( port , ()=> {
    console.log("server on port "+ port);
})