import { RadioGroup } from '@radix-ui/themes'
import React from 'react'

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
  return (
    <div className='w-full bg-white p-3 rounded-md'>
      <h1 className='font-bold text-lg '>Filter Jobs</h1>
      <hr className='mt-3' />
      <RadioGroup.Root defaultValue="1" name="example">
        {
          filterData.map((data, index) => (
            <div>
              <h1 className='font-bold text-lg'>{data.filterType}</h1>
              {
                data.array.map((item, index) => {
                  return (
                    <div className='flex items-center space-x-2 my-2'>
                      <RadioGroup.Item value={item}>{item}</RadioGroup.Item>
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
