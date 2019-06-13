import React, { Component } from 'react'
import RemoteData from 'react-remote-data'

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      books: RemoteData.NotAsked()
    }
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        books: RemoteData.Success([
          {
            id: 1,
            title: "You Don't Know JS"
          },
          {
            id: 2,
            title: "Eloquent Javascript"
          },
          {
            id: 3,
            title: "JavaScript The Good Parts"
          },
        ])
      })
    }, 3000)
  }

  render () {
    return (
      <div>
        <h1>JavaScript Books</h1>
        <RemoteData.Case
          model={this.state.books}
          defaults={() => (
            <span>Loading...</span>
          )}
          success={(books) => (
            <ul>
              { books.map(book => (
                <li key={book.id}>{book.title}</li>
              ))}
            </ul>
          )}
          />
      </div>
    )
  }
}
