import ChartSection from "@/app/(auth)/analytics/components/ChartSection";
import MoistureChart from "@/app/(auth)/analytics/components/MoistureChart";
import TempChart from "@/app/(auth)/analytics/components/TempChart";
import HumidChart from "@/app/(auth)/analytics/components/HumidChart";

export default function Home() {
  const humidity = "Humidity";
  const moisture = "Moisture";
  const temperature = "Temperature";
  return (
    <main className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto ">
        <ChartSection
          chartPosition="left"
          chartComponent={<MoistureChart />}
          description={moisture}
        />
        <ChartSection
          chartPosition="right"
          chartComponent={<TempChart />}
          description={temperature}
        />
        <ChartSection
          chartPosition="left"
          chartComponent={<HumidChart />}
          description={humidity}
        />
        
      </div>
    </main>
  );
}
