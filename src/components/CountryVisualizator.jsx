import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

import { Link } from "react-router-dom";



import Navbar from "./Navbar";

function CountryVisualizator() {

    const { country_name } = useParams();
    const [country, setCountry] = useState([]);
    const [loading, setLoading] = useState(true);
    const [hasBorders, setHasBorders] = useState(true);

    const countries = require("i18n-iso-countries");
    countries.registerLocale(require("i18n-iso-countries/langs/en.json"));




    useEffect(() => {
        fetch(`https://restcountries.com/v3.1/name/${country_name}`)
            .then(res => {
                if (res.ok) {
                    return res.json()
                }
            })
            .then(countryData => {
                setCountry(...countryData)
                console.log(country);
                setLoading(false);
            });

    }, [])


    const dataToString = (data, prop) => {
        let result = [];
        for (const key in data) {
            if (prop == "languages") result.push(data[key])
            else result.push(data[key][prop])
        }
        return result.join(", ");
    }

    const getBordersCountries = (borders) => {
        console.log(borders);
        let result = [];
        if (borders) {
            for (const country of borders) {
                result.push(countries.getName(country, "en"))
            }
            setHasBorders(true);
            return result;
        } else {
            setHasBorders(false)
        }

    }


    return (
        <>
            <Navbar />
            <div className="back_button">
                <Link to={"/"}><FontAwesomeIcon icon={faArrowLeft} /> Go Back</Link>
                {

                    loading ?
                        (<h1>Loading...</h1>)
                        :
                        (
                            <article className="country">
                                <div className="country_img">
                                    <img src={country.flags.svg} alt={country.name.common} />
                                </div>
                                <header>
                                    <h2>{country.name.common}</h2>
                                </header>

                                <ul className="details">
                                    <li><b>Native Name</b>: {dataToString(country.name.nativeName, "official")}</li>
                                    <li><b>Population</b>: {country.population.toLocaleString()}</li>
                                    <li><b>Region</b>: {country.region}</li>
                                    <li><b>Subregion</b>: {country.subregion}</li>
                                    <li><b>Capital</b>: {country.capital.join(", ")}</li>
                                </ul>

                                <ul className="details">
                                    <li><b>Top Level Domain</b>: {country.tld[0]}</li>
                                    <li><b>Currencies</b>: {dataToString(country.currencies, "name")} </li>
                                    <li><b>Languages</b>: {dataToString(country.languages, "languages")}</li>
                                </ul>

                                {
                                country.borders ? 
                                (
                                 <>
                                    {
                                        getBordersCountries(country.borders)
                                        .map(c => console.log(c))
                                    }
                                 </>
                                )
                                :
                                (<></>)
                            }
                            </article>
                        )
                }
            </div>
        </>
    );
}

export default CountryVisualizator;