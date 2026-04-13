let h1 = document.createElement('h1')
let inputMoney = document.createElement('input')
let inputDesc = document.createElement('input')
let plus = document.createElement('button')
let minus = document.createElement('button')

let func = (arr) => {
    let balance = 0
    let div = document.createElement('div')
    for(let el of arr){
        let h2 = document.createElement('h2')
        let p = document.createElement('p')
        let div2 = document.createElement('div')
        div2.append(h2)
        div2.append(p)
        h2.textContent = el.type + " " + el.oper
        p.textContent = el.desc
        if(el.type === 'plus'){
            balance += +el.oper
            console.log(balance);
        } else {
            balance -= +el.oper
            console.log(balance);
        }
        div.append(div2)
    }
    document.body.append(h1)
    document.body.append(inputMoney)
    document.body.append(inputDesc)
    document.body.append(plus)
    document.body.append(minus)
    document.body.append(div)
    plus.textContent = "+"
    minus.textContent = "-"
    h1.textContent = 'Mой баланс === ' + balance
}


let transaction = []
func(transaction)

plus.addEventListener('click', () => {
    document.body.textContent = ''
    transaction.push({
        type: "plus",
        oper: +inputMoney.value,
        desc: inputDesc.value
    })
    inputMoney.value = ''
    inputDesc.value = ''
    console.log(transaction);
    func(transaction)
})

minus.addEventListener('click', () => {
    document.body.textContent = ''
    transaction.push({
        type: "minus",
        oper: +inputMoney.value,
        desc: inputDesc.value
    })
    inputMoney.value = ''
    inputDesc.value = ''
    console.log(transaction);
    func(transaction)
})
