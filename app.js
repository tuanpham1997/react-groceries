class App extends React.Component {
    state = {
        groceries: groceriesList,
        item: '',
        brand: '',
        units: '',
        quantity: 0,
        isPurchased: false
    }
    handleChange = (e) => {
        this.setState({ [e.target.id]: e.target.value })
    }
    handleToggle = (item, brand) => {
        const updatedList = this.state.groceries.map(grocery => {
            if (grocery.item === item && grocery.brand === brand) {
                return { ...grocery, isPurchased: !grocery.isPurchased }
            }
            return grocery
        })
        this.setState({ groceries: updatedList })
    }
    handleSubmit = (e) => {
        e.preventDefault()
        const newItem = {
            item: this.state.item,
            brand: this.state.brand,
            units: this.state.units,
            quantity: this.state.quantity,
            isPurchased: false
        }
        this.setState({
            groceries: [newItem, ...this.state.groceries],
            item: '',
            brand: '',
            units: '',
            quantity: 0
        })
    }
    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="item">Item:</label>
                    <input type="text" value={this.state.item} onChange={this.handleChange} id="item" />
                    <label htmlFor="brand">Brand:</label>
                    <input type="text" id="brand" value={this.state.brand} onChange={this.handleChange} />
                    <label htmlFor="units">Units:</label>
                    <input type="text" id="units" value={this.state.units} onChange={this.handleChange} /><label htmlFor="quantity">Quantity:</label>
                    <input type="number" id="quantity" min="0" value={this.state.quantity} onChange={this.handleChange} />
                    <input type="submit" />
                </form>
                <h1>Groceries</h1>
                <ul className='container'>
                    {this.state.groceries.map(grocery =>
                        <li className="item">
                            {!grocery.isPurchased ?
                                <div>
                                    <p>Item: {grocery.item}</p>
                                    <p>Brand: {grocery.brand}</p>
                                    <p>Unit: {grocery.units}</p>
                                    <p>Quantity: {grocery.quantity}</p>
                                    <button onClick={this.handleToggle.bind(this, grocery.item, grocery.brand)}>Buy</button>
                                </div> :
                                <div>
                                    <p>Bought {grocery.brand} {grocery.item}</p>
                                    <button onClick={this.handleToggle.bind(this, grocery.item, grocery.brand)}>Re-add item</button>
                                </div>}
                        </li>
                    )}
                </ul>
            </div>
        )
    }
}



ReactDOM.render(
    <App />,
    document.querySelector('.container')
)