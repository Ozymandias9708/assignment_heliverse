import React, { useState, useEffect } from "react";
import "./App.css";
import SocialCard from "./Comonents/Card/SocialCard";
import {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} from "./Utility/API";

function App() {
  const [allUsers, setAllUsers] = useState([]);
  const [users, setUsers] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [selectedFilters, setSelectedFilters] = useState({
    domain: "",
    gender: "",
    availability: "",
  });
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 20;

  useEffect(() => {
    getAllUsers().then((data) => {
      setAllUsers(data.data);
      setUsers(data.data);
    });
  }, []);

  const filterCards = () => {
    const filteredUsers = allUsers.filter((user) => {
      const nameMatches =
        searchValue === "" ||
        `${user.first_name} ${user.last_name}`
          .toLowerCase()
          .includes(searchValue.toLowerCase());

      const domainMatches =
        selectedFilters.domain === "" ||
        user.domain.toLowerCase() === selectedFilters.domain.toLowerCase();

      const genderMatches =
        selectedFilters.gender === "" ||
        user.gender.toLowerCase() === selectedFilters.gender.toLowerCase();

      const availabilityMatches =
        selectedFilters.availability === "" ||
        user.availability.toLowerCase() ===
          selectedFilters.availability.toLowerCase();

      return (
        nameMatches && domainMatches && genderMatches && availabilityMatches
      );
    });

    setUsers(filteredUsers);
  };

  const handleFilterChange = (filterType, value) => {
    setSelectedFilters({
      ...selectedFilters,
      [filterType]: value,
    });
  };

  useEffect(() => {
    filterCards();
  }, [searchValue, selectedFilters]);

  const addToTeam = (user) => {
    if (!selectedUsers.find((selectedUser) => selectedUser.id === user.id)) {
      setSelectedUsers([...selectedUsers, user]);
    }
  };

  const removeFromTeam = (userId) => {
    const updatedTeam = selectedUsers.filter(
      (selectedUser) => selectedUser.id !== userId
    );
    setSelectedUsers(updatedTeam);
  };

  const deleteUserById = async (userId) => {
    try {
      await deleteUser(Number(userId)); // Convert userId to a number
      setAllUsers(allUsers.filter((user) => user.id !== Number(userId)));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };
  
  const updateUserById = async (userId, updatedUser) => {
    try {
      const response = await updateUser(userId, updatedUser);
      const updatedUserData = response.data;
      setAllUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === updatedUserData.id ? updatedUserData : user
        )
      );
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const [currentUsers,setCurrentUsers] =useState(users.slice(indexOfFirstUser, indexOfLastUser));

  useEffect(()=>{
    // setUsers(allUsers)
    setCurrentUsers(users.slice(indexOfFirstUser, indexOfLastUser))
  },[users])

  useEffect(()=>{
    setUsers(allUsers)
  },[allUsers])

  return (
    <div className="App">
      <h1>Social Cards</h1>

      <input
        className="search-box"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        placeholder="Search"
      />

      <div>
        <button onClick={() => getAllUsers().then((data) => setAllUsers(data.data))}>
          Get All Users
        </button>
        <button onClick={() => getUserById(1).then((data) => console.log(data))}>
          Get User by ID
        </button>
      </div>

      <div>
        <label>Domain:</label>
        <select
          value={selectedFilters.domain}
          onChange={(e) => handleFilterChange("domain", e.target.value)}
        >
          <option value="">All</option>
          <option value="Sales">Sales</option>
          <option value="Marketing">Marketing</option>
          <option value="Business Development">Business Development</option>
          <option value="IT">IT</option>
          <option value="Finance">Finance</option>
          <option value="UI Designing">UI Designing</option>
          <option value="Management">Management</option>
        </select>
      </div>

      <div>
        <label>Gender:</label>
        <select
          value={selectedFilters.gender}
          onChange={(e) => handleFilterChange("gender", e.target.value)}
        >
          <option value="">All</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </div>

      <div>
        <label>Availability:</label>
        <select
          value={selectedFilters.availability}
          onChange={(e) => handleFilterChange("availability", e.target.value)}
        >
          <option value="">All</option>
          <option value="true">Available</option>
          <option value="false">Unavailable</option>
        </select>
      </div>

      <div className="cards-container">
        {currentUsers.map((user, index) => (
          <div key={index} className="social-card">
            <SocialCard userData={user} />

            {/* Add update and delete options */}
            <button onClick={() => updateUserById(user.id, { /* updated user data */ })}>
              Update
            </button>
            <button onClick={() => deleteUserById(user.id)}>Delete</button>

            {selectedUsers.find((selectedUser) => selectedUser.id === user.id) ? (
              <button onClick={() => removeFromTeam(user.id)}>Remove from Team</button>
            ) : (
              <button onClick={() => addToTeam(user)}>Add to Team</button>
            )}
          </div>
        ))}
      </div>

      <div>
        <h2>Team Members</h2>
        <ul>
          {selectedUsers.map((selectedUser) => (
            <li key={selectedUser.id}>
              {`${selectedUser.first_name} ${selectedUser.last_name}`} - {selectedUser.domain}
            </li>
          ))}
        </ul>
      </div>

      <div>
        <ul className="pagination">
          {Array.from({ length: Math.ceil(users.length / usersPerPage) }, (_, index) => (
            <li key={index + 1}>
              <button onClick={() => paginate(index + 1)}>{index + 1}</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
