import { useState } from 'react'
import styles from '../../styles/SearchBar.module.css'

function SearchBar({ data }) {

    const [query, setQuery] = useState('')

    const onChange = async (e) => {
        const {value} = e.target;
        setQuery(value)

        if (value.length > 3) {
            const response = await fetch(`http://localhost:3000/api/products?=${value}`);
            const data = await response.json();
            console.log(response)
        }
    }

    return (
        <input 
        className={styles.input} 
        onChange={onChange}
        id='city'
        type="search" 
        name="search"
        value={query} 
        placeholder="Nombre producto..." />
    )
}

export default SearchBar