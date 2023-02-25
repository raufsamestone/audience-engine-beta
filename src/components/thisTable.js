import { Table, Column, HeaderCell, Cell } from "rsuite-table";

function ThisTable({ data }) {
  // const data = [
  //   {
  //     id: "d62d26e9-efc4-4604-8624-d820c4e4d17c",
  //     event_type: "custom",
  //     event_data: {
  //       eventData: "This is custom event",
  //       eventValue: "custom event value",
  //     },
  //     is_conversion: true,
  //     device_type: "desktop",
  //     browser: "firefox 110",
  //     language: "en-US",
  //     screen: "2560 X 1080",
  //     utm_params: {},
  //     referrer: "",
  //     session_id: "111",
  //     timestamp: "2023-02-22T18:37:04.641+00:00",
  //     audience_id: "237e00c1-cfe7-4e53-ace1-742f1b79f6d0",
  //   },
  //   {
  //     id: "a7b98218-cc9d-4e20-a72a-2e609f5b5e5d",
  //     event_type: "click",
  //     event_data: {
  //       eventData: "Clicked on button",
  //       eventValue: "button-1",
  //     },
  //     is_conversion: false,
  //     device_type: "mobile",
  //     browser: "safari 14",
  //     language: "en-US",
  //     screen: "375 X 812",
  //     utm_params: {
  //       utm_source: "google",
  //       utm_medium: "cpc",
  //       utm_campaign: "summer-sale",
  //     },
  //     referrer: "",
  //     session_id: "222",
  //     timestamp: "2023-02-22T19:03:12.712+00:00",
  //     audience_id: "64f98d13-0a11-4df4-9aa9-44e33c12a2a2",
  //   },
  //   {
  //     id: "bdf6da5d-af71-46de-a06f-bcfe87e8b491",
  //     event_type: "scroll",
  //     event_data: {
  //       scrollValue: 120,
  //     },
  //     is_conversion: false,
  //     device_type: "desktop",
  //     browser: "chrome 96",
  //     language: "en-US",
  //     screen: "1920 X 1080",
  //     utm_params: {},
  //     referrer: "",
  //     session_id: "111",
  //     timestamp: "2023-02-22T19:12:27.139+00:00",
  //     audience_id: "237e00c1-cfe7-4e53-ace1-742f1b79f6d0",
  //   },
  // ];

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
