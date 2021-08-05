console.log("Logging in");
const loginForm = document.querySelector("#loginForm");

loginForm.addEventListener("submit", async (event) =>{
    event.preventDefault();
    console.log("Login submitted!");
    const fetchResp = await fetch("./user/login",{
        method:"POST",
        body:JSON.stringify({
            email: document.querySelector("#loginEmail").value,
            password: document.querySelector("#loginPassword").value,
        }),
        headers:{
            "Content-Type":"application/json"
        }
    });
    // IF email correct
        // IF password correct
            // Redirect user to profile
            // ELSE incorrect pass
    console.log(fetchResp.JSON());
})