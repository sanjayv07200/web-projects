const Database = require("./Database.js");
const Issue = require("./Issue.js");

class Member {
  constructor(name, address, phone) {
    this.id = Member.#createId(name, phone);
    this.name = name;
    this.address = address;
    this.phone = phone;
    this.issus = [];
    Member.#save(this);
  }

  issueBook(book) {
    if (book.issue_id) {
      console.log(
        `Sorry "${this.name}", This Book Alreay been issued, please try later`
      );
      return;
    }

    if (this.issus.length === 2) {
      console.log(
        `Sorry "${this.name}", you have arlready reached at limit of books.`
      );
      return;
    }

    const issue = new Issue(this.id, book.isbn);

    book.issueBook(issue.id);

    this.issus.push(issue.id);

    console.log(
      `Congratulation "${this.name}", we issue you the book with ISBN : ${book.isbn}`
    );
    Member.#save(this);
  }

  returnBook(book) {
    Issue.remove(book.issue_id);

    this.issus = this.issus.filter((issue_id) => issue_id !== book.issue_id);
    book.unIssueBook();
    console.log(`${this.name} returnd ${book.isbn}`);
    Member.#save(this);
  }

  static remove(member) {
    Database.remove("members", member.id);
  }

  static #save(member) {
    Database.add("members", member.id, member);
  }

  static #createId(name, phone) {
    return `${name.toLowerCase().slice(0, 4)}-${phone}`;
  }
}

module.exports = Member;
