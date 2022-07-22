console.log('productAdd.js success!');

document.getElementById('image1').addEventListener('change', (e) => {
    let reader = new FileReader();
    reader.readAsDataURL(e.target.files[0])
    reader.onload = () => {
        document.getElementById('imagePrev1').src = reader.result
    }
});

document.getElementById('image2').addEventListener('change', (e) => {
    let reader = new FileReader();
    reader.readAsDataURL(e.target.files[0])
    reader.onload = () => {
        document.getElementById('imagePrev2').src = reader.result
    }
});

document.getElementById('image3').addEventListener('change', (e) => {
    let reader = new FileReader();
    reader.readAsDataURL(e.target.files[0])
    reader.onload = () => {
        document.getElementById('imagePrev3').src = reader.result
    }
})