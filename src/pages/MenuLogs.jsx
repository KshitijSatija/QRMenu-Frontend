import React, { useEffect, useState } from "react";
import API from "../api/api";

const LogDiffViewer = ({ field, before, after }) => {
  const isSections = field === "sections" && Array.isArray(before) && Array.isArray(after);
  const isImageField = ["logo", "backgroundImage"].includes(field);

  if (isSections) {
    return (
      <div>
        {after.map((sectionAfter, secIndex) => {
          const sectionBefore = before[secIndex] || {};
          const titleChanged = sectionBefore.title !== sectionAfter.title;
          const itemsBefore = sectionBefore.items || [];
          const itemsAfter = sectionAfter.items || [];

          return (
            <div key={secIndex} className="mb-4 border border-gray-200 rounded-md p-3">
              <h4 className="font-semibold text-gray-800 mb-2">Section: {sectionAfter.title}</h4>

              {titleChanged && (
                <div className="mb-2">
                  <div className="text-sm text-red-600 line-through">Title: {sectionBefore.title}</div>
                  <div className="text-sm text-green-600">Title: {sectionAfter.title}</div>
                </div>
              )}

              <div className="ml-3">
                {itemsAfter.map((item, itemIndex) => {
                  const prevItem = itemsBefore[itemIndex] || {};
                  const diffs = [];

                  if (item.name !== prevItem.name) {
                    diffs.push({
                      field: "Name",
                      before: prevItem.name,
                      after: item.name,
                    });
                  }
                  if (item.description !== prevItem.description) {
                    diffs.push({
                      field: "Description",
                      before: prevItem.description,
                      after: item.description,
                    });
                  }
                  if (item.price !== prevItem.price) {
                    diffs.push({
                      field: "Price",
                      before: prevItem.price,
                      after: item.price,
                    });
                  }

                  return diffs.length > 0 ? (
                    <div key={itemIndex} className="bg-gray-50 p-2 mb-2 rounded shadow-sm">
                      <div className="font-medium text-sm text-gray-700 mb-1">Item #{itemIndex + 1}</div>
                      {diffs.map((diff, i) => (
                        <div key={i} className="pl-3">
                          <div className="text-sm text-red-600 line-through">{diff.field}: {diff.before}</div>
                          <div className="text-sm text-green-600">{diff.field}: {diff.after}</div>
                        </div>
                      ))}
                    </div>
                  ) : null;
                })}
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  if (isImageField) {
    return (
      <div className="text-sm mb-4">
        <div className="font-medium text-gray-700 mb-1 capitalize">{field}:</div>
        <div className="flex gap-4">
          {before && (
            <div className="text-center">
              <div className="text-xs text-gray-500 mb-1">Before</div>
              <img src={before} alt="before" className="max-w-[150px] max-h-[150px] border rounded" />
            </div>
          )}
          {after && (
            <div className="text-center">
              <div className="text-xs text-gray-500 mb-1">After</div>
              <img src={after} alt="after" className="max-w-[150px] max-h-[150px] border rounded" />
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="text-sm mb-2">
      <span className="font-medium text-gray-700">{field}</span>:
      <div className="pl-4">
        <div className="text-red-600 line-through">{JSON.stringify(before)}</div>
        <div className="text-green-600">{JSON.stringify(after)}</div>
      </div>
    </div>
  );
};

const MenuLogs = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const response = await API.get("/api/menu/logs");
        setLogs(response.data.logs);
      } catch (err) {
        console.error("Error fetching logs:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchLogs();
  }, []);

  if (loading) return <div className="p-4 text-gray-600">Loading logs...</div>;
  if (!logs.length) return <div className="p-4 text-gray-500">No logs found.</div>;

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">Menu Activity Logs</h2>
      <div className="space-y-6">
        {logs.map((log) => (
          <div key={log._id} className="bg-white rounded-xl shadow p-5 border border-gray-200">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-600">
                <strong className="capitalize">{log.action}</strong> — {new Date(log.timestamp).toLocaleString()}
              </span>
              <span className="text-xs text-gray-400">Menu ID: {log.targetId}</span>
            </div>

            {log.details && Object.keys(log.details).length > 0 ? (
              <div className="mt-3 space-y-4">
                {Object.entries(log.details).map(([field, change]) => (
                  <LogDiffViewer key={field} field={field} before={change.before} after={change.after} />
                ))}
              </div>
            ) : (
              <div className="text-sm text-gray-500 italic">No detailed changes logged.</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MenuLogs;
