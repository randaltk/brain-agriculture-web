import { ReactNode } from "react";

export interface Producer {
  id: number;
  cpfCnpj: string;
  name: string;
  farmName: string;
  city: string;
  state: string;
  totalArea: number;
  cultivableArea: number;
  vegetationArea: number;
  cultures: Culture[];
}

export interface Culture {
    name: string;
    area: number
  }
  
export interface ProducerContextData {
  producers: Producer[];
  selectedProducer: Producer | null;
  isLoading: boolean;
  getAllProducers: () => Promise<void>;
  getProducerById: (id: number) => Promise<void>;
  createProducer: (producer: Producer) => Promise<void>;
  updateProducer: (id: number, producer: Producer) => Promise<void>;
  deleteProducer: (id: number) => Promise<void>;
}

export interface ProducerProviderProps {
  children: ReactNode;
}

export interface CreateProducerFormProps {
  onCreate: (formData: FormData) => void;
}
