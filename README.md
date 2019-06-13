# remote-data-react

>  Promise-based React data loader

[![NPM](https://img.shields.io/npm/v/remote-data-react.svg)](https://www.npmjs.com/package/remote-data-react) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save remote-data-react
```

## Basic usage

```jsx
import React, { Component } from 'react';
import RemoteData from 'remote-data-react';

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      books: RemoteData.NotAsked()
    };
  }

  componentDidMount() {
    fetch('http://my.api/v2/books')
    .then(response => this.setState({
      books: RemoteData.Success(response.data)
    }))
    .catch(response => this.setState({
      books: RemoteData.Failure(response.data.errors)
    }))
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
              // Display content
            </ul>
          )}
          failure={() => (
            <span>Something went wrong!</span>
          )}/>
      </div>
    )
  }
}
```

## Multiple models

```jsx
import React, { Component } from 'react';
import RemoteData from 'remote-data-react';

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      books: RemoteData.NotAsked(),
      authors: RemoteData.NotAsked()
    };
  }

  componentDidMount() {
    fetch('http://my.api/v2/books')
    .then(response => this.setState({
      books: RemoteData.Success(response.data)
    }))
    .catch(response => this.setState({
      books: RemoteData.Failure(response.data.errors)
    }));
    
    
    fetch('http://my.api/v2/authors')
    .then(response => this.setState({
      authors: RemoteData.Success(response.data)
    }))
    .catch(response => this.setState({
      authors: RemoteData.Failure(response.data.errors)
    }));
  }

  render () {
    return (
      <div>
        <h1>JavaScript Books</h1>
        <RemoteData.Case
          model={RemoteData.join([this.state.books, this.state.authors])}
          defaults={() => (
            <span>Loading...</span>
          )}
          success={([books, authors]) => {
            //Display content
          }}
          failure={() => (
            <span>Something went wrong!</span>
          )}/>
      </div>
    )
  }
}
```

## Usage with Redux

```js
// actions.js
import { dispatchPromise } from 'remote-data-react/redux';

const GET_BOOKS = 'GET_BOOKS';
const GET_AUTHORS = 'GET_AUTHORS';

export const getBooks = () => (dispatch) => {
  return dispatchPromise({
    dispatch,
    promise: Books.getAll(),
    actionType: GET_AUTHORS,
    mapSuccess: ({ data }) => data,
    mapFailure: error => error.response.data,
  });
};

export const getAuthors = () => (dispatch) => {
  return dispatchPromise({
    dispatch,
    promise: Authors.getAll(),
    actionType: GET_AUTHORS,
    mapSuccess: ({ data }) => data,
    mapFailure: error => error.response.data,
  });
};
```

```js
//reducer.js
import { GET_BOOKS, GET_AUTHORS } from './actions';
import RemoteData from 'lib/remote-data';

export const INITIAL_STATE = {
  books: RemoteData.NotAsked(),
  authors: RemoteData.NotAsked(),
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_BOOKS:
      return {
        ...state,
        books: action.payload,
      };
    case GET_AUTHORS:
      return {
        ...state,
        authors: action.payload,
      };
    default:
      return state;
  }
};
```

```jsx
import React, { Component } from 'react';
import RemoteData from 'remote-data-react';

export default class App extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.getBooks();
    this.props.getAuthors();
  }

  render () {
    return (
      <div>
        <h1>JavaScript Books</h1>
        <RemoteData.Case
          model={RemoteData.join([this.props.books, this.props.authors])}
          loading={() => (
            <span>Loading...</span>
          )}
          success={([books, authors]) => {
            //Display content
          }}
          failure={() => (
            <span>Something went wrong!</span>
          )}/>
      </div>
    )
  }
}
```

## ISC License

Copyright (c) 2019 Gert Hengeveld

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted, provided that the above
copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
