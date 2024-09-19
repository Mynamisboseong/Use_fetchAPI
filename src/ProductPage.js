/* state 구조
*   {
*       productId: 1,
*       product: product,
*       optionData: []    
*   }
*/

//ProductPage라는 함수를 default(하나의 파일에 개체 하나만 선언되어있는
//모듈을 내보낼 때 많이 사용함)하게 export함
export default function ProductPage({
    //$target:ProductPage 컴포넌트에서 만들어지는 HTML요소를 어디에 붙힐지 지정하는 역할을 함.
    //initialState:컴포넌트의 초기상태를 정의하는데 사용됨. (제품의 정보를 initialState로 받아서 화면에 표시할 수 있음)
    $target,
    initialState
}) {
    //$product 라는 DOM요소에 HTML요소를 추가하고 있음
    const $product = document.createElement('div')
    //HTML요소가 추가된 $product DOM요소를 다른곳에서 사용할 수 있게 $target에 자식요소로 추가함
    $target.appendChild($product)

    //new키워드를 통해 새로운 ProductOptions객체를 생성, 생성자 함수에 객체를 전달하여 해당객체의 초기설정
    const productOptions = new ProductOptions({
        //ProductOptions 컴포넌트가 랜더링 될 DOM요소를 의미. 즉 ProductOptions에서 생성된 HTML요소들이 $product안에 추가됨
        $target: $product,
        //ProductOptions의 초기상태로 전달됨. 상품 옵션이나 선택가능한 항목이 들어갈 수 있음. 이 데이터를 기반으로 렌더링하는데 사용됨
        initialState: [],
        //콜백함수임. ProductOptions 컴포넌트에서 어떤 옵션을 클릭했을 때 호출됨. 단순히 console.log(option)으로 클릭된 옵션을 출력만 하고있음.
        onClick: (option) => {
            console.log(option)
        }
    })

    this.setState = nextState => {
        console.log(nextState)
    }

    this.render = () => {
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
        }
        //이 함수를 기본으로 불러지게 하기 위함
        this.setState({
            ...this.state,
            optionData
        })
    this.render()
}