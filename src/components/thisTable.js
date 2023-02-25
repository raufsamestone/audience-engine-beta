import { Table, Column, HeaderCell, Cell } from "rsuite-table";

function ThisTable({ data }) {
  return (
    <div>
      <Table
        sortable
        shouldUpdateScroll={false}
        defaultExpandAllRows
        data={data}
      >
        <Column width={100} sortable fixed resizable>
          <HeaderCell>ID</HeaderCell>
          <Cell dataKey="id" />
        </Column>

        <Column width={100} sortable resizable>
          <HeaderCell>event_type</HeaderCell>
          <Cell dataKey="event_type" />
        </Column>
        <Column width={100} sortable resizable>
          <HeaderCell>browser</HeaderCell>
          <Cell dataKey="browser" />
        </Column>
        <Column width={100} sortable resizable>
          <HeaderCell>language</HeaderCell>
          <Cell dataKey="language" />
        </Column>
        <Column width={100} sortable resizable>
          <HeaderCell>screen</HeaderCell>
          <Cell dataKey="screen" />
        </Column>
      </Table>
    </div>
  );
}

export default ThisTable;
