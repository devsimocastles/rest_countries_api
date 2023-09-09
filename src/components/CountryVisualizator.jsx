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



    useEffect(() => {
        fetch(`https://restcountries.com/v3.1/name/${country_name}`)
            .then(res => {
                if (res.ok) {
                    return res.json()
                }
            })
            .then(countryData => {
                setCountry(...countryData)
                setLoading(false);
            });
    },[])

    const getNativeName = (nativeNames) => {
        let names = [];
        for (const name in nativeNames) {
            names.push(nativeNames[name].official);
        }

        return names.join(", ")
    };

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
                                <li><b>Native Name</b>: {getNativeName(country.name.nativeName)}</li>
                                <li><b></b>: </li>
                                <li><b></b>: </li>
                                <li><b></b>: </li>
                                <li><b></b>: </li>
                            </ul>

                            <ul className="details">
                                <li><b></b>: </li>
                                <li><b></b>: </li>
                                <li><b></b>: </li>
                            </ul>
                        </article>
                        )
                }
            </div>
        </>
    );
}

export default CountryVisualizator;