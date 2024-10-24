import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, Col, Row, Spin } from "antd";
import { useNavigate } from "react-router-dom";
import { useFetch } from "../../../hooks/useFetch";

export default function Branch()  {
  const [branches, setBranches] = useState([]);
  const [newBranch, setNewBranch] = useState("");
  const [editBranchId, setEditBranchId] = useState(null);
  const [updatedBranchName, setUpdatedBranchName] = useState("");
  const navigate = useNavigate();

  const { data, loading } = useFetch("http://localhost:8000/api/v1/admin/branches/branch");

  useEffect(() => {
    if (data && data.status === "success") {
      setBranches(data.data);
      console.log(data.data);
    }
  }, [data]);

  const createBranch = async () => {
    try {
      const response = await axios.post("http://localhost:8000/api/v1/admin/branches/branch", { name: newBranch });
      if (response.data.status === "success") {
        setBranches([...branches, response.data.data]);
        setNewBranch("");
      }
    } catch (error) {
      console.error("Error creating branch", error);
      navigate("/500");
    }
  };

  const updateBranch = async (branchId) => {
    try {
      const response = await axios.put(`http://localhost:8000/api/v1/admin/branches/branch/${branchId}`, {
        name: updatedBranchName,
      });
      if (response.data.status === "success") {
        const updatedBranches = branches.map((branch) =>
          branch._id === branchId ? { ...branch, name: updatedBranchName } : branch
        );
        setBranches(updatedBranches);
        setEditBranchId(null);
        setUpdatedBranchName("");
      }
    } catch (error) {
      console.error("Error updating branch", error);
      navigate("/500");
    }
  };

  if (loading) return <Spin />;

  return (
    <div className="p-6 bg-white rounded-lg">
      <Row gutter={16}>
        <Col span={24}>
          <Card bordered={true} title="Branch Manager">
            <div className="mb-6">
              <input
                type="text"
                value={newBranch}
                onChange={(e) => setNewBranch(e.target.value)}
                placeholder="New Branch Name"
                className="p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-black"
              />
              <button
                onClick={createBranch}
                className="mt-4 w-full px-4 py-2 bg-black text-white rounded-lg shadow-md hover:bg-gray-800 transition">
                Create Branch
              </button>
            </div>

            {branches && branches.length === 0 ? (
              <p className="text-gray-500">No branches found</p>
            ) : (
              <ul className="space-y-4">
                {branches.map((branch) => (
                  <li
                    key={branch._id}
                    className="flex items-center justify-between p-4 bg-gray-50 border border-gray-200 rounded-lg shadow-sm hover:shadow-lg transition">
                    {editBranchId === branch._id ? (
                      <>
                        <input
                          type="text"
                          value={updatedBranchName}
                          onChange={(e) => setUpdatedBranchName(e.target.value)}
                          placeholder="Update Branch Name"
                          className="p-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-black"
                        />
                        <button
                          onClick={() => updateBranch(branch._id)}
                          className="ml-4 px-4 py-2 bg-black text-white rounded-lg shadow-md hover:bg-gray-800 transition">
                          Update
                        </button>
                      </>
                    ) : (
                      <>
                        <span className="text-gray-700 font-medium">{branch.name}</span>
                        <button
                          onClick={() => {
                            setEditBranchId(branch._id);
                            setUpdatedBranchName(branch.name);
                          }}
                          className="ml-4 px-4 py-2 bg-black text-white rounded-lg shadow-md hover:bg-gray-800 transition">
                          Edit
                        </button>
                      </>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </Card>
        </Col>
      </Row>
    </div>
  );
};

