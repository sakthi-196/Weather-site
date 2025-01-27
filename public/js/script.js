//for user's local current time

document.addEventListener("DOMContentLoaded",()=>{
    function localDateTime(){
        const now=new Date();
        //get date
        const date=now.getDate();
        const day=now.toLocaleString('en-us',{weekday:'long'})
        const month=now.toLocaleString('en-us',{month:'long'})
        const year=now.getFullYear()
        //get time
        const time=now.toLocaleTimeString('en-us',{hour:'2-digit',minute:'2-digit',hour12:true});
        //display date and time
        document.getElementById('day').innerText=`${day}`
        document.getElementById('date').innerText=`${date} ${month},${year}`
        document.getElementById('time').innerText=`${time}`
    }
    localDateTime();   
})