import BookGrid from "./BookGrid";
import { shelfDefault } from "../constants/Shelf";

function BookShelf({ shelf, books }) {
    return (
        <div className="bookshelf">
            <h2 className="bookshelf-title">
                {shelfDefault[[shelf]]}
            </h2>
            <div className="bookshelf-books">
                <BookGrid books={books} />
            </div>
        </div>
    );
}

export default BookShelf;