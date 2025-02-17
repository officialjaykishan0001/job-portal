import { Table, Badge } from '@radix-ui/themes'
import React from 'react'
import { useSelector } from 'react-redux'

const AppliedJobTable = () => {
    const { allAppliedJobs} = useSelector(store => store.job);

    return (
        <div>
            <Table.Root>
                <Table.Header>
                    <Table.Row>
                        <Table.ColumnHeaderCell>Date</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell>Job Role</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell>Company</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell className='text-right'>Status</Table.ColumnHeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {
                        allAppliedJobs.length <= 0 ? <span>You haven't applied any job yet!</span> : allAppliedJobs?.map((appliedJob) => (
                            <Table.Row key={appliedJob._id}>
                                <Table.Cell>{appliedJob?.createdAt.split('T')[0]}</Table.Cell>
                                <Table.Cell>{appliedJob?.job?.title}</Table.Cell>
                                <Table.Cell>{appliedJob?.job?.company?.name}</Table.Cell>
                                <Table.Cell className='text-right'><Badge color={appliedJob?.status === 'rejected' ? 'red' : appliedJob?.status === 'pending' ? 'gray' : 'green'} >{appliedJob.status.toUpperCase()}</Badge></Table.Cell>
                            </Table.Row>
                        ))
                    }
                </Table.Body>
            </Table.Root>

        </div>
    )
}

export default AppliedJobTable
