const API_BASE_URL = 'http://localhost:3001/api/users'; // Replace with your actual API endpoint

export const getAllUsers = async () => {
  const response = await fetch(API_BASE_URL);
  const data = await response.json();
  return data;
};
export const getUserById = async (id) => {
  const response = await fetch(`${API_BASE_URL}/${id}`);
  const data = await response.json();
  return data;
}; 

export const createUser = async (user) => {
  const response = await fetch(`${API_BASE_URL}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  });
  const data = await response.json(); 
  return data;
};

export const updateUser = async (id, updatedUser) => {
  const response = await fetch(`${API_BASE_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedUser),
  });
  const data = await response.json();
  return data;
};

export const deleteUser = async (id) => {
  const response = await fetch(`${API_BASE_URL}/${id}`, {
    method: 'DELETE',
  });
  const data = await response.json();
  return data;
};



