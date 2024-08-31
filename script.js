const input = document.getElementById("input")
const todoList = document.getElementById('todoList')

let isInputFocused = false

let savedList = localStorage.getItem("List") ? JSON.parse(localStorage.getItem("List")) : []

let commentVal = ""

function LoadData()
{
    if(savedList)
    {
        for(let i = 0; i < savedList.length; i++)
        {
            const ItemValue = savedList[i].header
            AddItem(ItemValue)
        }
    }
}

function AddItem(ItemValue) {
    const inputVal = input.value
    if(inputVal === "" && !ItemValue) return
    
    const li = document.createElement('li');
    const textNode = document.createElement('span')
    textNode.textContent = input.value.length >= 1 ? inputVal : ItemValue
    li.appendChild(textNode)
    
    const btnBlock = document.createElement('div')
    btnBlock.className = "button-block"
    li.appendChild(btnBlock)

    const editBtn = document.createElement('button')

    const edit = document.createElement('img')
    edit.src = "img/edit.svg"
    edit.style.width = "30px"
    edit.style.height = "30px"

    editBtn.onclick = (event) => {
        event.stopPropagation();
        EditItem(li, textNode, btnBlock, editBtn, infoBtn)
    };
    
    const infoBtn = document.createElement('button')
    const info = document.createElement('img')

    info.src = "img/info.svg"
    info.style.width = "30px"
    info.style.height = "30px"
    
    infoBtn.onclick = (event) => {
        event.stopPropagation()
        Info(textNode, fullDate)
        
        const blur = document.getElementById('blur')
    }
    
    btnBlock.appendChild(editBtn)
    btnBlock.appendChild(infoBtn)
    
    editBtn.appendChild(edit)
    infoBtn.appendChild(info)

    todoList.appendChild(li)
    input.value = ""
    
    li.style.backgroundColor = toggle.checked ? "#f9f9f9" : "#3c3c3c"
    li.style.color = toggle.checked ? "black" : "white"

    const date = new Date()
    let fullDate = ``

    function GetDate(i)
    {
        const monthDate = 
        [
            "Jan", "Feb", "Mar", "Apr", 
            "May", "Jun", "Jul", "Aug",
            "Sep", "Oct", "Nov", "Dec"
        ]
        fullDate += monthDate[i] + " " + date.getDate()
    }
    GetDate(date.getMonth())

    if (!ItemValue) 
    {
        const object = {
            header: inputVal,
            info: commentVal,
            date: fullDate
        }
        savedList.push(object)
        localStorage.setItem("List", JSON.stringify(savedList))
    }
}

function ClearAll() {
    todoList.innerHTML = ""
    savedList = []
    localStorage.clear()
}

function EditItem(li, textNode, btnBlock, editBtn, infoBtn) {
    const currentText = textNode.textContent
    const editInput = document.createElement('input')
    
    editInput.value = currentText
    li.insertBefore(editInput, textNode)
    li.removeChild(textNode)

    editInput.className = 'edit-input'
    editInput.focus()
    toggle.onchange = () => {
        editInput.style.color = toggle.checked ? "black" : "white"
        editInput.style.transition = "0.5s"
        Toggler()
    }

    document.querySelectorAll("li > input").forEach((input) => {
        editInput.style.color = toggle.checked ? "black" : "white"
    })

    editBtn.remove()
    infoBtn.remove()

    const check = document.createElement("button")
    check.className = "check"

    const checked = document.createElement('img')
    checked.src = "img/check.svg"
    checked.style.width = "30px"
    checked.style.height = "30px"

    const del = document.createElement("button")
    del.className = "del"

    const deled = document.createElement('img')
    deled.src = "img/trash.svg"
    deled.style.width = "30px"
    deled.style.height = "30px"

    check.appendChild(checked)
    del.appendChild(deled)

    btnBlock.appendChild(check)
    btnBlock.appendChild(del)

    check.onclick = () => {
        check.remove()
        del.remove()

        if(editInput.value == "") {
            li.remove()
            savedList = savedList.filter(item => item.header !== currentText)
        }
        else
        {
            li.insertBefore(textNode, editInput)
            textNode.textContent = editInput.value
            li.removeChild(editInput)

            const itemIndex = savedList.findIndex(item => item.header === currentText)
            if (itemIndex !== -1) {
                savedList[itemIndex].header = editInput.value
            }
        }

        localStorage.setItem("List", JSON.stringify(savedList))

        btnBlock.appendChild(editBtn);
        btnBlock.appendChild(infoBtn);
    }

    del.onclick = () =>
    {
        li.remove()
        localStorage.setItem("List", JSON.stringify(savedList))
    }
}

