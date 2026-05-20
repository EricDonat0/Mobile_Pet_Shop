

export async function petadopt() {
    const response = await fetch('https://petadopt.onrender.com/pet/pets');
    const data = await response.json();

    return data.pets;
  }

  

export async function registerUser(name, email, password, phone, confirmpassword) {
    const response = await fetch('https://petadopt.onrender.com/user/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name,
            email,
            password,
            phone,
            confirmpassword
        }),
    });
    
    const data = await response.json();

    return data;
  }

export async function loginUser(email, password) {
    const response = await fetch('https://petadopt.onrender.com/user/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email,
            password,
        }),
    });
    
    const data = await response.json();

    return data;
  }


export async function inputPet(email, password) {
    const response = await fetch('https://petadopt.onrender.com/user/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email,
            password,
        }),
    });
    
    const data = await response.json();

    return data;
  }  