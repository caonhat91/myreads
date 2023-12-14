import { getAll } from "../BooksAPI";
import BookShelf from "./BookShelf";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function ListBooks({ onShareBook }) {

    const [isLoading, setIsLoading] = useState(true);
    const [books, setBooks] = useState({});
    const [rootBooks, setRootBooks] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getAllBooks = async () => {
            try {
                const _books = await getAll();

                if (!Array.isArray(_books)) {
                    setBooks({});
                    return;
                }

                setRootBooks(_books);

                const bookByShelf = _books.reduce((prev, curr) => {
                    const shelf = curr?.shelf ?? 'none';
                    curr.shelf = shelf;
                    if (!prev[[shelf]]) {
                        prev[[shelf]] = [];
                    }
                    prev[[shelf]].push(curr);
                    return prev;
                }, {});

                setBooks({ ...bookByShelf });
            } catch (error) {
                setError(error);
            }

            setIsLoading(false);
        };

        getAllBooks();
    }, []);

    useEffect(() => {
        if (!rootBooks.length) {
            return;
        }

        onShareBook(rootBooks);
    }, [rootBooks, onShareBook]);

    const showBooks = Object.keys(books).map(shelf => {
        const bookShelf = {
            shelf,
            books: books[shelf]
        }
        return <BookShelf key={shelf} {...bookShelf} />;
    });

    return (
        <div className="list-books">
            <div className="list-books-title">
                <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
                <div>
                    {isLoading && <p>Loading...</p>}
                    {error && <p>{error}</p>}
                    {books && showBooks}
                </div>
            </div>
            <div className="open-search">
                <Link to="/search">
                    Add a book
                </Link>
            </div>
        </div>
    );
}

export default ListBooks;