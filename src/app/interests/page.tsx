"use client";

import axios from "axios";
import { ChangeEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";
import CheckboxField from "~/components/CheckboxField";
import Paginator from "~/components/Paginator";

export default function InterestsPage() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<
    { id: string; interest: string; checked: boolean }[]
  >([]);
  const [currentPage, setCurrentPage] = useState(1);
  let totalPages = 17;

  const fetchInterests = async () => {
    try {
      setLoading(true);
      const interests = await axios.get("/api/interests", {
        params: { page: currentPage },
      });
      setData(interests.data.interests);
    } catch (error: any) {
      toast.error(error.response.data.error || error.message);
    } finally {
      setLoading(false);
    }
  };

  const checkEventHandler = async (
    e: ChangeEvent<HTMLInputElement>,
    id: string,
  ) => {
    const { checked } = e.target;
    const dataa = data.map((item) => {
      if (item.id === id) item.checked = checked;
      return item;
    });
    try {
      await axios.post("/api/interests", { id, checked });
    } catch (error: any) {
      toast.error(error.response.data.error || error.message);
    }
    setData(dataa);
  };

  const paginationHandler = (currentPage: number) => {
    setCurrentPage(currentPage);
  };

  useEffect(() => {
    fetchInterests();
  }, [currentPage]);

  return (
    <div className="flex flex-col gap-9">
      <header className="flex flex-col items-center gap-6">
        <h2 className="header-2 self-center">Please mark your interests!</h2>
        <span>We will keep you notified.</span>
      </header>
      <section className="mt-3">
        <span className="text-xl font-medium">My saved interests!</span>
        {loading ? (
          <div className="flex justify-center">
            <span className="font-medium text-lg text-gray-600 mt-6">Loading...</span>
          </div>
        ) : (
          <div className="mt-7 flex flex-col gap-6">
            {data.map((item) => (
              <CheckboxField
                {...item}
                key={item.id}
                checkEventHandler={checkEventHandler}
              />
            ))}
          </div>
        )}
      </section>
      <div className="mt-8">
        <Paginator
          currentPage={currentPage}
          paginationHandler={paginationHandler}
          totalPages={totalPages}
        />
      </div>
    </div>
  );
}
