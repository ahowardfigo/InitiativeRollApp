import axios from 'axios';
import type { DiceRollRequest, DiceRollResponse } from '../types/api';

// Create axios instance with base configuration
const apiClient = axios.create({
  baseURL: 'http://localhost:8080/api', // This will be our backend API base URL
  headers: {
    'Content-Type': 'application/json',
  },
});

// API functions
export const rollDice = async (rollRequest: DiceRollRequest): Promise<DiceRollResponse> => {
  try {
    const response = await apiClient.post<DiceRollResponse>('/rolls', rollRequest);
    return response.data;
  } catch (error) {
    // We'll want to handle this better in production
    console.error('Error rolling dice:', error);
    throw error;
  }
}; 