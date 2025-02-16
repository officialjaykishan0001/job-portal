import React, { useEffect, useState } from 'react'
import { Table,  Popover, Button, Text } from '@radix-ui/themes'
import { Edit2, Eye, MoreHorizontal } from 'lucide-react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'


const AdminJobsTable = () => {
    const { allAdminJobs, searchJobByText } = useSelector(store => store.job)
    const [filterJobs, setFilterJobs] = useState(allAdminJobs);
    const navigate = useNavigate();

    useEffect(() => {
        const filteredJobs = allAdminJobs.length >= 0 && allAdminJobs.filter((job) => {
            if (!searchJobByText) {
                return true
            }
            return job?.title?.toLowerCase().includes(searchJobByText.toLowerCase()) || job?.company?.name.toLowerCase().includes(searchJobByText.toLowerCase());
        })
        setFilterJobs(filteredJobs);
    }, [allAdminJobs, searchJobByText])

    return (
        <div>
            <Table.Root>
                <Table.Header>
                    <Table.Row>
                        <Table.ColumnHeaderCell>Company Name</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell>Role</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell>Date</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell className='text-right'>Action</Table.ColumnHeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {
                        filterJobs?.map((job) => (
                            <Table.Row>
                                <Table.Cell>{job?.company?.name}</Table.Cell>
                                <Table.Cell>{job?.title}</Table.Cell>
                                <Table.Cell>{job?.createdAt.split('T')[0]}</Table.Cell>
                                <Table.Cell className='text-right cursor-pointer'>
                                    <Popover.Root>
                                        <Popover.Trigger>
                                            <Button variant="soft"><MoreHorizontal /></Button>
                                        </Popover.Trigger>
                                        <Popover.Content size="1" maxWidth="300px">
                                            <div onClick={() => navigate(`/admin/companies/${job._id}`)} className='flex items-center gap-2 w-fit cursor-pointer'>
                                                <Edit2 className='w-4' />
                                                <Text as="p" trim="both" size="1">Edit</Text>
                                            </div>
                                            <div onClick={() => navigate(`/admin/jobs/${job._id}/applicants`)} className='flex items-center w-fit gap-2 cursor-pointer mt-2'>
                                                <Eye className='w-4'/>
                                                <span>Applicants</span>
                                            </div>
                                        </Popover.Content>
                                    </Popover.Root>
                                </Table.Cell>
                            </Table.Row>
                        ))
                    }
                </Table.Body>
            </Table.Root >
            <span className='flex justify-center my-5'>A List of your recent  posted jobs</span>
        </div >
    )
}

export default AdminJobsTable
