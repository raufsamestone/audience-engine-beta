import {
  Block,
  Bold,
  ButtonInline,
  Callout,
  Card,
  Flex,
  Footer,
  List,
  ListItem,
  Metric,
  ProgressBar,
  Text,
  Badge,
} from "@tremor/react";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

export default function GoalsList() {
  const router = useRouter();
  const { id } = router.query;
  const [currentGoals, setCurrentGoals] = useState();

  useEffect(() => {
    if (!id) {
      return; // If the id is not provided, exit early
    }
    const fetchGoals = async () => {
      try {
        const res = await fetch(`/api/get-goals?id=${id}`);
        const { goals, error } = await res.json();
        console.log(goals);
        if (error) {
          console.log("Error fetching metrics data:", error.message);
        } else {
          setCurrentGoals(goals);
        }
      } catch (error) {
        console.log("Error fetching metrics data:", error.message);
      }
    };

    fetchGoals();
  }, [id]);

  if (!currentGoals) return null;

  return (
    <Card maxWidth="">
      <Badge
        text="Live"
        color="blue"
        size="sm"
        icon={undefined}
        tooltip=""
        marginTop="mt-0"
      />
      {/*   <Text> Issues solved </Text>
  <Flex
        justifyContent="justify-start"
        spaceX="space-x-1"
        alignItems="items-baseline"
      >
        <Metric> 338 </Metric>
        <Text>/ 450</Text>
      </Flex> */}
      {/* <Callout
        title="Goal is active."
        text=""
        color="emerald"
        marginTop="mt-6"
      />{" "} */}
      {/* <ProgressBar percentageValue={75} color="emerald" marginTop="mt-6" /> */}
      {/* <Flex marginTop="mt-4">
        <Block>
          <Text>Solved</Text>
          <Text color="emerald">
            <Bold>338</Bold>
            (75%)
          </Text>
        </Block>
        <Block>
          <Text textAlignment="text-right">Open</Text>
          <Text textAlignment="text-right">
            <Bold>112</Bold>(25%)
          </Text>
        </Block>
      </Flex> */}
      <Flex marginTop="mt-6">
        <Text>
          <Bold>Active Goals</Bold>
        </Text>
      </Flex>
      <List marginTop="mt-1">
        {currentGoals?.map((item) => (
          <ListItem key={item.key}>
            <span>
              {" "}
              {item.key} is {item.operator} to {item.value}
            </span>
          </ListItem>
        ))}
      </List>
    </Card>
  );
}
