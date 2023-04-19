import { AxiosError } from "axios";
import { useContext, useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
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
  CustomToolTip,
  GenericLoadingPage,
  MainContent,
  NavBar,
  PageContainer,
} from "../components";
import AuthContext from "../contexts/AuthContext";
import useDebounce from "../hooks/useDebounce";
import { getAnalytics } from "../services/analyticsService";
import { Analytic } from "../types";

interface Query {
  amount: number;
  before?: {
    human: string | undefined;
    machine: string | undefined;
  };
  after?: {
    human: string | undefined;
    machine: string | undefined;
  };
}

const Analytics = () => {
  const { token } = useContext(AuthContext);
  const [analytics, setAnalytics] = useState<Analytic[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const Navigate = useNavigate();

  const [query, setQuery] = useState<Query>({ amount: 300 });
  const debouncedQuery = useDebounce(query, 500);

  useEffect(() => {
    console.log("Analytics useEffect");
    if (token.length === 0) Navigate("/");
    const fetchAnalytics = async () => {
      try {
        const { data } = await getAnalytics(token, {
          amount: query.amount,
          before: query.before?.machine,
          after: query.after?.machine,
        });

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
          if (
            error.response?.status === 404 &&
            error.response?.data.error === "No analytics found"
          ) {
            setAnalytics([]);
            return;
          }
          return setError(
            `[${error.response?.status}] ${error.response?.data.error}`
          );
        }
        setError("Unexpected error happened.");
      }
    };

    fetchAnalytics();
  }, [debouncedQuery]);

  if (loading) return <GenericLoadingPage />;
  if (error)
    return (
      <PageContainer>
        <NavBar />
        <MainContent classes="my-auto">
          <h1 className="text-2xl">Oops. Something went wrong!</h1>
          <h1 className="text-2xl text-red-500">{error}</h1>
        </MainContent>
      </PageContainer>
    );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    switch (e.target.name) {
      case "count":
        setQuery((old) => ({ ...old, amount: Number(e.target.value) }));
        break;
      default:
        break;
    }
  };

  return (
    <PageContainer>
      <NavBar />
      <MainContent classes="my-auto h-fit">
        <div className="flex justify-between">
          <h1 className="text-2xl font-semibold text-gray-200">
            Bot's analytical graphs
          </h1>
          <div className="flex bg-neutral-100 shadow-blue bg-opacity-5 p-5 rounded-xl flex-col gap-2 text-white">
            <p>Filter</p>
            <input
              className="px-2 w-[211px] bg-neutral-900"
              name="count"
              onChange={handleChange}
              placeholder="Amount"
              type="number"
              value={query.amount}
            />
            <DatePicker
              className="px-2 bg-neutral-900"
              name="before"
              placeholderText="Before date.."
              dateFormat={"dd/MM/yyyy"}
              value={query.before?.human}
              onChange={(date) =>
                setQuery((old) => ({
                  ...old,
                  before: {
                    human: date?.toLocaleString(),
                    machine: date?.toISOString(),
                  },
                }))
              }
            />
            <DatePicker
              className="px-2 bg-neutral-900"
              name="after"
              placeholderText="After date.."
              value={query.after?.human}
              onChange={(date) =>
                setQuery((old) => ({
                  ...old,
                  after: {
                    human: date?.toLocaleString(),
                    machine: date?.toISOString(),
                  },
                }))
              }
            />
          </div>
        </div>
        <div className="w-full h-[600px] ">
          {analytics.length > 0 && (
            <>
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
                  <YAxis domain={["dataMin", "dataMax"]} />
                  <Tooltip content={<CustomToolTip />} />
                  <Area
                    type="monotone"
                    dataKey="userAmount"
                    stroke="#8884d8"
                    fill="#8884d8"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </>
          )}
          {analytics.length === 0 && (
            <h1 className="text-red-500 text-3xl">
              No analytics were found. Try to broaden your search
            </h1>
          )}
        </div>
      </MainContent>
    </PageContainer>
  );
};

export default Analytics;
