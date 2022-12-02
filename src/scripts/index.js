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

function createUserById (id) {
    let postUsers = document.createElement('div');
    for (let i = 0; i < users.length; i++) {
        if (users[i].id === id) {
            postUsers.classList.add('posts__users');

            let img = document.createElement('img');

            let postsUsersName = document.createElement('div');
            postsUsersName.classList.add('posts__users--name');

            let name = document.createElement('h2');

            let stack = document.createElement('p');
        
            img.src = users[i].img;

            name.innerText = users[i].user;
                    
            stack.innerText = users[i].stack;

            postsUsersName.append (name, stack);
                
            postUsers.append(img, postsUsersName);
        }
    }
    return postUsers;
}

function renderPosts (arr) {
    let postsList = document.querySelector('#posts-list');

    for (let i = 0; i < arr.length; i++) {
        let li = document.createElement('li');   
        li.id = arr[i].id_post;

        let user = createUserById (arr[i].user);

        let title = document.createElement('h2');
        title.innerText = arr[i].title;

        let text = document.createElement('p');
        text.innerText = arr[i].text;

        let postsButtons = document.createElement('div');
        postsButtons.classList.add('posts__buttons');

        let showPost = document.createElement('button');
        showPost.dataset.showModal = arr[i].id_post;
        showPost.innerText = 'Abrir Post';

        let heartButtonDiv = document.createElement('div');
        heartButtonDiv.classList.add('heart-button');

        let heartButton = document.createElement('button');
        heartButton.classList.add('heart-grey');

        let buttonImg = document.createElement('img');
        buttonImg.src = "./src/assets/img/heart_grey.svg";

        heartButton.append(buttonImg);

        let span = document.createElement('span');
        span.innerText = 0;

        heartButtonDiv.append(heartButton, span);

        postsButtons.append(showPost, heartButtonDiv);

        li.append(user, title, text, postsButtons);
        postsList.appendChild(li);
    }
} 
    
renderUsersSugestions ()
followSystem ()
renderPosts (posts);