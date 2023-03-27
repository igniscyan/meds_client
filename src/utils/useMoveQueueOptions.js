import { useState, useEffect } from "react";
import useGetQueues from "../Queries/useGetQueues";

const useMoveQueueOptions = () => {
  const allQueues = useGetQueues();
  const [moveQueueOptions, setMoveQueueOptions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (allQueues.status === "success") {
      const options = allQueues.data.map((q) => ({
        key: q.id,
        name: q.name,
      }));
      setMoveQueueOptions(options);
      setLoading(false);
    } else {
      setLoading(true);
    }
  }, [allQueues.data, allQueues.status]);

  return { moveQueueOptions, loading };
};

export default useMoveQueueOptions;
