import React from "react";
import { SanityDataTable } from "../sanity/models";
import { css } from "@emotion/core";

const wrapper = css`
	width: 100%;
	max-width: 1000px;
	margin: 1rem auto;
	overflow-x: auto;

	& > table {
		width: 100%;
		border-collapse: separate;
		border-spacing: 0;
		empty-cells: show;

		tr {
			:nth-of-type(odd) {
				background-color: #f2f2f2;
			}

			td,
			th {
				padding: 0.5em 1em;
				word-break: keep-all;
				:not(:last-of-type) {
					border-right: 1px solid #cbcbcb;
				}
			}

			th {
				text-transform: uppercase;
				font-size: 0.85rem;
				letter-spacing: 1px;
				text-align: left;
				margin: 0;
				overflow: visible;
				padding: 0.5em 1em;
				white-space: nowrap;
			}
		}
	}
`;

const columnHeader = css`
	border-right: 1px solid #cbcbcb;
`;

type Props = {
	content: SanityDataTable;
};

const DataTable: React.FC<Props> = (props) => {
	const { content } = props;

	return (
		<figure css={wrapper}>
			<table>
				<tbody>
					{(content?.data?.rows || []).map((row, rowNum) => (
						<tr key={row?._key}>
							{(row?.cells || []).map((cell, cellNum) =>
								content?.rowHeader && rowNum === 0 ? (
									<th key={`${row?._key}-${cellNum}`} scope="col">
										{cell}
									</th>
								) : content?.columnHeader && cellNum === 0 ? (
									<th
										key={`${row?._key}-${cellNum}`}
										scope="row"
										css={columnHeader}
									>
										{cell}
									</th>
								) : (
									<td key={`${row?._key}-${cellNum}`}>{cell}</td>
								)
							)}
						</tr>
					))}
				</tbody>
			</table>
		</figure>
	);
};

export default DataTable;
