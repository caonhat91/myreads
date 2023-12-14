import { search } from "../BooksAPI";
import BookGrid from "./BookGrid";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

function SearchBooks({ shareBook = [] }) {

    const [context, setContext] = useState(undefined);
    const [books, setBooks] = useState([]);
    const [, setError] = useState("");
    const debounceInput = useRef();

    useEffect(() => {
        if (context === undefined || !shareBook.length) {
            return;
        }
        const maxResults = 20;
        const getAllBooks = async (query) => {
            try {
                const _books = await search(query, maxResults);

                if (!Array.isArray(_books)) {
                    throw _books?.error ?? "empty";
                }

                _books.forEach(book => {
                    book.shelf = shareBook.find(sb => sb.id === book.id)?.shelf ?? 'none';
                });

                setError("");
                setBooks(_books);
            } catch (error) {
                setBooks([]);
                setError(error);
            }
        };

        clearTimeout(debounceInput.current);
        debounceInput.current = setTimeout(() => getAllBooks(context), 300);
    }, [context, shareBook]);

    return (
        <div className="search-books">
            <div className="search-books-bar">
                <Link to="/" className="close-search">
                    Close
                </Link>
                <div className="search-books-input-wrapper">
                    <input
                        type="text"
                        placeholder="Search by title, author, or ISBN"
                        value={context ?? ''}
                        autoFocus
                        onChange={(e) => setContext(e.target.value)}
                    />
                </div>
            </div>
            <div className="search-books-results">
                {/* {error && <p>{error}</p>} */}
                {books.length > 0 && <BookGrid books={books} />}
            </div>
        </div>
    );
}

export default SearchBooks;