import React from 'react'
import { Table, Popover } from '@radix-ui/themes'
import { MoreHorizontal } from 'lucide-react'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { APPLICATION_API_END_POINT } from '../../utils/constant'


const shortlistingStatus = ['Accepted', "Rejected"]

const ApplicantsTable = () => {
    const { applicants } = useSelector(store => store.application);

    const statusHandler = async (status, id) => {
        try {
            const res = await axios.post(`${APPLICATION_API_END_POINT}/status/${id}/update`, { status }, {
                withCredentials: true
            });

            if(res.data.success){
                toast.success(res.data.message);
            }
        } catch (err) {
            toast.error(err.response.data.message);
        }
    }

    return (
        <div>
            <Table.Root>
                <Table.Header>
                    <Table.Row>
                        <Table.ColumnHeaderCell>Full name</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell>Email</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell>Contact Number</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell>Resume</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell>Date</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell className='text-right' > Action</Table.ColumnHeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {
                        applicants && applicants?.applications?.map((item) => (
                            <Table.Row key={item._id}>
                                <Table.RowHeaderCell>{item?.applicant?.fullname}</Table.RowHeaderCell>
                                <Table.Cell>{item?.applicant?.email}</Table.Cell>
                                <Table.Cell>{item?.applicant?.phoneNumber}</Table.Cell>
                                <Table.Cell>
                                    {
                                        item?.applicant?.profile?.resume ? <a className='text-blue-600 cursor-pointer' href={item?.applicant?.profile?.resume} target='_blank' > {item?.applicant?.profile?.resumeOrignalName}</a> : <span>NA</span>
                                    }

                                </Table.Cell>
                                <Table.Cell>{item?.applicant?.createdAt.split('T')[0]}</Table.Cell>
                                <Table.Cell className='float-right cursor-pointer' >
                                    <Popover.Root>
                                        <Popover.Trigger>
                                            <MoreHorizontal />
                                        </Popover.Trigger>
                                        <Popover.Content size="2" maxWidth="400px">
                                            {
                                                shortlistingStatus.map((status, index) => {
                                                    return (
                                                        <div onClick={() => statusHandler(status, item?._id)}  key={index} className='flex w-fit items-center my-2 cursor-pointer'>
                                                            <span>{status}</span>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </Popover.Content>
                                    </Popover.Root>
                                </Table.Cell>
                            </Table.Row>
                        ))
                    }
                </Table.Body>
            </Table.Root>
            <span className='flex justify-center my-5'>A List of your recent applied users</span>

        </div>
    )
}

export default ApplicantsTable