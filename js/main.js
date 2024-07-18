let elList = document.querySelector(".users")
let elModal = document.querySelector(".modal")

function addUsers(){
    axios.get('https://reqres.in/api/users').then(res => {
        res.data.data.forEach(item => {
            let element = document.createElement("div")
            element.className ="w-[31%] bg-white  text-violet-400 text-[25px] rounded-md p-[15px] space-y-[25px]"
            element.innerHTML = `
            <div class="flex justify-around">
                <div>
                    <img src="${item.avatar}" width="120" height="120" class="rounded-[50%]" >
                </div>
                <div class="space-y-[4px]">
                    <p>Name: <b>${item.first_name}</b></p>
                    <p>Lastname: <b>${item.last_name}</b></p>
                    <p>UserID: <b>${item.id}</b></p>
                </div>
            </div>
            <button type="button" onclick="handleOrder(${item.id})" class="w-full py-[6px] bg-violet-400 text-white rounded-md font-semibold">Order now</button>
            `
            elList.append(element)
            
        })
    })
}
function handleOrder(id){
    axios.get('https://reqres.in/api/users').then(response => {
        let newObj = response.data.data.find(item => item.id == id)
        elModal.innerHTML = `
        <div class="p-5 rounded-md absolute bg-white top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2">
            <div class="flex items-center gap-[100px]">
                <img class="rounded-md" src="${newObj.avatar}" alt="">
                <div class="flex flex-col gap-2 items-start">
                    <p class="text-[18px] text-violet-400"><b>UserID:</b> ${newObj.id}</p>
                    <p class="text-[18px] text-violet-400"><b>User Full Name:</b> ${newObj.first_name} ${newObj.last_name}</p>
                    <p class="text-[18px] text-violet-400"><b>Email:</b> ${newObj.email}</p>
                    <a onclick="sendMessage(${newObj.id})"  class="px-14 py-2 bg-violet-600 rounded-md text-white font-medium" target="_blank">Telegram Channel</a>
                </div>
            </div>
            <button onclick="handleBack()" class="absolute pointer bg-violet-600 w-[20px] h-[20px] flex justify-center items-center rounded-md right-3 top-3 text-white">X</button>
        </div>
        `
    })
    elModal.classList.add("scale-100")
}

addUsers()

function handleBack(){
    elModal.classList.remove("scale-100")
}


let CHAT_ID = "-1002184042467"
let TOKEN = "7051342615:AAFoGUaa9PngPZ9dXN_bCUBm-vvkIp1bjfM"
let URL = `https://api.telegram.org/bot${TOKEN}/sendMessage`


function sendMessage(id){
    axios.get(`https://reqres.in/api/users/${id}`).then(response => {
        let message = `<b>Order</b>\n`
        message += `<b>Name: ${response.data.data.first_name}</b>\n`
        message += `<b>Surname: ${response.data.data.first_name}</b>\n`
        message += `<b>User email: ${response.data.data.email}</b>\n`
        axios.post(URL, {
            chat_id: CHAT_ID,
            parse_mode: "html",
            text: message
        }).then(response => {
            console.log(response);
        });
    })
}