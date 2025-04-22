import { FC, useEffect, useState } from "react";
import { TableInterface } from "../interfaces/lesson";
import styled from "styled-components";

const LessonTable: FC<{ table: TableInterface }> = ({ table }) => {

    interface InputItem {
        title: string;
        cells: string[];
    }

    interface Output {
        titles: string[];
        cells: string[][];
    }

    const [elements, setElements] = useState<Output>({ titles: [], cells: [] });

    const transformData = (input: InputItem[]): Output => {
        const output: Output = { titles: [], cells: [] };

        output.titles = input.map(item => item.title);

        const cellLength = input[0].cells.length;

        for (let i = 0; i < cellLength; i++) {
            const cell = input.map(item => item.cells[i]);
            output.cells.push(cell);
        }

        return output;
    };

    useEffect(() => {
        const array = transformData(table.elements);
        setElements(array);
    }, []);



    return (
        <Table>
            <thead>
                <tr>
                    {
                        elements.titles.map((title, index) => <th key={index}>{title}</th>)
                    }
                </tr>
            </thead>
            <tbody>
                {
                    elements.cells.map((row, index) =>
                        <tr key={index}>
                            {
                                row.map((column, index) => <td key={index}>{column}</td>)
                            }
                        </tr>
                    )
                }
            </tbody>
        </Table>
    )
}

export default LessonTable;

const Table = styled.table`
    width: 100%;
    border-collapse: collapse;

    th, td, tr {
        padding: 10px;
        border: 1px solid #2d2d2d;
    }
`