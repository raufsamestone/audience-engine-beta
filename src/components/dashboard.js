import {
  Card,
  Metric,
  Text,
  AreaChart,
  BadgeDelta,
  Flex,
  DeltaType,
  ColGrid,
} from "@tremor/react";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useState, useEffect } from "react";

const valueFormatter = (number) =>
  `$ ${Intl.NumberFormat("us").format(number).toString()}`;

export default function Dashboard() {
  const [audienceData, setAudienceData] = useState([]);
  const supabase = useSupabaseClient();
  const session = useSession();
  const user = session.user;

  useEffect(() => {
    async function fetchAudiences() {
      const { data, error } = await supabase
        .from("audiences")
        .select("*")
        .eq("user_id", user.id);

      if (error) console.log("Error fetching audiences:", error.message);
      else setAudienceData(data);
    }

    fetchAudiences();
  }, [user]);

  const categories = [
    {
      title: "Audiences",
      metric: audienceData.length,
    },
  ];

  return (
    <ColGrid numColsSm={2} numColsLg={3} gapX="gap-x-6" gapY="gap-y-6">
      {categories.map((item) => (
        <Card key={item.title}>
          <Flex alignItems="items-start">
            <Text>{item.title}</Text>
          </Flex>
          <Flex
            justifyContent="justify-start"
            alignItems="items-baseline"
            spaceX="space-x-3"
            truncate={true}
          >
            <Metric>{item.metric}</Metric>
          </Flex>
        </Card>
      ))}
    </ColGrid>
  );
}
