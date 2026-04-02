import React, { useState, useMemo, useCallback } from "react";
import Card from "../components/Card";
import Button from "../components/Button";
import Drawer from "../components/Drawer";



const DEFAULT_ITEMS_PER_PAGE = 6;

const createInitialData = (count = 6) =>
  Array.from({ length: count }).map(() => ({
    title: "Test",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    date: "14/07/2025",
  }));

const Home = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const [rowsPerPage, setRowsPerPage] = useState(DEFAULT_ITEMS_PER_PAGE);

  const [form, setForm] = useState({ title: "", description: "" });
  const [data, setData] = useState(() => createInitialData(6));

  const totalPages = Math.ceil(data.length / rowsPerPage) || 1;

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * rowsPerPage;
    return data.slice(start, start + rowsPerPage);
  }, [data, currentPage, rowsPerPage]);

  const resetForm = useCallback(() => {
    setForm({ title: "", description: "" });
    setIsEdit(false);
    setCurrentIndex(null);
  }, []);

  const openCreateModal = useCallback(() => {
    resetForm();
    setIsOpen(true);
  }, [resetForm]);

  const handleEdit = useCallback(
    (index) => {
      const globalIndex = (currentPage - 1) * rowsPerPage + index;
      setForm(data[globalIndex]);
      setCurrentIndex(globalIndex);
      setIsEdit(true);
      setIsOpen(true);
    },
    [data, currentPage, rowsPerPage]
  );

  const handleDelete = useCallback(
    (index) => {
      const globalIndex = (currentPage - 1) * rowsPerPage + index;
      setData((prev) => prev.filter((_, i) => i !== globalIndex));
    },
    [currentPage, rowsPerPage]
  );

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();

      setData((prev) => {
        if (isEdit) {
          const updated = [...prev];
          updated[currentIndex] = {
            ...form,
            date: updated[currentIndex].date,
          };
          return updated;
        }

        return [
          ...prev,
          { ...form, date: new Date().toLocaleDateString() },
        ];
      });

      setIsOpen(false);
      resetForm();
    },
    [form, isEdit, currentIndex, resetForm]
  );

  const cards = useMemo(
    () =>
      paginatedData.map((item, i) => (
        <Card
          key={i}
          {...item}
          onEdit={() => handleEdit(i)}
          onDelete={() => handleDelete(i)}
        />
      )),
    [paginatedData, handleEdit, handleDelete]
  );

  return (
    <div className="p-6 flex flex-col h-[calc(100vh-80px)] overflow-hidden">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-semibold">Knowledge Base</h1>

        <div className="flex gap-2">
          <input
            placeholder="Search..."
            className="px-3 py-2 border rounded-lg text-sm"
          />
          <Button onClick={openCreateModal}>+ Create New</Button>
        </div>
      </div>

      
      <div className="grid grid-cols-3 gap-4 flex-1 content-start overflow-auto">
        {cards}
      </div>

      
      <div className="flex justify-between items-center mt-auto pt-4 border-t text-sm text-gray-500">
        <span>{data.length} cards</span>

        <div className="flex items-center gap-4">
          
          <div className="flex items-center gap-2">
            <span>Rows per page</span>
            <select
              value={rowsPerPage}
              onChange={(e) => {
                setRowsPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="border rounded px-2 py-1"
            >
              <option value={3}>3</option>
              <option value={6}>6</option>
              <option value={9}>9</option>
              <option value={12}>12</option>
            </select>
          </div>

          <span>
            Page {currentPage} of {totalPages}
          </span>

          <div className="flex gap-1">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(1)}
              className="px-2 py-1 border rounded disabled:opacity-50"
            >
              
            </button>
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}
              className="px-2 py-1 border rounded disabled:opacity-50"
            >
              
            </button>
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => p + 1)}
              className="px-2 py-1 border rounded disabled:opacity-50"
            >
              
            </button>
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(totalPages)}
              className="px-2 py-1 border rounded disabled:opacity-50"
            >
             
            </button>
          </div>
        </div>
      </div>

      
      <Drawer isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <div className="flex flex-col h-full">
          
          <div className="flex justify-between items-start p-5 border-b">
            <div>
              <h2 className="text-lg font-semibold">
                Create New Knowledge Base
              </h2>
              <p className="text-sm text-gray-500">
                Best for quick answers from documents, websites and text files.
              </p>
            </div>

            <button onClick={() => setIsOpen(false)}>✕</button>
          </div>

          
          <form
            onSubmit={handleSubmit}
            className="flex-1 overflow-auto p-5 space-y-4"
          >
            <div>
              <label className="text-sm font-medium">
                Name (Cannot be edited later) *
              </label>
              <input
                type="text"
                placeholder="Name"
                value={form.title}
                onChange={(e) =>
                  setForm({ ...form, title: e.target.value })
                }
                className="w-full border px-3 py-2 rounded-lg mt-1"
                required
              />
            </div>

            <div>
              <label className="text-sm font-medium">Description</label>
              <textarea
                placeholder="Description"
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
                className="w-full border px-3 py-2 rounded-lg mt-1"
                rows={4}
              />
            </div>

            <div>
              <label className="text-sm font-medium">Vector Store *</label>
              <select className="w-full border px-3 py-2 rounded-lg mt-1">
                <option>Qdrant</option>
              </select>
            </div>

            <div>
              <label className="text-sm font-medium">
                LLM Embedding Model *
              </label>
              <select className="w-full border px-3 py-2 rounded-lg mt-1">
                <option>text-embedding-ada-002</option>
              </select>
            </div>
          </form>

          
          <div className="p-5 border-t flex justify-end">
            <button
              onClick={handleSubmit}
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg"
            >
              Create
            </button>
          </div>
        </div>
      </Drawer>
    </div>
  );
};

export default Home;