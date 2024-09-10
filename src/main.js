import ProductOptions from "./ProductOptions.js"

const dummyData = [
    {
        optionId: 1,
        optionName: "더미 데이터다!",
        optionPrice: 10000,
        stock: 10
    },
    {
        optionId: 2,
        optionName: "더미 데이터다2!",
        optionPrice: 15000,
        stock: 10
    },
    {   
        optionId: 3,
        optionName: "더미 데이터다3!",
        optionPrice: 10000,
        stock: 0
    }
]

const $target = document.querySelector("#app")
new ProductOptions({
    $target,
    initialState: dummyData
})