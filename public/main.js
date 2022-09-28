const deleteBtns = document.querySelectorAll(".reminder-delete")
const updateBtns = document.querySelectorAll(".reminder-update")
const editBtns = document.querySelectorAll(".reminder-edit")

Array.from(deleteBtns).forEach((btn) => {
    btn.addEventListener('click', deleteReminder)
})

Array.from(updateBtns).forEach((btn) => {
    btn.addEventListener('click', updateReminder)
})

Array.from(editBtns).forEach((btn) => {
    btn.addEventListener('click', getOneReminder)
})

async function deleteReminder() {
    const reminderId = this.parentNode.dataset.id 
    console.log(reminderId)
    try {
        const response = await fetch('all/deleteReminder', {
            method: 'delete',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'reminderIdFromJSFile': reminderId
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    } catch (err) {
        console.log(err)
    }
}

async function updateReminder() {
    const reminderId = this.parentNode.dataset.id
    try {
        const response = await fetch(`/updateReminders/${reminderId}`, {
            method: 'put', 
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'reminderIdFromJSFile': reminderId
            })
        })
        const data = await response.json()
        console.log(data)
    } catch(err) {
        console.log(err)
    }
}

async function getOneReminder() {
    console.log("Something happened!")
    const reminderId = this.parentNode.dataset.id
    try {
        const response = await fetch(`/edit/${reminderId}`, {
            method: 'get',
            headers: {'Content-type': 'application/json'}
        })
        let url = response.url;
        location.href = url
    } catch(err) {
        console.log(err)
    }
}