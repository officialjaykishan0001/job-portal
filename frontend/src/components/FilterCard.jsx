import { RadioGroup } from '@radix-ui/themes'
import React, { useEffect, useState } from 'react'
import { setSearchedQuery } from '../redux/jobSlice.';
import { useDispatch } from 'react-redux';

const filterData = [
  {
    filterType: "Location",
    array: ["Delhi NCR", "Bangalore", "Hyderabad", "Pune", "Mumbai"]
  },
  {
    filterType: "Industry",
    array: ["Frontend Developer", "Backend Developer", "Full stack developer"]
  },
  {
    filterType: "Salary",
    array: ["0-40K", "40-1L", "1Lakh to 5Lakh"]
  }
]

const FilterCard = () => {
  const [selectedValue, setSelectedValue] = useState('');
  const dispatch = useDispatch();

  const changeHandler = (value) => {
    setSelectedValue(value);
  }

  useEffect(() => {
    dispatch(setSearchedQuery(selectedValue));
  }, [selectedValue, dispatch])

  return (
    <div className='w-full bg-white p-3 rounded-md'>
      <h1 className='font-bold text-lg '>Filter Jobs</h1>
      <hr className='mt-3' />
      <RadioGroup.Root defaultValue="1" value={selectedValue} name="example"  onValueChange={changeHandler}>
        {
          filterData.map((data, index) => (
            <div>
              <h1 className='font-bold text-lg'>{data.filterType}</h1>
              {
                data.array.map((item, idx) => {
                  const itemId = `id${index}-${idx}`
                  return (
                    <div className='flex items-center space-x-2 my-2'>
                      <RadioGroup.Item value={item} id={itemId}>{item}</RadioGroup.Item>
                    </div>
                  )
                })
              }
            </div>
          ))
        }
      </RadioGroup.Root>
    </div>
  )
}

export default FilterCard
