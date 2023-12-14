import BookShelfChanger from "./BookShelfChanger";
import { update } from "../BooksAPI";
import { useNavigate } from "react-router-dom";

function Book({ id, title, authors, imageLinks: { thumbnail } = {}, shelf = 'none' }) {
    const navigate = useNavigate();

    async function handleChange({ target: { value: shelf } }) {
        if (!id) {
            return;
        }
        try {
            await update({ id }, shelf);
            navigate(0); // navigate to current router with refresh browser
        } catch (error) { }
    }

    return (
        <li>
            <div className="book" itemID={id}>
                <div className="book-top">
                    <div
                        className="book-cover"
                        style={{
                            width: 128,
                            height: 193,
                            backgroundImage: thumbnail ? `url(${thumbnail})` : 'none'
                        }}
                    ></div>
                    <div className="book-shelf-changer">
                        <BookShelfChanger onChange={handleChange} value={shelf} />
                    </div>
                </div>
                <div className="book-title">{title}</div>
                <div className="book-authors">{authors}</div>
            </div>
        </li>
    );
}

export default Book;