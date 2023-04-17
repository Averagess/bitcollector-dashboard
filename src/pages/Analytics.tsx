import { AxiosError } from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  GenericLoadingPage,
  MainContent,
  NavBar,
  PageContainer,
} from "../components";
import AuthContext from "../contexts/AuthContext";
import { getAnalytics } from "../services/analyticsService";
import { Analytic } from "../types";

const CustomToolTip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="text-purple-500 bg-black p-2 border-2 bg-opacity-50 rounded-xl">
        <h1>{label}</h1>
        {payload.map((item: any) => {
          return (
            <div>
              <h1>{item.name}</h1>
              <h1>{item.value}</h1>
            </div>
          );
        })}
      </div>
    );
  }
  return null;
};

const Analytics = () => {
  const { token } = useContext(AuthContext);
  const [analytics, setAnalytics] = useState<Analytic[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const Navigate = useNavigate();

  useEffect(() => {
    console.log("Analytics useEffect");
    if (token.length === 0) Navigate("/");
    const fetchAnalytics = async () => {
      try {
        const { data } = await getAnalytics(token, 300);

        const sortedByDate = data.sort((a, b) => {
          return (
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          );
        });

        const prettifiedDates = sortedByDate.map((item) => {
          return {
            ...item,
            createdAt: new Date(item.createdAt).toLocaleDateString(),
          };
        });

        setAnalytics(prettifiedDates);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        if (error instanceof AxiosError) {
          return setError(error.status + error.response?.data.error);
        }
        setError("Unexpected error happened.");
      }
    };

    fetchAnalytics();
  }, []);

  if (loading) return <GenericLoadingPage />;
  if (error)
    return (
      <PageContainer>
        <NavBar />
        <MainContent>
          <h1 className="text-2xl">Oops. Something went wrong!</h1>
          <h1 className="text-2xl text-red-500">{error}</h1>
        </MainContent>
      </PageContainer>
    );

  return (
    <PageContainer>
      <NavBar />
      <MainContent classes="my-auto h-fit">
        <h1 className="text-2xl font-semibold text-gray-200">
          Bot's analytics graphs
        </h1>
        <div className="w-full h-[600px] ">
          <h1 className="text-purple-500">Servers the bot is in</h1>
          <ResponsiveContainer height="50%">
            <AreaChart
              width={500}
              height={400}
              data={analytics}
              margin={{
                top: 10,
                right: 30,
                left: 0,
                bottom: 0,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="createdAt" />
              <YAxis />
              <Tooltip content={<CustomToolTip />} />
              <Area
                type="monotone"
                dataKey="guildAmount"
                stroke="#8884d8"
                fill="#8884d8"
              />
            </AreaChart>
          </ResponsiveContainer>

          <h1 className="text-purple-500">
            Total amount of users the bot reaches
          </h1>
          <ResponsiveContainer height="50%">
            <AreaChart
              width={500}
              height={400}
              data={analytics}
              margin={{
                top: 10,
                right: 30,
                left: 0,
                bottom: 0,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="createdAt" />
              <YAxis />
              <Tooltip content={<CustomToolTip />} />
              <Area
                type="monotone"
                dataKey="userAmount"
                stroke="#8884d8"
                fill="#8884d8"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </MainContent>
    </PageContainer>
  );
};

export default Analytics;
