function myFunction(event) {
  console.log(event);
}

console.log(document.getElementById('fakebutton'));
document.getElementById('fakebutton').addEventListener('click', myFunction);