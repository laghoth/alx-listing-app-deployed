import axios from "axios";
import { useState } from "react";

export default function BookingForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    cardNumber: "",
    expirationDate: "",
    cvv: "",
    billingAddress: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await axios.post("/api/bookings", formData);
      console.log("Booking confirmed:", response.data);
      setSuccess(true);
    } catch (error) {
      console.error("Booking error:", error);
      setError("Failed to submit booking.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">Booking Information</h1>

      {[
        "firstName",
        "lastName",
        "email",
        "phoneNumber",
        "cardNumber",
        "expirationDate",
        "cvv",
        "billingAddress",
      ].map((field) => (
        <input
          key={field}
          type="text"
          name={field}
          placeholder={field}
          value={formData[field as keyof typeof formData]}
          onChange={handleChange}
          className="mb-2 p-2 border rounded w-full"
        />
      ))}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 text-white py-2 rounded"
      >
        {loading ? "Processing..." : "Confirm & Pay"}
      </button>

      {error && <p className="text-red-600 mt-2">{error}</p>}
      {success && <p className="text-green-600 mt-2">Booking confirmed!</p>}
    </form>
  );
}
