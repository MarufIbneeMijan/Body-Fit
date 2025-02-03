import { useEffect, useState } from "react";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import { motion } from 'framer-motion';
import { Helmet } from "react-helmet-async";
const Allclass = () => {
  const [data, setData] = useState([]);
  const [category, setCategory] = useState("Cardio");
  const [page, setpage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const axiosPublic = useAxiosPublic();
  const fetchData = async () => {
    const res = await axiosPublic.get("/allclass", {
      params: {
        page,
        category,
      },
    });
    console.log(res);
    setData(res?.data.result);
    setTotalPages(res.data.totalPages);
  };
  const handleTabClick = (selectedCategory) => {
    setCategory(selectedCategory);
    setpage(1);
  };
  useEffect(() => {
    fetchData();
  }, [category]);
  console.log(data);
  return (
    <div className="flex flex-col">
      <div className="flex p-20 justify-between">
        {[
          "Cardio",
          "Strength",
          "Yoga",
          "Dance",
          "Mind-Body",
          "Dance-Based",
        ].map((tab) => (
          <div key={tab} onClick={() => handleTabClick(tab)}>
            {tab}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-3">
        {data.map((item) => (
          
          <div className="relative   mx-4 my-6 rounded-lg overflow-hidden shadow-lg">
          <motion.img
            src={item?.image}
            alt={item?.name}
            className="w-full h-full object-cover transform transition-transform duration-300 ease-in-out hover:scale-105"
            whileHover={{ scale: 1.05 }} // Slight zoom effect on hover
            transition={{ duration: 0.3 }}
          />
          <motion.div
            className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 p-4 text-white"
            initial={{ bottom: '-100%', opacity: 0 }}
            animate={{ bottom: 0, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="text-xl font-semibold">{item?.name}</h3>
           
            <p className="text-lg text-green-600">{item?.details}</p>
          
          </motion.div>
        </div>
         
        ))}
      </div>
      <Helmet>
                 <title>All Class</title>
                 </Helmet>
    </div>
  );
};

export default Allclass;
