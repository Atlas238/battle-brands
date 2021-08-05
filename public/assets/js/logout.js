const logoutBtn = document.querySelector("#logout");
logoutBtn.addEventListener("submit", async event=>{
    event.preventDefault();
    console.log("Logout submitted!");
    const fetchResp = await fetch("./user/logout",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        }
    });
    const jsonData = await fetchResp.json();
});