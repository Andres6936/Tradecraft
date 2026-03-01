import React from "react";

type ContextHistoryChartProps = {
  min: number,
  max: number,
  avg: number,
  invertColors: boolean,
  onChangeInvertColors: (value: boolean) => void,
}

const ContextHistoryChart = React.createContext<ContextHistoryChartProps | null>(null);

const HistoryChartProvider = (props: React.PropsWithChildren<{
  min: number,
  max: number,
  avg: number,
}>) => {
  const [invertColors, setInvertColors] = React.useState(false);

  return (
    <ContextHistoryChart.Provider value={{
      min: props.min,
      max: props.max,
      avg: props.avg,
      invertColors,
      onChangeInvertColors: setInvertColors,
    }}>
      {props.children}
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