function Info(textNode, fullDate)
{
    const window = document.createElement('div')
    window.className = "window"

    const header = document.createElement('input')
    header.className = "edit-input"
    header.style.width = "100%"
    header.style.fontSize = "2rem"
    header.style.fontWeight = "bold"
    header.style.marginLeft = "12px"
    header.value = textNode.textContent
    header.style.color = toggle.checked ? "black" : "white"

    let headerVal = textNode.textContent

    header.onchange = () => {
        const headerValue = header.value
        headerVal = headerValue
    }

    const comment = document.createElement('input')
    comment.className = "edit-input"
    comment.style.width = "100%"
    comment.style.marginLeft = "12px"
    comment.style.marginTop = "12px"
    comment.style.color = toggle.checked ? "black" : "white"
    comment.placeholder = "Add a comment..."

    comment.value = commentVal

    comment.onchange = () => {
        const commentValue = comment.value
        commentVal = commentValue
    }

    const crossContainer = document.createElement('div')
    crossContainer.style.display = "flex"
    crossContainer.style.justifyContent = "flex-end"

    const cross = document.createElement('div')
    cross.style.cursor = "pointer"

    const crossik = document.createElement('img')
    crossik.src = toggle.checked ? "img/black_cross.svg" : "img/white_cross.png"
    crossik.style.width = toggle.checked ? "25px" : "15px"
    crossik.style.height = toggle.checked ? "25px" : "15px"

    const dateContainer = document.createElement('div')
    dateContainer.style.display = "flex"
    dateContainer.style.marginLeft = "12px"

    const clock = document.createElement('img')
    clock.src = toggle.checked ? "img/black_clock.svg" : "img/white_clock.svg"
    clock.style.width = "18px"
    clock.style.height = "18px"
    clock.style.marginTop = "15px"
    clock.style.marginRight = "4px"

    const fullDateMark = document.createElement('p')
    fullDateMark.textContent = fullDate
    fullDateMark.style.color = toggle.checked ? "black" : "white"

    window.style.backgroundColor = toggle.checked ? "#f9f9f9" : "rgb(44, 44, 44)"
    
    document.body.style.backgroundColor = toggle.checked ? "rgba(0, 0, 0, 0.3)" : "hsl(0, 0%, 8%)"
    document.body.appendChild(window)

    window.appendChild(crossContainer)
    crossContainer.appendChild(cross)
    cross.appendChild(crossik)
    
    window.appendChild(header)
    window.appendChild(comment)
    window.appendChild(dateContainer)
    
    dateContainer.appendChild(clock)
    dateContainer.appendChild(fullDateMark)

    cross.onclick = function()
    {
        window.remove()
        document.body.style.backgroundColor = toggle.checked ? "#f4f4f4" : "#1c1c1c"
        textNode.textContent = headerVal
    }
}

const toggle = document.querySelector('.toggle')
const hours = new Date().getHours();
toggle.checked = hours > 7 && hours < 20;

toggle.onchange = Toggler

function Toggler() 
{    
    if(toggle.checked)
    {
        document.body.style.backgroundColor = "#f4f4f4"
        document.getElementById("main-container").style.backgroundColor = "white"
        document.getElementById("label").style.color = "black"
        input.style.backgroundColor = "white"
        input.style.borderColor = "#ccc"
        input.style.color = "black"

        document.querySelectorAll("li").forEach((li) => {
            li.style.color = "black"
            li.style.backgroundColor = "#f9f9f9"
        })
    }
    else if(!toggle.checked)
    {
        document.body.style.backgroundColor = "#1c1c1c"
        document.getElementById("main-container").style.backgroundColor = "#2c2c2c"
        document.getElementById("label").style.color = "white"
        input.style.backgroundColor = "#2c2c2c"
        input.style.borderColor = "rgb(118, 118, 118)"
        input.style.color = "white"

        document.querySelectorAll("li").forEach((li) => {
            li.style.color = "white"
            li.style.backgroundColor = "#3c3c3c"
        })
    }
}
Toggler()

input.onfocus = () => {
    isInputFocused = true
    input.style.borderColor = toggle.checked ? "#555" : "#ccc"
}

input.onblur = () => {
    isInputFocused = false
    input.style.borderColor = toggle.checked ? "#ccc" : "#555"
}

LoadData()