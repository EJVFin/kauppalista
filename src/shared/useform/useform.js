import { useState } from 'react';

const useForm = (callback, initialState={}, resetOnSubmit=true) => {
    //esitellään useState-hook, johon käyttäjän lomakkeelle
    //syöttämä tieto tallennetaan.
    const [values, setValues] = useState(initialState);

    // submit-käsittelijä, joka estää oletustoiminnan ja
    // kutsuu määriteltyä callback-funktiota.
    const handleSubmit = (event) => {
        if (event) {
            event.preventDefault();
        }
        callback();
        if (resetOnSubmit) resetValues();
    }

    // Syötekäsittelijä joka tallentaa kentän tiedot 
    // sen nimellä state-muuttujaan
    const handleChange = (event) => {
        event.persist();
        // Tallennetaan kenttään syötetty arvo välimuuttujaan
        let value = event.target.value;
        // Tallennetaan uusi arvo state-muuttujaan
        setValues(values => ({...values, [event.target.name]: value}));
    }

    // Funktio, joka palauttaa lomakkeen tiedot alkutilanteeseen
    const resetValues = () => {
        setValues(initialState);
    }

    //Palauta luonnin yhteydessä käsittelijät että state-muuttuja.
    return {
        handleSubmit,
        handleChange,
        resetValues,
        setValues,
        values
    };

}

export default useForm;