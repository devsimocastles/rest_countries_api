import React from "react";
import { Link } from "react-router-dom";

function Card(props) {
    return (

        <article className="country_card">

            <div className="flag_container"
                style={{
                    backgroundImage: `url('${props.flag}')`
                }}>
            </div>

            <div className="card_content">
                <header>
                    <Link to={`/country/${props.name}`}><h2>{props.name}</h2></Link>
                </header>
                <span className="country_data">
                    <h4>Population: </h4> {props.population}
                </span>
                <span className="country_data">
                    <h4>Region: </h4> {props.region}
                </span>
                <span className="country_data">
                    <h4>Capital: </h4> {props.capital}
                </span>
            </div>
        </article>

    );
}

export default Card;