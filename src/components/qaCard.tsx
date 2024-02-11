import {
  Heading, CardHeader, Card, CardBody, Text, HStack,
} from '@chakra-ui/react';

interface QaCardProps {
  title: string,
  lastValue: number;
  average: number;
}

export const QaCard: React.FC<QaCardProps> = ({
  title,
  lastValue,
  average,
}) => (
  <Card>
    <CardHeader>
      <Heading size="md">{title}:</Heading>
    </CardHeader>

    <CardBody>
      <HStack>
        <Text>Last Value:</Text>
        <Text>{lastValue.toFixed(3)}</Text>
      </HStack>
      <HStack>
        <Text>Average:</Text>
        <Text>{average.toFixed(4)}</Text>
      </HStack>
    </CardBody>
  </Card>
);
