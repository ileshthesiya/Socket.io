const socket = io("http://localhost:8000")

const form = document.getElementById("send-container")
const messageInput = document.getElementById("messageInp")
const messageContainer = document.querySelector('.container')
var audio = new Audio('../tinton.mp3')

const append = (message, position)=>{
    const messageElement = document.createElement("div")
    messageElement.innerText = (message)
    messageElement.classList.add('message')
    messageElement.classList.add(position)
    messageContainer.append(messageElement)
    if(position == 'left'){
        audio.play();
    }
}

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const message = messageInput.value;
    append(`You:${message}`,'right')
    socket.emit('send',message)
    messageInput.value = ''
})

const name = prompt("Ple Enter Your Name")
socket.emit('New-user-joined',name)

socket.on('user-joined',name =>{
        append(`${name} Join The Chat`,'right')
})

socket.on('receive',data =>{
    console.log(data)
    console.log("data.message",data.message)
    console.log("data.user",data.user)
    append(`${data.name}:${data.message}`,'left')
})

socket.on('left',name =>{
    append(`${name} Left The Chat`,'right')
})

