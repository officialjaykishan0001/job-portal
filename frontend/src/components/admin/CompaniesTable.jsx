import React, { useEffect, useState } from 'react'
import { Table, Badge, Avatar, Popover, Button, Text } from '@radix-ui/themes'
import { Edit2, MoreHorizontal } from 'lucide-react'
import { useSelector } from 'react-redux'
import { setSearchCompanyByText } from '../../redux/companySlice'
import { useNavigate } from 'react-router-dom'

const CompaniesTable = () => {
    const { companies, searchCompanyByText } = useSelector(store => store.company)
    const [filterCompany, setFilterCompany] = useState(companies);
    const navigate = useNavigate();

    useEffect(() => {
        const filteredCompany = companies.length >= 0 && companies.filter((company) => {
            if(!searchCompanyByText){
                return true
            }
            return company?.name?.toLowerCase().includes(searchCompanyByText.toLowerCase());
        })
        setFilterCompany(filteredCompany);
    }, [companies, searchCompanyByText])
    return (
        <div>
            <Table.Root>
                <Table.Header>
                    <Table.Row>
                        <Table.ColumnHeaderCell>Logo</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell>Name</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell>Date</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell className='text-right'>Action</Table.ColumnHeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {
                        filterCompany?.map((company) => (
                            <Table.Row>
                                <Table.Cell>
                                    <Avatar
                                        className='cursor-pointer'
                                        src={company.logo}
                                        fallback="A"
                                        size="1"
                                    />
                                </Table.Cell>
                                <Table.Cell>{company.name}</Table.Cell>
                                <Table.Cell>{company.createdAt.split('T')[0]}</Table.Cell>
                                <Table.Cell className='text-right cursor-pointer'>
                                    <Popover.Root>
                                        <Popover.Trigger>
                                            <Button variant="soft"><MoreHorizontal /></Button>
                                        </Popover.Trigger>
                                        <Popover.Content size="1" maxWidth="300px">
                                            <div onClick={() => navigate(`/admin/companies/${company._id}`)} className='flex items-center gap-2 w-fit cursor-pointer'>
                                                <Edit2 className='w-4' />
                                                <Text   as="p" trim="both" size="1">Edit</Text>
                                            </div>
                                        </Popover.Content>
                                    </Popover.Root>
                                </Table.Cell>
                            </Table.Row>
                        ))
                    }
                </Table.Body>
            </Table.Root >
            <span className='flex justify-center my-5'>A List of your recent  registered companies</span>
        </div >
    )
}

export default CompaniesTable