//외부모듈 import.
import ProductOptions from "./ProductOptions.js"
import { request } from "./api.js"

//#app이라는 id를 가진 DOM요소를 선택한다. 해당 요소는 ProductOptions컴포넌트가 렌더링 될 대상이 됨
const $target = document.querySelector("#app")

//기본으로 사용할 제품의 ID임. 제품 ID가 1인 상품의 옵션데이터를 불러오는데 사용된다.
const DEFAULT_PRODUCT_ID = 1

//옵션데이터를 가져오는 함수 fetchOptionData
const fetchOptionData = (productId) => {
    //첫 번째 API 요청(특정 productId에 해당하는 제품 데이터를 가져옴)
    return request(`/products/${productId}`)
        //두 번째 API 요청(첫 번째 요청에서 받은 제품ID에 해당하는 제품 옵션들을 가져옴)
        .then(product => {
        return request (`/product-options?product.id=${product.id}`)
        })
        //세 번째 API 요청(각 옵션 ID에 해당하는 재고 데이터를 가져옴)
        .then(productOptions => {
            //여러 옵션의 재고 정보를 병렬적으로 가져오기 위해 promise.all을 사용함
            return Promise.all([
                Promise.resolve(productOptions),
                Promise.all(
                    productOptions.map(productOption => productOption.id).map(id => {
                        return request(`/product-option-stocks?productOption.id=${id}`)
                    })
                )
            ])
        })
        //세 번째 요청에서 받은 재고 정보를 각 옵션에 맞게 매핑하여 optionData 배열을 만든다.
        //해당 배열은 각각의 옵션 정보(ID,이름,가격,재고)를 담고있음
        .then(data => {
            const [productOptions, stocks] = data
            const optionData = productOptions.map((productOption,i) => {
                const stock = stocks[i][0].stock

                return {
                    optionId: productOption.id,
                    optionName: productOption.optionName,
                    optionPrice: productOption.optionPrice,
                    stock: stock.stock
                }
            })
            //컴포넌트 상태 업데이트. 가져온 옵션데이터를 ProductOptions 컴포넌트에 전달, 해당 옵션들이 화면에 렌더링 될 수 있도록 setState를 호출
            productOptionsComponent.setState(optionData)
        })
}

//옵션데이터를 불러오는 함수를 호출. 초기 로딩 시 기본적으로 1번 제품의 옵션들이 화면에 표시됨
fetchOptionData(DEFAULT_PRODUCT_ID)
//ProductOptions 컴포넌트 초기화
const productOptionsComponent = new ProductOptions({
    $target,
    initialState: [],
    onSelect: (option) => {
        alert(option.optionName)
    }
})