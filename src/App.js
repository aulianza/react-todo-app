import React, { Component } from 'react';
import TodoList from "./components/TodoList";
import TodoItems from "./components/TodoItems"
import axios from "axios";
import './App.css';

class App extends Component {
  constructor(){
    super()
    this.state = {
      items: [],
      currentItem: {text: '', key: ''}
    }
    this.inputElement = React.createRef()
  }

  componentDidMount = () => {
    this.getData()
  }

  handleInput = ({target}) => {
    const itemText = target.value
    const currentItem = { title: itemText, id: Date.now() }
    this.setState({
      currentItem:{...currentItem}
    })
  }
  addItem = async (e) => {
    const {currentItem, items} = this.state
    e.preventDefault()
    const newItem = currentItem
    if (newItem.title !== '') {

      let data = await axios.post('https://jsonplaceholder.typicode.com/posts', {
        title: newItem.title
      })

      this.setState({
        items: [...items, data.data],
        currentItem: { title: '', id: '' },
      })
    }
  }
  deleteItem = async (id) => {

    let data = await axios.delete('https://jsonplaceholder.typicode.com/posts/' + id)
    console.log(data)

    const filteredItems = this.state.items.filter(item => {
      return item.id !== id
      
    })
    this.setState({
      items: filteredItems,
    })
  }
  getData = async () => {
    let {data} = await axios.get('https://jsonplaceholder.typicode.com/todos')
    this.setState({
      items: data
    })
  }

  render() {
    return (
      <div className="App">
        <TodoList 
          addItem={this.addItem}
          inputElement={this.inputElement}
          handleInput={this.handleInput}
          currentItem={this.state.currentItem}

        />

        <TodoItems 
          entries={this.state.items}
          deleteItem={this.deleteItem}
        />
      </div>
    )
  }
}

export default App;
