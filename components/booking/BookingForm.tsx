import React, { useState } from "react";
import { createBooking } from "../../lib/api";

const BookingForm: React.FC = () => {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createBooking({ name });
      setSuccess(true);
    } catch {
      alert("Booking failed");
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input
          className="border p-2 ml-2"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </label>
      <button
        className="ml-2 px-4 py-2 bg-blue-600 text-white rounded"
        type="submit"
        disabled={loading}
      >
        {loading ? "Booking..." : "Book"}
      </button>
      {success && (
        <div className="text-green-600 mt-2">Booking successful!</div>
      )}
    </form>
  );
};

export default BookingForm;
