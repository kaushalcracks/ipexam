import "./App.css";
import { useEffect, useState } from "react";
import { FaUserPlus, FaPhoneAlt } from "react-icons/fa"; // New icons

function App() {
  const [phoneList, setPhoneList] = useState([]);
  const [newContact, setNewContact] = useState({ name: "", contact: "" });

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:5001/api/db");
      const result = await response.json();
      setPhoneList(result);
    } catch (error) {
      console.error("error", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5001/api/data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newContact),
      });
      const result = await response.json();
      console.log(result);
      setPhoneList([...phoneList, newContact]);
      setNewContact({ name: "", contact: "" });
    } catch (error) {
      console.error("error submitting form", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewContact({ ...newContact, [name]: value });
  };

  return (
    <div
      className="App min-h-screen flex flex-col items-center bg-cover bg-center py-10"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1521747116042-5a810fda9664?fit=crop&w=1500&q=80')", // Stylish background image
      }}
    >
      <h1 className="text-5xl font-bold text-blue-800 mb-10 shadow-lg bg-white bg-opacity-80 p-4 rounded-lg">
        🎓 Student Directory
      </h1>

      <div className="directory-container flex flex-col md:flex-row gap-8 max-w-5xl w-full px-4">
        
        {/* Contacts List */}
        <div className="phonebook bg-white shadow-2xl rounded-lg p-6 w-full md:w-1/2 bg-opacity-80">
          <h2 className="text-3xl font-semibold text-gray-800 mb-4 border-b-2 border-gray-200 pb-2 flex items-center gap-2">
            <FaPhoneAlt className="text-blue-600" /> Contacts
          </h2>
          <ul className="space-y-5">
            {phoneList.map((item, index) => (
              <li key={index} className="flex items-center space-x-4 p-4 bg-blue-50 rounded-lg shadow-md">
                {/* Random student images */}
                <img
                  src={`https://randomuser.me/api/portraits/men/${index + 10}.jpg`}
                  alt={item.name}
                  className="w-12 h-12 rounded-full"
                />
                <div className="text-gray-700">
                  <p className="text-lg font-medium">{item.name}</p>
                  <p className="text-gray-500">{item.contact}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Add New Contact Form */}
        <div className="add-contact bg-white shadow-2xl rounded-lg p-6 w-full md:w-1/2 bg-opacity-80">
          <h2 className="text-3xl font-semibold text-gray-800 mb-4 border-b-2 border-gray-200 pb-2 flex items-center gap-2">
            <FaUserPlus className="text-green-600" /> Add New Contact
          </h2>
          <fieldset>
            <form onSubmit={handleSubmit} className="space-y-4">
              <label htmlFor="username" className="block text-gray-700 font-medium">
                Enter Name:
              </label>
              <input
                type="text"
                name="name"
                id="username"
                value={newContact.name}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
                required
              />

              <label htmlFor="phonenumber" className="block text-gray-700 font-medium">
                Enter Number:
              </label>
              <input
                type="text"
                name="contact"
                id="phonenumber"
                value={newContact.contact}
                onChange={handleInputChange}
                pattern="[0-9]{10}"
                maxLength="10"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
                required
              />

              <button
                type="submit"
                className="w-full bg-green-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-green-700 transition duration-300 shadow-lg"
              >
                Add Contact
              </button>
            </form>
          </fieldset>
        </div>
      </div>
    </div>
  );
}

export default App;

