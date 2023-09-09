import React from "react";
import { useEffect, useState } from "react";

import Navbar from "./Navbar.jsx";
import Card from "./Card.jsx";
import SearchBar from "./SearchBar.jsx";
import NotFound from "./NotFound";

function Home() {
    let [countries, setCountries] = useState([]);
    let [isLoading, setIsLoading] = useState(true);
    let [notFound, setNotFound] = useState(false);

    const countryApiUrl = "https://restcountries.com/v3.1/all";

    useEffect(() => {
        getCountry(countryApiUrl)
    }, []);



    async function getCountry(url) {
        try {
            setIsLoading(true);
            const res = await fetch(url);
            if (res.ok) {
                const paises = await res.json();
                setCountries(paises);
                setNotFound(false);
                setIsLoading(false);
            } else {
                setNotFound(true)
                return res.status;
            }
        } catch (error) {
            setNotFound(true);
        }
    }


    const onSearchSubmit = term => {
        getCountry(`https://restcountries.com/v3.1/name/${term}`);
    }


    const filterRegion = (e) => {
        if (e.target.value != "Filter by Region") {
            getCountry(`https://restcountries.com/v3.1/region/${e.target.value}`);
        } else {
            getCountry(countryApiUrl);
        }
    }


    const showCountries = countries.sort((a, b) => a.name.common > b.name.common ? 1 : -1)
        .map((country) =>
        (<Card
            flag={country.flags.svg}
            name={country.name.common}
            population={country.population.toLocaleString()}
            region={country.region}
            capital={country.capital instanceof Array ?
                country.capital[0] : country.capital}
            key={country.name.common.toLowerCase()}
        />)
        )

    // DISABLE FORM RELOAD WHEN SUBMIT ////////////////////////////////////////////////////////////////
    const disableReload = (e) => {
        e.preventDefault();
    }

    return (
        <>
            <Navbar />
            <main>
                <div className="filter_options_container">
                    <form onSubmit={disableReload}>
                        <SearchBar
                            onSearchSubmit={(term) => onSearchSubmit(term)}
                        />
                        <button className="show_all_countries" onClick={() => getCountry(countryApiUrl)}>Show All Countries</button>

                        <div className="filter_options">
                            <select className="filter_region" onChange={filterRegion}>
                                <option defaultValue="none">Filter by Region</option>
                                <option defaultValue="af">Africa</option>
                                <option defaultValue="am">America</option>
                                <option defaultValue="as">Asia</option>
                                <option defaultValue="eu">Europe</option>
                                <option defaultValue="oc">Oceania</option>
                            </select>
                        </div>
                    </form>
                </div>
                <div className="card_container">
                    {
                        /*
                        If notFound is equal true, show h2 not found :( /h2, else if isLoading
                        is equal true show h2 Loading... /h2 if not return cards w/ results
                        
                        */
                        notFound ? (<NotFound url={countryApiUrl} defaultSearch={onSearchSubmit} />) :
                            isLoading ? (<h2>Loading...</h2>) : showCountries
                    }
                </div>
            </main>
        </>
    );
}

export default Home;