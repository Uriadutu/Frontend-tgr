import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Userlist = () => {
  const [users, setUsers] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [userPage] = useState(10);
  const [total, setTotal] = useState([])
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    getUsers();
    getTotalUser()
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchText]);

  const getUsers = async () => {
    const response = await axios.get("http://localhost:5000/users");
    setUsers(response.data);
  };

  const getTotalUser = async () => {
    const response = await fetch("http://localhost:5000/users");
    const data = await response.json();
    setTotal(data.length);
  };

  const deleteUser = async (userId) => {
    await axios.delete(`http://localhost:5000/users/${userId}`);
    getUsers();
  };

  const filterCariUser = users.filter((item) => {
    const lowerCaseSearchText = searchText.toLowerCase();
    return (
      item.name.toLowerCase().includes(lowerCaseSearchText) ||
      (item.username &&
        item.username.toLowerCase().includes(lowerCaseSearchText))
    );
  });

  const indexOfLastUser = currentPage * userPage;
  const indexOfFirstUser = indexOfLastUser - userPage;
  const currentUser = filterCariUser.slice(indexOfFirstUser, indexOfLastUser);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(filterCariUser.length / userPage); i++) {
    pageNumbers.push(i);
  }

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <div className="flex items-center justify-between">
        <div>
          <input
            type="text"
            placeholder="Cari..."
            className="w-full input input-bordered"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>
        <Link to="/users/add" className="btn btn-primary">
          Tambah Pengguna
        </Link>
      </div>
      <div className="w-full mt-8 overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>No</th>
              <th>Nama</th>
              <th>NIP</th>
              <th>Role</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {currentUser.map((user, index) => (
              <tr key={user.uuid}>
                <td>{index + 1}</td>
                <td>{user.name}</td>
                <td>{user.nip}</td>
                <td>{user.role}</td>
                <td className="flex items-center space-x-2 place-content-center">
                  <Link
                    to={`/users/edit/${user.uuid}`}
                    className="btn btn-secondary"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => deleteUser(user.uuid)}
                    className="btn btn-primary"
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <nav
          className="flex justify-between items-center mt-4"
          role="navigation"
          aria-label="pagination"
        >
          <p className="font-semibold">Total User : {total}</p>
          <ul className="flex gap-4 items-center">
            {pageNumbers.map((number) => (
              <li key={number}>
                <a
                  className={`pagination-link ${
                    currentPage === number
                      ? "btn btn-primary"
                      : "btn break-normal"
                  }`}
                  aria-label={`Page ${number}`}
                  onClick={() => paginate(number)}
                >
                  {number}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Userlist;
