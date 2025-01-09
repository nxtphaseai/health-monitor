export interface HbA1cReading {
  date: string;
  hsCRP: number;
  hba1c: number;
  fasting_glucose: number;
  ldl_cholesterol: number;
  triglycerides: number;
  hdl_cholesterol: number;
  ALT_liver_enzymes: number;
}

export interface ReadingsResponse {
  [date: string]: HbA1cReading;
}



const STORAGE_KEY = 'healthmonitor_readings';

function saveToLocalStorage(readings: ReadingsResponse): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(readings));
  }
}

function getFromLocalStorage(): ReadingsResponse {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : {};
  }
  return {};
}

export function getReadings(): ReadingsResponse {
  return getFromLocalStorage();
}

export function addReading(reading: HbA1cReading): { success: boolean; message: string } {
  const currentReadings = getFromLocalStorage();
  const updatedReadings = {
    ...currentReadings,
    [reading.date]: reading
  };
  saveToLocalStorage(updatedReadings);
  return { success: true, message: 'Reading saved successfully' };
}

export function generateInsights(): { response_text: string } {
  const readings = getFromLocalStorage();
  const readingsCount = Object.keys(readings).length;
  
  if (readingsCount === 0) {
    return { response_text: 'No readings available to generate insights.' };
  }
  
  return { 
    response_text: `You have ${readingsCount} readings stored. Please consult with your healthcare provider to interpret these results.`
  };
}

export function clearAllReadings(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(STORAGE_KEY);
  }
}
