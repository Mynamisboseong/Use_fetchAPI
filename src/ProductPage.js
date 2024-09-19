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

    this.render = () => { }
    this.render()
}