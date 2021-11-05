import React, { useState, createContext, useContext } from 'react';
import ReactDOM from 'react-dom';

// We want to change App to:
// <DateFields value={startDate} onChange={setStartDate}>
//  <MonthField aria-label="Start Month" />
//  <DayField aria-label="Start Day" />
//  <YearField start={2018} end={2019} aria-label="Start year" />
// </DateFields>

// The tasks:
// 1) Edit App to stop rendering the individual components
//    in DateFields and render children instead
// 2) Provide Context in DateFields
// 3) Use the Context in MonthField, DayField, and YearField.

function App() {
    const [startDate, setStartDate] = useState(new Date('May 28, 2020'))
    return (
        <div>
            <h1>Dates!</h1>
            {/*<DateFields value={startDate} onChange={setStartDate} start={2010} end={2020} />*/}
            <DateFields value={startDate} onChange={setStartDate}>
                <DayField aria-label="Start Day" /> -
                <MonthField aria-label="Start Month" /> -
                <YearField start={2018} end={2020} aria-label="Start year" />
            </DateFields>
        </div>
    )
}

const DateFieldsContext = createContext()

function DateFields({ children, value, onChange }) {
    let date = value
    return (
        <DateFieldsContext.Provider value={{ date, onChange }}>{children}</DateFieldsContext.Provider>
    )
}

function DayField(props) {
    const { date, onChange } = useContext(DateFieldsContext)
    const value = date.getDate()
    const handleChange = (event) => {
        const newDate = new Date(date.getTime())
        newDate.setDate(parseInt(event.target.value))
        onChange(newDate)
    }

    return (
        <select value={value} onChange={handleChange}>
            {Array.from({ length: 31 }).map((_, index) => (
                <option key={index} value={index + 1}>
                    {index + 1}
                </option>
            ))}
        </select>
    )
}

function MonthField(props) {
    const { date, onChange } = useContext(DateFieldsContext)
    const month = date.getMonth()
    const handleChange = (event) => {
        const newDate = new Date(date.getTime())
        newDate.setMonth(parseInt(event.target.value))
        onChange(newDate)
    }

    return (
        <select value={month} onChange={handleChange}>
            {Array.from({ length: 12 }).map((_, index) => (
                <option key={index} value={index + 1}>
                    {index + 1}
                </option>
            ))}
        </select>
    )
}

function YearField(props) {
    const { date, onChange } = useContext(DateFieldsContext)
    const { start, end, ...restOfProps } = props
    const years = Array.from({ length: end - start + 1 }).map(
        (_, index) => index + start
    )
    const handleChange = (event) => {
        const newDate = new Date(date.getTime())
        newDate.setYear(parseInt(event.target.value), 1)
        onChange(newDate)
    }

    return (
        <select value={date.getFullYear()} onChange={handleChange} {...restOfProps}>
            {years.map((year) => (
                <option key={year}>{year}</option>
            ))}
        </select>
    )
}

ReactDOM.render(<App />, document.getElementById('root'));