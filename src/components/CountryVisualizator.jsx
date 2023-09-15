import React, { useEffect, useState } from "react";

// FONTAWESOME
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

// REACT ROUTER
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

// COMPONENTS
import Navbar from "./Navbar";

// SWITCH THEME FUNCTION
import { themeSwitch, updateTheme } from "../utils/themeSwitch";



function CountryVisualizator() {

  const { country_name } = useParams();
  const [country, setCountry] = useState([]);
  const [loading, setLoading] = useState(true);
  const [specialCountry, setSpecialCountry] = useState(null);
  let [darkTheme, setDarkTheme] = useState(false);
  let [chosenTheme, setChosenTheme] = useState(localStorage.getItem("darkTheme"));



  // ISO CODE to country name 
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
        //this line checks if the country is antarctica
        country.subregion == undefined ? setSpecialCountry(true) : setSpecialCountry(false);
        setLoading(false);
      });
    console.log(country);
  }, [loading])

  /*
    this function gets and object of objects and return a string with all those values
  */
  const dataToString = (data, prop) => {
    let result = [];
    for (const key in data) {


      if (prop == "official") {
        result.push(data[key]);
        return result.join(", ")
      }

      if (prop == "languages") {
        result.push(data[key]);
      }

      if (prop == "currencies") {
        result.push(data[key]["name"]);
      }
    }
    return result.join(", ")
  }

  /*
    this function gets an array of countries' iso codes and gets the 
    respective name of each country
  */
  const getBordersCountries = (borders) => {
    let result = [];
    if (borders) {
      for (const country of borders) {
        if (country == "UNK") continue;
        result.push(countries.getName(country, "en"))
      }
      return result;
    }
  }


  return (
    <div className={chosenTheme == 0 ? "light_theme" : "dark_theme"}>
      <Navbar
        themeSwitcher={() => themeSwitch(darkTheme, setDarkTheme)}
        updateTheme={() => updateTheme(chosenTheme, setChosenTheme)}
      />
      <div className="back_button">
        <Link to={"/"}><FontAwesomeIcon icon={faArrowLeft} /> Go Back</Link>
      </div>
      {

        // checks if the content isn't loaded yet
        loading ?

          (<h1>Loading...</h1>)

          // if the content is loaded already, checks if is a "special country"
          : specialCountry === true ?

            // if is a special country, show country's basic details
            (
              <article className="country">
                <div className="country_img">
                  <img src={country.flags.svg} alt={country.name.common} />
                </div>
                <div className="content">
                  <header>
                    <h2>{country.name.common}</h2>
                  </header>
                  <div className="details">
                    <ul>
                      <li><b>Native Name</b>: {dataToString(country.name, "official")}</li>
                      <li><b>Population</b>: {country.population.toLocaleString()}</li>
                      <li><b>Region</b>: {country.region}</li>
                    </ul>
                  </div>
                </div>
              </article>

            )

            :

            // if isn't a special country, show all data
            (
              <article className="country">
                <div className="country_img">
                  <img src={country.flags.svg} alt={country.name.common} />
                </div>
                <div className="content">
                  <header>
                    <h2>{country.name.common}</h2>
                  </header>
                  <div className="details">
                    <ul>
                      <li><b>Native Name</b>: {dataToString(country.name, "official")}</li>
                      <li><b>Population</b>: {country.population.toLocaleString()}</li>
                      <li><b>Region</b>: {country.region}</li>
                      <li><b>Subregion</b>: {country.subregion}</li>
                      <li><b>Capital</b>: {country.capital.join(", ")}</li>
                    </ul>

                    <ul>
                      {/* 
                        I added this condition because Kosovo haven't
                        a tld.
                      */}
                      {country.tld ?
                        (<li><b>Top Level Domain</b>: {country.tld[0]}</li>)
                        : ""
                      }
                      <li><b>Currencies</b>: {dataToString(country.currencies, "currencies")} </li>
                      <li><b>Languages</b>: {dataToString(country.languages, "languages")}</li>
                    </ul>
                  </div>

                  {
                    // if the country has borders with other countries, show them,
                    // if not, return nothing
                    country.borders ?
                      (
                        <>

                          <div className="border_countries">
                            <header>
                              <h2>Border Countries:</h2>
                            </header>
                            <div className="links">
                              {getBordersCountries(country.borders).map((c, i) => (
                                <Link
                                  to={"/country/" + c}
                                  target="_blank"
                                  key={i}

                                >{c}</Link>
                              ))}
                            </div>
                          </div>
                        </>
                      )
                      :
                      (<></>)
                  }

                </div>



              </article>
            )
      }
    </div>
  );
}

export default CountryVisualizator;