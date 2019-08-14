let list = document.getElementsByTagName('ul')[0];
let item = document.getElementById('item');
let b = document.getElementById('butt');

console.log(list);

b.addEventListener('click', () => {
    let item = document.getElementById('item').value;
    document.getElementById('item').value = '';

    let li = document.createElement('li');
    let span = document.createElement('span');
    let button = document.createElement('button');
    

    list.appendChild(li);
    list.appendChild(button);

    document.querySelector('li').innerText = item;



});