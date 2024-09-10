export default function ProductOptions({ $target, initialState, onSelect }) {
    const $select = document.createElement('select')

    $target.appendChild($select)

    this.state = initialState

    this.setState = (nextState) => {
        this.state = nextState
        this.render()
    }

    const createOptionFullName = ({ optionName, optionPrice, stock}) => {
        return `${optionName} ${optionPrice > 0 ? `(옵션가 ${optionPrice}` : ''} | ${stock > 0 ? `재고 ${stock}` : '재고없음'}}`
    }

    $select.addEventListener('change', (e) => {
        console.log(e.target.value)
    })

    this.render = () => {
        if (this.state && Array.isArray(this.state)) {
            $select.innerHTML = `
            <option>선택하세요!</option>
            ${this.state.map(option => `<option ${option.stock === 0 ? 'disabled' : ''} value = "${option.id}"> ${createOptionFullName(option)}</option>`).join('')}
            `
        }
    }
    this.render()
}