console.log('client side js')



document.querySelector('form').addEventListener('submit' , (e)=>{
    e.preventDefault()

    const loc = document.querySelector('input').value

    fetch('http://localhost:3000/weather?address='+loc).then((res)=>{

    res.json().then((data)=>{

        if(data.error){
            console.log(data.error);
        }

        console.log(data.location)
        console.log(data.forcast);
    })

})



})