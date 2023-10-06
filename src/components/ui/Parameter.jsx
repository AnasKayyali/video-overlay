/* eslint-disable react/prop-types */

const Parameter = ({value,handle,label,notify}) => {

    const handleParameter = (e) => {
        const value = e.target.value
        value !== "" ? 
        isNaN(Number(value)) ? 
            notify('info','warning','You have to enter a valid integer number') 
            : 
            handle(parseInt(value)) 
        : 
        handle(value)
    }

    return (
        <main className="flex max-lg:basis-[33.3%] justify-center items-center gap-x-2">
            <h1 className="lg:text-lg">{label}</h1>
            <input type="text" value={value} onChange={handleParameter} className="border w-14 text-center shadow-sm rounded-md py-1" />
        </main>
    )
}

export default Parameter