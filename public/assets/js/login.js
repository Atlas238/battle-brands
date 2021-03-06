console.log("Logging in");
const loginForm = document.querySelector("#loginForm");
const signupForm = document.querySelector("#signUp");

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
    const jsonData = await fetchResp.json();
    console.log("login complete");
    if(jsonData.message){
        location.assign('./profile');
    } else {
        document.querySelector("#login-error").textContent = "Incorrect email or password";
    }
});

signupForm.addEventListener("submit", async event=>{
    event.preventDefault();
    console.log("Sign-up submitted!");
    const fetchResp = await fetch("./user",{
        method:"POST",
        body:JSON.stringify({
            username: document.querySelector("#signUpUsername").value,
            email: document.querySelector("#signUpEmail").value,
            password: document.querySelector("#signUpPassword").value,
        }),
        headers:{
            "Content-Type":"application/json"
        }
    });
    const jsonData = await fetchResp.json();
    if(jsonData.message){
        location.assign('./profile');
    } else {
        document.querySelector("#signUp-error").textContent = "Sign-up fields have invalid data";
    }
});
