import { Table, Badge } from '@radix-ui/themes'
import React from 'react'

const AppliedJobTable = () => {
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
                        [1, 2].map((item, index) => (
                            <Table.Row key={index}>
                                <Table.Cell>17-07-2024</Table.Cell>
                                <Table.Cell>Frontend Developer</Table.Cell>
                                <Table.Cell>Google</Table.Cell>
                                <Table.Cell className='text-right'><Badge color="green">Selected</Badge></Table.Cell>
                            </Table.Row>
                        ))
                    }
                </Table.Body>
                {/* 
                <Table.Body>
                    <Table.Row>
                        <Table.RowHeaderCell>Danilo Sousa</Table.RowHeaderCell>
                        <Table.Cell>danilo@example.com</Table.Cell>
                        <Table.Cell>Developer</Table.Cell>
                    </Table.Row>

                    <Table.Row>
                        <Table.RowHeaderCell>Zahra Ambessa</Table.RowHeaderCell>
                        <Table.Cell>zahra@example.com</Table.Cell>
                        <Table.Cell>Admin</Table.Cell>
                    </Table.Row>

                    <Table.Row>
                        <Table.RowHeaderCell>Jasper Eriksson</Table.RowHeaderCell>
                        <Table.Cell>jasper@example.com</Table.Cell>
                        <Table.Cell>Developer</Table.Cell>
                    </Table.Row>
                </Table.Body> */}
            </Table.Root>

        </div>
    )
}

export default AppliedJobTable
