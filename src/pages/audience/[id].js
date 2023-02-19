import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const Audience = () => {
  const [audience, setAudience] = useState(null);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    const fetchAudience = async () => {
      const res = await fetch(`/api/get-audience?id=${id}`);
      const data = await res.json();
      setAudience(data);
    };

    if (id) {
      fetchAudience();
    }
  }, [id]);

  if (!audience) {
    return <div>Loading...</div>;
  }
  const handleDelete = async id => {
    const res = await fetch(`/api/delete-audience?id=${id}`, {
      method: "DELETE"
    });

    if (res.status === 200) {
      const data = await res.json();
      router.push({
        pathname: `/audiences`
      });
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 w-1/2 m-auto">
      <h1 className="text-3xl font-bold mb-2">{audience.name}</h1>
      <p className="text-lg mb-2">Visitors: {audience.visitors}</p>
      <p className="text-lg mb-2">Session Time: {audience.sessionTime}</p>
      <p className="text-lg mb-2">Bounce Rate: {audience.bounceRate}</p>
      <button onClick={() => handleDelete(audience.id)}>Delete</button>
    </div>
  );
};

export default Audience;
