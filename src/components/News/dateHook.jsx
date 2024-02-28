import {useState, useEffect} from 'react'

/**
 * @param {Date} date - Initial date
 * @returns {Date} newDate - Converted date
 */

export const useDate = (date) => {
    const [newDate, setDate] = useState(null)

    useEffect(() => {
        setDate(
            new Date(date).toLocaleDateString('uk-UA') + ' ' +
            new Date(date).toLocaleTimeString('uk-UA').slice(0, 5)
        )
    }, [date])

    return newDate
}