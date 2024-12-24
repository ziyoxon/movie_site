import React, { useState, useEffect } from "react";

const TicketPage = () => {
  const [tickets, setTickets] = useState([]);
  const [newTicket, setNewTicket] = useState({
    name: "",
    email: "",
    message: "",
  });

  // Fetch tickets from localStorage when component mounts
  useEffect(() => {
    const savedTickets = JSON.parse(localStorage.getItem("tickets"));
    if (savedTickets) {
      setTickets(savedTickets);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewTicket((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newTicket.name && newTicket.email && newTicket.message) {
      const updatedTickets = [...tickets, newTicket];
      setTickets(updatedTickets);
      localStorage.setItem("tickets", JSON.stringify(updatedTickets)); // Save to localStorage
      setNewTicket({ name: "", email: "", message: "" });
      alert("Ticket submitted successfully!");
    } else {
      alert("Please fill out all fields.");
    }
  };

  return (
    <div className="dark:bg-[#111111] dark:text-white text-black">
      <div className="container dark:bg-[#111111] dark:text-white text-black mx-auto py-10">
        <h2 className="text-center text-5xl font-bold mb-8">Ticket Page</h2>
        <form
          onSubmit={handleSubmit}
          className="max-w-lg mx-auto bg-white p-6 shadow-md rounded-lg"
        >
          <div className="mb-4 ">
            <label
              htmlFor="name"
              className="block text-gray-700 font-medium mb-2"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={newTicket.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 font-medium mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={newTicket.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="message"
              className="block text-gray-700 font-medium mb-2"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={newTicket.message}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition"
          >
            Submit Ticket
          </button>
        </form>

        <div className="mt-10">
          <h3 className="text-3xl font-bold mb-4">Submitted Tickets</h3>
          {tickets.length > 0 ? (
            <ul className="space-y-4">
              {tickets.map((ticket, index) => (
                <li
                  key={index}
                  className="p-4 border rounded-lg shadow-sm bg-gray-50"
                >
                  <h4 className="font-bold text-lg">{ticket.name}</h4>
                  <p className="text-sm text-gray-600">{ticket.email}</p>
                  <p className="mt-2">{ticket.message}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No tickets submitted yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default TicketPage;
