"use client";

import axiosInstance from "@/shared/services/api/axios.config";
import queries from "@/shared/services/api/queries";
import { ChangeEvent, FormEvent, useRef, useState } from "react";

const Page = () => {
  const [name, setName] = useState("");
  const [author, setAuthor] = useState("");
  const file = useRef<File>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file?.current) return;
    try {
      const formData = new FormData();
      formData.append("audio", file.current);
      formData.append("name", name);
      formData.append("author", author);

      await axiosInstance.post(queries.createTrack, formData, { headers: { "Content-Type": "multipart/form-data" } });
    } catch (e) {
      console.log(e);
    }
  };

  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      file.current = e.target.files[0];
    }
  };

  return (
    <div className="px-10">
      <form className="w-[400px]" datatype="multipart/form-data" onSubmit={handleSubmit} action="#">
        <div className="group text-black border border-black px-2 py-1">
          <p className=" text-black text-[14px]">1. Введите название</p>
          <input
            type="text"
            onChange={(e) => setName(e.target.value)}
            value={name}
            placeholder="Название"
            className="text-black outline-none"
          />
        </div>

        <div className="group text-black border border-black px-2 py-1 mt-4">
          <p className=" text-black text-[14px]">2. Добавьте автора</p>
          <input
            onChange={(e) => setAuthor(e.target.value)}
            value={author}
            type="text"
            placeholder="Название"
            className="text-black outline-none"
          />
        </div>

        <div className="">
          <p className=" text-black text-[14px] mt-6">3. Загрузите аудио</p>
          <input
            type="file"
            onChange={handleFileUpload}
            placeholder="Название"
            className="text-black outline-none mt-2"
          />
        </div>

        <button
          type="submit"
          className="bg-black border border-[#fff] text-[#fff] px-4 py-2 mt-8 active:bg-white active:border-[#000] active:text-[#000]"
        >
          Продолжить
        </button>
      </form>
    </div>
  );
};

export default Page;
