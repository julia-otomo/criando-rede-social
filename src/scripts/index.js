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

    for (let button = 0; button < buttons.length; button++) {
        let followButton = buttons[button];

        followButton.addEventListener('click', () => {
            followButton.classList.toggle('change-follow-button');
             if (followButton.classList.contains('change-follow-button')) {
                followButton.innerText = 'Seguindo'
            } else {
                followButton.innerText = 'Seguir'
            }
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
        heartButton.id = `h_${arr[i].id_post}`;

        let span = document.createElement('span');
        span.id = `s_${arr[i].id_post}`
        span.innerText = 0;

        heartButtonDiv.append(heartButton, span);

        postsButtons.append(showPost, heartButtonDiv);

        li.append(user, title, text, postsButtons);
        postsList.appendChild(li);
    }
} 

function renderModal () {
    const modalContainer = document.querySelector('.modal_container');
    let buttons = document.querySelectorAll('[data-show-modal]');

    for (let i = 0; i < buttons.length; i++) {
        let button = buttons[i];
        
        button.addEventListener('click', () => {
            let modal = createModal (button.dataset.showModal);

            modalContainer.innerHTML = '';

            modalContainer.appendChild(modal);

            modalContainer.showModal();

            closeModal();
        })
    }
}

function createModal (id) {
    let modal = document.createElement('div');
    modal.classList.add('modal');

    let closeButton = document.createElement('button');
    closeButton.classList.add('modal__button');
    closeButton.innerText = 'X';

    let title = document.createElement('h2');

    let text = document.createElement('p');

    for (let i = 0; i < posts.length; i++) {
        if (posts[i].id_post === Number(id)) {
            let users = createUserById(posts[i].user);

            title.innerText = posts[i].title;

            text.innerText = posts[i].text;

            modal.append(closeButton, users, title, text);
        }
    }
    return modal;
}

function closeModal () {
    let modalContainer = document.querySelector('.modal_container');
    let closeButton = document.querySelector('.modal__button');

    closeButton.addEventListener('click', () => {
        modalContainer.close();
    })
}

function likeFuncionality () {
    let buttons = document.querySelectorAll('.heart-grey');

    for (let i = 0; i < buttons.length; i++) {
        let button = buttons[i];
        
        button.addEventListener('click', () => {
            let buttonId = button.id.substring(2);
            let span = document.querySelector(`#s_${buttonId}`);
            
            button.classList.toggle('heart-button-red');

            if (button.classList.contains('heart-button-red')) {
                span.style.display = 'inline-block';

                span.innerText = 1;
            } else {
                span.style.display = 'none';
                span.innerText = 0;
            }
        })
    }
}

function newPost () {
    let button = document.querySelector('.post-button');
    let input = document.querySelector('input');
    let textarea = document.querySelector('textarea');
    let ulPosts = document.querySelector('#posts-list');

    button.addEventListener('click', (e) => {
        e.preventDefault();

        let count = 3;

        count++

        let objPost = {
        id_post: count,
        user: 1,
        title: input.value,
        text: textarea.value
        }

        if (input.value === '' || textarea.value === '') {
            return alert('Algum dos campos está vazio, por favor verifique.');
        } else {
          posts.push(objPost);
            ulPosts.innerHTML = '';
            renderPosts(posts);
            renderModal ();
            likeFuncionality (); 
            input.value = '';
            textarea.value = '';
        } 
    })
}
    
renderUsersSugestions ()
followSystem ()
newPost ();
renderPosts (posts);
renderModal ()
likeFuncionality ()
