import React from "react";
import { bookData } from "../data/bookData";

const LibraryContext = React.createContext();

export class Provider extends React.Component {
  state = {
    books: [],
    members: []
  };

  componentDidMount() {
    this.fetchMemberData();
    this.fillBookData();
  }

  prevMemberId = 0;

  fetchMemberData() {
    fetch("https://randomuser.me/api/?nat=CA&results=8")
      .then(data => data.json())
      .then(data =>
        data.results.map(member => {
          const item = {
            name: {
              first: member.name.first,
              last: member.name.last
            },
            address: member.location.street,
            city: member.location.city,
            province: member.location.city,
            phone: member.phone,
            book: null,
            id: `member-${(this.prevMemberId += 1)}`
          };
          return item;
        })
      )
      .then(data =>
        this.setState({
          members: data
        })
      );
  }

  fillBookData() {
    this.setState({
      books: bookData
    });
  }

  prevBookId = 8;

  registerBook = (title, author, desc, img_src) => {
    this.setState(prevState => {
      return {
        books: [
          ...prevState.books,
          {
            title,
            author,
            desc,
            availability: {
              isAvailable: false,
              assignedMember: null
            },
            isPaperBack: true,
            img_src,
            id: `book-${(this.prevBookId += 1)}`
          }
        ]
      };
    });
  };

  registerMember = (first, last, address, city, province, phone) => {
    this.setState(prevState => {
      return {
        members: [
          ...prevState.members,
          {
            name: {
              first,
              last
            },
            address,
            city,
            province,
            phone,
            book: null,
            id: `member-${(this.prevMemberId += 1)}`
          }
        ]
      };
    });
  };

  checkoutBook = (bookIndex, memberIndex) => {
    const book = this.state.books[bookIndex];
    const books = this.state.books;
    const member = this.state.members[memberIndex];
    const members = this.state.members;

    books[bookIndex].availability.assignedMember = member;
    books[bookIndex].availability.isAvailable = false;

    members[memberIndex].book = book;

    this.setState({
      members: members,
      books: books
    });
  };

  checkinBook = (bookIndex, memberIndex) => {
    const books = this.state.books;
    const members = this.state.members;

    books[bookIndex].availability.assignedMember = null;
    books[bookIndex].availability.isAvailable = true;

    members[memberIndex].book = null;

    this.setState({
      members: members,
      books: books
    });
  };

  render() {
    return (
      <LibraryContext.Provider
        value={{
          books: this.state.books,
          members: this.state.members,
          actions: {
            registerBook: this.registerBook,
            registerMember: this.registerMember,
            checkoutBook: this.checkoutBook,
            checkinBook: this.checkinBook
          }
        }}
      >
        {this.props.children}
      </LibraryContext.Provider>
    );
  }
}

export const Consumer = LibraryContext.Consumer;
