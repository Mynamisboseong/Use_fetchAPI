//해당 코드의 핵심은 옵션목록을 state로 관리하고, 렌더링과 이벤트처리를 통해 사용자와 상호작용하는 기능임.

//$target:ProductOptions 컴포넌트가 렌더링될 DOM요소를 의미함. select 태그를 어느 DOM요소에 추가할지 결정함.
//initialState:초기상태로 전달되는 값. 옵션의 리스트(이름,가격,재고)
//onSelect:사용자가 옵션을 선택했을 때 호출되는 콜백함수임. select에서 옵션을 선택하면 해당 옵션의 정보를 전달함
export default function ProductOptions({ $target, initialState, onSelect }) {
    
    //select태그를 생성하고 $select DOM요소에 저장, $target에 자식요소로 추가.
    //해당 태그는 사용자가 옵션을 선택할 수 있게해주는 UI요소임.
    const $select = document.createElement('select')
    $target.appendChild($select)

    //전달받은 initialState를 state로 저장함. state는 옵션목록을 랜더링할 때 사용됨.
    this.state = initialState

    //state를 업데이트하는 역할임. nextState를 받고 state를 변경. 변경 후 render()
    this.setState = (nextState) => {
        this.state = nextState
        this.render()
    }

    //옵션의 전체이름을 만드는 함수, API의 속성을 가지고 이름을 설정함
    const createOptionFullName = ({ optionName, optionPrice, stock}) => {
        return `${optionName} ${optionPrice > 0 ? `(옵션가 ${optionPrice}` : ''} | ${stock > 0 ? `재고 ${stock}` : '재고없음'}}`
    }

    //select태그의 change 이벤트리스너. 선택된 옵션의 value값을 가져오고 해당 optionId와 일치하는 옵션을 this.state에서 찾음
    //그 후 onSelect 콜백을 호출해 선택된 옵션을 전달함
    $select.addEventListener('change', (e) => {
        const optionId = parseInt(e.target.value)

        const option = this.state.find(option => option.optionId === optionId)

        if (option) {
            onSelect(option)
        }
    })

    //렌더링 함수. select태그의 옵션목록을 렌더링 함.
    this.render = () => {
        if (this.state && Array.isArray(this.state)) {
            $select.innerHTML = `
            <option>선택하세요!</option>
            ${this.state.map(option => `<option ${option.stock === 0 ? 'disabled' : ''} value = "${option.optionId}"> ${createOptionFullName(option)}</option>`).join('')}
            `
        }
    }
    //컴포넌트가 생성될 때 초기 state를 기반으로 한번 렌더링 함.
    this.render()
}