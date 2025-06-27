var fs=require('fs');
var os=require('os');

var user=os.userInfo();
console.log(user);
console.log(user.username);


fs.appendFile('greeting.txt','HI ' + user.username + '!\n',() => {

    console.log('file is create');
});

fs.appendFile('greeting1.txt','Hi' + user.username + '!',()=>{console.log('file is create')})

console.log(fs)


