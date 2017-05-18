console.log('hello')

var arr = ['These', 'are', 'contents', 'of', 'an', 'array'];

for ( var i = 0; < arr.length; i++ ) {
  console.log('hello loop')
  document.getElementById('demo').innerHTML = arr[i];
}