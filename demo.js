fetch('user/post', {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        name: "Mansoor Hussain",
        email: "m@gmail.com",
        age: 19
    })
})
    .then((res) => {
        return res.json()
    })
    .then(result => console.log(result))


fetch('user/getAll')
    .then((res) => res.json())
    .then((result) => console.log(result))