import React from "react";

type ContextHistoryChartProps = {
  invertColors: boolean,
  onChangeInvertColors: (value: boolean) => void,
}

const ContextHistoryChart = React.createContext<ContextHistoryChartProps | null>(null);

const HistoryChartProvider = ({ children }: React.PropsWithChildren<{}>) => {
  const [invertColors, setInvertColors] = React.useState(false);

  return (
    <ContextHistoryChart.Provider value={{
      invertColors,
      onChangeInvertColors: setInvertColors,
    }}>
      {children}
    </ContextHistoryChart.Provider>
  );
};

const useHistoryChart = () => {
  const context = React.useContext(ContextHistoryChart);
  if (!context) {
    throw new Error('useContextHistoryChart must be used within a ContextHistoryChartProvider');
  }
  return context;
}

export { HistoryChartProvider, useHistoryChart };
