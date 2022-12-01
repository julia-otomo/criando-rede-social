function usersSugestionsArray (arr) {
    const newArr = []; 
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < users.length; j++) {
            if (users[j].id === arr[i]) {
                newArr.push(users[j]);
            }
        }  
    }
    return newArr;
}

function renderUsersSugestions () {
    let usersArr = usersSugestionsArray (sugestUsers);
    let usersList = document.querySelector('#users-list');

    for (let i = 0; i < usersArr.length; i++) {
        let li = document.createElement('li');
        li.id = usersArr[i].id;

        let usersItems = document.createElement('div');
        usersItems.classList.add('users__items');

        let img = document.createElement('img');
        img.src = usersArr[i].img;

        let usersName = document.createElement('div');
        usersName.classList.add('users__name');

        let title = document.createElement('h2');
        title.innerText = usersArr[i].user;

        let p = document.createElement('p');
        p.innerText = usersArr[i].stack;

        usersName.append(title, p);

        usersItems.append(img, usersName);

        let followButton = document.createElement('button');
        followButton.classList.add('follow-button');
        followButton.innerText = 'Seguir'

        li.append(usersItems, followButton);

        usersList.appendChild(li);
    }
}

function followSystem () {
    let buttons = document.querySelectorAll('.follow-button');
    let boolean = true;

    for (let button = 0; button < buttons.length; button++) {
        let followButton = buttons[button];

        followButton.addEventListener('click', () => {
            followButton.classList.add('change-follow-button');
            followButton.innerHTML = 'Seguindo';
        })
    } 
}

renderUsersSugestions ()
followSystem ()