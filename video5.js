
/*
//convert JSON into object

const jsonstring='{"name":"json","age":22,"city":"new york"}';
const jsonObject=JSON.parse(jsonstring);
console.log(jsonObject);
console.log(jsonObject.name);


//convert object into JSON

const objectconvert={
    name:"rahul",
    age:22,
};
const json=JSON.stringify(objectconvert)
console.log(json);
*/

//create server

const express=require('express')
const app= express();

app.get('/',function(req,res){
    res.send('welcome to my hostel ...how i can help you')
});

app.get('/chicken',(req,res)=>{
    res.send('sure sir,i can not eat');
})

app.get('/idli',(req,res)=>{
    var customized_idli={
        name:'rava idli',
        size: '10cm diameter',
        is_sambhar: true,
        is_chutney: false
    }
    //res.send('welcome to south india and would love to server Idli')
    res.send(customized_idli);
})

app.post('/person',(req,res)=>{
    console.log('data is saved');
})

app.listen(3000,()=>{
    console.log('welcom on port 3000')
})


