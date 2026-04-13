import a from './engineer.js'


(function() {
    let input = document.querySelector('.pick-input')
    let img = document.querySelector('.preview')
    let url = null

    input.addEventListener('change', () => {
        let file = input.files && input.files[0]
        if(!file || !file.type.startsWith("image/")){
            return
        }
        if(url){
            URL.revokeObjectURL(url)
        }
        url = URL.createObjectURL(file)
        img.src = url
        let div = document.createElement('div')
        div.innerHTML = a('Engineer', 
                            21, 
                            'High-School', 
                            'Hi my name is Jhon', 
                            url)
        document.body.append(div)
    })
})();