

const product = {
    plainBurger:{
        name:'Гамбургер простой',
        price: 25000,
        kcall: 500,
        amount: 0,
        get summ(){
            return this.price * this.amount;
        },
        get Kcallsumm(){
            return this.kcall * this.amount;
        },
    },
    freshBurger:{
        name:'Гамбургер FRESH',
        price: 40000,
        kcall: 750,
        amount: 0,
        get summ(){
            return this.price * this.amount;
        },
        get Kcallsumm(){
            return this.kcall * this.amount;
        },
    },
    freshCombo:{
        name:'FRESH COMBO',
        price: 55000,
        kcall: 950,
        amount: 0,
        get summ(){
            return this.price * this.amount;
        },
        get Kcallsumm(){
            return this.kcall * this.amount;
        },
    },
}

const extraProduct = {
    doubleMayonnaise:{
        name: 'Двойной майонез',
        price: 5000,
        kcall: 50
    },
    lettuce:{
        name: 'Салатный лист',
        price: 1000,
        kcall: 10
    },
    cheese:{
        name: 'Сыр',
        price:3000,
        kcall:153
    },
}



const main__product_checkbox = document.querySelectorAll('.main__product-checkbox');



const btnPluseOrMinus = document.querySelectorAll('.main__product-btn ');

for (let i = 0; i < btnPluseOrMinus.length ; i++) {
    btnPluseOrMinus[i].addEventListener('click', function() {
        PluseOrMinus(this)
    }) 
    
}

function PluseOrMinus(element) {
    let parentID = element.closest('.main__product').getAttribute('id');
    
    out = element.closest('.main__product').querySelector('.main__product-num');
    price = element.closest('.main__product').querySelector('.main__product-price span');
    kcall = element.closest('.main__product').querySelector('.main__product-call span');
    
    if (element.getAttribute('data-symbol') == '+' && product[parentID].amount < 13 ) {
        product[parentID].amount++;
    }
    
    
    
    else if (element.getAttribute('data-symbol') == '-' && product[parentID].amount > 0 ) {
        product[parentID].amount--;
    }
    
    out.innerHTML = product[parentID].amount;
    price.innerHTML = product[parentID].summ;
    kcall.innerHTML = product[parentID].Kcallsumm;
}


for (let i = 0; i < main__product_checkbox.length; i++) {
    main__product_checkbox[i].addEventListener('click',function () {
        addExtraProduct(this);
    })
    
}

function addExtraProduct(extraTs) {
    const parent = extraTs.closest('.main__product');
    const parentId = parent.getAttribute('id');
    
    product[parentId][extraTs.getAttribute('data-extra')] = extraTs.checked;
    
    const price = parent.querySelector('.main__product-price span');
    const kcall = parent.querySelector('.main__product-call span');
    const extraTsInfo = extraTs.getAttribute('data-extra');
    
    if(product[parentId][extraTsInfo] == true){
        product[parentId].kcall += extraProduct[extraTsInfo].kcall;
        product[parentId].price += extraProduct[extraTsInfo].price;
    }
    else{
        product[parentId].kcall -= extraProduct[extraTsInfo].kcall;
        product[parentId].price -= extraProduct[extraTsInfo].price;
    }
    
    
    kcall.innerHTML = product[parentId].Kcallsumm;
    price.innerHTML = product[parentId].summ;
    
    
}

const addCart = document.querySelector('.addCart');
const receipt = document.querySelector('.receipt');
const receipt__window = document.querySelector('.receipt__window');
const btn = document.querySelector('.receipt__window-btn');

let addProduct= [];
let addName   = '';
let addPrice  = 0;
let addKcall  = 0;


let receipt__window_out = document.querySelector('.receipt__window-out');

addCart.addEventListener('click', function() {
    
    for(const key in product){
        const productObject = product[key];
        
        if(productObject.amount > 0){
            addProduct.push(productObject);
            
            for (const newKey in productObject) {
                if (productObject[newKey] === true){
                    productObject.name += extraProduct[newKey].name;
                }
            }
        }
        
        productObject.price = productObject.summ;
        productObject.kcall = productObject.Kcallsumm;
    }
    
    for(let i = 0; i < addProduct.length; i++){
        const el = addProduct[i];
        addPrice += el.price;
        addKcall += el.kcall;
        addName += el.name;
    }
    
    receipt__window_out.innerHTML = `ВЫ купили: \n \n ${addName} \n \n Каллорийность: \n \n ${addKcall} \n \n  Стоимость покупки: \n \n  ${addPrice} сумм`;
    
    
    
    
    
    receipt.classList.add('addactive');
    receipt__window.style.top = '5%';
    
    
    
    setInterval(function() {
        receipt__window.style.top = '10%';
    }, 100)
})

// receipt__window-btn

btn.addEventListener('click', function(){
    receipt.classList.remove('addactive');
    receipt__window.style.top = '5%';
    
    setInterval(function() {
        receipt__window.style.top = '-100%';
    }, 100)
    
    
    setTimeout(function() {
        receipt.classList.remove('addactive');
    },200)

})



