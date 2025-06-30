import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";
import stats from "../data/statsData.js";
import { useTheme } from "../context/ThemeContext";

// Custom Tooltip component
const CustomTooltip = ({ active, payload, label, theme }) => {
  if (active && payload && payload.length) {
    const hours = payload[0].value;

    if (hours === 0 || hours === null) {
      return (
        <div className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'} p-3 rounded-lg ${theme === 'dark' ? 'border-gray-700' : 'border-gray-300'} border`}>
          <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} font-medium`}>{label}</p>
          <p className="text-sky-400">no activity</p>
        </div>
      );
    }

    const hoursInt = Math.floor(hours);
    const minutes = Math.round((hours - hoursInt) * 60);

    return (
      <div className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'} p-3 rounded-lg ${theme === 'dark' ? 'border-gray-700' : 'border-gray-300'} border`}>
        <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} font-medium`}>{label}</p>
        <p className="text-sky-400">
          {hoursInt > 0 ? `${hoursInt} hrs` : null} {minutes > 0 ? `${minutes} mins` : null}
        </p>
      </div>
    );
  }

  return null;
};

// Stats component
const Stats = () => {
  const { theme } = useTheme();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 }
  };

  const handleResize = () => {
    setIsMobile(window.innerWidth < 768);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const fetchWakaTimeStats = async () => {
      try {
        const response = await fetch(stats.codingActivityURL);

        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }

        const result = await response.json();
        const formattedData = result.data.map((entry) => {
          const hoursValue = (entry.grand_total.total_seconds / 3600);
          return {
            date: new Date(entry.range.start).toLocaleString('en', { weekday: 'short' }),
            hours: hoursValue < 1 ? 0 : parseFloat(hoursValue.toFixed(2))
          };
        });

        if (formattedData.length > 0) {
          const lastDate = new Date(result.data[result.data.length - 1].range.start);
          const nextDay = new Date(lastDate);
          nextDay.setDate(lastDate.getDate() + 1);

          formattedData.push({
            date: nextDay.toLocaleString('en', { weekday: 'short' }),
            hours: null,
          });
        }

        setData(formattedData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };


    fetchWakaTimeStats();
  }, []);

  const displayedData = isMobile ? data.slice(-4) : data;

  if (loading) return <p className={`text-gray-600 dark:text-gray-400 text-center`}>Loading stats...</p>;
  if (error) return <p className="text-red-500 text-center">Error: {error}</p>;

  return (
    <div id="stats" className="flex flex-col items-center w-full px-8 py-16 pt-36">
      <div className="title-container">
        <motion.h1
          variants={variants}
          initial="hidden"
          whileInView="visible"
          transition={{ duration: 0.5 }}
          className="section-title">
          Stats
        </motion.h1>
      </div>

      <motion.p
        variants={variants}
        initial="hidden"
        whileInView="visible"
        transition={{ duration: 0.5 }}
        className="text-lg text-gray-700 dark:text-gray-300 text-center mb-12">
        The stats displayed here are pulled directly from <a href="https://wakatime.com/" target="_blank" rel="noopener noreferrer" className="text-sky-400 hover:underline"><b>WakaTime</b></a>, a tool that tracks your programming activity. These stats refresh every 24 hours.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.02, boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.2)" }}
        transition={{ duration: 0.5 }}
        className="bg-gray-100/80 dark:bg-black/80 p-6 rounded-lg shadow-lg border border-gray-300 dark:border-gray-800 w-full max-w-4xl"
      >
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Coding Activity <span className="text-sm text-gray-600 dark:text-gray-400">({isMobile ? 'Last 3 Days' : 'Last 7 Days'})</span>
        </h2>

        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={displayedData}>
            <CartesianGrid strokeDasharray="3 3" stroke={theme === 'dark' ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.1)"} />
            <XAxis
              dataKey="date"
              tick={{ fill: theme === 'dark' ? "#9ca3af" : "#4b5563" }}
              tickMargin={12}
            />
            <YAxis
              tick={{ fill: theme === 'dark' ? "#9ca3af" : "#4b5563" }}
              domain={[0, 12]}
              tickMargin={12}
              label={{
                value: "hours",
                fill: theme === 'dark' ? "#9ca3af" : "#4b5563",
                angle: -90,
                position: "insideLeft",
                style: { textAnchor: "middle" },
                offset: 15
              }}
            />
            <Tooltip content={<CustomTooltip theme={theme} />} />
            <Line type="monotone" dataKey="hours" stroke="#38bdf8" strokeWidth={2} connectNulls={false} />
          </LineChart>
        </ResponsiveContainer>
      </motion.div>
    </div>
  );
};

export default Stats;
