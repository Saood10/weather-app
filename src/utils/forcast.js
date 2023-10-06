const request = require("postman-request");

const forcast = (lat , lon , callback )=>{

const url = "http://api.weatherstack.com/current?access_key=19ae5f654d4bb2a8e1bc3ee6fde0f3b1&query="+lat+','+lon

request({url : url , json : true}, (err , Response) =>{
    if(err)
    {
        callback("Unable to connect" , undefined)
    }else if(Response.error)
    {
        callback("can't find location at the moment.Try again later" , undefined)
    }else
    {
       callback(undefined ,Response.body.current.weather_descriptions[0] + " \nThe temp is " + Response.body.current.temperature )
    }
})
}

module.exports = forcast