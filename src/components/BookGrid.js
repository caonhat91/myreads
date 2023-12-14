import Book from "./Book";

function BookGrid({ books }) {
    const book = books?.map(b => {
        return <Book key={b.id} {...b} />;
    });

    return (
        <ol className="books-grid">{book}</ol>
    );
}

export default BookGrid;