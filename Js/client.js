// const socket = io('http://localhost:8000');
//upar wala fetch nhi ho rha tha coz ACCESS DENIED A RHA THA so mene youtube se dekh ke solve kiya
const socket = io('http://localhost:8000', {
      transports: ['websocket', 'polling', 'flashsocket'],
    });

const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp');
const messageContainer = document.querySelector(".container");

var Audio=new Audio('ringtone/iphone_ding2.mp3');


const append = (message,position)=>{
      const messageElement = document.createElement('div');
      messageElement.innerText=message;
      messageElement.classList.add('message');
      messageElement.classList.add(position);
      messageContainer.append(messageElement);
      if(position=='left' || position=='middle'){
            Audio.play();
      }
      // var AudioNotification=new Audio('ringtone/iphone messenger ringtone.mp3');
      // if('user-joined'==name){
      //       AudioNotification.play();
      // }
};

form.addEventListener('submit', (e)=>{
      e.preventDefault();
      const message = messageInput.value;
      append(`You : ${message}`, 'right');
      socket.emit('send',message);
      messageInput.value='';
});


//name while entering 
const name = prompt("ENTER YOUR NAME !! ");
//it will show in the json file that we a new member
socket.emit('new-user-joined',name);



//whenever a new user joins there will be a message "name joined chat"
//MIDDLE
socket.on('user-joined',name=>{
      append(`${name} joined the chat` , 'left');
});
//sabko bhej do ye message
socket.on('receive',data=>{
      append(`${data.name}: ${data.message}` , 'left');
});

//on leave 
//MIDDLE KARDO
socket.on('server-left-event',name=>{
      append(`${name} Left ChatMates`, 'left');
});
