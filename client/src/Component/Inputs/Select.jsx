import React from 'react';
import styles from '../../styles/Select.module.scss'
const Select = ({setStorageLocation}) => {
    return (
        <>
            <select onChange={e=>setStorageLocation(e.target.value)} className={styles.select} name="storage" id="storage">
                <option value="cloud">Cloud</option>
                <option value="localStorage">Local Storage</option>
            </select>  
        </>
    );
}

export default Select;
