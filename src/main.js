import ProductOptions from "./ProductOptions.js"
import { request } from "./api.js"

const dummyData = [
    {
        optionId: 1,
        optionName: "더미 데이터다!",
        optionPrice: 10000,
        stock: 10
    },
    {
        optionId: 2,
        optionName: "2번째 더미 데이터다!",
        optionPrice: 15000,
        stock: 10
    },
    {   
        optionId: 3,
        optionName: "3번째 더미 데이터다!",
        optionPrice: 10000,
        stock: 0
    }
]

const $target = document.querySelector("#app")

const DEFAULT_PRODUCT_ID = 1

const fetchOptionData = (productId) => {
    return request(`/products/${productId}`)
        .then(product => {
        return request (`/product-options?product.id=${product.id}`)
        })
        .then(productOptions => {
            console.log(productOptions)
        })
}

fetchOptionData(DEFAULT_PRODUCT_ID)
new ProductOptions({
    $target,
    initialState: dummyData,
    onSelect: (option) => {
        alert(option.optionName)
    }
})