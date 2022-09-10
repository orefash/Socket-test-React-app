
const loadData = async () => {
    console.log("In load user ",)
    fetch("http://localhost:3001/get-user", {
        method: "POST",
        // credentials: "include",
        headers: {
            //   Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ })
    })
        .then((response) => {
            if (response.status === 200) return response.json();
            throw new Error("authentication has been failed!");
        })
        .then((resObject) => {
            //   setUser(resObject.user);
            console.log("get message response: ", resObject)
        })
        .catch((err) => {
            console.log(err);
        });
}

module.exports = {
    loadData: loadData
}