import { Content } from "@carbon/react";
import { useEffect, useState } from "react";
import { LogItem } from "../../types";
import { db } from "../../db";
import _ from "lodash";

export const Logs = () => {
  const [logs, setLogs] = useState<LogItem[]>([]);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const items: LogItem[] = await db.logs.toArray();
        const sortedItems = _.orderBy(items, ["time"], "desc");

        setLogs(sortedItems);
      } catch (error) {
        console.error(error);
        setLogs([]);
      }
    };

    fetchLogs();
  }, []);

  return (
    <Content>
      {logs?.map((log) => (
        <div key={log?.id} className="mt-5 pb-5">
          <div>{`[${log.time?.toLocaleDateString([], {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true
          })}]`}</div>{" "}
          <div className="mt-3">
            <small>{` >  ${log.message}`}</small>
          </div>
        </div>
      ))}
    </Content>
  );
};
