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
      .then(response => RemoteData.Success(response.data));
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
