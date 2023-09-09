import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

function SearchBar({onSearchSubmit, clearResults}) {

    let [term, setTerm] = useState("");
    let [debouncedTerm, setDebouncedTerm] = useState(term);

    useEffect(() => {
        const timer = setTimeout(() => setTerm(debouncedTerm), 500);
        return () => clearTimeout(timer);
    },[debouncedTerm])

    useEffect(() => {
        if (term !== "") {
            onSearchSubmit(term);
        }
    }, [term]);

    return (
        <>
            <div className="search_input">
                <FontAwesomeIcon icon={faMagnifyingGlass} />
                <input 
                type="text" 
                placeholder="Search for a country..." 
                onChange={e => setDebouncedTerm(e.target.value)}
                value={debouncedTerm}
                id="search_bar"
                />
            </div>
        </>
    );
}

export default SearchBar;