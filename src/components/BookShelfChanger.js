import { useEffect, useState } from "react";
import { shelfDefault } from "../constants/Shelf";

function BookShelfChanger({ onChange, value, options = {} }) {

    const [menu, setMenu] = useState(shelfDefault);

    useEffect(() => {
        if (!Object.keys(options).length) {
            return;
        }

        setMenu({ ...options });
    }, [options]);

    const menus = Object.keys(menu).map(k => {
        const text = menu[k];
        return <option key={k} value={k}>{text}</option>;
    });

    return (
        <select onChange={onChange} value={value}>
            {value}
            <option value="" disabled>
                Move to...
            </option>
            {menus}
        </select>
    );
}

export default BookShelfChanger;