document.addEventListener('DOMContentLoaded', async function () {
    const username = localStorage.getItem('username');
    if (username) {
        window.location.href = "/home";
    }
});
let login = true;
function toggleSignup(event) {
    event.preventDefault();

    if (login) {
        document.getElementById("email_box").classList.remove("hidden");
        document.getElementById("register_link").innerHTML = "LOGIN";
        document.getElementById("login_button").innerHTML = "Register";
        login = false;
    } else {
        document.getElementById("email_box").classList.add("hidden");
        document.getElementById("register_link").innerHTML = "REGISTER";
        document.getElementById("login_button").innerHTML = "Login";
        login = true;
    }
}

function handleKeydown(event) {
    if (event.key === "Enter") {
        toggleSignup(event);
    }
}

document.getElementById("form_login").addEventListener("submit", function(e) {
    e.preventDefault();

    let usernameInput = document.getElementById("username");
    let emailInput = document.getElementById("email");
    let passwordInput = document.getElementById("password");

    if (!login && emailInput.value === "") {
        alert("Please fill out all fields.");
        return;
    }

    let complete = document.createElement("div");
    complete.innerHTML = `
        <div class="cursor-default flex text-black justify-center text-xl ">
            <p class="px-8 border-b-2 border-gray-200">`
        + (login ? "Welcome back " : "Thank you for registering ") + usernameInput.value + "! </p></div>";


    if (login) {
        // verify user credentials
        fetch('/api/validateUser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: usernameInput.value,
                password: passwordInput.value
            })
        }).then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        }).then(data => {
            console.log('Success:', data);
            if (data.length > 0) {
                localStorage.setItem('username', usernameInput.value);
                document.querySelector("main > div").classList.add("hidden");
                document.querySelector("main").appendChild(complete);
                setTimeout(() => {
                    window.location.href = "/home";
                }, 1000);
            } else {
                alert("Invalid username or password.");
                passwordInput.value = "";
            }
        }).catch(error => {
            console.error('Error:', error);
        });
    } else {
        // create new user
        fetch('/api/createUser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: usernameInput.value,
                email: emailInput.value,
                password: passwordInput.value
            })
        })
        //     .then(response =>
        // {
        //     console.log(response);
        //     if (!response.ok) {
        //         throw new Error('Network response was not ok');
        //     }
        //     return response.json();
        // })
            .then(data => {
            localStorage.setItem('username', usernameInput.value);
            document.querySelector("main > div").classList.add("hidden");
            document.querySelector("main").appendChild(complete);
            setTimeout(() => {
                window.location.href = "/home";
            }, 1000);
        }).catch(error => {
            console.error('Error:', error);
        });
    }
});


