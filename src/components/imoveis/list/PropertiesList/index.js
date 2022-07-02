import PropertyCard from '../PropertyCard.js';

export default function PropertiesList({ list, setList, setIsBackdrop, setTrigger, trigger }) {
  return (
    <>
      {list.map((property, index) => (
        <PropertyCard
          key={index}
          property={property}
          list={list}
          setList={setList}
          setIsBackdrop={setIsBackdrop}
          setTrigger={setTrigger}
          trigger={trigger}
        />
      ))}
    </>
  )
}
