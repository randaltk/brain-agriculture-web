import ProducerList from "@/components/producer-list/ProducerList";
import { ProducerProvider } from "@/context/ProducerContext";

const Producer = () => {
  return (
    <ProducerProvider>
      <ProducerList />
    </ProducerProvider>
  );
};

export default Producer;
