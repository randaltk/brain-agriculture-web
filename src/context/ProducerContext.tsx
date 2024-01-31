import React, { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import api from '../services/api';
import { Producer, ProducerContextData, ProducerProviderProps } from '@/app/interfaces';


const ProducerContext = createContext<ProducerContextData | undefined>(undefined);

export const ProducerProvider: React.FC<ProducerProviderProps> = ({ children }) => {
  const router = useRouter();
  const [producers, setProducers] = useState<Producer[]>([]);
  const [selectedProducer, setSelectedProducer] = useState<Producer | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const getAllProducers = async () => {
    try {
      setIsLoading(true);
      const response = await api.get('/producers');
      setProducers(response.data);
    } catch (error) {
      console.error('Error fetching producers', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getProducerById = async (id: number) => {
    try {
      setIsLoading(true);
      const response = await api.get(`/producers/${id}`);
      setSelectedProducer(response.data);
    } catch (error) {
      console.error('Error fetching producer by id', error);
    } finally {
      setIsLoading(false);
    }
  };

  const createProducer = async (producer: Producer) => {
    try {
      setIsLoading(true);
      await api.post('/producers', producer);
      await getAllProducers();
      router.push('/'); 
    } catch (error) {
      console.error('Error creating producer', error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateProducer = async (id: number, producer: Producer) => {
    try {
      setIsLoading(true);
      await api.put(`/producers/${id}`, producer);
      await getAllProducers();
      router.push('/'); 
    } catch (error) {
      console.error('Error updating producer', error);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteProducer = async (id: number) => {
    try {
      setIsLoading(true);
      await api.delete(`/producers/${id}`);
      await getAllProducers();
    } catch (error) {
      console.error('Error deleting producer', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getAllProducers();
  }, []);

  const contextValue: ProducerContextData = {
    producers,
    selectedProducer,
    isLoading,
    getAllProducers,
    getProducerById,
    createProducer,
    updateProducer,
    deleteProducer,
  };

  return <ProducerContext.Provider value={contextValue}>{children}</ProducerContext.Provider>;
};

export const useProducer = () => {
  const context = useContext(ProducerContext);
  if (!context) {
    throw new Error('useProducer must be used within a ProducerProvider');
  }
  return context;
};
