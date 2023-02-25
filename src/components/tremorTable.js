import {
  Card,
  Table,
  TableHead,
  TableRow,
  TableHeaderCell,
  TableBody,
  TableCell,
  Text,
  Title,
  Badge,
} from "@tremor/react";

function TremorTable({ data }) {
  return (
    <Card>
      <Title>List </Title>
      <Table marginTop="mt-5">
        <TableHead>
          <TableRow>
            <TableHeaderCell>Metric ID</TableHeaderCell>
            <TableHeaderCell>Session ID</TableHeaderCell>
            <TableHeaderCell>Event Type</TableHeaderCell>
            <TableHeaderCell>device_type</TableHeaderCell>
            <TableHeaderCell>browser</TableHeaderCell>
            <TableHeaderCell>is_conversion</TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((item) => (
            <TableRow key={item.session_id}>
              <TableCell>{item.id}</TableCell>
              <TableCell>{item.session_id}</TableCell>
              <TableCell>{item.event_type}</TableCell>
              <TableCell>
                <Text>{item.device_type}</Text>
              </TableCell>
              <TableCell>
                <Text>{item.browser}</Text>
              </TableCell>
              <TableCell>
                {" "}
                <Text>{item.is_conversion ? "true" : "false"}</Text>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}
export default TremorTable;
