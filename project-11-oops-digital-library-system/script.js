const Book = require("./Utils/Book");
const Member = require("./Utils/Member");
const Database = require("./Utils/Database");

Database.clear();

//books
const book1 = new Book(
  "ISBN001",
  "JavaScript: The Good Parts",
  "Douglas Crockford"
);
const book2 = new Book("ISBN002", "JavaScript Essentials", "Kyle Simpson");
const book3 = new Book("ISBN003", "Clean Code", "Robert C. Martin");
const book4 = new Book("ISBN004", "You Don’t Know JS", "Kyle Simpson");
const book5 = new Book("ISBN005", "Eloquent JavaScript", "Marijn Haverbeke");
const book6 = new Book(
  "ISBN006",
  "Introduction to Algorithms",
  "Thomas H. Cormen"
);
const book7 = new Book("ISBN007", "Design Patterns", "Erich Gamma");
const book8 = new Book("ISBN008", "JavaScript Patterns", "Stoyan Stefanov");
const book9 = new Book("ISBN009", "Refactoring", "Martin Fowler");
const book10 = new Book(
  "ISBN010",
  "Cracking the Coding Interview",
  "Gayle Laakmann McDowell"
);

// member
const member1 = new Member("Sanjay Vasuniya", "Ahmedabad", "9876543210");
const member2 = new Member("Rohit Sharma", "Mumbai", "9123456789");
const member3 = new Member("Sneha Kapoor", "Delhi", "9812345678");
const member4 = new Member("Anjali Mehta", "Bangalore", "9988776655");
const member5 = new Member("Vikram Singh", "Chennai", "9900112233");
const member6 = new Member("Priya Reddy", "Hyderabad", "9878901234");
const member7 = new Member("Arjun Verma", "Pune", "9765432109");
const member8 = new Member("Kavita Joshi", "Kolkata", "9654321098");
const member9 = new Member("Rakesh Kumar", "Noida", "9543210987");
const member10 = new Member("Neha Sharma", "Lucknow", "9432109876");

member2.issueBook(book3);
member2.issueBook(book2);
member2.issueBook(book4);
