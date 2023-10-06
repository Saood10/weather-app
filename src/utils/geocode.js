const request = require("postman-request")


const geocode = (address , callback ) =>{

    const geocodeurl = " http://api.openweathermap.org/geo/1.0/direct?q="+ address + "&limit=5&appid=f6af6db547203a2fcbe8ae6fce19de57"

    request({ url : geocodeurl , json : true} , (err , Response) =>{
        if(err)
        {
            callback("Unable to connect" , undefined )
        }else if(Response.error) 
        {
            callback("can't find location at the moment.Try again later" , undefined)
        }else
        {
            callback(undefined , { 
                location : Response.body[0].name,
                lon:Response.body[0].lon,
                lat : Response.body[0].lat,
            })
        }
    })

}

module.exports = geocode