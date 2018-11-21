'use strict'
const React = require('react')

export default class BookmarksList extends React.Component {
    constructor (props) {
        super(props)
    }

    bookmarksList(bookmarks) {
        const listItems = bookmarks.map((bookmark) =>
                                      <li>{bookmark}</li>
                                     );
        return (
                <ul>{listItems}</ul>
        );
    }

    render () {
        return <div>
            {this.bookmarksList([1, 2, 3])}
        </div>
    }
}
