import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { portfolioData as defaultData } from '../data/portfolioData';

// We infer the type from the default data
export type PortfolioDataType = typeof defaultData;

interface PortfolioContextProps {
  data: PortfolioDataType;
  updateData: (newData: PortfolioDataType) => void;
  resetToDefault: () => void;
}

const PortfolioContext = createContext<PortfolioContextProps | undefined>(undefined);

export const PortfolioProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [data, setData] = useState<PortfolioDataType>(defaultData);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch data from local json-server database
    fetch('https://my-portfolio-api-gfd3.onrender.com')
      .then(res => res.json())
      .then(fetchedData => {
        // Deep merge to ensure no missing fields if db is outdated
        if (fetchedData && Object.keys(fetchedData).length > 0) {
          setData({
            ...defaultData,
            ...fetchedData,
            personal: {
              ...defaultData.personal,
              ...(fetchedData.personal || {})
            }
          });
        }
      })
      .catch(err => {
        console.error("Failed to fetch from local database. Make sure json-server is running.", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const updateData = async (newData: PortfolioDataType) => {
    setData(newData); // Optimistic UI update
    
    try {
      await fetch('https://my-portfolio-api-gfd3.onrender.com/portfolio', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newData)
      });
    } catch (e) {
      console.error("Failed to save to local database", e);
    }
  };

  const resetToDefault = () => {
    setData(defaultData);
    updateData(defaultData);
  };

  if (loading) {
    return <div className="min-h-screen bg-primary flex items-center justify-center text-slate-500">Connecting to local database...</div>;
  }

  return (
    <PortfolioContext.Provider value={{ data, updateData, resetToDefault }}>
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (context === undefined) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
};
